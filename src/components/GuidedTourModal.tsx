import React, { useState, useEffect } from 'react';
import {
  Bot,
  Sparkles,
  FastForward,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  BookOpen,
  Layers,
  Home,
  MessageSquare,
  ArrowRight,
  Eye,
  Flag,
  LogIn,
  SkipForward
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveScreen } from '../types';

interface GuidedTourModalProps {
  onClose: () => void;
  onNavigate: (screen: ActiveScreen) => void;
  onAddToast: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export type TourStepKey =
  | 'home_banner'
  | 'home_carousel'
  | 'home_filter'
  | 'home_sidebar'
  | 'course_prompt'
  | 'course_details'
  | 'project_details'
  | 'bot_floating';

interface StepInfo {
  key: TourStepKey;
  screenTarget: ActiveScreen;
  badgeLabel: string;
  moduleTitle: string;
  dialogueText: string;
  highlights: string[];
  pointingLabel: string;
  isPrompt?: boolean;
}

const TOUR_STEPS: StepInfo[] = [
  {
    key: 'home_banner',
    screenTarget: 'home',
    badgeLabel: 'Paso 1 • Panel Principal',
    moduleTitle: 'Banner de Bienvenida y Estado Módulo III',
    dialogueText: 'Comenzamos en la cima del Feed Principal. Este banner te muestra la identificación oficial de la materia Módulo III TEC, el número de estudiantes autorizados en la Whitelist (6) y el acceso a la guía del curso.',
    pointingLabel: 'Señalando: Banner Principal, Whitelist TEC (6 Estudiantes) y Accesos Rápidos',
    highlights: [
      'Encabezado principal con nombre oficial "AIE Tracker 2026"',
      'Distintivo Módulo III • Tecnológico de Costa Rica',
      'Acceso rápido al Trabajo Final y Estado de Sincronización'
    ]
  },
  {
    key: 'home_carousel',
    screenTarget: 'home',
    badgeLabel: 'Paso 2 • Panel Principal',
    moduleTitle: 'Carrusel de IAs Recomendadas y Ficha Técnica',
    dialogueText: 'Aquí en el panel principal encuentras la Ficha Técnica de las IAs más relevantes (ChatGPT, Gemini, NotebookLM, DeepSeek, Claude). Puedes votar de 0 a 5 estrellas y consultar sus funciones.',
    pointingLabel: 'Señalando: Fichas Técnicas de ChatGPT, Gemini, NotebookLM, DeepSeek y Claude',
    highlights: [
      'Visualización de logos oficiales de cada Inteligencia Artificial',
      'Calificación interactiva de estrellas (0 a 5) respaldada por el grupo',
      'Filtro de selección rápida para saltar entre modelos de IA'
    ]
  },
  {
    key: 'home_filter',
    screenTarget: 'home',
    badgeLabel: 'Paso 3 • Panel Principal',
    moduleTitle: 'Filtro Dinámico de Contenido del Feed',
    dialogueText: 'En esta sección puedes alternar entre todas las publicaciones del curso, filtrar solo por Noticias de Inteligencia Artificial o ver Tutoriales en Video de YouTube y TikTok.',
    pointingLabel: 'Señalando: Pestañas de Filtro (Todas, Noticias IA, Tutoriales Video)',
    highlights: [
      'Pestaña "Noticias IA": novedades de modelos y actualizaciones TEC',
      'Pestaña "Tutoriales Video": explicaciones en YouTube y TikTok Tech',
      'Buscador integrado para filtrar publicaciones por palabras clave'
    ]
  },
  {
    key: 'home_sidebar',
    screenTarget: 'home',
    badgeLabel: 'Paso 4 • Panel Principal',
    moduleTitle: 'Barra Lateral de Entregas & Fechas Clave',
    dialogueText: 'A la derecha del panel principal tienes el recordatorio constante del Módulo III: Fecha límite del Proyecto Final (11 de Junio), porcentaje de nota (50%) y enlace a la Rúbrica oficial.',
    pointingLabel: 'Señalando: Entregas Próximas, Cuenta Regresiva y Rúbrica de Evaluación',
    highlights: [
      'Próximas entregas con fecha límite y hora exacta (5:00 p.m.)',
      'Ponderación oficial: 40% Informe Técnico Colab + 10% Exposición Oral',
      'Indicadores de estado sincronizados con Google Drive'
    ]
  },
  {
    key: 'course_prompt',
    screenTarget: 'home',
    badgeLabel: 'Paso 5 • Consulta de Navegación',
    moduleTitle: 'Seguimiento del Curso (Módulo 3)',
    dialogueText: 'Llegamos a la sección de Seguimiento del Curso. ¿Deseas ingresar a esta sección para explorar las Clases Grabadas, Diapositivas de Drive y Prácticas de Examen?',
    pointingLabel: 'Consulta: ¿Ingresar a Seguimiento del Curso o ir a Trabajo Final?',
    highlights: [
      'Opción "Ingresar a Seguimiento": explora la videoteca y material lectivo',
      'Opción "Siguiente ➔ Trabajo Final": salta directo al Dashboard del Proyecto',
      'Opción "Terminar": finaliza el tour y vuelve al Feed Principal'
    ],
    isPrompt: true
  },
  {
    key: 'course_details',
    screenTarget: 'course',
    badgeLabel: 'Paso 6 • Seguimiento del Curso',
    moduleTitle: 'Videoteca, Presentaciones Drive & Exámenes',
    dialogueText: '¡Excelente! Ahora estamos dentro de Seguimiento del Curso. Desde aquí accedes a las lecciones semanales, presentaciones PDF alojadas en Google Drive y autoevaluaciones.',
    pointingLabel: 'Señalando: Visor de PPTs de Drive, Videoteca y Exámenes de Práctica',
    highlights: [
      'Material Didáctico: Diapositivas semanales sincronizadas en Drive',
      'Videoteca de Clases: Tutoriales de YouTube y TikTok para Machine Learning',
      'Exámenes Interactivos: Prácticas para consolidar conceptos antes de la entrega'
    ]
  },
  {
    key: 'project_details',
    screenTarget: 'project',
    badgeLabel: 'Paso 7 • Trabajo Final TEC',
    moduleTitle: 'Dashboard de Proyecto, Kanban & Carga .ipynb',
    dialogueText: 'Ahora estamos en el Dashboard del Trabajo Final. Este panel gestiona las métricas de avance del grupo, el tablero Kanban de tareas y la carga de notebooks Python.',
    pointingLabel: 'Señalando: Porcentaje de Avance, Tablero Kanban y Carga en Drive',
    highlights: [
      'Métricas en tiempo real: Pendiente, Producción, Detenido y Terminado',
      'Tablero Kanban con asignación de integrantes Whitelist TEC',
      'Zona de carga directa de archivos .ipynb con confirmación en Google Drive'
    ]
  },
  {
    key: 'bot_floating',
    screenTarget: 'home',
    badgeLabel: 'Paso Final • Asistente Virtual',
    moduleTitle: 'Bot Tutor IA con Tarjetas Adaptativas',
    dialogueText: 'Para finalizar, te señalo el Bot Tutor IA en la esquina inferior derecha. Haz clic en él para recibir respuestas rápidas en Tarjetas Adaptativas sobre rúbrica, datasets y Google Colab.',
    pointingLabel: 'Señalando: Bot Flotante Tutor IA (RAG Módulo III TEC)',
    highlights: [
      'Consultas sobre rúbrica, datasets (Spotify40, SAHeart, Voces, Tumores)',
      'Tarjetas adaptativas con botones de navegación directa',
      'Generación de respuestas puntuales con referencias a la documentación de Drive'
    ]
  }
];

export const GuidedTourModal: React.FC<GuidedTourModalProps> = ({
  onClose,
  onNavigate,
  onAddToast,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSpeedX2, setIsSpeedX2] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const activeStep = TOUR_STEPS[currentStepIndex];

  // Auto scroll to target element and highlight it on live screen
  useEffect(() => {
    let targetId = '';
    switch (activeStep.key) {
      case 'home_banner':
        targetId = 'tour-banner';
        break;
      case 'home_carousel':
        targetId = 'tour-carousel';
        break;
      case 'home_filter':
        targetId = 'tour-nav-cards';
        break;
      case 'home_sidebar':
        targetId = 'tour-deadlines';
        break;
      case 'course_prompt':
        targetId = 'tour-course-card';
        break;
      case 'course_details':
        targetId = 'tour-course-view';
        break;
      case 'project_details':
        targetId = 'tour-project-view';
        break;
      case 'bot_floating':
        targetId = 'tour-chatbot';
        break;
    }

    let cleanup: (() => void) | undefined;

    const timer = setTimeout(() => {
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.classList.add('ring-4', 'ring-indigo-500', 'ring-offset-4', 'shadow-2xl', 'scale-[1.01]', 'transition-all', 'duration-500', 'relative', 'z-30');
          cleanup = () => {
            el.classList.remove('ring-4', 'ring-indigo-500', 'ring-offset-4', 'shadow-2xl', 'scale-[1.01]', 'transition-all', 'duration-500', 'relative', 'z-30');
          };
        }
      }
    }, 120);

    return () => {
      clearTimeout(timer);
      if (cleanup) cleanup();
    };
  }, [activeStep.key, activeStep.screenTarget]);

  // Auto progression except on prompts
  useEffect(() => {
    if (!isAutoPlay || activeStep.isPrompt) return;

    const intervalTime = isSpeedX2 ? 3500 : 7500;

    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        const nextIndex = prev + 1;
        if (nextIndex < TOUR_STEPS.length) {
          const nextStep = TOUR_STEPS[nextIndex];
          onNavigate(nextStep.screenTarget);
          if (nextStep.isPrompt) {
            setIsAutoPlay(false); // Pause auto play when prompt appears
          }
          return nextIndex;
        } else {
          setIsAutoPlay(false);
          return prev;
        }
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isAutoPlay, isSpeedX2, activeStep, onNavigate]);

  const goToStep = (targetKey: TourStepKey) => {
    const idx = TOUR_STEPS.findIndex((s) => s.key === targetKey);
    if (idx !== -1) {
      setCurrentStepIndex(idx);
      onNavigate(TOUR_STEPS[idx].screenTarget);
      if (TOUR_STEPS[idx].isPrompt) {
        setIsAutoPlay(false);
      }
    }
  };

  const handleNext = () => {
    // If on course_prompt and user clicks Next, skip to project_details
    if (activeStep.key === 'course_prompt') {
      goToStep('project_details');
      return;
    }

    // If on course_details, next goes to project_details
    if (activeStep.key === 'course_details') {
      goToStep('project_details');
      return;
    }

    if (currentStepIndex < TOUR_STEPS.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      onNavigate(TOUR_STEPS[nextIdx].screenTarget);
    } else {
      onAddToast('¡Visita guiada completada con éxito!', 'success');
      onNavigate('home');
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      // If we are at project_details coming from course_prompt (or course_details), go back accordingly
      if (activeStep.key === 'project_details') {
        goToStep('course_prompt');
        return;
      }

      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      onNavigate(TOUR_STEPS[prevIdx].screenTarget);
    }
  };

  const handleTerminar = () => {
    onAddToast('Visita guiada finalizada. Regresando al Feed Principal.', 'info');
    onNavigate('home');
    onClose();
  };

  const handleIngresarSeguimiento = () => {
    onAddToast('Ingresando a Seguimiento del Curso...', 'info');
    goToStep('course_details');
    setIsAutoPlay(true);
  };

  const handleSiguienteTrabajoFinal = () => {
    onAddToast('Saltando a Trabajo Final TEC...', 'info');
    goToStep('project_details');
    setIsAutoPlay(true);
  };

  const toggleSpeedX2 = () => {
    const nextSpeed = !isSpeedX2;
    setIsSpeedX2(nextSpeed);
    if (nextSpeed) {
      onAddToast('Modo x2 activado: Visita guiada más rápida', 'info');
    } else {
      onAddToast('Velocidad normal (1x) restablecida', 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-6 bg-slate-950/25 pointer-events-auto">
      
      {/* Floating Pointer / Spotlight Badge indicating pointed element */}
      <div className="fixed top-16 sm:top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <motion.div
          key={activeStep.pointingLabel}
          initial={{ opacity: 0, y: -12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="px-4 py-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-extrabold text-xs rounded-full shadow-2xl border border-white/50 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin shrink-0" />
          <span>{activeStep.pointingLabel}</span>
          <Eye className="w-3.5 h-3.5 text-cyan-200 shrink-0" />
        </motion.div>
      </div>

      {/* Main Guided Tour Box (Floating Conversation Widget) */}
      <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center sm:items-start gap-3.5 z-50 mb-2 sm:mb-0">
        
        {/* Left Column: Speaker Avatar + Photo Controls (x2 & Terminar directly below photo) */}
        <div className="flex flex-col items-center shrink-0 space-y-2.5 bg-white/95 p-3.5 rounded-3xl shadow-2xl border border-indigo-200/90 backdrop-blur-xl w-full sm:w-44 text-center">
          
          {/* Bot Speaker Avatar */}
          <div className="relative group">
            <div className="p-3 bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-500 text-white rounded-3xl shadow-lg ring-4 ring-indigo-100 group-hover:scale-105 transition-transform duration-300">
              <Bot className="w-8 h-8 animate-bounce" />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
            </span>
          </div>

          <div>
            <h4 className="text-xs font-black text-slate-800 tracking-tight">Tutor IA TEC</h4>
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100 inline-block mt-0.5">
              Guía del Panel
            </span>
          </div>

          {/* Action Buttons DIRECTLY BELOW Profile Photo */}
          <div className="w-full space-y-1.5 pt-1.5 border-t border-slate-100">
            {/* Speed x2 Button */}
            <button
              onClick={toggleSpeedX2}
              className={`w-full py-1.5 px-2 rounded-2xl text-xs font-black flex items-center justify-center gap-1 transition-all shadow-xs ${
                isSpeedX2
                  ? 'bg-amber-500 text-white ring-2 ring-amber-300 shadow-md scale-102'
                  : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
              }`}
              title="Acelerar visita guiada al doble de velocidad"
            >
              <FastForward className={`w-3.5 h-3.5 ${isSpeedX2 ? 'animate-pulse' : ''}`} />
              <span>{isSpeedX2 ? 'x2 Activado' : 'x2 (Más rápida)'}</span>
            </button>

            {/* Terminar Button */}
            <button
              onClick={handleTerminar}
              className="w-full py-1.5 px-2 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white border border-rose-200 rounded-2xl text-xs font-black flex items-center justify-center gap-1 transition-all shadow-xs group"
              title="Terminar la visita y regresar al feed principal"
            >
              <Flag className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
              <span>Terminar</span>
            </button>
          </div>

          {/* Pause / Play Toggle */}
          {!activeStep.isPrompt && (
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="text-[10px] font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-1 pt-0.5"
            >
              {isAutoPlay ? <Pause className="w-3 h-3 text-amber-500" /> : <Play className="w-3 h-3 text-emerald-500" />}
              <span>{isAutoPlay ? 'Pausar Tour' : 'Reanudar'}</span>
            </button>
          )}
        </div>

        {/* Right Column: Conversation Speech Bubble (Globo de Conversación) */}
        <div className="flex-1 w-full relative">
          
          {/* Conversation Bubble Triangle Pointer */}
          <div className="hidden sm:block absolute -left-3 top-8 w-0 h-0 border-y-8 border-y-transparent border-r-[12px] border-r-white z-20 drop-shadow-sm" />

          {/* Speech Bubble Box */}
          <div className="glass-panel p-4 sm:p-5 rounded-3xl shadow-2xl border border-indigo-200/90 bg-white/95 text-slate-800 space-y-3.5 relative">
            
            {/* Speech Bubble Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-700 font-extrabold text-[10px] rounded-full border border-indigo-200">
                  {activeStep.badgeLabel}
                </span>
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-800 truncate">{activeStep.moduleTitle}</h3>
              </div>

              <button
                onClick={handleTerminar}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                title="Cerrar y volver al feed principal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Conversation Dialogue Text & Interactive Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.key}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-3"
              >
                {/* Speaker's Balloon Text */}
                <div className="p-3 bg-indigo-50/90 rounded-2xl border border-indigo-100">
                  <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                    🗣️ <span className="italic">{activeStep.dialogueText}</span>
                  </p>
                </div>

                {/* IF PROMPT STEP: Interactive Choice Buttons (Ingresar / Siguiente / Terminar) */}
                {activeStep.isPrompt ? (
                  <div className="space-y-2 pt-1 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 p-3 rounded-2xl border border-indigo-100">
                    <span className="text-[11px] font-black text-indigo-900 uppercase tracking-wider block">
                      ¿Qué deseas hacer a continuación?
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                      {/* Option 1: Ingresar */}
                      <button
                        onClick={handleIngresarSeguimiento}
                        className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black transition-all shadow-md flex items-center justify-center gap-1.5 group"
                      >
                        <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>Ingresar a Seguimiento</span>
                      </button>

                      {/* Option 2: Siguiente (Trabajo Final) */}
                      <button
                        onClick={handleSiguienteTrabajoFinal}
                        className="p-2.5 bg-purple-100 hover:bg-purple-200 text-purple-800 border border-purple-300 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 group"
                      >
                        <SkipForward className="w-4 h-4 text-purple-700 group-hover:translate-x-0.5 transition-transform" />
                        <span>Siguiente ➔ Trabajo Final</span>
                      </button>

                      {/* Option 3: Terminar */}
                      <button
                        onClick={handleTerminar}
                        className="p-2.5 bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-700 border border-slate-200 hover:border-rose-300 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5"
                      >
                        <Flag className="w-4 h-4 text-rose-500" />
                        <span>Terminar Tour</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Bullet points for non-prompt steps */
                  <div className="space-y-1.5 pt-1">
                    <h5 className="text-[10px] font-extrabold text-indigo-900 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Funciones Destacadas en este Panel:</span>
                    </h5>

                    <ul className="space-y-1.5">
                      {activeStep.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 p-1.5 bg-slate-50 hover:bg-indigo-50/50 rounded-xl border border-slate-200/80 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Conversation Bubble Footer & Nav Buttons */}
            <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
              
              {/* Step Progress Pills */}
              <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
                {TOUR_STEPS.map((step, idx) => (
                  <button
                    key={step.key}
                    onClick={() => {
                      setCurrentStepIndex(idx);
                      onNavigate(step.screenTarget);
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentStepIndex
                        ? 'w-5 bg-indigo-600'
                        : 'w-1.5 bg-slate-200 hover:bg-slate-300'
                    }`}
                    title={step.moduleTitle}
                  />
                ))}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={handlePrev}
                  disabled={currentStepIndex === 0}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-xl text-xs font-black transition-all flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Anterior</span>
                </button>

                <button
                  onClick={handleNext}
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1.5"
                >
                  <span>
                    {currentStepIndex === TOUR_STEPS.length - 1
                      ? 'Finalizar Visita'
                      : activeStep.key === 'course_prompt'
                      ? 'Saltar a Trabajo Final'
                      : 'Siguiente Opción'}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
