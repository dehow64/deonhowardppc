import React from 'react';
import { PHONE_NUMBER, PHONE_TEL } from '../data/contentData';

export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    (window.matchMedia && window.matchMedia('(max-width: 768px)').matches && 'ontouchstart' in window);
};

export const handlePhoneCall = (e?: React.MouseEvent): void => {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  // Copy number to clipboard automatically
  if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(PHONE_NUMBER).catch(() => {
      // Fallback
    });
  }

  // Dispatch custom event for visual toast notification
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('phone-call-triggered', {
      detail: {
        number: PHONE_NUMBER,
        tel: PHONE_TEL,
        isMobile: isMobileDevice()
      }
    }));
  }

  // If on mobile device, trigger native dialer safely
  if (isMobileDevice()) {
    try {
      const a = document.createElement('a');
      a.href = PHONE_TEL;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        if (document.body.contains(a)) {
          document.body.removeChild(a);
        }
      }, 500);
    } catch {
      window.location.href = PHONE_TEL;
    }
  }
};
