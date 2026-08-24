import React, { useState, useEffect } from 'react';
import { Sparkles, Pause, Play, ChevronLeft, ChevronRight, ExternalLink, Cpu, Bot, Zap, Globe, Star, Plus, ChevronUp, ChevronDown, CheckCircle2, Share2, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NewsItem } from '../types';

interface AiRecommendation {
  id: string;
  aiName: string;
  category: string;
  releaseDate: string;
  description: string;
  keyFeatures: string[];
  techStack: string;
  imageUrl: string;
  link: string;
  rating: number; // 0 to 5 stars
  totalVotes: number;
  userRatedStar?: number;
  sharedBy: string;
}

const renderAiLogo = (aiName: string, size: 'sm' | 'md' | 'lg' = 'md') => {
  const nameLower = aiName.toLowerCase();
  
  const dimensions = {
    sm: 'w-6 h-6 p-1 text-xs',
    md: 'w-8 h-8 p-1.5 text-sm',
    lg: 'w-11 h-11 p-2 text-base'
  }[size];

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }[size];

  // 1. ChatGPT / OpenAI
  if (nameLower.includes('chatgpt') || nameLower.includes('gpt') || nameLower.includes('openai')) {
    return (
      <div
        className={`${dimensions} bg-[#10a37f] text-white rounded-2xl flex items-center justify-center shadow-md ring-2 ring-emerald-200/80 shrink-0 transition-transform hover:scale-110`}
        title="OpenAI ChatGPT Logo"
      >
        <svg viewBox="0 0 24 24" className={`${iconSizes} fill-current`}>
          <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0814 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4954zm-8.8643-4.2737a4.471 4.471 0 0 1-.5318-3.0039l.142.083 4.7783 2.7583a.7948.7948 0 0 0 .7927 0l5.8338-3.3687v2.3371a.071.071 0 0 1-.0312.0592l-4.832 2.7885a4.504 4.504 0 0 1-6.1518-1.6535zm-1.229-9.1509a4.4755 4.4755 0 0 1 2.3446-1.9631v.165l0 5.5165a.7948.7948 0 0 0 .3927.6813l5.8338 3.3687-2.02 1.1686a.071.071 0 0 1-.0678.0071l-4.832-2.7885a4.504 4.504 0 0 1-1.6513-6.1556zM15.4227 8.2831l-4.7783-2.7583a.7948.7948 0 0 0-.7927 0L4.0179 8.8935V6.5564a.071.071 0 0 1 .0312-.0592l4.832-2.7885a4.504 4.504 0 0 1 6.6836 4.6562l-.142-.0818zm3.8284 6.2416v-5.5165a.7948.7948 0 0 0-.3927-.6813L13.0246 4.9582l2.02-1.1686a.071.071 0 0 1 .0678-.0071l4.832 2.7885a4.504 4.504 0 0 1 1.6513 6.1556 4.4755 4.4755 0 0 1-2.3446 1.9631zm1.229 3.0039l-.142-.083-4.7783-2.7583a.7948.7948 0 0 0-.7927 0l-5.8338 3.3687V15.717a.071.071 0 0 1 .0312-.0592l4.832-2.7885a4.504 4.504 0 0 1 6.6836 4.6562z"/>
        </svg>
      </div>
    );
  }

  // 2. Google Gemini
  if (nameLower.includes('gemini')) {
    return (
      <div
        className={`${dimensions} bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white rounded-2xl flex items-center justify-center shadow-md ring-2 ring-blue-200/80 shrink-0 transition-transform hover:scale-110`}
        title="Google Gemini Logo"
      >
        <svg viewBox="0 0 24 24" className={`${iconSizes} fill-current text-cyan-200`}>
          <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z" />
        </svg>
      </div>
    );
  }

  // 3. Google NotebookLM
  if (nameLower.includes('notebook')) {
    return (
      <div
        className={`${dimensions} bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-md ring-2 ring-cyan-200/80 shrink-0 transition-transform hover:scale-110`}
        title="Google NotebookLM Logo"
      >
        <svg viewBox="0 0 24 24" className={`${iconSizes} fill-none stroke-current stroke-2`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
    );
  }

  // 4. Anthropic Claude
  if (nameLower.includes('claude') || nameLower.includes('anthropic')) {
    return (
      <div
        className={`${dimensions} bg-gradient-to-tr from-[#c15c3d] via-[#d97757] to-[#e08365] text-white rounded-2xl flex items-center justify-center shadow-md ring-2 ring-amber-200/80 shrink-0 transition-transform hover:scale-110`}
        title="Anthropic Claude Logo"
      >
        <span className="font-serif font-black tracking-tighter text-amber-100">C</span>
      </div>
    );
  }

  // 5. DeepSeek
  if (nameLower.includes('deepseek')) {
    return (
      <div
        className={`${dimensions} bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-500 text-white rounded-2xl flex items-center justify-center shadow-md ring-2 ring-blue-300/80 shrink-0 transition-transform hover:scale-110`}
        title="DeepSeek AI Logo"
      >
        <svg viewBox="0 0 24 24" className={`${iconSizes} fill-current text-white`}>
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      </div>
    );
  }

  // 6. Generic / Fallback
  return (
    <div
      className={`${dimensions} bg-gradient-to-tr from-indigo-600 to-purple-600 text-white rounded-2xl flex items-center justify-center shadow-md ring-2 ring-indigo-200/80 shrink-0 transition-transform hover:scale-110`}
      title="Inteligencia Artificial"
    >
      <Sparkles className={`${iconSizes} text-amber-300`} />
    </div>
  );
};

const initialAiRecommendations: AiRecommendation[] = [
  {
    id: 'rec_1',
    aiName: 'ChatGPT & GPT-4o',
    category: 'Asistente Multimodal & Agentes',
    releaseDate: '2026-08-08',
    description: 'El modelo insignia de OpenAI con capacidades avanzadas de razonamiento, visión en tiempo real, análisis de datos y generación de código en Python.',
    keyFeatures: ['Modo Voz Multimodal en vivo', 'Análisis de datos e interpretación de .ipynb', 'Generación de Canvas y código'],
    techStack: 'OpenAI API / WebSockets',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80',
    link: 'https://chatgpt.com',
    rating: 4.9,
    totalVotes: 128,
    sharedBy: 'Diego Solís'
  },
  {
    id: 'rec_2',
    aiName: 'Google Gemini 1.5 Pro',
    category: 'RAG & Contexto de 1M+ Tokens',
    releaseDate: '2026-08-07',
    description: 'Herramienta clave del curso para procesar documentos de Google Drive, presentaciones PPT, PDFs extensos y archivos de código sin perder detalle.',
    keyFeatures: ['1 Millón+ Tokens de ventana de contexto', 'Grounding nativo en Google Drive y Search', 'Audio y visión nativa'],
    techStack: 'Google GenAI SDK / Express',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    link: 'https://gemini.google.com',
    rating: 4.8,
    totalVotes: 95,
    sharedBy: 'Prof. Heiner Romero'
  },
  {
    id: 'rec_3',
    aiName: 'Google NotebookLM',
    category: 'Síntesis de Documentos & Podcasts IA',
    releaseDate: '2026-08-05',
    description: 'Genera resúmenes ejecutivos, cuestionarios de estudio y guiones de audio/podcast en español partiendo de las diapositivas y lecturas del Módulo III.',
    keyFeatures: ['Audio Overviews conversacionales', 'Citas exactas de archivos del usuario', 'Organización de notas de investigación'],
    techStack: 'Google Workspace Labs',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    link: 'https://notebooklm.google.com',
    rating: 4.9,
    totalVotes: 112,
    sharedBy: 'Valeria Fernández'
  },
  {
    id: 'rec_4',
    aiName: 'Anthropic Claude 3.5 Sonnet',
    category: 'Código & Artifacts Interactivos',
    releaseDate: '2026-08-03',
    description: 'Recomendada por los estudiantes para refactorizar código de Machine Learning, generar componentes React y realizar Computer Use.',
    keyFeatures: ['Artifacts interactivos en tiempo real', 'Excelente desempeño en Python y TypeScript', 'Razonamiento lógico libre de alucinaciones'],
    techStack: 'Anthropic Claude API',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
    link: 'https://claude.ai',
    rating: 4.9,
    totalVotes: 140,
    sharedBy: 'Carlos Mendoza'
  },
  {
    id: 'rec_5',
    aiName: 'DeepSeek R1 Open Reasoner',
    category: 'Razonamiento Abierto & Optimización ML',
    releaseDate: '2026-08-01',
    description: 'Modelo de razonamiento matemático y tuning de algoritmos con arquitectura abierta de costo ultra bajo para ejecución local.',
    keyFeatures: ['Chain-of-Thought totalmente transparente', 'Optimización de algoritmos de clasificación', 'Sin restricciones de API keys'],
    techStack: 'Ollama / DeepSeek Cloud',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    link: 'https://deepseek.com',
    rating: 4.7,
    totalVotes: 86,
    sharedBy: 'Ana Lucía Castro'
  }
];

interface AiRecommendationsCarouselProps {
  items?: NewsItem[];
  onAddToast?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const AiRecommendationsCarousel: React.FC<AiRecommendationsCarouselProps> = ({
  onAddToast,
}) => {
  const [recommendations, setRecommendations] = useState<AiRecommendation[]>(initialAiRecommendations);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // New AI Form state
  const [newAiName, setNewAiName] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newLink, setNewLink] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  // Auto rotation
  useEffect(() => {
    if (!isPlaying || isCollapsed) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recommendations.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [isPlaying, isCollapsed, recommendations.length]);

  const activeSpec = recommendations[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + recommendations.length) % recommendations.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % recommendations.length);
  };

  // Interactive 0-5 Star Rating Handler
  const handleRate = (recId: string, starCount: number) => {
    setRecommendations((prev) =>
      prev.map((rec) => {
        if (rec.id === recId) {
          const isReRating = rec.userRatedStar !== undefined;
          const oldVoteCount = rec.totalVotes;
          const newVoteCount = isReRating ? oldVoteCount : oldVoteCount + 1;

          // Calculate new average rating
          const totalPoints = rec.rating * oldVoteCount + (starCount - (rec.userRatedStar || 0));
          const newAvg = parseFloat((totalPoints / newVoteCount).toFixed(1));

          return {
            ...rec,
            rating: newAvg,
            totalVotes: newVoteCount,
            userRatedStar: starCount,
          };
        }
        return rec;
      })
    );

    if (onAddToast) {
      onAddToast(`¡Calificación de ${starCount} estrellas registrada para ${activeSpec.aiName}!`, 'success');
    }
  };

  const handleShareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAiName.trim() || !newLink.trim()) return;

    const newRec: AiRecommendation = {
      id: `rec_${Date.now()}`,
      aiName: newAiName.trim(),
      category: newCategory.trim() || 'Herramienta de IA Empresarial',
      releaseDate: new Date().toISOString().split('T')[0],
      description: newDesc.trim() || 'Herramienta de Inteligencia Artificial recomendada por la comunidad del curso.',
      keyFeatures: ['Compartido por la comunidad TEC', 'Acceso directo con enlace verificado'],
      techStack: 'Integración Web',
      imageUrl: newImageUrl.trim() || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      link: newLink.startsWith('http') ? newLink : `https://${newLink}`,
      rating: 5.0,
      totalVotes: 1,
      userRatedStar: 5,
      sharedBy: 'Estudiante TEC'
    };

    setRecommendations((prev) => [newRec, ...prev]);
    setCurrentIndex(0);
    setShowShareModal(false);
    
    // Reset form
    setNewAiName('');
    setNewCategory('');
    setNewDesc('');
    setNewLink('');
    setNewImageUrl('');

    if (onAddToast) {
      onAddToast(`¡Nueva Inteligencia Artificial "${newRec.aiName}" agregada a la Ficha Técnica!`, 'success');
    }
  };

  return (
    <div
      id="tour-carousel"
      className="glass-panel rounded-3xl p-5 sm:p-7 border border-indigo-200/80 shadow-xl bg-white/95 my-4 transition-all"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Top Title & Collapse Bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap border-b border-slate-200/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100 shadow-sm">
            <Sparkles className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-800">
                Ficha Técnica • Inteligencias Artificiales Recomendadas
              </h3>
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded-full">
                Orden Cronológico
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Carrusel interactivo de AIs recomendadas por profesores y estudiantes (ChatGPT, Gemini, NotebookLM, Claude, DeepSeek)
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Share AI Button */}
          <button
            onClick={() => setShowShareModal(true)}
            className="px-3.5 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Recomendar IA</span>
          </button>

          {/* Pause / Play */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-200 text-xs font-bold transition-colors flex items-center gap-1"
            title={isPlaying ? 'Pausar Carrusel' : 'Reanudar Carrusel'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-600" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
          </button>

          {/* Slide Navigation */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button onClick={handlePrev} className="p-1 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-slate-600 px-1.5 font-mono">
              {currentIndex + 1}/{recommendations.length}
            </span>
            <button onClick={handleNext} className="p-1 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Collapse / Expand Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-200 text-xs font-bold transition-colors flex items-center gap-1"
            title={isCollapsed ? 'Expandir Ficha Técnica' : 'Colapsar Ficha Técnica'}
          >
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            <span className="hidden sm:inline">{isCollapsed ? 'Expandir' : 'Colapsar'}</span>
          </button>
        </div>
      </div>

      {/* Main Ficha Técnica Content Body */}
      {!isCollapsed && activeSpec && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSpec.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-4"
          >
            {/* Left Column: Image & Share Badge */}
            <div className="md:col-span-5 relative h-56 rounded-2xl overflow-hidden border border-slate-200 shadow-md group">
              <img
                src={activeSpec.imageUrl}
                alt={activeSpec.aiName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-indigo-700 border border-indigo-200 shadow-sm">
                {activeSpec.category}
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                <span className="text-[10px] text-slate-300 font-mono block">Sugerida por {activeSpec.sharedBy} • {activeSpec.releaseDate}</span>
                <div className="flex items-center gap-2">
                  {renderAiLogo(activeSpec.aiName, 'sm')}
                  <h4 className="text-lg font-black tracking-tight drop-shadow-md">{activeSpec.aiName}</h4>
                </div>
              </div>
            </div>

            {/* Right Column: Specifications & 0-5 Star Rating */}
            <div className="md:col-span-7 space-y-3.5">
              
              {/* Star Rating Header */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  {/* Highlighted AI Logo right next to the name */}
                  {renderAiLogo(activeSpec.aiName, 'lg')}
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{activeSpec.aiName}</span>
                      <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 font-extrabold text-[10px] rounded-full border border-indigo-200 shadow-2xs">
                        Destacado Módulo III
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono block mt-0.5">({activeSpec.techStack})</span>
                  </div>
                </div>

                {/* Interactive Star Rating Controls */}
                <div className="flex items-center gap-2 bg-amber-50/90 px-3 py-1.5 rounded-2xl border border-amber-200/80 shadow-2xs">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRate(activeSpec.id, star)}
                        className="hover:scale-125 transition-transform p-0.5"
                        title={`Calificar con ${star} estrellas`}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            star <= (activeSpec.userRatedStar || Math.round(activeSpec.rating))
                              ? 'text-amber-500 fill-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  <span className="text-xs font-black text-amber-900">{activeSpec.rating} / 5</span>
                  <span className="text-[10px] text-amber-700">({activeSpec.totalVotes} votos)</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {activeSpec.description}
              </p>

              {/* Bullet Features */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block">Características Principales:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeSpec.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-50/80 p-2 rounded-xl border border-slate-200/80 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link Button */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <span className="text-[11px] text-slate-400 font-mono">
                  {activeSpec.userRatedStar ? `Tú calificaste: ${activeSpec.userRatedStar} ⭐` : 'Haz click en las estrellas para calificar'}
                </span>

                <a
                  href={activeSpec.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-indigo-500/20"
                >
                  <span>Probar Herramienta</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* AI Quick Navigation Tabs with Logos */}
      {!isCollapsed && (
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0 mr-1">Selección Rápida:</span>
          {recommendations.map((rec, idx) => (
            <button
              key={rec.id}
              onClick={() => setCurrentIndex(idx)}
              className={`px-3 py-1.5 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 shrink-0 border ${
                idx === currentIndex
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20 scale-102'
                  : 'bg-slate-50 hover:bg-indigo-50/80 text-slate-700 border-slate-200/80 hover:border-indigo-300'
              }`}
            >
              {renderAiLogo(rec.aiName, 'sm')}
              <span>{rec.aiName.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      )}

      {/* Share / Recommend New AI Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-md p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/90 bg-white relative space-y-4">
            <h3 className="text-lg font-bold text-slate-800">Recomendar Inteligencia Artificial</h3>
            <p className="text-xs text-slate-500">Comparte una herramienta de IA con tus compañeros del Módulo III</p>

            <form onSubmit={handleShareSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nombre de la IA</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Cursor IDE, n8n Workflows, Perplexity..."
                  value={newAiName}
                  onChange={(e) => setNewAiName(e.target.value)}
                  className="w-full p-3 glass-input rounded-2xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Categoría</label>
                <input
                  type="text"
                  placeholder="Ej. Automatización, Desarrollo de Código, RAG..."
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full p-3 glass-input rounded-2xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Enlace / Web Oficial</label>
                <input
                  type="url"
                  required
                  placeholder="https://ejemplo-ia.com"
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                  className="w-full p-3 glass-input rounded-2xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Descripción Breve</label>
                <textarea
                  rows={2}
                  placeholder="Explica para qué sirve esta IA..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full p-3 glass-input rounded-2xl text-xs resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">URL de Imagen (Opcional)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full p-3 glass-input rounded-2xl text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowShareModal(false)}
                  className="px-4 py-2 glass-button rounded-2xl text-xs font-semibold text-slate-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-2xl text-xs font-bold hover:bg-indigo-700 shadow-md"
                >
                  Publicar Recomendación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
