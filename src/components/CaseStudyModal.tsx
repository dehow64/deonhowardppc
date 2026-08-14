import React from 'react';
import { CaseStudy } from '../types';
import { X, CheckCircle2, AlertCircle, TrendingUp, ShieldCheck, FileText, ExternalLink } from 'lucide-react';

interface CaseStudyModalProps {
  study: CaseStudy | null;
  onClose: () => void;
  onBookClick: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ study, onClose, onBookClick }) => {
  if (!study) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#121212] text-white rounded-3xl max-w-2xl w-full relative shadow-2xl border border-white/10 max-h-[90vh] overflow-y-auto">
        
        {/* Cover image header */}
        <div className="relative h-56 sm:h-64 w-full">
          <img
            src={study.image}
            alt={study.title}
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/60 to-transparent"></div>
          
          <button
            onClick={onClose}
            id="case-study-modal-close-btn"
            className="absolute top-4 right-4 bg-black/80 hover:bg-black p-2 text-white rounded-full border border-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 space-y-2">
            <span className="bg-black text-white text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-white/20">
              {study.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              {study.title}
            </h3>
          </div>
        </div>

        {/* Details Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-3 bg-[#1a1a1a] p-4 rounded-2xl border border-white/10">
            {study.metrics.map((m, idx) => (
              <div key={idx} className="text-center">
                <p className="text-xl sm:text-2xl font-extrabold text-[#9ce2c7]">{m.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-300 mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>

          {/* PDF Download Button if available */}
          {study.pdfUrl && (
            <div className="bg-[#9ce2c7]/10 border border-[#9ce2c7]/30 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-[#9ce2c7] text-black rounded-xl">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Full Shopping Case Study Report (PDF)</h4>
                  <p className="text-[11px] text-gray-300">Detailed campaign metrics and product breakdown</p>
                </div>
              </div>
              <a
                href={study.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#9ce2c7] hover:bg-[#8bd6ba] text-black font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-full transition-all inline-flex items-center space-x-1 shrink-0"
              >
                <span>View PDF</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Problem, Solution, Result Standard Breakdown */}
          <div className="space-y-4 font-sans">
            
            {/* 1. Problem */}
            <div className="bg-[#1a1a1a] p-5 rounded-2xl border border-rose-500/20 space-y-2">
              <div className="flex items-center space-x-2 text-rose-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <h5 className="text-xs font-black uppercase tracking-widest">1. The Problem (What Was Holding Them Back)</h5>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-sans">{study.problem}</p>
            </div>

            {/* 2. Solution */}
            <div className="bg-[#1a1a1a] p-5 rounded-2xl border border-blue-500/20 space-y-2">
              <div className="flex items-center space-x-2 text-blue-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <h5 className="text-xs font-black uppercase tracking-widest">2. The Solution (What We Did)</h5>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-sans">{study.solution}</p>
            </div>

            {/* 3. Result */}
            <div className="bg-[#1a1a1a] p-5 rounded-2xl border border-[#9ce2c7]/30 space-y-2">
              <div className="flex items-center space-x-2 text-[#9ce2c7]">
                <TrendingUp className="w-4 h-4 shrink-0" />
                <h5 className="text-xs font-black uppercase tracking-widest">3. The Result (Business Impact)</h5>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-sans">{study.result}</p>
            </div>

          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gray-400">
              <ShieldCheck className="w-4 h-4 text-[#9ce2c7]" />
              <span>Verified Campaign Results</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onBookClick();
              }}
              className="w-full sm:w-auto bg-[#9ce2c7] hover:bg-[#8bd6ba] text-black font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-full shadow transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              Replicate These Results
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
