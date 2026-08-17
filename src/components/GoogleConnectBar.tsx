import React, { useEffect, useState } from 'react';
import { 
  subscribeAuth, 
  signInWithGoogle, 
  logoutGoogle, 
  getCurrentUser, 
  getAccessToken 
} from '../services/auth';
import { Calendar, Mail, CheckCircle2, User, LogOut, Loader2, Sparkles, ShieldCheck } from 'lucide-react';
import { TARGET_ADMIN_EMAIL } from '../services/googleWorkspace';

interface GoogleConnectBarProps {
  compact?: boolean;
}

export const GoogleConnectBar: React.FC<GoogleConnectBarProps> = ({ compact = false }) => {
  const [user, setUser] = useState(getCurrentUser());
  const [token, setToken] = useState(getAccessToken());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeAuth((authUser, authToken) => {
      setUser(authUser);
      setToken(authToken);
    });
    return unsubscribe;
  }, []);

  const handleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      console.error('Google Sign In Error:', err);
      setError(err?.message || 'Could not complete Google Sign-in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await logoutGoogle();
    } catch (err) {
      console.error('Sign out error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const isConnected = !!user && !!token;

  if (compact) {
    if (isConnected) {
      return (
        <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold truncate max-w-[140px] sm:max-w-[200px]">
            Google Workspace Connected ({user.email || TARGET_ADMIN_EMAIL})
          </span>
          <button 
            onClick={handleSignOut}
            title="Disconnect Google Account"
            className="p-1 hover:text-white transition-colors ml-1"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      );
    }

    return (
      <button
        onClick={handleSignIn}
        disabled={isLoading}
        id="google-connect-compact-btn"
        className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors cursor-pointer"
      >
        {isLoading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#9ce2c7]" />
        ) : (
          <svg className="w-3.5 h-3.5" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
        )}
        <span>Connect Google Calendar & Gmail</span>
      </button>
    );
  }

  return (
    <div className="bg-[#121212] text-white p-4 sm:p-5 rounded-2xl border border-white/15 shadow-lg mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#9ce2c7]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#9ce2c7]">
              Google Workspace Automated Sync
            </span>
          </div>
          <p className="text-xs text-gray-300">
            Appointments automatically synchronize with <strong className="text-white">{TARGET_ADMIN_EMAIL}</strong> Google Calendar & Gmail.
          </p>
        </div>

        <div>
          {isConnected ? (
            <div className="flex items-center space-x-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-[#9ce2c7] animate-ping"></div>
              <div className="text-left text-xs">
                <p className="font-bold text-white leading-none">{user?.displayName || 'Admin Connected'}</p>
                <p className="text-[11px] text-gray-400">{user?.email || TARGET_ADMIN_EMAIL}</p>
              </div>
              <button
                onClick={handleSignOut}
                disabled={isLoading}
                title="Disconnect Account"
                className="text-gray-400 hover:text-red-400 transition-colors p-1"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleSignIn}
              disabled={isLoading}
              id="google-workspace-auth-btn"
              className="inline-flex items-center space-x-2.5 bg-white text-gray-900 hover:bg-gray-100 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-gray-900" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
              )}
              <span>{isLoading ? 'Connecting...' : 'Authorize Google Calendar & Gmail'}</span>
            </button>
          )}
        </div>

      </div>

      {error && (
        <div className="mt-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-2 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};
