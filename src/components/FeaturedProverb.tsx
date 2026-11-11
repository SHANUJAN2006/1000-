/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Volume2, VolumeX, Heart, ThumbsUp, Copy, Check, Share2, Compass, ArrowRight } from 'lucide-react';
import { Language, TranslationSchema } from '../translations';
import { ProverbDataModel } from './ProverbCard';

interface FeaturedProverbProps {
  proverb: ProverbDataModel;
  currentLang: Language;
  t: TranslationSchema;
  isFavorited: boolean;
  isLiked: boolean;
  likesCount: number;
  isSpeaking: boolean;
  onToggleFavorite: (id: number) => void;
  onToggleLike: (id: number) => void;
  onSpeak: (text: string, id: number | 'global') => void;
  onShare: (proverb: ProverbDataModel) => void;
  onPickRandom: () => void;
  onShowToast: (msg: string) => void;
}

export const FeaturedProverb: React.FC<FeaturedProverbProps> = ({
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
  onPickRandom,
  onShowToast
}) => {
  const [copied, setCopied] = useState(false);

  const activeContent = currentLang === 'ta'
    ? proverb.tamil
    : currentLang === 'si'
    ? proverb.sinhala
    : proverb.english;

  const handleSpeak = () => {
    const speechScript = `${activeContent.proverb}. ${activeContent.meaning}`;
    onSpeak(speechScript, 'global');
  };

  const handleCopy = () => {
    const textToCopy = `"${activeContent.proverb}"\n\n${t.meaningLabel}:\n${activeContent.meaning}\n\n— 1000 Proverbs (#${proverb.id})`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    onShowToast(t.copiedToast);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#181938] via-[#10122e] to-[#0a0b1d] border-2 border-amber-500/35 shadow-2xl shadow-indigo-950/80">
      
      {/* Decorative ambient background glows */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Tag */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/25 to-amber-700/25 border border-amber-400/40 text-amber-200 text-xs sm:text-sm font-bold shadow-inner">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>{t.todayWisdom}</span>
          <span className="text-amber-400/80 font-normal ml-1">#{proverb.id}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Category indicator */}
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/70 text-emerald-300 border border-emerald-500/40">
            {t.categories[proverb.category] || activeContent.categoryName}
          </span>

          {/* Randomizer button */}
          <button
            type="button"
            onClick={onPickRandom}
            className="p-1.5 rounded-xl text-slate-400 hover:text-amber-300 hover:bg-white/5 transition-colors"
            title={t.randomProverbBtn}
          >
            <Compass className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Featured Proverb Content */}
      <div className="my-4">
        <blockquote
          className={`text-2xl sm:text-3xl md:text-4xl font-extrabold leading-snug sm:leading-tight text-white drop-shadow-md ${
            currentLang === 'ta'
              ? 'font-tamil text-xl sm:text-2xl md:text-3xl leading-relaxed'
              : currentLang === 'si'
              ? 'font-sinhala text-xl sm:text-2xl md:text-3xl leading-relaxed'
              : 'font-serif-royal'
          }`}
        >
          <span className="text-gold-gradient">"{activeContent.proverb}"</span>
        </blockquote>

        {/* Meaning and Life Insight */}
        <div className="mt-5 p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/40 backdrop-blur-md">
          <h3 className="text-xs uppercase tracking-wider font-bold text-emerald-400 mb-1">
            {t.meaningLabel}
          </h3>
          <p
            className={`text-sm sm:text-base text-slate-200 leading-relaxed ${
              currentLang === 'ta' ? 'font-tamil' : currentLang === 'si' ? 'font-sinhala' : ''
            }`}
          >
            {activeContent.meaning}
          </p>
        </div>
      </div>

      {/* Featured Proverb Actions */}
      <div className="mt-6 pt-4 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-3">
        
        {/* Listen Global Voice Button */}
        <button
          type="button"
          onClick={handleSpeak}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all shadow-lg ${
            isSpeaking
              ? 'bg-emerald-500 text-slate-950 border border-emerald-300 shadow-emerald-500/50 animate-pulse'
              : 'bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-slate-950 hover:brightness-110 shadow-amber-500/20'
          }`}
        >
          {isSpeaking ? (
            <>
              <VolumeX className="w-5 h-5 text-slate-950" />
              <span>{t.stopAudio}</span>
              <span className="flex items-center gap-0.5 ml-1">
                <span className="w-1 h-3.5 bg-slate-950 rounded animate-wave-1" />
                <span className="w-1 h-3.5 bg-slate-950 rounded animate-wave-2" />
                <span className="w-1 h-3.5 bg-slate-950 rounded animate-wave-3" />
              </span>
            </>
          ) : (
            <>
              <Volume2 className="w-5 h-5 text-slate-950" />
              <span>{t.listenAssistant}</span>
            </>
          )}
        </button>

        {/* Like, Favorite, Copy, Share */}
        <div className="flex items-center gap-2">
          
          <button
            type="button"
            onClick={() => onToggleLike(proverb.id)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              isLiked
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
                : 'bg-indigo-950/80 text-slate-300 border border-indigo-800 hover:text-emerald-400'
            }`}
            title={t.like}
          >
            <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-emerald-400 text-emerald-400' : ''}`} />
            <span>{likesCount}</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleFavorite(proverb.id)}
            className={`p-2 rounded-xl text-xs sm:text-sm transition-all ${
              isFavorited
                ? 'bg-rose-950/80 text-rose-300 border border-rose-500/50'
                : 'bg-indigo-950/80 text-slate-300 border border-indigo-800 hover:text-rose-400'
            }`}
            title={isFavorited ? t.favorited : t.favorite}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-400 text-rose-400' : ''}`} />
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="p-2 rounded-xl bg-indigo-950/80 text-slate-300 border border-indigo-800 hover:text-amber-300 hover:border-amber-500/40 transition-colors"
            title={t.copyText}
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>

          <button
            type="button"
            onClick={() => onShare(proverb)}
            className="p-2 rounded-xl bg-indigo-950/80 text-slate-300 border border-indigo-800 hover:text-amber-300 hover:border-amber-500/40 transition-colors"
            title={t.shareCard}
          >
            <Share2 className="w-4 h-4" />
          </button>

        </div>
      </div>

    </section>
  );
};
