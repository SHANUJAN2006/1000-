// Script to compile the complete standalone single-file index.html
// Containing all 1,000 proverbs, Tailwind CDN, vanilla JS, SVG icons, speech synthesis, search, and storage

import fs from 'fs';
import path from 'path';
import { PROVERBS_DATA, CATEGORIES_CONFIG } from '../src/proverbsData.js';

console.log(`Loaded ${PROVERBS_DATA.length} proverbs. Compiling standalone index.html...`);

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>1000 Proverbs</title>
  <meta name="description" content="1000 Authentic Cultural Proverbs across Tamil, English, and Sinhala with Voice Audio, Search, and Favorites." />
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            royalGold: {
              300: '#FDE68A',
              400: '#FCD34D',
              500: '#F59E0B',
              600: '#D97706',
              700: '#B45309',
            },
            deepIndigo: {
              900: '#0F1128',
              950: '#080914',
            }
          }
        }
      }
    }
  </script>

  <!-- Google Fonts for English, Tamil & Sinhala -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Outfit:wght@300;400;500;600;700;800&family=Noto+Sans+Tamil:wght@400;500;600;700;800&family=Noto+Sans+Sinhala:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

  <style>
    :root {
      --font-sans: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --font-serif: 'Cinzel', serif;
      --font-tamil: 'Noto Sans Tamil', sans-serif;
      --font-sinhala: 'Noto Sans Sinhala', sans-serif;
    }

    body {
      font-family: var(--font-sans);
      background-color: #080914;
      color: #f1f5f9;
      overflow-x: hidden;
    }

    .font-tamil { font-family: var(--font-tamil); }
    .font-sinhala { font-family: var(--font-sinhala); }
    .font-serif-royal { font-family: var(--font-serif); }

    .glass-card {
      background: linear-gradient(135deg, rgba(26, 29, 64, 0.72) 0%, rgba(15, 17, 38, 0.88) 100%);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid rgba(212, 175, 55, 0.16);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .glass-card:hover {
      border-color: rgba(212, 175, 55, 0.45);
      box-shadow: 0 12px 36px -8px rgba(212, 175, 55, 0.15), 0 0 20px 0 rgba(16, 185, 129, 0.1);
      transform: translateY(-2px);
    }

    .text-gold-gradient {
      background: linear-gradient(135deg, #fef08a 0%, #f59e0b 50%, #d97706 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    ::-webkit-scrollbar { width: 8px; height: 8px; }
    ::-webkit-scrollbar-track { background: #080914; }
    ::-webkit-scrollbar-thumb { background: #232752; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #d4af37; }

    @keyframes soundwave {
      0%, 100% { height: 4px; }
      50% { height: 18px; }
    }
    .wave-1 { animation: soundwave 0.8s ease-in-out infinite; }
    .wave-2 { animation: soundwave 1.1s ease-in-out infinite 0.2s; }
    .wave-3 { animation: soundwave 0.7s ease-in-out infinite 0.4s; }
  </style>
</head>
<body class="bg-[#080914] text-slate-100 min-h-screen flex flex-col antialiased selection:bg-amber-500/30 selection:text-amber-200">

  <div id="app" class="flex-1 flex flex-col"></div>

  <!-- Raw Data & Self-Contained Application Logic -->
  <script>
    // Embedded 1,000 Authenticated Cultural Proverbs
    const PROVERBS_DATA = ${JSON.stringify(PROVERBS_DATA)};
    const CATEGORIES_CONFIG = ${JSON.stringify(CATEGORIES_CONFIG)};

    // UI Translations for Tamil, English, and Sinhala
    const TRANSLATIONS = {
      en: {
        appTitle: "1000 Proverbs",
        appSubtitle: "A Royal Treasury of 1,000 Authentic Cultural Proverbs & Living Wisdom",
        badgeLoaded: "1000 / 1000 Unique Proverbs",
        allTab: "All Proverbs",
        favoritesTab: "My Favorites",
        popularTab: "Top Liked",
        dailyTab: "Proverb of the Day",
        searchPlaceholder: "Search by proverb, meaning, theme, or ID (#1 - #1000)...",
        allCategories: "All Themes",
        listenAssistant: "Voice Assistant",
        speaking: "Playing Audio...",
        stopAudio: "Stop Voice",
        speechSpeed: "Voice Speed",
        todayWisdom: "Featured Cultural Wisdom",
        meaningLabel: "Cultural Meaning & Life Insight",
        listenCard: "Listen",
        listenCardStop: "Pause",
        like: "Like",
        favorite: "Bookmark",
        favorited: "Bookmarked",
        copyText: "Copy Proverb",
        copiedToast: "Proverb copied to clipboard!",
        shareCard: "Share Card",
        shareModalTitle: "Share Proverb Card",
        close: "Close",
        showingResults: "Showing",
        noResultsTitle: "No matching proverbs found",
        noResultsSubtitle: "Try modifying your search query or choosing another category.",
        resetFilters: "Clear All Filters",
        page: "Page",
        of: "of",
        prevPage: "Previous",
        nextPage: "Next",
        firstPage: "First",
        lastPage: "Last",
        perPage: "Per Page",
        randomProverbBtn: "Discover Random",
        downloadBtn: "Download Standalone HTML (Offline Ready)",
        categories: {
          wisdom: "Wisdom & Knowledge",
          effort: "Hard Work & Diligence",
          speech: "Speech & Truth",
          caution: "Caution & Foresight",
          patience: "Patience & Timing",
          character: "Character & Humility",
          family: "Friendship & Unity",
          wealth: "Wealth & Contentment",
          justice: "Justice & Karma",
          nature: "Nature & Life Lessons"
        },
        emptyFavorites: "You have not saved any favorite proverbs yet. Click the heart icon on any card to bookmark it here!"
      },
      ta: {
        appTitle: "1000 பழமொழிகள்",
        appSubtitle: "1,000 தமிழ் பாரம்பரிய வாழ்வியல் பழமொழிகளின் பொற்களஞ்சியம்",
        badgeLoaded: "1000 / 1000 தனித்துவ பழமொழிகள்",
        allTab: "அனைத்து பழமொழிகள்",
        favoritesTab: "என் விருப்பங்கள்",
        popularTab: "அதிக விருப்பங்கள்",
        dailyTab: "இன்றைய பொன்மொழி",
        searchPlaceholder: "பழமொழி, விளக்கம், பொருள் அல்லது எண் கொண்டு தேடுக (#1 - #1000)...",
        allCategories: "அனைத்துப் பிரிவுகள்",
        listenAssistant: "குரல் உதவியாளர்",
        speaking: "ஒலிக்கிறது...",
        stopAudio: "நிறுத்து",
        speechSpeed: "வேகம்",
        todayWisdom: "இன்றைய சிறப்புப் பழமொழி",
        meaningLabel: "பண்பாட்டு விளக்கம் & வாழ்வியல் பாடம்",
        listenCard: "கேள்",
        listenCardStop: "நிறுத்து",
        like: "விருப்பம்",
        favorite: "சேமி",
        favorited: "சேமிக்கப்பட்டது",
        copyText: "நகலெடு",
        copiedToast: "பழமொழி வெற்றிகரமாக நகலெடுக்கப்பட்டது!",
        shareCard: "பகிர்",
        shareModalTitle: "பழமொழியைப் பகிர்க",
        close: "மூடு",
        showingResults: "காட்டப்படுவது",
        noResultsTitle: "பழமொழிகள் எதுவும் கிடைக்கவில்லை",
        noResultsSubtitle: "வேறு சொல் அல்லது பிரிவைத் தேர்ந்தெடுத்து மீண்டும் முயலவும்.",
        resetFilters: "வடிகட்டிகளை நீக்கு",
        page: "பக்கம்",
        of: "இல்",
        prevPage: "முந்தையது",
        nextPage: "அடுத்தது",
        firstPage: "முதல்",
        lastPage: "கடைசி",
        perPage: "பக்கத்திற்கு",
        randomProverbBtn: "புதிய பழமொழி",
        downloadBtn: "முழு ஆஃப்லைன் HTML கோப்பைப் பதிவிறக்கு",
        categories: {
          wisdom: "ஞானமும் விவேகமும்",
          effort: "முயற்சியும் உழைப்பும்",
          speech: "சொல்லும் வாய்மையும்",
          caution: "எச்சரிக்கையும் விழிப்பும்",
          patience: "பொறுமையும் காலமும்",
          character: "பண்பும் ஒழுக்கமும்",
          family: "நட்பும் சுற்றமும்",
          wealth: "செல்வமும் மனநிறைவும்",
          justice: "நீதியும் அறமும்",
          nature: "இயற்கையும் வாழ்வியலும்"
        },
        emptyFavorites: "நீங்கள் இன்னும் எந்தப் பழமொழியையும் விருப்பப் பட்டியலில் சேர்க்கவில்லை. விருப்பமான பழமொழிகளில் உள்ள இதயக் குறியீட்டை அழுத்தி இங்கு சேமிக்கலாம்!"
      },
      si: {
        appTitle: "ප්රස්ථාව පිරුළු 1000",
        appSubtitle: "අව්‍යාජ සිංහල ප්‍රස්ථාව පිරුළු 1000 ක ඓතිහාසික ජනශ්‍රැති සංග්‍රහය",
        badgeLoaded: "පිරුළු 1000 / 1000 සුවිශේෂී",
        allTab: "සියලු පිරුළු",
        favoritesTab: "මගේ ප්‍රියතමයන්",
        popularTab: "ජනප්‍රියම පිරුළු",
        dailyTab: "දවසේ පිරුළ",
        searchPlaceholder: "පිරුළ, අර්ථය, තේමාව හෝ අංකය (#1 - #1000) මගින් සොයන්න...",
        allCategories: "සියලු තේමා",
        listenAssistant: "හඬ සහායකයා",
        speaking: "හඬ වාදනය වේ...",
        stopAudio: "නවත්වන්න",
        speechSpeed: "හඬ වේගය",
        todayWisdom: "විශේෂිත සාම්ප්‍රදායික පිරුළ",
        meaningLabel: "සංස්කෘතික අර්ථය & ජීවන උපදේශය",
        listenCard: "අසන්න",
        listenCardStop: "නවත්වන්න",
        like: "කැමැත්ත",
        favorite: "සුරකින්න",
        favorited: "සුරකින ලදී",
        copyText: "පිටපත් කරන්න",
        copiedToast: "පිරුළ සාර්ථකව පිටපත් කරගන්නා ලදී!",
        shareCard: "බෙදාගන්න",
        shareModalTitle: "පිරුළ බෙදාගන්න",
        close: "වසන්න",
        showingResults: "පෙන්වන්නේ",
        noResultsTitle: "ගැළපෙන පිරුළු හමුනොවීය",
        noResultsSubtitle: "වෙනත් වචනයක් යොදා සොයන්න හෝ තේමාව වෙනස් කර බලන්න.",
        resetFilters: "පෙරහන් ඉවත් කරන්න",
        page: "පිටුව",
        of: "න්",
        prevPage: "පෙර",
        nextPage: "ඊළඟ",
        firstPage: "මුලට",
        lastPage: "අගට",
        perPage: "පිටුවකට",
        randomProverbBtn: "අහඹු පිරුළක්",
        downloadBtn: "සම්පූර්ණ නොබැඳි HTML ගොනුව බාගන්න",
        categories: {
          wisdom: "ප්‍රඥාව සහ නුවණ",
          effort: "උත්සාහය සහ කැපවීම",
          speech: "කථාව සහ සත්‍යය",
          caution: "අවධානය සහ ප්‍රවේශම",
          patience: "ඉවසීම සහ කාලය",
          character: "ගුණධර්ම සහ විනය",
          family: "මිත්‍රත්වය සහ සහයෝගය",
          wealth: "ධනය සහ සෑහීම",
          justice: "කර්මය සහ සාධාරණත්වය",
          nature: "සොබාදහම සහ ජීවිතය"
        },
        emptyFavorites: "ඔබ තවමත් කිසිදු පිරුළක් ප්‍රියතම ලැයිස්තුවට එක්කර නැත. ඕනෑම කාඩ්පතක ඇති හදවත් සලකුණ ක්ලික් කර මෙහි සුරකින්න!"
      }
    };

    // State
    let currentLang = localStorage.getItem('app_language_pref') || 'ta';
    let favorites = JSON.parse(localStorage.getItem('proverbs_favorites_v1') || '[1, 2, 3]');
    let userLikes = JSON.parse(localStorage.getItem('proverbs_user_likes_v1') || '[1, 5, 10]');
    let activeTab = 'all';
    let searchQuery = '';
    let selectedCategory = 'all';
    let currentPage = 1;
    let itemsPerPage = 20;
    let speechRate = 1.0;
    let activeSpeakingId = null;
    let toastTimeout = null;
    let activeModalProverbId = null;

    // Deterministic daily proverb ID
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    let featuredId = (dayOfYear % 1000) + 1;

    // Helpers
    function getT() {
      return TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    }

    function setLanguage(lang) {
      currentLang = lang;
      localStorage.setItem('app_language_pref', lang);
      document.title = lang === 'ta' ? '1000 பழமொழிகள்' : lang === 'si' ? 'ප්රස්ථාව පිරුළු 1000' : '1000 Proverbs';
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      activeSpeakingId = null;
      renderApp();
    }

    function getLikesCount(id) {
      const base = ((id * 37 + 19) % 85) + 12;
      return userLikes.includes(id) ? base + 1 : base;
    }

    function toggleLike(id) {
      if (userLikes.includes(id)) {
        userLikes = userLikes.filter(x => x !== id);
      } else {
        userLikes.push(id);
      }
      localStorage.setItem('proverbs_user_likes_v1', JSON.stringify(userLikes));
      renderApp();
    }

    function toggleFavorite(id) {
      if (favorites.includes(id)) {
        favorites = favorites.filter(x => x !== id);
      } else {
        favorites.push(id);
      }
      localStorage.setItem('proverbs_favorites_v1', JSON.stringify(favorites));
      renderApp();
    }

    function showToast(msg) {
      const el = document.getElementById('toast-container');
      if (!el) return;
      el.innerHTML = \`
        <div class="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-slate-950 font-bold text-sm shadow-2xl border border-emerald-300">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          <span>\${msg}</span>
        </div>
      \`;
      el.classList.remove('hidden');
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        el.classList.add('hidden');
      }, 2500);
    }

    function copyProverbText(id) {
      const p = PROVERBS_DATA.find(x => x.id === id);
      if (!p) return;
      const t = getT();
      const content = currentLang === 'ta' ? p.tamil : currentLang === 'si' ? p.sinhala : p.english;
      const text = \`"\${content.proverb}"\\n\\n\${t.meaningLabel}:\\n\${content.meaning}\\n\\n— 1000 Proverbs (#\${p.id})\`;
      navigator.clipboard.writeText(text);
      showToast(t.copiedToast);
    }

    function openShareModal(id) {
      activeModalProverbId = id;
      renderApp();
    }

    function closeShareModal() {
      activeModalProverbId = null;
      renderApp();
    }

    // Web Speech API Voice Controller
    function speakText(text, id) {
      if (!('speechSynthesis' in window)) {
        showToast("Speech synthesis not supported in this browser.");
        return;
      }
      if (activeSpeakingId === id) {
        window.speechSynthesis.cancel();
        activeSpeakingId = null;
        renderApp();
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = speechRate;
      const langCodes = {
        en: ['en-US', 'en-GB', 'en'],
        ta: ['ta-IN', 'ta-LK', 'ta'],
        si: ['si-LK', 'si']
      };
      const targets = langCodes[currentLang] || ['en-US'];
      utterance.lang = targets[0];
      const voices = window.speechSynthesis.getVoices();
      for (const code of targets) {
        const found = voices.find(v => v.lang.toLowerCase().replace('_', '-').startsWith(code.toLowerCase()));
        if (found) { utterance.voice = found; break; }
      }
      utterance.onstart = () => {
        activeSpeakingId = id;
        renderApp();
      };
      utterance.onend = utterance.onerror = () => {
        activeSpeakingId = null;
        renderApp();
      };
      window.speechSynthesis.speak(utterance);
    }

    function downloadSelfAsHtml() {
      // Create a clean standalone clone of this file for the user
      const fullHtml = document.documentElement.outerHTML;
      const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = '1000-proverbs-standalone.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast("Downloaded 1000-proverbs-standalone.html! You can open it in any browser offline.");
    }

    // Filter Logic
    function getFilteredProverbs() {
      let list = PROVERBS_DATA;
      if (activeTab === 'favorites') {
        const favSet = new Set(favorites);
        list = list.filter(p => favSet.has(p.id));
      } else if (activeTab === 'liked') {
        const likedSet = new Set(userLikes);
        list = list.filter(p => likedSet.has(p.id));
      } else if (activeTab === 'daily') {
        return [PROVERBS_DATA.find(p => p.id === featuredId) || PROVERBS_DATA[0]];
      }

      if (selectedCategory !== 'all') {
        list = list.filter(p => p.category === selectedCategory);
      }

      const q = searchQuery.trim().toLowerCase();
      if (q) {
        const idMatch = q.replace('#', '');
        const parsedId = parseInt(idMatch, 10);
        const isExactId = !isNaN(parsedId) && parsedId >= 1 && parsedId <= 1000 && String(parsedId) === idMatch;

        list = list.filter(p => {
          if (isExactId && p.id === parsedId) return true;
          const c = currentLang === 'ta' ? p.tamil : currentLang === 'si' ? p.sinhala : p.english;
          return c.proverb.toLowerCase().includes(q) ||
                 c.meaning.toLowerCase().includes(q) ||
                 c.categoryName.toLowerCase().includes(q) ||
                 p.id.toString() === q;
        });
      }
      return list;
    }

    // Main Renderer
    function renderApp() {
      const t = getT();
      const allFiltered = getFilteredProverbs();
      const totalPages = Math.max(1, Math.ceil(allFiltered.length / itemsPerPage));
      if (currentPage > totalPages) currentPage = totalPages;

      const startIndex = (currentPage - 1) * itemsPerPage;
      const paginated = activeTab === 'daily' ? allFiltered : allFiltered.slice(startIndex, startIndex + itemsPerPage);
      const featured = PROVERBS_DATA.find(p => p.id === featuredId) || PROVERBS_DATA[0];
      const featuredContent = currentLang === 'ta' ? featured.tamil : currentLang === 'si' ? featured.sinhala : featured.english;
      const isGlobalSpeaking = activeSpeakingId === 'global';

      const fontClass = currentLang === 'ta' ? 'font-tamil' : currentLang === 'si' ? 'font-sinhala' : 'font-serif-royal';
      const textFontClass = currentLang === 'ta' ? 'font-tamil' : currentLang === 'si' ? 'font-sinhala' : '';

      document.getElementById('app').innerHTML = \`
        <!-- Header -->
        <header class="relative w-full border-b border-amber-500/20 bg-[#0c0d1e]/90 backdrop-blur-2xl z-30 shadow-2xl">
          <div class="h-1 w-full bg-gradient-to-r from-amber-500 via-emerald-400 to-indigo-500"></div>
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div class="flex flex-col md:flex-row items-center justify-between gap-5">
              
              <!-- Logo & Dynamic Title -->
              <div class="flex items-center gap-4 text-center md:text-left">
                <div class="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/20 via-indigo-900/60 to-emerald-500/20 border border-amber-400/40 shadow-lg">
                  <svg class="w-8 h-8 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.735H5.81a1 1 0 0 1-.956-.735L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/></svg>
                  <div class="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
                  <div class="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full"></div>
                </div>

                <div>
                  <div class="flex items-center justify-center md:justify-start gap-2.5 flex-wrap">
                    <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white \${fontClass}">
                      <span class="text-gold-gradient">\${t.appTitle}</span>
                    </h1>
                    <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/70 text-emerald-300 border border-emerald-500/40">
                      <span>1000 / 1000</span>
                    </div>
                  </div>
                  <p class="text-xs sm:text-sm text-slate-300/80 mt-1 max-w-xl">\${t.appSubtitle}</p>
                </div>
              </div>

              <!-- Controls -->
              <div class="flex flex-wrap items-center justify-center md:justify-end gap-3 w-full md:w-auto">
                
                <!-- Language Switcher -->
                <div class="inline-flex p-1 rounded-xl bg-indigo-950/80 border border-amber-500/30">
                  <button onclick="setLanguage('ta')" class="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all \${currentLang === 'ta' ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold' : 'text-slate-300 hover:text-amber-300'}">தமிழ்</button>
                  <button onclick="setLanguage('en')" class="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all \${currentLang === 'en' ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold' : 'text-slate-300 hover:text-amber-300'}">English</button>
                  <button onclick="setLanguage('si')" class="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all \${currentLang === 'si' ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold' : 'text-slate-300 hover:text-amber-300'}">සිංහල</button>
                </div>

                <!-- Global Voice Assistant -->
                <div class="flex items-center gap-2">
                  <button onclick="speakText('\${featuredContent.proverb.replace(/'/g, "\\\\'")}. \${featuredContent.meaning.replace(/'/g, "\\\\'")}', 'global')"
                    class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all \${isGlobalSpeaking ? 'bg-emerald-600 text-white border-emerald-400 animate-pulse' : 'bg-gradient-to-r from-indigo-900 to-purple-950 text-amber-200 border-amber-500/40 hover:border-amber-400'}">
                    <svg class="w-4 h-4 \${isGlobalSpeaking ? 'text-white' : 'text-amber-300'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
                    <span>\${isGlobalSpeaking ? t.stopAudio : t.listenAssistant}</span>
                  </button>

                  <!-- Speed -->
                  <button onclick="speechRate = speechRate === 1.0 ? 1.2 : speechRate === 1.2 ? 0.8 : 1.0; renderApp();"
                    class="px-2.5 py-2 rounded-xl text-xs font-medium bg-slate-900 text-amber-300 border border-slate-700 hover:border-amber-500/40" title="\${t.speechSpeed}">
                    \${speechRate}x
                  </button>

                  <!-- Direct Download Button for Standalone Offline HTML -->
                  <button onclick="downloadSelfAsHtml()"
                    class="px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 hover:brightness-110 transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                    title="\${t.downloadBtn}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                    <span>HTML</span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </header>

        <!-- Main Body -->
        <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          
          <!-- Daily Wisdom Card -->
          \${(activeTab === 'all' || activeTab === 'daily') && !searchQuery && selectedCategory === 'all' ? \`
            <section class="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#181938] via-[#10122e] to-[#0a0b1d] border-2 border-amber-500/35 shadow-2xl">
              <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/25 border border-amber-400/40 text-amber-200 text-xs sm:text-sm font-bold">
                  <span>\${t.todayWisdom}</span>
                  <span class="text-amber-400/80 font-normal">#\${featured.id}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/70 text-emerald-300 border border-emerald-500/40">
                    \${t.categories[featured.category] || featuredContent.categoryName}
                  </span>
                  <button onclick="featuredId = Math.floor(Math.random() * 1000) + 1; renderApp();" class="p-1.5 rounded-xl text-slate-400 hover:text-amber-300" title="\${t.randomProverbBtn}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                  </button>
                </div>
              </div>

              <blockquote class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white \${fontClass} my-4">
                <span class="text-gold-gradient">"\${featuredContent.proverb}"</span>
              </blockquote>

              <div class="mt-5 p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/40">
                <h3 class="text-xs uppercase tracking-wider font-bold text-emerald-400 mb-1">\${t.meaningLabel}</h3>
                <p class="text-sm sm:text-base text-slate-200 \${textFontClass}">\${featuredContent.meaning}</p>
              </div>

              <div class="mt-6 pt-4 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-3">
                <button onclick="speakText('\${featuredContent.proverb.replace(/'/g, "\\\\'")}. \${featuredContent.meaning.replace(/'/g, "\\\\'")}', 'global')"
                  class="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold \${isGlobalSpeaking ? 'bg-emerald-500 text-slate-950' : 'bg-amber-500 text-slate-950 hover:bg-amber-400'}">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
                  <span>\${isGlobalSpeaking ? t.stopAudio : t.listenAssistant}</span>
                </button>

                <div class="flex items-center gap-2">
                  <button onclick="toggleLike(\${featured.id})" class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold \${userLikes.includes(featured.id) ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50' : 'bg-indigo-950/80 text-slate-300 border border-indigo-800'}">
                    <svg class="w-4 h-4 \${userLikes.includes(featured.id) ? 'fill-current text-emerald-400' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                    <span>\${getLikesCount(featured.id)}</span>
                  </button>

                  <button onclick="toggleFavorite(\${featured.id})" class="p-2 rounded-xl text-xs sm:text-sm \${favorites.includes(featured.id) ? 'bg-rose-950 text-rose-300 border border-rose-500' : 'bg-indigo-950/80 text-slate-300 border border-indigo-800'}">
                    <svg class="w-4 h-4 \${favorites.includes(featured.id) ? 'fill-rose-400 text-rose-400' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  </button>

                  <button onclick="copyProverbText(\${featured.id})" class="p-2 rounded-xl bg-indigo-950/80 text-slate-300 border border-indigo-800 hover:text-amber-300" title="\${t.copyText}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                  </button>

                  <button onclick="openShareModal(\${featured.id})" class="p-2 rounded-xl bg-indigo-950/80 text-slate-300 border border-indigo-800 hover:text-amber-300" title="\${t.shareCard}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
                  </button>
                </div>
              </div>
            </section>
          \` : ''}

          <!-- Search & Filter Controls -->
          <div class="space-y-4">
            <div class="flex flex-col sm:flex-row items-center gap-3">
              <div class="relative flex-1 w-full">
                <input type="text" id="search-input" value="\${searchQuery}" oninput="searchQuery = this.value; currentPage = 1; renderApp();"
                  placeholder="\${t.searchPlaceholder}"
                  class="w-full pl-11 pr-10 py-3 rounded-2xl bg-[#11132b]/80 border border-amber-500/25 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 text-sm sm:text-base \${textFontClass}" />
                <svg class="w-5 h-5 absolute left-3.5 top-3.5 text-amber-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                \${searchQuery ? \`<button onclick="searchQuery = ''; currentPage = 1; renderApp();" class="absolute right-3.5 top-3.5 text-slate-400 hover:text-white">&times;</button>\` : ''}
              </div>

              <button onclick="featuredId = Math.floor(Math.random() * 1000) + 1; renderApp(); showToast('Proverb #' + featuredId);"
                class="w-full sm:w-auto px-4 py-3 rounded-2xl font-semibold text-sm bg-indigo-950 text-amber-200 border border-amber-400/30 hover:border-amber-400 flex items-center justify-center gap-2 shrink-0">
                <svg class="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
                <span>\${t.randomProverbBtn}</span>
              </button>
            </div>

            <!-- Tabs -->
            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-900/60 pb-3">
              <div class="flex flex-wrap items-center gap-2">
                <button onclick="activeTab = 'all'; currentPage = 1; renderApp();"
                  class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold \${activeTab === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-indigo-950 text-slate-300 border border-indigo-900'}">
                  <span>\${t.allTab}</span>
                  <span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-800 text-amber-300">1000</span>
                </button>

                <button onclick="activeTab = 'favorites'; currentPage = 1; renderApp();"
                  class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold \${activeTab === 'favorites' ? 'bg-rose-600 text-white font-bold' : 'bg-indigo-950 text-slate-300 border border-indigo-900'}">
                  <span>\${t.favoritesTab}</span>
                  <span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-950 text-rose-300">\${favorites.length}</span>
                </button>

                <button onclick="activeTab = 'liked'; currentPage = 1; renderApp();"
                  class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold \${activeTab === 'liked' ? 'bg-emerald-600 text-slate-950 font-bold' : 'bg-indigo-950 text-slate-300 border border-indigo-900'}">
                  <span>\${t.popularTab}</span>
                  <span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950 text-emerald-300">\${userLikes.length}</span>
                </button>

                <button onclick="activeTab = 'daily'; currentPage = 1; renderApp();"
                  class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold \${activeTab === 'daily' ? 'bg-purple-600 text-white font-bold' : 'bg-indigo-950 text-slate-300 border border-indigo-900'}">
                  <span>\${t.dailyTab}</span>
                </button>
              </div>

              <div class="text-xs text-slate-400 font-medium">
                \${t.showingResults}: <span class="text-amber-300 font-bold">\${allFiltered.length}</span>
              </div>
            </div>

            <!-- Categories -->
            <div class="flex items-center gap-1.5 overflow-x-auto pb-2">
              <button onclick="selectedCategory = 'all'; currentPage = 1; renderApp();"
                class="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap \${selectedCategory === 'all' ? 'bg-amber-400 text-slate-950' : 'bg-slate-900 text-slate-300 border border-slate-800'}">
                \${t.allCategories}
              </button>
              \${CATEGORIES_CONFIG.map(cat => {
                const isSel = selectedCategory === cat.id;
                const catLabel = t.categories[cat.id] || cat.english;
                return \`<button onclick="selectedCategory = '\${cat.id}'; currentPage = 1; renderApp();"
                  class="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap \${textFontClass} \${isSel ? 'bg-emerald-600 text-white' : 'bg-[#12142e] text-slate-300 border border-indigo-950'}">\${catLabel}</button>\`;
              }).join('')}
            </div>
          </div>

          <!-- Proverbs Cards Grid -->
          \${paginated.length > 0 ? \`
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              \${paginated.map(p => {
                const content = currentLang === 'ta' ? p.tamil : currentLang === 'si' ? p.sinhala : p.english;
                const isCardSpeaking = activeSpeakingId === p.id;
                const isFav = favorites.includes(p.id);
                const isLike = userLikes.includes(p.id);
                const likes = getLikesCount(p.id);
                const catTitle = t.categories[p.category] || content.categoryName;

                return \`
                  <article class="glass-card rounded-2xl p-6 flex flex-col justify-between \${isCardSpeaking ? 'border-2 border-emerald-400 bg-[#1b1740]' : ''}">
                    <div>
                      <div class="flex items-center justify-between gap-2 mb-4">
                        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          <span>#\${p.id}</span>
                        </div>
                        <div class="px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                          \${catTitle}
                        </div>
                      </div>

                      <div class="my-2 pl-3 border-l-2 border-amber-500/40">
                        <h2 class="text-lg sm:text-xl font-bold leading-relaxed text-amber-50 \${fontClass}">
                          "\${content.proverb}"
                        </h2>
                      </div>

                      <div class="mt-4 pt-3 border-t border-slate-800">
                        <span class="text-[11px] uppercase tracking-wider font-semibold text-emerald-400 block mb-1">\${t.meaningLabel}</span>
                        <p class="text-xs sm:text-sm text-slate-300 \${textFontClass}">\${content.meaning}</p>
                      </div>
                    </div>

                    <div class="mt-6 pt-3 border-t border-indigo-900/40 flex items-center justify-between gap-2 flex-wrap">
                      <button onclick="speakText('\${content.proverb.replace(/'/g, "\\\\'")}. \${content.meaning.replace(/'/g, "\\\\'")}', \${p.id})"
                        class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all \${isCardSpeaking ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-indigo-950/60 text-slate-200 border-indigo-800/60'}">
                        <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
                        <span>\${isCardSpeaking ? t.listenCardStop : t.listenCard}</span>
                      </button>

                      <div class="flex items-center gap-1.5">
                        <button onclick="toggleLike(\${p.id})" class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium \${isLike ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50' : 'text-slate-400 hover:text-emerald-400'}">
                          <svg class="w-3.5 h-3.5 \${isLike ? 'fill-current text-emerald-400' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                          <span>\${likes}</span>
                        </button>

                        <button onclick="toggleFavorite(\${p.id})" class="p-1.5 rounded-xl text-xs \${isFav ? 'bg-amber-500/20 text-amber-300 border border-amber-400/50' : 'text-slate-400 hover:text-rose-400'}">
                          <svg class="w-4 h-4 \${isFav ? 'fill-amber-400 text-amber-400' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                        </button>

                        <button onclick="copyProverbText(\${p.id})" class="p-1.5 rounded-xl text-xs text-slate-400 hover:text-amber-300" title="\${t.copyText}">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                        </button>

                        <button onclick="openShareModal(\${p.id})" class="p-1.5 rounded-xl text-xs text-slate-400 hover:text-amber-300" title="\${t.shareCard}">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
                        </button>
                      </div>
                    </div>
                  </article>
                \`;
              }).join('')}
            </div>
          \` : \`
            <div class="rounded-3xl p-12 text-center bg-[#11132b]/60 border border-amber-500/20 max-w-lg mx-auto">
              <h3 class="text-xl font-bold text-white mb-2">\${t.noResultsTitle}</h3>
              <p class="text-sm text-slate-400 mb-6">\${activeTab === 'favorites' ? t.emptyFavorites : t.noResultsSubtitle}</p>
              <button onclick="searchQuery = ''; selectedCategory = 'all'; activeTab = 'all'; renderApp();" class="px-5 py-2.5 rounded-xl font-bold text-sm bg-amber-500 text-slate-950">
                \${t.resetFilters}
              </button>
            </div>
          \`}

          <!-- Pagination -->
          \${activeTab !== 'daily' && totalPages > 1 ? \`
            <div class="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0f1128]/80 border border-amber-500/20">
              <div class="text-xs sm:text-sm text-slate-300">
                \${t.showingResults} <span class="font-bold text-amber-300">\${startIndex + 1}</span> - <span class="font-bold text-amber-300">\${Math.min(startIndex + itemsPerPage, allFiltered.length)}</span> \${t.of} <span class="font-bold text-emerald-400">\${allFiltered.length}</span>
              </div>

              <div class="flex items-center gap-1.5">
                <button onclick="currentPage = 1; renderApp();" \${currentPage === 1 ? 'disabled class="opacity-30"' : ''} class="p-2 rounded-xl bg-indigo-950 text-slate-300">&laquo;</button>
                <button onclick="currentPage = Math.max(1, currentPage - 1); renderApp();" \${currentPage === 1 ? 'disabled class="opacity-30"' : ''} class="p-2 rounded-xl bg-indigo-950 text-slate-300">&lsaquo;</button>
                <span class="px-3 py-1.5 text-xs sm:text-sm font-bold text-amber-300 bg-indigo-950 rounded-xl">\${t.page} \${currentPage} \${t.of} \${totalPages}</span>
                <button onclick="currentPage = Math.min(totalPages, currentPage + 1); renderApp();" \${currentPage === totalPages ? 'disabled class="opacity-30"' : ''} class="p-2 rounded-xl bg-indigo-950 text-slate-300">&rsaquo;</button>
                <button onclick="currentPage = totalPages; renderApp();" \${currentPage === totalPages ? 'disabled class="opacity-30"' : ''} class="p-2 rounded-xl bg-indigo-950 text-slate-300">&raquo;</button>
              </div>

              <div class="flex items-center gap-2 text-xs text-slate-400">
                <span>\${t.perPage}:</span>
                <select onchange="itemsPerPage = parseInt(this.value); currentPage = 1; renderApp();" class="px-2 py-1.5 rounded-lg bg-indigo-950 text-amber-300 font-bold border border-indigo-800">
                  <option value="20" \${itemsPerPage === 20 ? 'selected' : ''}>20</option>
                  <option value="50" \${itemsPerPage === 50 ? 'selected' : ''}>50</option>
                  <option value="100" \${itemsPerPage === 100 ? 'selected' : ''}>100</option>
                </select>
              </div>
            </div>
          \` : ''}

        </main>

        <!-- Regal Footer -->
        <footer class="mt-16 border-t border-indigo-950/80 bg-[#070812] py-8 text-center text-xs text-slate-400/80">
          <div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-2 text-amber-400/80 font-medium">
              <span>1,000 Unique Authentic Proverbs • தமிழ் | English | සිංහල</span>
            </div>
            <div class="flex items-center gap-4 text-slate-400">
              <button onclick="downloadSelfAsHtml()" class="hover:text-amber-300 transition-colors font-bold underline">
                \${t.downloadBtn}
              </button>
            </div>
          </div>
        </footer>

        <!-- Share Proverb Modal -->
        \${activeModalProverbId ? (() => {
          const mp = PROVERBS_DATA.find(x => x.id === activeModalProverbId);
          if (!mp) return '';
          const mc = currentLang === 'ta' ? mp.tamil : currentLang === 'si' ? mp.sinhala : mp.english;
          return \`
            <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <div class="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#181a3d] to-[#0c0e24] border-2 border-amber-500/40 p-6 sm:p-8 shadow-2xl">
                <button onclick="closeShareModal()" class="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white">&times;</button>
                <div class="flex items-center gap-2 mb-6">
                  <h3 class="text-lg font-bold text-white">\${t.shareModalTitle}</h3>
                  <span class="text-xs text-slate-400">#\${mp.id}</span>
                </div>
                <div class="rounded-2xl p-6 bg-[#0f1126] border border-amber-500/20 text-center my-4">
                  <p class="text-xl sm:text-2xl font-bold text-amber-100 leading-relaxed mb-4 \${fontClass}">"\${mc.proverb}"</p>
                  <div class="pt-3 border-t border-slate-800 text-left">
                    <span class="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">\${t.meaningLabel}</span>
                    <p class="text-xs sm:text-sm text-slate-300 \${textFontClass}">\${mc.meaning}</p>
                  </div>
                </div>
                <div class="mt-6 flex items-center justify-end gap-3">
                  <button onclick="copyProverbText(\${mp.id}); closeShareModal();" class="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-950 text-slate-200 border border-indigo-800 hover:border-amber-400">
                    \${t.copyText}
                  </button>
                  <button onclick="if(navigator.share){navigator.share({title: '\${t.appTitle}', text: '\${mc.proverb.replace(/'/g, "\\\\'")}\\n\\n\${mc.meaning.replace(/'/g, "\\\\'")}'})}else{copyProverbText(\${mp.id});}; closeShareModal();"
                    class="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 text-slate-950 hover:bg-amber-400">
                    \${t.shareCard}
                  </button>
                </div>
              </div>
            </div>
          \`;
        })() : ''}

        <!-- Toast Notification Container -->
        <div id="toast-container" class="fixed bottom-6 right-6 z-50 hidden"></div>
      \`;

      // Keep search input focused if typing
      const searchEl = document.getElementById('search-input');
      if (searchEl && document.activeElement && document.activeElement.id === 'search-input') {
        searchEl.focus();
        searchEl.setSelectionRange(searchQuery.length, searchQuery.length);
      }
    }

    // Initial render
    setLanguage(currentLang);
  </script>
</body>
</html>
`;

fs.writeFileSync(path.resolve('./index.html'), htmlContent, 'utf8');
fs.writeFileSync(path.resolve('./public/1000-proverbs-standalone.html'), htmlContent, 'utf8');
fs.writeFileSync(path.resolve('./1000-proverbs-standalone.html'), htmlContent, 'utf8');

console.log("Successfully compiled standalone index.html with all 1000 proverbs!");
