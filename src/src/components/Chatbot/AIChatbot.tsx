import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { ChatMessage, ActiveScreen, AdaptiveCardActionButton } from '../../types';
import {
  Bot,
  Send,
  Sparkles,
  X,
  Minimize2,
  Maximize2,
  Calendar,
  Database,
  Cpu,
  UploadCloud,
  Video,
  ListTodo,
  ChevronRight,
  ExternalLink,
  Award
} from 'lucide-react';

interface AIChatbotProps {
  activeScreen: ActiveScreen;
  onNavigate?: (screen: ActiveScreen) => void;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({ activeScreen, onNavigate }) => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  // Initial welcome message with 6 habitual options in adaptive card format
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: "¡Hola! Soy tu Tutor IA del Módulo III TEC. Mis respuestas son puntuales y estructuradas en Tarjetas Adaptativas. Selecciona una consulta frecuente:",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      cardType: 'welcome_menu',
      cardTitle: 'Menú de Opciones Frecuentes',
      actionButtons: [
        { label: '📅 Rúbrica y Fechas de Entrega', action: 'rubric', screen: 'project' },
        { label: '📊 Estado de Datasets Asignados', action: 'datasets', screen: 'project' },
        { label: '💡 Recomendación Modelo ML / Colab', action: 'recommendation' },
        { label: '📁 Dónde subir mi notebook .ipynb', action: 'upload_guide', screen: 'project' },
        { label: '🎥 Clases Grabadas y Videoteca', action: 'videoteca', screen: 'course' },
        { label: '⚡ Resumen de Tareas Pendientes', action: 'tasks', screen: 'project' }
      ],
      sources: ["Modulo 3/Guía del Curso TEC"]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  // Available everywhere EXCEPT inside "Seguimiento del Curso"
  if (activeScreen === 'course') {
    return null;
  }

  // Predefined structured adaptive card replies for fast, punctual responses
  const getPredefinedOptionReply = (actionKey: string): ChatMessage => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    switch (actionKey) {
      case 'rubric':
        return {
          id: `bot_${Date.now()}`,
          sender: 'bot',
          text: "El Proyecto Final representa el 50% de la nota final. Consiste en 40% del Informe Técnico en Google Colab y 10% de la Exposición Oral ante el Jurado.",
          timestamp,
          cardType: 'rubric',
          cardTitle: '📅 Rúbrica Oficial & Fechas Clave',
          cardMetrics: [
            { label: 'Fecha Límite:', value: '11 de Junio, 5:00 p.m.' },
            { label: 'Formato Obligatorio:', value: '.ipynb (Google Colab)' },
            { label: 'Profesor Titular:', value: 'Ph.D. Heiner Romero' },
            { label: 'Tiempo Exposición:', value: '12 min exp + 5 min Q&A' }
          ],
          actionButtons: [
            { label: 'Ver Rúbrica en Proyecto Final ➔', action: 'nav_project', screen: 'project' }
          ],
          sources: ["Rúbrica_Trabajo_Final_Modulo_3.pdf"]
        };

      case 'datasets':
        return {
          id: `bot_${Date.now()}`,
          sender: 'bot',
          text: "Los 4 datasets oficiales asignados por el TEC son: Spotify40 (Grupo 01), SAHeart (Grupo 02), Voces (Grupo 03) y Tumores (Grupo 04).",
          timestamp,
          cardType: 'datasets',
          cardTitle: '📊 Datasets Asignados por Grupo',
          cardMetrics: [
            { label: 'Grupo 01:', value: 'Spotify40 (Clasificación/Regresión)' },
            { label: 'Grupo 02:', value: 'SAHeart (Salud/Corazón)' },
            { label: 'Grupo 03:', value: 'Voces (Frecuencia/Audio)' },
            { label: 'Grupo 04:', value: 'Tumores (Biomédica)' }
          ],
          actionButtons: [
            { label: 'Abrir Tablero de Datasets ➔', action: 'nav_project', screen: 'project' }
          ],
          sources: ["Modulo 3/Datasets"]
        };

      case 'recommendation':
        return {
          id: `bot_${Date.now()}`,
          sender: 'bot',
          text: "Para un rendimiento óptimo en Google Colab, se recomienda XGBoost o LightGBM para datos tabulares, y Gemini API / Sentence-Transformers con ChromaDB para pipelines RAG.",
          timestamp,
          cardType: 'recommendation',
          cardTitle: '💡 Recomendación de Modelo ML / RAG',
          cardMetrics: [
            { label: 'Modelo Tabular:', value: 'XGBoost / Random Forest' },
            { label: 'Pipeline RAG:', value: 'Gemini 2.5 Flash + FAISS/Chroma' },
            { label: 'Métrica Clave:', value: 'R² > 0.85 / Accuracy > 90%' }
          ],
          actionButtons: [
            { label: 'Consultar Documentación Colab ➔', action: 'nav_project', screen: 'project' }
          ],
          sources: ["Semana 5 / RAG & ML Pipelines"]
        };

      case 'upload_guide':
        return {
          id: `bot_${Date.now()}`,
          sender: 'bot',
          text: "Puedes subir tu archivo directamente desde la pestaña 'Subidas' en Trabajo Final. El asistente realizará una verificación de integridad y confirmación real en Google Drive.",
          timestamp,
          cardType: 'upload_guide',
          cardTitle: '📁 Asistente de Carga de .ipynb',
          cardMetrics: [
            { label: 'Directorio:', value: 'Modulo 3/Trabajo Final/Uploads' },
            { label: 'Verificación:', value: 'Checksum SHA-256' },
            { label: 'Confirmación:', value: 'Enlace directo a Drive' }
          ],
          actionButtons: [
            { label: 'Ir a Subir Archivo Ahora ➔', action: 'nav_project', screen: 'project' }
          ],
          sources: ["Drive Sync Integración TEC"]
        };

      case 'videoteca':
        return {
          id: `bot_${Date.now()}`,
          sender: 'bot',
          text: "Las clases grabadas y los tutoriales en video (YouTube y TikTok Tech) están disponibles en la sección Videoteca del seguimiento del curso.",
          timestamp,
          cardType: 'videoteca',
          cardTitle: '🎥 Videoteca & Clases del Módulo III',
          cardMetrics: [
            { label: 'Clases Disponibles:', value: 'Semana 1 a Semana 6' },
            { label: 'Contenido Extra:', value: 'Tutoriales YouTube & TikTok' }
          ],
          actionButtons: [
            { label: 'Ir a la Videoteca ➔', action: 'nav_course', screen: 'course' }
          ],
          sources: ["Videoteca Módulo III"]
        };

      case 'tasks':
        return {
          id: `bot_${Date.now()}`,
          sender: 'bot',
          text: "El tablero incluye 4 estados interactivos: Pendiente, En producción, Detenido y Terminado. El porcentaje global se actualiza automáticamente.",
          timestamp,
          cardType: 'tasks',
          cardTitle: '⚡ Resumen Puntual de Tareas',
          cardMetrics: [
            { label: 'Estado Global:', value: 'En progreso activo' },
            { label: 'Integrantes:', value: '6 Estudiantes Whitelist' }
          ],
          actionButtons: [
            { label: 'Ver Dashboard de Tareas ➔', action: 'nav_project', screen: 'project' }
          ],
          sources: ["Modulo 3/Tablero de Tareas"]
        };

      default:
        return {
          id: `bot_${Date.now()}`,
          sender: 'bot',
          text: "Consulta procesada con éxito con los datos del Módulo III.",
          timestamp,
          cardType: 'general',
          cardTitle: 'Respuesta Puntual',
          sources: ["Modulo 3/Drive"]
        };
    }
  };

  const handleSelectOption = (option: AdaptiveCardActionButton) => {
    // 1. Send user message bubble
    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: option.label,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);

    // 2. If action has a target screen, optionally navigate
    if (option.screen && onNavigate) {
      onNavigate(option.screen);
    }

    // 3. Immediately reply with structured adaptive card
    setIsThinking(true);
    setTimeout(() => {
      const botReply = getPredefinedOptionReply(option.action);
      setMessages((prev) => [...prev, botReply]);
      setIsThinking(false);
    }, 400);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMsg;
    if (!query.trim() || isThinking) return;

    const userMessage: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputMsg('');
    setIsThinking(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          language,
          history: messages.slice(-6)
        })
      });

      if (!response.ok) throw new Error('API Error');

      const data = await response.json();

      const botReply: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: data.reply || 'Respuesta generada.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cardType: 'general',
        cardTitle: 'Respuesta Puntual AI Tutor',
        sources: data.sources || ["Modulo 3/Documentos de Drive"]
      };

      setMessages((prev) => [...prev, botReply]);
    } catch {
      // Fallback response adaptive card
      const fallbackMsg: ChatMessage = {
        id: `bot_err_${Date.now()}`,
        sender: 'bot',
        text: "Estoy respaldado en tus archivos de Drive del Módulo III. Puedes revisar las diapositivas de la Semana 5 para arquitectura RAG o consultar la Rúbrica oficial.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cardType: 'general',
        cardTitle: 'Respuesta Puntos Clave',
        sources: ["Modulo 3/Documentos en Drive"]
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div id="tour-chatbot" className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Trigger Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative p-4 bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-500 text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center border border-white/40"
          title="Abrir Tutor IA AIE"
        >
          <Bot className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
          </span>
        </button>
      )}

      {/* Chatbot Drawer / Modal */}
      {isOpen && (
        <div
          className={`glass-panel rounded-3xl shadow-2xl border border-white/90 flex flex-col transition-all duration-300 ${
            isMinimized
              ? 'w-80 h-16 p-3 overflow-hidden'
              : 'w-88 sm:w-[420px] h-[560px] p-4 sm:p-5'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white rounded-2xl shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-800">{t('botHeaderTitle')}</h3>
                <p className="text-[10px] text-slate-500 truncate max-w-[200px]">Respuestas puntuales en Tarjetas Adaptativas</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 text-slate-400 hover:text-slate-600 glass-button rounded-xl"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 glass-button rounded-xl"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-1">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[92%] p-3.5 rounded-2xl text-xs space-y-2.5 ${
                        msg.sender === 'user'
                          ? 'bg-indigo-600 text-white rounded-br-none shadow-sm'
                          : 'bg-white/95 text-slate-800 rounded-bl-none border border-indigo-100 shadow-md'
                      }`}
                    >
                      {/* Optional Adaptive Card Header */}
                      {msg.cardTitle && (
                        <div className="flex items-center gap-1.5 pb-2 border-b border-indigo-100 text-indigo-900 font-extrabold text-xs">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                          <span>{msg.cardTitle}</span>
                        </div>
                      )}

                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                      {/* Adaptive Card Key Metrics */}
                      {msg.cardMetrics && msg.cardMetrics.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                          {msg.cardMetrics.map((m, idx) => (
                            <div key={idx} className="p-2 bg-indigo-50/80 rounded-xl border border-indigo-100 space-y-0.5">
                              <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-wider block">{m.label}</span>
                              <span className="text-xs font-bold text-slate-800 block">{m.value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Adaptive Card List Menu Buttons */}
                      {msg.actionButtons && msg.actionButtons.length > 0 && (
                        <div className="space-y-1.5 pt-2 border-t border-slate-100">
                          {msg.actionButtons.map((btn, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSelectOption(btn)}
                              className="w-full text-left p-2 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-xl transition-all text-xs font-bold text-slate-700 hover:text-indigo-700 flex items-center justify-between group"
                            >
                              <span>{btn.label}</span>
                              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Sources Cited */}
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="pt-1.5 border-t border-slate-200/40 text-[9px] text-slate-400 flex flex-wrap gap-1">
                          <span className="font-semibold text-indigo-600">Fuente:</span>
                          {msg.sources.map((s, idx) => (
                            <span key={idx} className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] text-slate-400 mt-0.5 px-1">{msg.timestamp}</span>
                  </div>
                ))}

                {isThinking && (
                  <div className="flex items-center gap-2 text-xs text-indigo-600 font-medium p-2 bg-indigo-50/80 rounded-2xl border border-indigo-100 animate-pulse w-fit">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    <span>Generando respuesta puntual...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="pt-2 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Pregunta sobre rúbrica, Colab, RAG o tareas..."
                  className="flex-1 p-2.5 glass-input rounded-2xl text-xs"
                />
                <button
                  type="submit"
                  disabled={!inputMsg.trim() || isThinking}
                  className="p-2.5 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 disabled:opacity-40 transition-all shrink-0 shadow-sm shadow-indigo-500/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};
