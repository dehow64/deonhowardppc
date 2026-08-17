import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User, 
  signOut 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App and Auth
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Configure Google Provider with requested Workspace Scopes
export const SCOPES = [
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/gmail.send'
];

export const googleProvider = new GoogleAuthProvider();
SCOPES.forEach(scope => googleProvider.addScope(scope));
// Prompt for consent if needed to ensure refresh/scopes
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// State & in-memory token cache (Do NOT store in localStorage per security requirements)
let isSigningIn = false;
let cachedAccessToken: string | null = null;
let currentAuthUser: User | null = null;

type AuthListener = (user: User | null, token: string | null) => void;
const listeners: Set<AuthListener> = new Set();

const notifyListeners = () => {
  listeners.forEach(fn => fn(currentAuthUser, cachedAccessToken));
};

export const subscribeAuth = (listener: AuthListener) => {
  listeners.add(listener);
  listener(currentAuthUser, cachedAccessToken);
  return () => {
    listeners.delete(listener);
  };
};

export const initAuth = () => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    currentAuthUser = user;
    if (!user && !isSigningIn) {
      cachedAccessToken = null;
    }
    notifyListeners();
  });
};

export const signInWithGoogle = async (): Promise<{ user: User; accessToken: string }> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    
    if (!credential?.accessToken) {
      throw new Error('Could not obtain Google OAuth access token. Please verify permissions.');
    }

    cachedAccessToken = credential.accessToken;
    currentAuthUser = result.user;
    notifyListeners();

    return {
      user: result.user,
      accessToken: credential.accessToken
    };
  } catch (error: any) {
    console.error('Google Sign In failed:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const getCurrentUser = (): User | null => {
  return currentAuthUser;
};

export const logoutGoogle = async () => {
  await signOut(auth);
  cachedAccessToken = null;
  currentAuthUser = null;
  notifyListeners();
};
