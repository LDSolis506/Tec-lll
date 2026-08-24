import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { NewsItem, NewsCategory, StudentMember } from '../types';
import { AiRecommendationsCarousel } from './AiRecommendationsCarousel';
import {
  Newspaper,
  Sparkles,
  Search,
  Plus,
  ThumbsUp,
  ExternalLink,
  Bot,
  Video,
  Zap,
  Calendar,
  Share2,
  Bookmark,
  RefreshCw,
  Cpu,
  Tv,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  GraduationCap,
  Sliders,
  Layers,
  Star
} from 'lucide-react';

interface NewsSectionProps {
  news: NewsItem[];
  currentUser: StudentMember;
  onAddNews: (item: NewsItem) => void;
  onFetchAINews: () => Promise<void>;
  onAddToast: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({
  news,
  currentUser,
  onAddNews,
  onFetchAINews,
  onAddToast,
}) => {
  const { t } = useLanguage();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | 'all'>('all');
  
  // Slice button for Noticias vs Tutoriales
  const [sliceType, setSliceType] = useState<'all' | 'noticia' | 'tutorial'>('all');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentCarouselIdx, setCurrentCarouselIdx] = useState(0);

  // Star Ratings map for news/tutorials feed
  const [itemRatings, setItemRatings] = useState<Record<string, number>>({
    'news_1': 5,
    'news_2': 4,
    'news_3': 5
  });

  const handleRateItem = (itemId: string, stars: number) => {
    setItemRatings((prev) => ({ ...prev, [itemId]: stars }));
    onAddToast(`¡Calificación de ${stars} estrellas enviada!`, 'success');
  };

  // Modal Share News state
  const [showShareModal, setShowShareModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newSource, setNewSource] = useState('');
  const [newCategory, setNewCategory] = useState<NewsCategory>('ai');

  // Modal Recommend AI state
  const [showRecommendModal, setShowRecommendModal] = useState(false);
  const [recAiName, setRecAiName] = useState('');
  const [recUrl, setRecUrl] = useState('');
  const [recDescription, setRecDescription] = useState('');
  const [recItemType, setRecItemType] = useState<'noticia' | 'tutorial'>('noticia');

  // Featured carousel items (top 4 items)
  const featuredNews = news.slice(0, 4);

  // Auto-rotate featured carousel every 6 seconds
  useEffect(() => {
    if (featuredNews.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentCarouselIdx((prev) => (prev + 1) % featuredNews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredNews.length]);

  // Filtered news items considering Category, Slice Type (Noticia vs Tutorial), and Search Query
  const filteredNews = news.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    // Match Slice Filter (Noticias vs Tutoriales)
    let matchesSlice = true;
    if (sliceType === 'noticia') {
      matchesSlice = item.itemType === 'noticia' || !item.itemType;
    } else if (sliceType === 'tutorial') {
      matchesSlice = item.itemType === 'tutorial';
    }

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.source.toLowerCase().includes(q) ||
      (item.aiName && item.aiName.toLowerCase().includes(q));

    return matchesCategory && matchesSlice && matchesSearch;
  });

  // Group news by date (Daily History)
  const groupedByDate: Record<string, NewsItem[]> = {};
  filteredNews.forEach((item) => {
    if (!groupedByDate[item.date]) {
      groupedByDate[item.date] = [];
    }
    groupedByDate[item.date].push(item);
  });

  // Sort dates descending
  const sortedDates = Object.keys(groupedByDate).sort((a, b) => b.localeCompare(a));

  const handleRunAlgorithm = async () => {
    setIsGenerating(true);
    onAddToast('Algoritmo buscando y sintetizando las noticias de IA y Automatización del día...', 'info');
    try {
      await onFetchAINews();
      onAddToast('Noticias del día actualizadas y guardadas en el historial.', 'success');
    } catch (err) {
      console.error(err);
      onAddToast('Sincronizadas noticias destacadas de Inteligencia Artificial y Automatización.', 'info');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;

    const todayStr = new Date().toISOString().split('T')[0];

    const newItem: NewsItem = {
      id: `news_${Date.now()}`,
      title: newTitle.trim(),
      summary: newSummary.trim() || 'Contenido compartido para el módulo de IA y Automatización.',
      category: newCategory,
      url: newUrl.trim(),
      source: newSource.trim() || (newCategory === 'tiktok' ? 'TikTok Tech' : 'Canal Especializado'),
      date: todayStr,
      sharedBy: currentUser.name,
      likes: 1,
      itemType: newCategory === 'tiktok' || newCategory === 'youtube' ? 'tutorial' : 'noticia',
      imageUrl: newCategory === 'tiktok' 
        ? 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      isAIGenerated: false,
    };

    onAddNews(newItem);
    onAddToast('Nuevo contenido registrado y guardado en el historial de hoy', 'success');
    setNewTitle('');
    setNewSummary('');
    setNewUrl('');
    setNewSource('');
    setShowShareModal(false);
  };

  const handleRecommendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recAiName.trim() || !recUrl.trim()) return;

    const todayStr = new Date().toISOString().split('T')[0];

    const newItem: NewsItem = {
      id: `rec_ai_${Date.now()}`,
      title: `Recomendación IA: ${recAiName.trim()}`,
      summary: recDescription.trim() || `Herramienta de Inteligencia Artificial recomendada por ${currentUser.name}.`,
      category: 'ai',
      url: recUrl.trim(),
      source: `Recomendación (${recAiName.trim()})`,
      date: todayStr,
      sharedBy: currentUser.name,
      likes: 1,
      itemType: recItemType, // 'noticia' or 'tutorial' from checkmark
      aiName: recAiName.trim(),
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=80',
      isAIGenerated: false,
    };

    onAddNews(newItem);
    onAddToast(`¡Recomendación de AI "${recAiName}" registrada con éxito!`, 'success');
    setRecAiName('');
    setRecUrl('');
    setRecDescription('');
    setRecItemType('noticia');
    setShowRecommendModal(false);
  };

  const categoryBadges: Record<NewsCategory, { label: string; icon: React.ReactNode; color: string }> = {
    ai: { label: 'Inteligencia Artificial', icon: <Cpu className="w-3.5 h-3.5" />, color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    automation: { label: 'Automatización de Procesos', icon: <Zap className="w-3.5 h-3.5" />, color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
    tiktok: { label: 'TikTok Short', icon: <Video className="w-3.5 h-3.5" />, color: 'bg-rose-50 text-rose-700 border-rose-200' },
    youtube: { label: 'Canal YouTube', icon: <Tv className="w-3.5 h-3.5" />, color: 'bg-purple-50 text-purple-700 border-purple-200' },
  };

  const currentFeatured = featuredNews[currentCarouselIdx] || featuredNews[0];

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 border border-white/90">
      
      {/* Header Block with Left Collapse Arrow */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/60">
        <div className="flex items-start gap-3">
          {/* Collapse Arrow on Left */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2.5 bg-cyan-100/80 hover:bg-cyan-200 text-cyan-800 rounded-2xl transition-all border border-cyan-200 mt-1 shrink-0"
            title={isCollapsed ? 'Expandir Feed de Noticias' : 'Colapsar Feed de Noticias'}
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-xs font-semibold border border-cyan-100">
              <Newspaper className="w-3.5 h-3.5" />
              <span>Algoritmo de Noticias e Inteligencia IA</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
              <span>Feed Diario de Inteligencia Artificial & Automatización</span>
              <span className="text-xs bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded-full font-bold border border-cyan-100">
                {news.length}
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Actualización diaria automatizada, recomendaciones de herramientas de IA y filtros de Noticias y Tutoriales.
            </p>
          </div>
        </div>

        {!isCollapsed && (
          <div className="flex items-center gap-2 flex-wrap self-start md:self-auto">
            {/* Recomendar AI Button */}
            <button
              onClick={() => setShowRecommendModal(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl text-xs font-bold hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Recomendar AI</span>
            </button>

            <button
              onClick={handleRunAlgorithm}
              disabled={isGenerating}
              className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-2xl text-xs font-bold hover:from-indigo-700 hover:to-cyan-700 transition-all flex items-center gap-2 shadow-md shadow-indigo-500/20 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Buscando con IA...' : 'Actualizar Noticias'}</span>
            </button>

            <button
              onClick={() => setShowShareModal(true)}
              className="px-4 py-2.5 bg-white text-slate-700 rounded-2xl text-xs font-bold border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4 text-indigo-600" />
              <span>Compartir Noticia/Video</span>
            </button>
          </div>
        )}
      </div>

      {!isCollapsed && (
        <>
          {/* AI Recommendations Carousel (Ficha Técnica Style - Chronological) */}
          <AiRecommendationsCarousel items={news} onAddToast={onAddToast} />

          {/* Slice Button Filter Bar (Noticias vs Tutoriales) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 text-white shadow-lg">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Filtro de Contenido (Slice Button):</span>
            </div>

            {/* High-contrast Slice Toggle Button */}
            <div className="inline-flex items-center bg-slate-950 p-1 rounded-xl border border-slate-700 shadow-inner w-full sm:w-auto">
              <button
                onClick={() => setSliceType('all')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  sliceType === 'all'
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Todas ({news.length})</span>
              </button>

              <button
                onClick={() => setSliceType('noticia')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  sliceType === 'noticia'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Newspaper className="w-3.5 h-3.5" />
                <span>Noticias</span>
              </button>

              <button
                onClick={() => setSliceType('tutorial')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  sliceType === 'tutorial'
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
                <span>Tutoriales</span>
              </button>
            </div>
          </div>

          {/* Featured News Carousel */}
          {currentFeatured && (
            <div className="relative glass-panel rounded-3xl overflow-hidden border border-white/90 shadow-md group">
              <div className="grid grid-cols-1 md:grid-cols-12 min-h-[220px]">
                
                {/* Image Section */}
                <div className="md:col-span-5 relative bg-slate-900 h-48 md:h-auto overflow-hidden">
                  <img
                    src={currentFeatured.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80'}
                    alt={currentFeatured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent md:bg-gradient-to-r" />
                  
                  <div className="absolute top-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-[10px] font-bold text-slate-800 flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>DESTACADO DEL DÍA</span>
                  </div>
                </div>

                {/* Info Section */}
                <div className="md:col-span-7 p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-indigo-600 font-bold">
                      <span>{currentFeatured.source}</span>
                      <span>•</span>
                      <span className="text-slate-400 font-normal">{currentFeatured.date}</span>
                      {currentFeatured.itemType && (
                        <span className={`px-2 py-0.5 rounded-md text-[10px] uppercase font-bold ml-auto ${
                          currentFeatured.itemType === 'tutorial' 
                            ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                            : 'bg-cyan-100 text-cyan-700 border border-cyan-200'
                        }`}>
                          {currentFeatured.itemType === 'tutorial' ? '🎓 Tutorial' : '📰 Noticia'}
                        </span>
                      )}
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-slate-800 leading-snug">
                      {currentFeatured.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {currentFeatured.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/50">
                    <div className="flex items-center gap-2">
                      {featuredNews.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentCarouselIdx(idx)}
                          className={`h-2 rounded-full transition-all ${
                            idx === currentCarouselIdx ? 'w-6 bg-indigo-600' : 'w-2 bg-slate-300'
                          }`}
                          title={`Ver destacada ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <a
                      href={currentFeatured.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Ver Noticia Completa</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Category Filter Pills & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 bg-slate-100/70 p-1 rounded-2xl border border-white/80 overflow-x-auto w-full sm:w-auto scrollbar-none">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Todas ({news.length})
              </button>
              <button
                onClick={() => setSelectedCategory('ai')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                  selectedCategory === 'ai'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" /> IA Empresarial
              </button>
              <button
                onClick={() => setSelectedCategory('automation')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                  selectedCategory === 'automation'
                    ? 'bg-white text-cyan-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Zap className="w-3.5 h-3.5" /> Automatización
              </button>
              <button
                onClick={() => setSelectedCategory('tiktok')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                  selectedCategory === 'tiktok'
                    ? 'bg-white text-rose-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Video className="w-3.5 h-3.5" /> TikTok Shorts
              </button>
              <button
                onClick={() => setSelectedCategory('youtube')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                  selectedCategory === 'youtube'
                    ? 'bg-white text-purple-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Tv className="w-3.5 h-3.5" /> Canales YT
              </button>
            </div>

            {/* Search Field */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar noticias o temas..."
                className="w-full pl-9 pr-4 py-2 glass-input rounded-2xl text-xs"
              />
            </div>
          </div>

          {/* Daily History Feed Grouped by Date */}
          <div className="space-y-8 pt-2">
            {sortedDates.map((dateStr) => {
              const itemsForDate = groupedByDate[dateStr];
              const isToday = dateStr === new Date().toISOString().split('T')[0];

              return (
                <div key={dateStr} className="space-y-4">
                  
                  {/* Date History Banner */}
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 bg-slate-200/80 text-slate-700 rounded-full text-xs font-bold flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{isToday ? `HOY (${dateStr})` : `HISTORIAL (${dateStr})`}</span>
                    </div>
                    <div className="h-[1px] flex-1 bg-slate-200/80" />
                    <span className="text-[11px] text-slate-400 font-medium">
                      {itemsForDate.length} {itemsForDate.length === 1 ? 'publicación' : 'publicaciones'}
                    </span>
                  </div>

                  {/* Grid of News Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {itemsForDate.map((item) => {
                      const badge = categoryBadges[item.category] || categoryBadges.ai;
                      return (
                        <div
                          key={item.id}
                          className="glass-panel p-5 rounded-3xl space-y-3 border border-white/90 hover:border-indigo-200 transition-all shadow-xs hover:shadow-md flex flex-col justify-between"
                        >
                          <div className="space-y-3">
                            {/* Image Thumbnail if available */}
                            {item.imageUrl && (
                              <div className="relative rounded-2xl overflow-hidden h-36 bg-slate-900 group">
                                <img
                                  src={item.imageUrl}
                                  alt={item.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                                />
                                <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 backdrop-blur-md shadow-xs bg-white/95 text-slate-800">
                                  {badge.icon}
                                  <span>{badge.label}</span>
                                </div>

                                {item.itemType && (
                                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-900/90 text-white backdrop-blur-md flex items-center gap-1">
                                    {item.itemType === 'tutorial' ? <GraduationCap className="w-3 h-3 text-amber-400" /> : <Newspaper className="w-3 h-3 text-cyan-400" />}
                                    <span>{item.itemType === 'tutorial' ? 'Tutorial' : 'Noticia'}</span>
                                  </div>
                                )}
                              </div>
                            )}

                            <div>
                              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                                <span className="font-semibold text-indigo-600">{item.source}</span>
                                <span>{item.date}</span>
                              </div>
                              <h4 className="text-sm font-bold text-slate-800 leading-snug line-clamp-2">
                                {item.title}
                              </h4>
                            </div>

                            <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                              {item.summary}
                            </p>
                          </div>

                          {/* Interactive 0-5 Star Rating Bar */}
                          <div className="flex items-center justify-between gap-1 pt-2 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-500">Calificar:</span>
                            <div className="flex items-center gap-0.5">
                              {[1, 2, 3, 4, 5].map((s) => {
                                const currentRating = itemRatings[item.id] || 4;
                                return (
                                  <button
                                    key={s}
                                    onClick={() => handleRateItem(item.id, s)}
                                    className="p-0.5 hover:scale-125 transition-transform"
                                    title={`Calificar con ${s} estrellas`}
                                  >
                                    <Star
                                      className={`w-3.5 h-3.5 ${
                                        s <= currentRating ? 'text-amber-500 fill-amber-400' : 'text-slate-300'
                                      }`}
                                    />
                                  </button>
                                );
                              })}
                            </div>
                            <span className="text-[10px] font-bold text-amber-700 font-mono">
                              {itemRatings[item.id] || 4}/5 ⭐
                            </span>
                          </div>

                          {/* Footer Actions */}
                          <div className="pt-2 border-t border-slate-200/50 flex items-center justify-between text-xs text-slate-500">
                            <span className="text-[10px] font-medium text-slate-400 truncate max-w-[110px]">
                              Por: {item.sharedBy}
                            </span>

                            <div className="flex items-center gap-2">
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl text-[11px] font-bold transition-colors flex items-center gap-1"
                              >
                                <span>Ver Completo</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {sortedDates.length === 0 && (
              <div className="text-center py-12 glass-panel rounded-3xl text-slate-400 text-xs">
                No hay publicaciones registradas con los filtros seleccionados.
              </div>
            )}
          </div>
        </>
      )}

      {/* Share News Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-md p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/90 relative">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Compartir Noticia o Video</h3>
            <form onSubmit={handleShareSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Categoría</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as NewsCategory)}
                  className="w-full p-3 glass-input rounded-2xl text-xs"
                >
                  <option value="ai">Inteligencia Artificial</option>
                  <option value="automation">Automatización de Procesos</option>
                  <option value="tiktok">Video Corto de TikTok</option>
                  <option value="youtube">Canal de YouTube Reconocido</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Título de la Noticia / Video</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ej. Agentes IA en la nube para automatizar workflows..."
                  className="w-full p-3 glass-input rounded-2xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Enlace (URL)</label>
                <input
                  type="url"
                  required
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-3 glass-input rounded-2xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Fuente / Canal</label>
                <input
                  type="text"
                  value={newSource}
                  onChange={(e) => setNewSource(e.target.value)}
                  placeholder="Ej. OpenAI Blog / DotCSV / TikTok @ia_pro"
                  className="w-full p-3 glass-input rounded-2xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Resumen / Puntos Clave</label>
                <textarea
                  rows={3}
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Explica brevemente por qué este contenido es importante para el módulo..."
                  className="w-full p-3 glass-input rounded-2xl text-xs resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowShareModal(false)}
                  className="glass-button px-4 py-2 rounded-2xl text-xs font-medium text-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-2xl text-xs font-bold hover:bg-indigo-700 shadow-md"
                >
                  Guardar en Historial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Recommend AI Tool Modal */}
      {showRecommendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-md p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/90 relative">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200/60">
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Recomendar Herramienta de IA</h3>
                <p className="text-[11px] text-slate-500">Registra una nueva Inteligencia Artificial para el equipo TEC</p>
              </div>
            </div>

            <form onSubmit={handleRecommendSubmit} className="space-y-4">
              {/* Field 1: Nombre de AI */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre de AI</label>
                <input
                  type="text"
                  required
                  value={recAiName}
                  onChange={(e) => setRecAiName(e.target.value)}
                  placeholder="Ej. DeepSeek R1, Cursor IDE, Claude 3.5 Sonnet"
                  className="w-full p-3 glass-input rounded-2xl text-xs"
                />
              </div>

              {/* Field 2: Link */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Link (URL)</label>
                <input
                  type="url"
                  required
                  value={recUrl}
                  onChange={(e) => setRecUrl(e.target.value)}
                  placeholder="Ej. https://deepseek.com"
                  className="w-full p-3 glass-input rounded-2xl text-xs"
                />
              </div>

              {/* Field 3: Descripción de qué hace */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Descripción de qué hace</label>
                <textarea
                  rows={3}
                  required
                  value={recDescription}
                  onChange={(e) => setRecDescription(e.target.value)}
                  placeholder="Explica qué funciones ofrece y cómo beneficia la automatización..."
                  className="w-full p-3 glass-input rounded-2xl text-xs resize-none"
                />
              </div>

              {/* Field 4: Checkmark Categorization Option */}
              <div className="space-y-2 pt-1 border-t border-slate-200/60">
                <label className="block text-xs font-bold text-slate-800">Categorización (Checkmark)</label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    onClick={() => setRecItemType('noticia')}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-2 ${
                      recItemType === 'noticia'
                        ? 'bg-cyan-50 border-cyan-500 text-cyan-900 shadow-xs'
                        : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      recItemType === 'noticia' ? 'bg-cyan-600 border-cyan-600 text-white' : 'border-slate-300'
                    }`}>
                      {recItemType === 'noticia' && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <div className="text-xs font-bold">Noticia</div>
                  </label>

                  <label
                    onClick={() => setRecItemType('tutorial')}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-2 ${
                      recItemType === 'tutorial'
                        ? 'bg-purple-50 border-purple-500 text-purple-900 shadow-xs'
                        : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      recItemType === 'tutorial' ? 'bg-purple-600 border-purple-600 text-white' : 'border-slate-300'
                    }`}>
                      {recItemType === 'tutorial' && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <div className="text-xs font-bold">Tutorial</div>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowRecommendModal(false)}
                  className="glass-button px-4 py-2 rounded-2xl text-xs font-medium text-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 text-white rounded-2xl text-xs font-bold hover:bg-emerald-700 shadow-md flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Registrar Recomendación</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
