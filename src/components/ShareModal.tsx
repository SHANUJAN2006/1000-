/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Copy, Check, Share2, Quote, Sparkles } from 'lucide-react';
import { Language, TranslationSchema } from '../translations';
import { ProverbDataModel } from './ProverbCard';

interface ShareModalProps {
  proverb: ProverbDataModel | null;
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  t: TranslationSchema;
  onShowToast: (msg: string) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  proverb,
  isOpen,
  onClose,
  currentLang,
  t,
  onShowToast
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !proverb) return null;

  const activeContent = currentLang === 'ta'
    ? proverb.tamil
    : currentLang === 'si'
    ? proverb.sinhala
    : proverb.english;

  const quoteFormatted = `"${activeContent.proverb}"\n\n${t.meaningLabel}:\n${activeContent.meaning}\n\n— 1000 Proverbs (#${proverb.id})`;

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(quoteFormatted);
    setCopied(true);
    onShowToast(t.copiedToast);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${t.appTitle} - #${proverb.id}`,
          text: quoteFormatted,
          url: window.location.href
        });
      } catch {
        // User aborted share or share failed
      }
    } else {
      handleCopyQuote();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#181a3d] to-[#0c0e24] border-2 border-amber-500/40 p-6 sm:p-8 shadow-2xl shadow-indigo-950/80">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-amber-300 hover:bg-white/5 transition-colors"
          title={t.close}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{t.shareModalTitle}</h3>
            <p className="text-xs text-slate-400">#{proverb.id} • {t.categories[proverb.category] || activeContent.categoryName}</p>
          </div>
        </div>

        {/* Regal Quote Preview Box */}
        <div className="relative rounded-2xl p-6 bg-[#0f1126] border border-amber-500/20 text-center my-4 overflow-hidden">
          <div className="absolute top-2 left-3 text-amber-500/20">
            <Quote className="w-8 h-8 rotate-180" />
          </div>

          <p
            className={`text-xl sm:text-2xl font-bold text-amber-100 leading-relaxed mb-4 relative z-10 ${
              currentLang === 'ta' ? 'font-tamil' : currentLang === 'si' ? 'font-sinhala' : 'font-serif-royal'
            }`}
          >
            "{activeContent.proverb}"
          </p>

          <div className="pt-3 border-t border-slate-800 text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
              {t.meaningLabel}
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeContent.meaning}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleCopyQuote}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-950 text-slate-200 border border-indigo-800 hover:border-amber-400 hover:text-amber-300 transition-all flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{t.copiedToast}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{t.copyText}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleNativeShare}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>{t.shareCard}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
