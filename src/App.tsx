/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { PROVERBS_DATA, TOTAL_UNIQUE_PROVERBS } from './proverbsData.js';
import { Language, TRANSLATIONS } from './translations';
import { useSpeech } from './useSpeech';
import { Header } from './components/Header';
import { SearchAndFilters, ActiveTab } from './components/SearchAndFilters';
import { FeaturedProverb } from './components/FeaturedProverb';
import { ProverbCard, ProverbDataModel } from './components/ProverbCard';
import { Pagination } from './components/Pagination';
import { ShareModal } from './components/ShareModal';
import { Toast } from './components/Toast';
import { Heart, SearchX, Sparkles, BookOpen } from 'lucide-react';

const STORAGE_KEY_LANG = 'app_language_pref';
const STORAGE_KEY_FAVORITES = 'proverbs_favorites_v1';
const STORAGE_KEY_LIKES = 'proverbs_user_likes_v1';

export default function App() {
  // 1. Language State
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY_LANG);
      if (saved === 'ta' || saved === 'en' || saved === 'si') return saved;
    }
    return 'ta'; // Default to Tamil as requested, or user choice
  });

  const t = useMemo(() => TRANSLATIONS[lang], [lang]);

  // Update dynamic document title whenever language changes
  useEffect(() => {
    if (lang === 'ta') {
      document.title = '1000 பழமொழிகள்';
    } else if (lang === 'si') {
      document.title = 'ප්රස්ථාව පිරුළු 1000';
    } else {
      document.title = '1000 Proverbs';
    }
    localStorage.setItem(STORAGE_KEY_LANG, lang);
  }, [lang]);

  // 2. Favorites & Likes Persistence
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FAVORITES);
      return saved ? JSON.parse(saved) : [1, 2, 3]; // initial sample favorites
    } catch {
      return [1, 2, 3];
    }
  });

  const [userLikes, setUserLikes] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LIKES);
      return saved ? JSON.parse(saved) : [1, 5, 10];
    } catch {
      return [1, 5, 10];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LIKES, JSON.stringify(userLikes));
  }, [userLikes]);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const toggleLike = useCallback((id: number) => {
    setUserLikes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  // Compute total like count per proverb (deterministic base + user like)
  const getLikesCount = useCallback(
    (id: number) => {
      // Deterministic pseudo-organic count
      const baseCount = ((id * 37 + 19) % 85) + 12;
      return userLikes.includes(id) ? baseCount + 1 : baseCount;
    },
    [userLikes]
  );

  // 3. Navigation & Filtering State
  const [activeTab, setActiveTab] = useState<ActiveTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 4. Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Reset to page 1 on query/tab/category change
  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // 5. Featured / Daily Proverb
  const [featuredId, setFeaturedId] = useState<number>(() => {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
    );
    return (dayOfYear % 1000) + 1;
  });

  const featuredProverb = useMemo(() => {
    return (PROVERBS_DATA as ProverbDataModel[]).find((p) => p.id === featuredId) || PROVERBS_DATA[0];
  }, [featuredId]);

  const pickRandomFeatured = () => {
    const randomId = Math.floor(Math.random() * 1000) + 1;
    setFeaturedId(randomId);
    showToast(`${t.proverbCardId}${randomId}`);
  };

  // 6. Voice Text-To-Speech Hook
  const { isSpeaking, activeId, rate, setRate, speak, stop } = useSpeech(lang);

  const handleToggleGlobalSpeech = () => {
    const activeContent =
      lang === 'ta'
        ? featuredProverb.tamil
        : lang === 'si'
        ? featuredProverb.sinhala
        : featuredProverb.english;
    const speechScript = `${activeContent.proverb}. ${activeContent.meaning}`;
    speak(speechScript, 'global');
  };

  // 7. Toast & Share Modal
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [shareProverb, setShareProverb] = useState<ProverbDataModel | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // 8. Filtered Proverbs Computation
  const filteredProverbs = useMemo(() => {
    let list = PROVERBS_DATA as ProverbDataModel[];

    // Tab filter
    if (activeTab === 'favorites') {
      const favSet = new Set(favorites);
      list = list.filter((p) => favSet.has(p.id));
    } else if (activeTab === 'liked') {
      const likedSet = new Set(userLikes);
      list = list.filter((p) => likedSet.has(p.id));
    } else if (activeTab === 'daily') {
      return [featuredProverb];
    }

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Search query filter
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      // Check numeric query like #42 or 42
      const idMatch = query.replace('#', '');
      const parsedId = parseInt(idMatch, 10);
      const isExactId = !isNaN(parsedId) && parsedId >= 1 && parsedId <= 1000 && String(parsedId) === idMatch;

      list = list.filter((p) => {
        if (isExactId && p.id === parsedId) return true;

        if (lang === 'ta') {
          return (
            p.tamil.proverb.toLowerCase().includes(query) ||
            p.tamil.meaning.toLowerCase().includes(query) ||
            p.tamil.categoryName.toLowerCase().includes(query) ||
            p.id.toString() === query
          );
        } else if (lang === 'si') {
          return (
            p.sinhala.proverb.toLowerCase().includes(query) ||
            p.sinhala.meaning.toLowerCase().includes(query) ||
            p.sinhala.categoryName.toLowerCase().includes(query) ||
            p.id.toString() === query
          );
        } else {
          return (
            p.english.proverb.toLowerCase().includes(query) ||
            p.english.meaning.toLowerCase().includes(query) ||
            p.english.categoryName.toLowerCase().includes(query) ||
            p.id.toString() === query
          );
        }
      });
    }

    return list;
  }, [activeTab, favorites, userLikes, featuredProverb, selectedCategory, searchQuery, lang]);

  // Paginated records
  const totalPages = Math.ceil(filteredProverbs.length / itemsPerPage);
  const paginatedProverbs = useMemo(() => {
    if (activeTab === 'daily') return [featuredProverb];
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProverbs.slice(start, start + itemsPerPage);
  }, [filteredProverbs, currentPage, itemsPerPage, activeTab, featuredProverb]);

  return (
    <div className="min-h-screen bg-[#080914] text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Dynamic Header */}
      <Header
        currentLang={lang}
        onSelectLang={setLang}
        t={t}
        totalCount={TOTAL_UNIQUE_PROVERBS}
        isSpeakingGlobal={isSpeaking && activeId === 'global'}
        onToggleGlobalSpeech={handleToggleGlobalSpeech}
        speechRate={rate}
        onChangeRate={setRate}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Featured Daily Proverb Hero Card (shown in All & Daily tabs) */}
        {(activeTab === 'all' || activeTab === 'daily') && !searchQuery && selectedCategory === 'all' && (
          <FeaturedProverb
            proverb={featuredProverb}
            currentLang={lang}
            t={t}
            isFavorited={favorites.includes(featuredProverb.id)}
            isLiked={userLikes.includes(featuredProverb.id)}
            likesCount={getLikesCount(featuredProverb.id)}
            isSpeaking={isSpeaking && activeId === 'global'}
            onToggleFavorite={toggleFavorite}
            onToggleLike={toggleLike}
            onSpeak={speak}
            onShare={setShareProverb}
            onPickRandom={pickRandomFeatured}
            onShowToast={showToast}
          />
        )}

        {/* Search, Tabs, and Category Filters */}
        <SearchAndFilters
          currentLang={lang}
          t={t}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          favoritesCount={favorites.length}
          likedCount={userLikes.length}
          totalFiltered={filteredProverbs.length}
          onPickRandom={pickRandomFeatured}
        />

        {/* Proverbs Grid */}
        {paginatedProverbs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {paginatedProverbs.map((item) => (
              <ProverbCard
                key={item.id}
                proverb={item}
                currentLang={lang}
                t={t}
                isFavorited={favorites.includes(item.id)}
                isLiked={userLikes.includes(item.id)}
                likesCount={getLikesCount(item.id)}
                isSpeaking={isSpeaking && activeId === item.id}
                onToggleFavorite={toggleFavorite}
                onToggleLike={toggleLike}
                onSpeak={speak}
                onShare={setShareProverb}
                onShowToast={showToast}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-3xl p-12 text-center glass-panel border-amber-500/20 max-w-lg mx-auto">
            {activeTab === 'favorites' ? (
              <>
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-rose-950/60 text-rose-400 border border-rose-800/60 flex items-center justify-center">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t.favoritesTab}</h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  {t.emptyFavorites}
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className="px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all"
                >
                  {t.browseCatalog}
                </button>
              </>
            ) : (
              <>
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-950/80 text-amber-400 border border-indigo-800/80 flex items-center justify-center">
                  <SearchX className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t.noResultsTitle}</h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  {t.noResultsSubtitle}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="px-5 py-2.5 rounded-xl font-bold text-sm bg-indigo-900/80 text-amber-200 border border-amber-500/30 hover:border-amber-400 hover:text-white transition-all"
                >
                  {t.resetFilters}
                </button>
              </>
            )}
          </div>
        )}

        {/* Pagination Bar */}
        {activeTab !== 'daily' && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredProverbs.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
            t={t}
            currentLang={lang}
          />
        )}

      </main>

      {/* Regal Footer */}
      <footer className="mt-16 border-t border-indigo-950/80 bg-[#070812] py-8 text-center text-xs text-slate-400/80">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-amber-400/80 font-medium">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>1,000 Unique Authentic Proverbs • தமிழ் | English | සිංහල</span>
          </div>

          <div className="text-slate-500">
            {t.statsUnique} • Web Speech TTS & LocalStorage
          </div>
        </div>
      </footer>

      {/* Share Proverb Modal */}
      <ShareModal
        proverb={shareProverb}
        isOpen={Boolean(shareProverb)}
        onClose={() => setShareProverb(null)}
        currentLang={lang}
        t={t}
        onShowToast={showToast}
      />

      {/* Action Toast */}
      <Toast message={toastMessage} />

    </div>
  );
}
