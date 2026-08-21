import React from 'react';
import { PHONE_NUMBER, PHONE_TEL } from '../data/contentData';

export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    (window.matchMedia && window.matchMedia('(max-width: 768px)').matches && 'ontouchstart' in window);
};

/**
 * Safely triggers phone dialing without breaking the host web application or iframe.
 * Handles desktop Google Voice / browser extensions gracefully by:
 * 1. Preventing top-level window navigation that causes "voice.google.com refused to connect"
 * 2. Copying the phone number automatically to clipboard
 * 3. Opening the phone protocol through an isolated hidden iframe
 * 4. Dispatching a toast notification with interactive dialing & copy options
 */
export const handlePhoneCall = (e?: React.MouseEvent): void => {
  // Always prevent default anchor navigation to avoid destroying the app inside an iframe
  if (e) {
    if (typeof e.preventDefault === 'function') e.preventDefault();
    if (typeof e.stopPropagation === 'function') e.stopPropagation();
  }

  // 1. Copy number to clipboard automatically as a reliable fallback
  if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(PHONE_NUMBER).catch(() => {
      // Safe fallback if clipboard permission is restricted
    });
  }

  // 2. Dispatch event to show the visual dialer toast / floating feedback
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('phone-call-triggered', {
      detail: {
        number: PHONE_NUMBER,
        tel: PHONE_TEL,
        isMobile: isMobileDevice()
      }
    }));
  }

  // 3. Trigger protocol handler in an isolated hidden sandbox element so that
  // any browser extension (like Google Voice, FaceTime, Skype) attempts to open without
  // ever navigating or replacing the main application frame!
  if (typeof document !== 'undefined') {
    try {
      let safeFrame = document.getElementById('safe-tel-trigger-frame') as HTMLIFrameElement | null;
      if (!safeFrame) {
        safeFrame = document.createElement('iframe');
        safeFrame.id = 'safe-tel-trigger-frame';
        safeFrame.style.position = 'absolute';
        safeFrame.style.top = '-9999px';
        safeFrame.style.left = '-9999px';
        safeFrame.style.width = '1px';
        safeFrame.style.height = '1px';
        safeFrame.style.opacity = '0';
        safeFrame.style.border = 'none';
        safeFrame.style.pointerEvents = 'none';
        safeFrame.setAttribute('aria-hidden', 'true');
        document.body.appendChild(safeFrame);
      }
      safeFrame.src = PHONE_TEL;
    } catch (err) {
      console.warn('Safe dialer iframe notice:', err);
    }
  }
};


