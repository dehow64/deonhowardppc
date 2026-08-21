import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, CheckCircle2, ChevronRight, Phone, Clock, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { WHATSAPP_NUMBER, WHATSAPP_RAW, WHATSAPP_URL } from '../data/contentData';
import { buildWhatsAppUrl, openWhatsAppChat } from '../utils/whatsapp';
import { trackWhatsAppPromptSelected } from '../utils/analytics';

interface QuickPrompt {
  id: string;
  icon: string;
  label: string;
  message: string;
}

const QUICK_PROMPTS: QuickPrompt[] = [
  {
    id: 'audit',
    icon: '⚡',
    label: 'Free Automation Audit',
    message: "Hi Deon, I'd like to get a free AI Marketing Automation audit for my business."
  },
  {
    id: 'booking',
    icon: '📅',
    label: 'Schedule Call via WhatsApp',
    message: "Hi Deon, I would like to schedule a 1-on-1 strategy call with you over WhatsApp. What time works best?"
  },
  {
    id: 'pricing',
    icon: '💰',
    label: 'Pricing & Packages',
    message: "Hi Deon, can you share the pricing structure and ROI projections for your custom marketing automation systems?"
  },
  {
    id: 'funnels',
    icon: '🛠️',
    label: 'Custom AI Funnels & CRM',
    message: "Hi Deon, I'm looking to build automated conversion funnels and AI lead nurturing for my company."
  }
];

export const WhatsAppMessengerWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      setShowBadge(false);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 200);
    }
  }, [isOpen]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const textToSend = customMessage.trim() || "Hi Deon, I'm reaching out from your website regarding Marketing Automation Systems.";
    openWhatsAppChat(textToSend, undefined, 'widget_custom_input');
    setIsOpen(false);
    setCustomMessage('');
  };

  const handleQuickPromptClick = (prompt: QuickPrompt) => {
    trackWhatsAppPromptSelected(prompt.id, prompt.label);
    openWhatsAppChat(prompt.message, undefined, 'widget_quick_prompt');
    setIsOpen(false);
  };

  return (
    <>
      {/* Side Messenger Floating Dock - Present on both Mobile & Desktop */}
      <div 
        id="whatsapp-scrolling-messenger-container" 
        className="fixed bottom-4 left-3 sm:bottom-6 sm:left-6 z-50 flex flex-col items-start pointer-events-auto select-none"
      >
        {/* Expanded Messenger Menu Window */}
        {isOpen && (
          <div 
            id="whatsapp-messenger-menu-box"
            className="mb-3 w-[calc(100vw-2rem)] sm:w-96 max-w-sm bg-white rounded-3xl shadow-2xl border border-gray-200/80 overflow-hidden text-gray-900 animate-in slide-in-from-bottom-5 duration-200 z-50"
          >
            {/* Header with WhatsApp Brand Colors */}
            <div className="bg-[#075E54] text-white p-4 sm:p-5 relative overflow-hidden">
              {/* Subtle background decoration */}
              <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
                <WhatsAppIcon className="w-32 h-32 text-white" fill="currentColor" />
              </div>

              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-11 h-11 rounded-full bg-[#25D366] p-0.5 shadow-md flex items-center justify-center">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-xs font-black text-[#075E54]">
                        DH
                      </div>
                    </div>
                    {/* Live Online Pulse Indicator */}
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#25D366] border-2 border-[#075E54] flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-white tracking-tight flex items-center space-x-1.5">
                      <span>Deon Howard</span>
                      <span className="bg-[#25D366]/30 text-[#9ce2c7] text-[10px] font-mono font-bold px-1.5 py-0.5 rounded">
                        PPC & AI
                      </span>
                    </h3>
                    <p className="text-xs text-white/80 font-medium flex items-center space-x-1 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-[#25D366] inline-block" />
                      <span>Online • Replies in minutes</span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  id="whatsapp-close-menu-btn"
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                  title="Close WhatsApp Messenger"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-white/90">
                <span className="font-bold text-[#9ce2c7] uppercase tracking-wider text-[10px]">
                  Direct WhatsApp Messenger
                </span>
                <span className="text-white/80 font-medium text-[10px]">
                  Instant response
                </span>
              </div>
            </div>

            {/* Chat Body & Quick Options */}
            <div className="p-4 sm:p-5 space-y-4 bg-[#ECE5DD]/30 max-h-[60vh] overflow-y-auto">
              
              {/* System Welcome Chat Bubble */}
              <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100 max-w-[90%] space-y-1 relative">
                <p className="text-xs font-semibold text-gray-800 leading-relaxed">
                  👋 Hello! Welcome to Deon Howard PPC. How can I help with your marketing automation or customer acquisition today?
                </p>
                <div className="text-[10px] text-gray-400 font-mono text-right flex items-center justify-end space-x-1">
                  <span>Just now</span>
                  <CheckCircle2 className="w-3 h-3 text-[#25D366]" />
                </div>
              </div>

              {/* Quick Starter Prompts */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 px-1">
                  ⚡ Tap a quick question to send:
                </p>

                <div className="grid grid-cols-1 gap-1.5">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt.id}
                      type="button"
                      onClick={() => handleQuickPromptClick(prompt)}
                      className="group flex items-center justify-between p-2.5 bg-white hover:bg-[#25D366]/10 border border-gray-200 hover:border-[#25D366] rounded-xl text-left transition-all cursor-pointer shadow-sm text-xs font-medium text-gray-800 hover:text-black"
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <span className="text-sm">{prompt.icon}</span>
                        <span className="truncate">{prompt.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#25D366] group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Message Composer Form */}
              <form onSubmit={handleSendMessage} className="space-y-2 pt-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 px-1">
                  💬 Or type a custom message:
                </p>

                <div className="flex items-center space-x-2 bg-white p-1.5 rounded-2xl border-2 border-gray-200 focus-within:border-[#25D366] shadow-sm transition-all">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Type your message here..."
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs font-medium text-gray-900 placeholder:text-gray-400 bg-transparent outline-none"
                  />

                  <button
                    type="submit"
                    id="whatsapp-submit-message-btn"
                    className="bg-[#25D366] hover:bg-[#20ba59] text-white p-2.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center shrink-0"
                    title="Send via WhatsApp"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              {/* One-Click Direct Link */}
              <div className="text-center pt-1">
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center space-x-2 w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>Start WhatsApp Chat Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

            {/* Footer Notice */}
            <div className="bg-gray-50 px-4 py-2 text-center text-[10px] font-medium text-gray-500 border-t border-gray-100">
              Powered by WhatsApp Direct Messenger • Instant response
            </div>
          </div>
        )}

        {/* Side Floating WhatsApp Trigger Pill/Button */}
        <div className="flex items-center space-x-2">
          {/* Main Round Floating WhatsApp Button */}
          <button
            id="floating-whatsapp-trigger-btn"
            onClick={() => setIsOpen(!isOpen)}
            className={`relative p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center border-2 ${
              isOpen
                ? 'bg-gray-900 text-white border-gray-700 ring-2 ring-gray-400/30'
                : 'bg-[#25D366] hover:bg-[#20ba59] text-white border-white ring-4 ring-[#25D366]/30'
            }`}
            aria-label="Open WhatsApp Messenger Menu"
            title="Chat with Deon Howard on WhatsApp"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <>
                <WhatsAppIcon className="w-7 h-7 text-white" />
                
                {/* Notification unread badge */}
                {showBadge && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center border-2 border-white shadow-md animate-bounce">
                    1
                  </span>
                )}
              </>
            )}
          </button>

          {/* Tooltip Pill (beside the button) */}
          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
              className="hidden sm:inline-flex items-center space-x-2 bg-white/95 backdrop-blur-md text-gray-900 border border-gray-200/90 py-2 px-3.5 rounded-full shadow-lg text-xs font-bold hover:shadow-xl hover:border-[#25D366] transition-all cursor-pointer transform hover:translate-x-1"
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span>Chat on WhatsApp</span>
            </button>
          )}
        </div>

      </div>
    </>
  );
};
