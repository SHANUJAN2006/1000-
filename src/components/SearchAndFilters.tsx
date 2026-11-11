/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, X, Heart, ThumbsUp, Compass, Dices, Layers } from 'lucide-react';
import { Language, TranslationSchema } from '../translations';
import { CATEGORIES_CONFIG } from '../proverbsData.js';

export type ActiveTab = 'all' | 'favorites' | 'liked' | 'daily';

interface SearchAndFiltersProps {
  currentLang: Language;
  t: TranslationSchema;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  favoritesCount: number;
  likedCount: number;
  totalFiltered: number;
  onPickRandom: () => void;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  currentLang,
  t,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  activeTab,
  onSelectTab,
  favoritesCount,
  likedCount,
  totalFiltered,
  onPickRandom
}) => {
  return (
    <div className="w-full space-y-4">
      
      {/* Top Search & Action Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Search Input Box */}
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-400/70">
            <Search className="w-5 h-5" />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.searchPlaceholder}
            className={`w-full pl-11 pr-10 py-3 rounded-2xl bg-[#11132b]/80 border border-amber-500/25 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 backdrop-blur-xl shadow-lg transition-all text-sm sm:text-base ${
              currentLang === 'ta' ? 'font-tamil' : currentLang === 'si' ? 'font-sinhala' : ''
            }`}
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-amber-300 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Random Proverb Discovery Button */}
        <button
          type="button"
          onClick={onPickRandom}
          className="w-full sm:w-auto px-4 py-3 rounded-2xl font-semibold text-sm bg-gradient-to-r from-amber-500/20 via-emerald-600/30 to-indigo-600/30 text-amber-200 border border-amber-400/30 hover:border-amber-400 hover:bg-amber-500/30 transition-all flex items-center justify-center gap-2 shadow-md shrink-0"
        >
          <Dices className="w-4 h-4 text-amber-300 animate-spin-slow" />
          <span>{t.randomProverbBtn}</span>
        </button>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-900/60 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          
          {/* All Proverbs Tab */}
          <button
            type="button"
            onClick={() => onSelectTab('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-bold'
                : 'bg-indigo-950/60 text-slate-300 border border-indigo-900/80 hover:text-amber-300 hover:border-amber-500/30'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t.allTab}</span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
              activeTab === 'all' ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-amber-300'
            }`}>
              1000
            </span>
          </button>

          {/* Favorites Tab */}
          <button
            type="button"
            onClick={() => onSelectTab('favorites')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'favorites'
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md shadow-rose-900/40 font-bold'
                : 'bg-indigo-950/60 text-slate-300 border border-indigo-900/80 hover:text-rose-300 hover:border-rose-500/30'
            }`}
          >
            <Heart className={`w-4 h-4 ${activeTab === 'favorites' ? 'fill-current' : 'text-rose-400'}`} />
            <span>{t.favoritesTab}</span>
            {favoritesCount > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                activeTab === 'favorites' ? 'bg-black/30 text-white' : 'bg-rose-950 text-rose-300 border border-rose-800'
              }`}>
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Top Liked Tab */}
          <button
            type="button"
            onClick={() => onSelectTab('liked')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'liked'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-md font-bold'
                : 'bg-indigo-950/60 text-slate-300 border border-indigo-900/80 hover:text-emerald-300 hover:border-emerald-500/30'
            }`}
          >
            <ThumbsUp className="w-4 h-4 text-emerald-400" />
            <span>{t.popularTab}</span>
            {likedCount > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                activeTab === 'liked' ? 'bg-slate-950/20 text-slate-950' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
              }`}>
                {likedCount}
              </span>
            )}
          </button>

          {/* Proverb of the Day Tab */}
          <button
            type="button"
            onClick={() => onSelectTab('daily')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'daily'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md font-bold'
                : 'bg-indigo-950/60 text-slate-300 border border-indigo-900/80 hover:text-purple-300 hover:border-purple-500/30'
            }`}
          >
            <Compass className="w-4 h-4 text-purple-400" />
            <span>{t.dailyTab}</span>
          </button>
        </div>

        {/* Live Filter Counter info */}
        <div className="text-xs text-slate-400 font-medium">
          {t.showingResults}: <span className="text-amber-300 font-bold">{totalFiltered}</span>
        </div>
      </div>

      {/* Category Theme Chips Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
        <button
          type="button"
          onClick={() => onSelectCategory('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
            selectedCategory === 'all'
              ? 'bg-amber-400 text-slate-950 shadow-sm'
              : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:text-amber-200 hover:border-amber-500/30'
          }`}
        >
          {t.allCategories}
        </button>

        {CATEGORIES_CONFIG.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const label = t.categories[cat.id] || (currentLang === 'ta' ? cat.tamil : currentLang === 'si' ? cat.sinhala : cat.english);

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                isSelected
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white border border-emerald-400 shadow-md shadow-emerald-950/50'
                  : 'bg-[#12142e] text-slate-300 border border-indigo-950 hover:border-emerald-500/40 hover:text-emerald-300'
              } ${currentLang === 'ta' ? 'font-tamil' : currentLang === 'si' ? 'font-sinhala' : ''}`}
            >
              {label}
            </button>
          );
        })}
      </div>

    </div>
  );
};
