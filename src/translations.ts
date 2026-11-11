/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'ta' | 'si';

export interface TranslationSchema {
  appTitle: string;
  appSubtitle: string;
  badgeLoaded: string;
  allTab: string;
  favoritesTab: string;
  popularTab: string;
  dailyTab: string;
  searchPlaceholder: string;
  filterByCategory: string;
  allCategories: string;
  listenAssistant: string;
  speaking: string;
  stopAudio: string;
  speechSpeed: string;
  voiceDesc: string;
  todayWisdom: string;
  proverbCardId: string;
  meaningLabel: string;
  listenCard: string;
  listenCardStop: string;
  like: string;
  liked: string;
  favorite: string;
  favorited: string;
  copyText: string;
  copiedToast: string;
  shareCard: string;
  shareModalTitle: string;
  close: string;
  showingResults: string;
  noResultsTitle: string;
  noResultsSubtitle: string;
  resetFilters: string;
  page: string;
  of: string;
  prevPage: string;
  nextPage: string;
  firstPage: string;
  lastPage: string;
  perPage: string;
  randomProverbBtn: string;
  categories: Record<string, string>;
  statsUnique: string;
  clearFavoritesConfirm: string;
  emptyFavorites: string;
  browseCatalog: string;
}

export const TRANSLATIONS: Record<Language, TranslationSchema> = {
  en: {
    appTitle: "1000 Proverbs",
    appSubtitle: "A Royal Treasury of 1,000 Authentic Cultural Proverbs & Living Wisdom",
    badgeLoaded: "1000 / 1000 Unique Proverbs",
    allTab: "All Proverbs",
    favoritesTab: "My Favorites",
    popularTab: "Top Liked",
    dailyTab: "Proverb of the Day",
    searchPlaceholder: "Search by proverb, meaning, theme, or ID (#1 - #1000)...",
    filterByCategory: "Filter by Theme",
    allCategories: "All Themes",
    listenAssistant: "Voice Assistant",
    speaking: "Playing Audio...",
    stopAudio: "Stop Voice",
    speechSpeed: "Voice Speed",
    voiceDesc: "Listen to natural speech pronunciation of the featured wisdom",
    todayWisdom: "Featured Cultural Wisdom",
    proverbCardId: "Proverb #",
    meaningLabel: "Cultural Meaning & Life Insight",
    listenCard: "Listen",
    listenCardStop: "Pause",
    like: "Like",
    liked: "Liked",
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
    statsUnique: "Strictly Unique & Non-Repeating",
    clearFavoritesConfirm: "Clear all saved favorites?",
    emptyFavorites: "You have not saved any favorite proverbs yet. Click the heart icon on any proverb card to bookmark it here!",
    browseCatalog: "Explore 1,000 Proverbs"
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
    filterByCategory: "பொருள் வாரியாக",
    allCategories: "அனைத்துப் பிரிவுகள்",
    listenAssistant: "குரல் உதவியாளர்",
    speaking: "ஒலிக்கிறது...",
    stopAudio: "நிறுத்து",
    speechSpeed: "வேகம்",
    voiceDesc: "இன்றைய சிறப்பான பழமொழியையும் அதன் வாழ்க்கை விளக்கத்தையும் குரலில் கேளுங்கள்",
    todayWisdom: "இன்றைய சிறப்புப் பழமொழி",
    proverbCardId: "பழமொழி எண் #",
    meaningLabel: "பண்பாட்டு விளக்கம் & வாழ்வியல் பாடம்",
    listenCard: "கேள்",
    listenCardStop: "நிறுத்து",
    like: "விருப்பம்",
    liked: "பிடித்தவை",
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
    statsUnique: "100% தனித்துவமானவை, மறுவராதவை",
    clearFavoritesConfirm: "சேமிக்கப்பட்ட அனைத்து விருப்பங்களையும் நீக்கவா?",
    emptyFavorites: "நீங்கள் இன்னும் எந்தப் பழமொழியையும் விருப்பப் பட்டியலில் சேர்க்கவில்லை. விருப்பமான பழமொழிகளில் உள்ள இதயக் குறியீட்டை அழுத்தி இங்கு சேமிக்கலாம்!",
    browseCatalog: "1,000 பழமொழிகளை ஆராய்க"
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
    filterByCategory: "තේමාව අනුව",
    allCategories: "සියලු තේමා",
    listenAssistant: "හඬ සහායකයා",
    speaking: "හඬ වාදනය වේ...",
    stopAudio: "නවත්වන්න",
    speechSpeed: "හඬ වේගය",
    voiceDesc: "විශේෂිත පිරුළ හා එහි සාම්ප්‍රදායික අර්ථ විවරණය පැහැදිලි හඬින් අසන්න",
    todayWisdom: "විශේෂිත සාම්ප්‍රදායික පිරුළ",
    proverbCardId: "පිරුළු අංක #",
    meaningLabel: "සංස්කෘතික අර්ථය & ජීවන උපදේශය",
    listenCard: "අසන්න",
    listenCardStop: "නවත්වන්න",
    like: "කැමැත්ත",
    liked: "කැමතියි",
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
    statsUnique: "100% වෙනස්, නැවත නැවත නොයෙදෙන",
    clearFavoritesConfirm: "සුරකින ලද සියලු ප්‍රියතමයන් ඉවත් කරන්නද?",
    emptyFavorites: "ඔබ තවමත් කිසිදු පිරුළක් ප්‍රියතම ලැයිස්තුවට එක්කර නැත. ඕනෑම කාඩ්පතක ඇති හදවත් සලකුණ ක්ලික් කර මෙහි සුරකින්න!",
    browseCatalog: "පිරුළු 1000 ගවේෂණය කරන්න"
  }
};
