/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, Crown, Gauge } from 'lucide-react';
import { Language, TranslationSchema } from '../translations';

interface HeaderProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  t: TranslationSchema;
  totalCount: number;
  isSpeakingGlobal: boolean;
  onToggleGlobalSpeech: () => void;
  speechRate: number;
  onChangeRate: (rate: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onSelectLang,
  t,
  totalCount,
  isSpeakingGlobal,
  onToggleGlobalSpeech,
  speechRate,
  onChangeRate
}) => {
  return (
    <header className="relative w-full border-b border-amber-500/20 bg-[#0c0d1e]/90 backdrop-blur-2xl z-30 shadow-2xl shadow-indigo-950/40">
      {/* Decorative ambient top line */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-emerald-400 to-indigo-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          
          {/* Logo & Dynamic Title */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/20 via-indigo-900/60 to-emerald-500/20 border border-amber-400/40 shadow-lg shadow-amber-500/10">
              <Crown className="w-8 h-8 text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full" />
            </div>

            <div>
              <div className="flex items-center justify-center md:justify-start gap-2.5 flex-wrap">
                <h1 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm ${
                  currentLang === 'ta' ? 'font-tamil' : currentLang === 'si' ? 'font-sinhala' : 'font-serif-royal'
                }`}>
                  <span className="text-gold-gradient">{t.appTitle}</span>
                </h1>

                {/* Live Counter Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 shadow-inner">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>{totalCount} / {totalCount}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300/80 mt-1 max-w-xl">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Right Controls: Trilingual Switcher & Global Voice Assistant */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 w-full md:w-auto">
            
            {/* Language Switcher */}
            <div className="inline-flex p-1 rounded-xl bg-indigo-950/80 border border-amber-500/30 shadow-inner">
              <button
                type="button"
                onClick={() => onSelectLang('ta')}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  currentLang === 'ta'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-bold'
                    : 'text-slate-300 hover:text-amber-300 hover:bg-white/5'
                }`}
                title="தமிழ் (Tamil)"
              >
                தமிழ்
              </button>

              <button
                type="button"
                onClick={() => onSelectLang('en')}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  currentLang === 'en'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-bold'
                    : 'text-slate-300 hover:text-amber-300 hover:bg-white/5'
                }`}
                title="English"
              >
                English
              </button>

              <button
                type="button"
                onClick={() => onSelectLang('si')}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  currentLang === 'si'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-bold'
                    : 'text-slate-300 hover:text-amber-300 hover:bg-white/5'
                }`}
                title="සිංහල (Sinhala)"
              >
                සිංහල
              </button>
            </div>

            {/* Global Voice Assistant Button with Rate Selector */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onToggleGlobalSpeech}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-300 shadow-md ${
                  isSpeakingGlobal
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-emerald-500/30 animate-pulse'
                    : 'bg-gradient-to-r from-indigo-900/90 to-purple-950/90 text-amber-200 border-amber-500/40 hover:border-amber-400 hover:shadow-amber-500/20'
                }`}
                title={isSpeakingGlobal ? t.stopAudio : t.listenAssistant}
              >
                {isSpeakingGlobal ? (
                  <>
                    <VolumeX className="w-4 h-4 text-white" />
                    <span>{t.stopAudio}</span>
                    <span className="flex items-center gap-0.5 ml-1">
                      <span className="w-1 bg-white rounded animate-wave-1" />
                      <span className="w-1 bg-white rounded animate-wave-2" />
                      <span className="w-1 bg-white rounded animate-wave-3" />
                    </span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-amber-300" />
                    <span>{t.listenAssistant}</span>
                  </>
                )}
              </button>

              {/* Speed Cycle Button */}
              <button
                type="button"
                onClick={() => {
                  const nextRate = speechRate === 1.0 ? 1.2 : speechRate === 1.2 ? 0.8 : 1.0;
                  onChangeRate(nextRate);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs font-medium bg-slate-900/80 text-amber-300/90 border border-slate-700/60 hover:border-amber-500/40 transition-colors"
                title={`${t.speechSpeed}: ${speechRate}x`}
              >
                <Gauge className="w-3.5 h-3.5" />
                <span>{speechRate}x</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
