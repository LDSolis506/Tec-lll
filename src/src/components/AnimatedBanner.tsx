import React, { useState, useEffect } from 'react';
import { TecLogo } from './TecLogo';
import { Sparkles, Bot, Zap, Cpu, Play, Newspaper, ChevronLeft, ChevronRight, ShieldCheck, ExternalLink, Globe, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AnimatedBannerProps {
  onOpenIntro: () => void;
  onExploreNews: () => void;
  onStartTour?: () => void;
}

const aiBrandSlides = [
  {
    id: 1,
    brandName: 'Google Gemini 1.5 Pro',
    company: 'Google DeepMind',
    badge: 'RAG & Contexto Masivo',
    badgeColor: 'bg-cyan-500/20 text-cyan-200 border-cyan-400/40',
    title: 'Google Gemini 1.5 Pro & Grounding RAG',
    description: 'Indexación multimodal en tiempo real sobre Google Drive y bases de datos vectoriales empresariales.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop&q=80',
    icon: <Cpu className="w-4 h-4 text-cyan-300" />,
  },
  {
    id: 2,
    brandName: 'OpenAI GPT-4o',
    company: 'OpenAI Research',
    badge: 'Agentes & Vision Realtime',
    badgeColor: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40',
    title: 'OpenAI GPT-4o & Agentes Inteligentes',
    description: 'Orquestación de workflows empresariales con razonamiento multimodal y Function Calling.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=1600&auto=format&fit=crop&q=80',
    icon: <Sparkles className="w-4 h-4 text-emerald-300" />,
  },
  {
    id: 3,
    brandName: 'Anthropic Claude 3.5',
    company: 'Anthropic AI',
    badge: 'Computer Use & Código',
    badgeColor: 'bg-purple-500/20 text-purple-200 border-purple-400/40',
    title: 'Anthropic Claude 3.5 Sonnet',
    description: 'Líder en desarrollo de código, agentes interactivos de escritorio e ingeniería de software.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&auto=format&fit=crop&q=80',
    icon: <Bot className="w-4 h-4 text-purple-300" />,
  },
  {
    id: 4,
    brandName: 'NVIDIA Blackwell AI',
    company: 'NVIDIA Supercomputing',
    badge: 'Cómputo & Hardware IA',
    badgeColor: 'bg-amber-500/20 text-amber-200 border-amber-400/40',
    title: 'NVIDIA Blackwell AI & Supercomputing',
    description: 'Infraestructura acelerada por GPU para entrenamiento masivo e inferencia de alto rendimiento.',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=1600&auto=format&fit=crop&q=80',
    icon: <Zap className="w-4 h-4 text-amber-300" />,
  },
  {
    id: 5,
    brandName: 'Microsoft Copilot',
    company: 'Microsoft Azure AI',
    badge: 'Automatización Cloud',
    badgeColor: 'bg-blue-500/20 text-blue-200 border-blue-400/40',
    title: 'Microsoft Copilot & Azure Workspace',
    description: 'Integración nativa de IA conversacional en suites corporativas y pipelines de productividad.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&auto=format&fit=crop&q=80',
    icon: <Globe className="w-4 h-4 text-blue-300" />,
  },
  {
    id: 6,
    brandName: 'Perplexity & DeepSeek',
    company: 'Open AI Research 2026',
    badge: 'Búsqueda & Open Models',
    badgeColor: 'bg-rose-500/20 text-rose-200 border-rose-400/40',
    title: 'Perplexity AI & DeepSeek Open Models',
    description: 'Síntesis conversacional de información y modelos de razonamiento lógico de código abierto.',
    image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=1600&auto=format&fit=crop&q=80',
    icon: <ShieldCheck className="w-4 h-4 text-rose-300" />,
  },
];

export const AnimatedBanner: React.FC<AnimatedBannerProps> = ({
  onOpenIntro,
  onExploreNews,
  onStartTour,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % aiBrandSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + aiBrandSlides.length) % aiBrandSlides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % aiBrandSlides.length);
  };

  const activeSlide = aiBrandSlides[currentSlide];

  return (
    <div id="tour-banner" className="relative rounded-3xl p-2 bg-slate-950/90 border border-white/20 shadow-2xl overflow-hidden my-2 group">
      
      {/* Full Size Carousel Background Container */}
      <div className="relative rounded-2xl overflow-hidden min-h-[340px] sm:min-h-[380px] flex items-center">
        
        {/* Animated Image Layer with Zoom Effect */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0 z-0"
          >
            <img
              src={activeSlide.image}
              alt={activeSlide.title}
              className="w-full h-full object-cover"
            />
            
            {/* Multi-gradient Darkness Overlays for Guaranteeing 100% Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/30 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/50 z-10" />
          </motion.div>
        </AnimatePresence>

        {/* Foreground Glass Content Card (Adaptable Legibility Panel) */}
        <div className="relative z-20 w-full p-6 sm:p-10 flex flex-col justify-between min-h-[340px] sm:min-h-[380px]">
          
          {/* Top Brand Bar */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <TecLogo size="sm" showSubtitle={false} className="shrink-0 shadow-lg" />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900/80 backdrop-blur-md border border-white/20 rounded-full text-cyan-300 text-xs font-bold shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>TEC • Módulo 3 AIE 2026</span>
              </div>
            </div>

            {/* Current AI Brand Pill */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className={`px-3.5 py-1 rounded-full text-xs font-bold border backdrop-blur-xl flex items-center gap-2 shadow-lg ${activeSlide.badgeColor}`}
              >
                {activeSlide.icon}
                <span>{activeSlide.company}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Middle Text Box with Glassmorphic Contrast Backdrop */}
          <div className="my-auto max-w-2xl py-4 space-y-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.4 }}
                className="space-y-2"
              >
                <div className="inline-block px-2.5 py-0.5 bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 rounded-lg text-[11px] font-bold uppercase tracking-wider">
                  {activeSlide.badge}
                </div>

                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-lg">
                  {activeSlide.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal drop-shadow-md max-w-xl">
                  {activeSlide.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Actions and Carousel Control Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10">
            
            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2.5 flex-wrap w-full sm:w-auto">
              {onStartTour && (
                <button
                  onClick={onStartTour}
                  className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white rounded-2xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 border border-white/20 animate-pulse"
                  title="Iniciar Visita Guiada por el Asistente Bot"
                >
                  <Compass className="w-4 h-4 text-amber-300" />
                  <span>Visita Guiada</span>
                </button>
              )}

              <button
                onClick={onExploreNews}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white rounded-2xl text-xs font-bold transition-all shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 border border-white/20"
              >
                <Newspaper className="w-4 h-4" />
                <span>Explorar Feed de IA</span>
              </button>

              <button
                onClick={onOpenIntro}
                className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-xs font-semibold backdrop-blur-md border border-white/20 transition-all flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current text-cyan-300" />
                <span>Intro</span>
              </button>
            </div>

            {/* Slide Navigation Buttons & Dots */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-full border border-white/15 backdrop-blur-md">
                {aiBrandSlides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentSlide ? 'w-6 bg-cyan-400 shadow-sm shadow-cyan-400/50' : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                    title={slide.brandName}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrev}
                  className="p-2 bg-slate-900/80 hover:bg-slate-800 text-white rounded-xl border border-white/20 backdrop-blur-md transition-all shadow-md"
                  title="Anterior marca de IA"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 bg-slate-900/80 hover:bg-slate-800 text-white rounded-xl border border-white/20 backdrop-blur-md transition-all shadow-md"
                  title="Siguiente marca de IA"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
