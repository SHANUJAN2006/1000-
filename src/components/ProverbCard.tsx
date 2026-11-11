/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Volume2, VolumeX, Heart, ThumbsUp, Copy, Check, Share2, Quote } from 'lucide-react';
import { Language, TranslationSchema } from '../translations';

export interface ProverbDataModel {
  id: number;
  category: string;
  english: {
    proverb: string;
    meaning: string;
    categoryName: string;
    tags: string[];
  };
  tamil: {
    proverb: string;
    meaning: string;
    categoryName: string;
    tags: string[];
  };
  sinhala: {
    proverb: string;
    meaning: string;
    categoryName: string;
    tags: string[];
  };
}

interface ProverbCardProps {
  proverb: ProverbDataModel;
  currentLang: Language;
  t: TranslationSchema;
  isFavorited: boolean;
  isLiked: boolean;
  likesCount: number;
  isSpeaking: boolean;
  onToggleFavorite: (id: number) => void;
  onToggleLike: (id: number) => void;
  onSpeak: (text: string, id: number) => void;
  onShare: (proverb: ProverbDataModel) => void;
  onShowToast: (msg: string) => void;
}

export const ProverbCard: React.FC<ProverbCardProps> = ({
  proverb,
  currentLang,
  t,
  isFavorited,
  isLiked,
  likesCount,
  isSpeaking,
  onToggleFavorite,
  onToggleLike,
  onSpeak,
  onShare,
  onShowToast
}) => {
  const [copied, setCopied] = useState(false);

  // Active language specific content (100% culturally authentic, no literal translation)
  const activeContent = currentLang === 'ta'
    ? proverb.tamil
    : currentLang === 'si'
    ? proverb.sinhala
    : proverb.english;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = `"${activeContent.proverb}"\n\n${t.meaningLabel}:\n${activeContent.meaning}\n\n— 1000 Proverbs (#${proverb.id})`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    onShowToast(t.copiedToast);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Read aloud BOTH the proverb and its explanation clearly in the chosen language!
    const speechScript = `${activeContent.proverb}. ${activeContent.meaning}`;
    onSpeak(speechScript, proverb.id);
  };

  return (
    <article
      className={`group relative rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
        isSpeaking
          ? 'bg-gradient-to-b from-[#1b1740] to-[#12132e] border-2 border-emerald-400 shadow-2xl shadow-emerald-900/30'
          : isFavorited
          ? 'glass-card border-amber-400/40 shadow-lg shadow-amber-950/20'
          : 'glass-card'
      }`}
    >
      {/* Decorative Royal-Gold Geometric Corner Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none">
        <svg viewBox="0 0 32 32" className="w-full h-full text-amber-500/30 group-hover:text-amber-400/70 transition-colors">
          <path d="M 0 0 L 16 0 L 0 16 Z" fill="currentColor" opacity="0.4" />
          <path d="M 0 0 L 24 0 L 0 24" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none rotate-90">
        <svg viewBox="0 0 32 32" className="w-full h-full text-amber-500/30 group-hover:text-amber-400/70 transition-colors">
          <path d="M 0 0 L 16 0 L 0 16 Z" fill="currentColor" opacity="0.4" />
          <path d="M 0 0 L 24 0 L 0 24" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {/* Top Meta Bar: Proverb ID & Category Badge */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          {/* ID Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500/20 to-amber-700/20 text-amber-300 border border-amber-500/30 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>#{proverb.id}</span>
          </div>

          {/* Emerald Category Pill */}
          <div className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
            {t.categories[proverb.category] || activeContent.categoryName}
          </div>
        </div>

        {/* Proverb Quote Area */}
        <div className="relative my-2 pl-3 border-l-2 border-amber-500/40">
          <Quote className="absolute -top-2 -left-2 w-5 h-5 text-amber-500/20 rotate-180 -z-10" />
          
          <h2
            className={`text-lg sm:text-xl font-bold leading-relaxed text-amber-50 group-hover:text-amber-200 transition-colors ${
              currentLang === 'ta'
                ? 'font-tamil leading-loose text-[17px] sm:text-lg'
                : currentLang === 'si'
                ? 'font-sinhala leading-loose text-[17px] sm:text-lg'
                : 'font-serif-royal'
            }`}
          >
            "{activeContent.proverb}"
          </h2>
        </div>

        {/* Cultural Meaning & Explanation */}
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-400/90 block mb-1">
            {t.meaningLabel}
          </span>
          <p
            className={`text-xs sm:text-sm text-slate-300/90 leading-relaxed font-normal ${
              currentLang === 'ta' ? 'font-tamil' : currentLang === 'si' ? 'font-sinhala' : ''
            }`}
          >
            {activeContent.meaning}
          </p>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="mt-6 pt-3 border-t border-indigo-900/40 flex items-center justify-between gap-2 flex-wrap">
        
        {/* Left: Individual Speaker Button */}
        <button
          type="button"
          onClick={handleSpeak}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            isSpeaking
              ? 'bg-emerald-500 text-slate-950 border-emerald-300 shadow-md shadow-emerald-500/40 font-bold'
              : 'bg-indigo-950/60 text-slate-200 border-indigo-800/60 hover:border-amber-400 hover:text-amber-300'
          }`}
          title={isSpeaking ? t.listenCardStop : t.listenCard}
        >
          {isSpeaking ? (
            <>
              <VolumeX className="w-4 h-4 text-slate-950" />
              <span>{t.listenCardStop}</span>
              <span className="flex items-center gap-0.5 ml-0.5">
                <span className="w-0.5 h-3 bg-slate-950 rounded animate-wave-1" />
                <span className="w-0.5 h-3 bg-slate-950 rounded animate-wave-2" />
                <span className="w-0.5 h-3 bg-slate-950 rounded animate-wave-3" />
              </span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>{t.listenCard}</span>
            </>
          )}
        </button>

        {/* Right: Like, Favorite, Copy, Share buttons */}
        <div className="flex items-center gap-1.5">
          
          {/* Like Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike(proverb.id);
            }}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              isLiked
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
                : 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800/50'
            }`}
            title={t.like}
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-current text-emerald-400' : ''}`} />
            <span>{likesCount}</span>
          </button>

          {/* Favorite Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(proverb.id);
            }}
            className={`p-1.5 rounded-xl text-xs transition-all ${
              isFavorited
                ? 'bg-amber-500/20 text-amber-300 border border-amber-400/50'
                : 'text-slate-400 hover:text-rose-400 hover:bg-slate-800/50'
            }`}
            title={isFavorited ? t.favorited : t.favorite}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className="p-1.5 rounded-xl text-xs text-slate-400 hover:text-amber-300 hover:bg-slate-800/50 transition-colors"
            title={t.copyText}
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>

          {/* Share Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onShare(proverb);
            }}
            className="p-1.5 rounded-xl text-xs text-slate-400 hover:text-amber-300 hover:bg-slate-800/50 transition-colors"
            title={t.shareCard}
          >
            <Share2 className="w-4 h-4" />
          </button>

        </div>
      </div>
    </article>
  );
};
