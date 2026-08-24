import React, { useState, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { ActiveScreen, DeadlineItem, StudentMember, NewsItem } from '../types';
import { AnimatedBanner } from './AnimatedBanner';
import { NewsSection } from './NewsSection';
import {
  BookOpen,
  Layers,
  Calendar,
  Clock,
  ArrowRight,
  Bot,
  FolderGit2,
  ChevronDown,
  ChevronRight,
  CalendarPlus,
  ExternalLink,
  FileText
} from 'lucide-react';

interface MainDashboardProps {
  onNavigate: (screen: ActiveScreen) => void;
  deadlines: DeadlineItem[];
  members: StudentMember[];
  news: NewsItem[];
  currentUser: StudentMember;
  onAddNews: (item: NewsItem) => void;
  onFetchAINews: () => Promise<void>;
  onOpenIntro: () => void;
  onStartTour?: () => void;
  onAddToast: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const MainDashboard: React.FC<MainDashboardProps> = ({
  onNavigate,
  deadlines,
  members,
  news,
  currentUser,
  onAddNews,
  onFetchAINews,
  onOpenIntro,
  onStartTour,
  onAddToast,
}) => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'course' | 'project'>('all');
  const [isDeadlinesCollapsed, setIsDeadlinesCollapsed] = useState(false);
  const [expandedDeadlineIds, setExpandedDeadlineIds] = useState<string[]>([]);
  const newsRef = useRef<HTMLDivElement>(null);

  const filteredDeadlines = deadlines.filter((item) => {
    if (filter === 'course') return item.category === 'course';
    if (filter === 'project') return item.category === 'project';
    return true;
  });

  const toggleExpandDeadline = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedDeadlineIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getGoogleCalendarUrl = (title: string, details: string, dueDate: string) => {
    const titleEnc = encodeURIComponent(`[TEC M3] ${title}`);
    const detailsEnc = encodeURIComponent(
      `${details}\n\nEntrega oficial Módulo 3 - Tecnológico de Costa Rica (FUNDATEC)`
    );
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${titleEnc}&details=${detailsEnc}`;
  };

  const scrollToNews = () => {
    newsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      
      {/* Stripe-Inspired Animated Hero Banner */}
      <AnimatedBanner
        onOpenIntro={onOpenIntro}
        onExploreNews={scrollToNews}
        onStartTour={onStartTour}
      />

      {/* Two Prominent Navigation Cards (Section 3.1) */}
      <div id="tour-nav-cards" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Seguimiento del Curso */}
        <div
          id="tour-course-card"
          onClick={() => onNavigate('course')}
          className="group glass-panel p-6 sm:p-8 rounded-3xl cursor-pointer hover:border-indigo-300/80 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 relative overflow-hidden flex flex-col justify-between"
        >
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className="p-3.5 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100/80 group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7" />
              </div>
              <span className="px-3 py-1 text-[11px] font-medium bg-slate-100 text-slate-600 rounded-full border border-slate-200/60">
                {t('courseCardBadge')}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                {t('courseCardTitle')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                {t('courseCardDesc')}
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-500 font-medium flex-wrap">
              <span className="flex items-center gap-1 bg-white/70 px-2.5 py-1 rounded-xl border border-slate-200/50">
                📚 6 Semanas PPTs
              </span>
              <span className="flex items-center gap-1 bg-white/70 px-2.5 py-1 rounded-xl border border-slate-200/50">
                🎯 Checklists y Notas
              </span>
              <span className="flex items-center gap-1 bg-white/70 px-2.5 py-1 rounded-xl border border-slate-200/50">
                💻 Notebooks Colab
              </span>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-200/50 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
            <span>{t('enterSection')}</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Card 2: Trabajo Final */}
        <div
          id="tour-project-card"
          onClick={() => onNavigate('project')}
          className="group glass-panel p-6 sm:p-8 rounded-3xl cursor-pointer hover:border-purple-300/80 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5 relative overflow-hidden flex flex-col justify-between"
        >
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className="p-3.5 bg-purple-50 text-purple-600 rounded-2xl border border-purple-100/80 group-hover:scale-110 transition-transform">
                <Layers className="w-7 h-7" />
              </div>
              <span className="p-2 bg-purple-50 text-purple-700 rounded-2xl border border-purple-100/80 flex items-center justify-center shadow-xs" title="Chatbot Asistente IA">
                <Bot className="w-4 h-4 text-purple-600" />
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-800 group-hover:text-purple-600 transition-colors">
                {t('projectCardTitle')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                {t('projectCardDesc')}
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-500 font-medium flex-wrap">
              <span className="flex items-center gap-1 bg-white/70 px-2.5 py-1 rounded-xl border border-slate-200/50">
                📊 Métricas PM
              </span>
              <span className="flex items-center gap-1 bg-white/70 px-2.5 py-1 rounded-xl border border-slate-200/50">
                📑 Rúbrica 100 Pts
              </span>
              <span className="flex items-center gap-1 bg-white/70 px-2.5 py-1 rounded-xl border border-slate-200/50">
                ☁️ Drive /Uploads
              </span>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-200/50 flex items-center justify-between text-xs font-semibold text-purple-600 group-hover:translate-x-1 transition-transform">
            <span>{t('enterSection')}</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 1ST PLACE: Deadlines Timeline / Calendar Widget with Left Collapse Arrow */}
      <div id="tour-deadlines" className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 border border-white/90">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/60">
          <div className="flex items-center gap-3">
            {/* Collapse Arrow on Left of Section Header */}
            <button
              onClick={() => setIsDeadlinesCollapsed(!isDeadlinesCollapsed)}
              className="p-2 bg-indigo-100/80 hover:bg-indigo-200 text-indigo-700 rounded-xl transition-all border border-indigo-200/80"
              title={isDeadlinesCollapsed ? 'Expandir sección' : 'Colapsar sección'}
            >
              {isDeadlinesCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>

            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span>{t('upcomingDeadlines')}</span>
                <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-semibold border border-indigo-100">
                  {filteredDeadlines.length}
                </span>
              </h3>
              <p className="text-xs text-slate-500">{t('deadlinesSubtitle')}</p>
            </div>
          </div>

          {/* Timeline Filters */}
          {!isDeadlinesCollapsed && (
            <div className="flex items-center gap-1 bg-slate-100/70 p-1 rounded-2xl border border-white/80 self-start sm:self-auto">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-xs font-medium rounded-xl transition-all ${
                  filter === 'all'
                    ? 'bg-white text-indigo-600 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t('filterAll')}
              </button>
              <button
                onClick={() => setFilter('course')}
                className={`px-3 py-1 text-xs font-medium rounded-xl transition-all ${
                  filter === 'course'
                    ? 'bg-white text-indigo-600 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t('filterCourse')}
              </button>
              <button
                onClick={() => setFilter('project')}
                className={`px-3 py-1 text-xs font-medium rounded-xl transition-all ${
                  filter === 'project'
                    ? 'bg-white text-indigo-600 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t('filterProject')}
              </button>
            </div>
          )}
        </div>

        {/* Timeline Items List (Collapsible Content) */}
        {!isDeadlinesCollapsed && (
          <div className="space-y-3">
            {filteredDeadlines.map((item) => {
              const isCourse = item.category === 'course';
              const isExpanded = expandedDeadlineIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  className="glass-panel-subtle p-4 rounded-2xl space-y-3 hover:bg-white/90 transition-all border border-slate-200/60"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      {/* Item-level collapse button */}
                      <button
                        onClick={(e) => toggleExpandDeadline(item.id, e)}
                        className="p-1.5 hover:bg-slate-200/60 rounded-lg text-slate-500 mt-1 transition-colors"
                        title={isExpanded ? 'Ocultar detalles' : 'Ver más detalles'}
                      >
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>

                      <div
                        className={`p-2.5 rounded-2xl shrink-0 mt-0.5 ${
                          isCourse
                            ? 'bg-blue-50 text-blue-600 border border-blue-100'
                            : 'bg-purple-50 text-purple-600 border border-purple-100'
                        }`}
                      >
                        {isCourse ? <BookOpen className="w-4 h-4" /> : <FolderGit2 className="w-4 h-4" />}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-800">{item.title}</h4>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              isCourse ? 'bg-blue-100/80 text-blue-700' : 'bg-purple-100/80 text-purple-700'
                            }`}
                          >
                            {isCourse ? t('filterCourse') : t('filterProject')}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-1">{item.description}</p>
                      </div>
                    </div>

                    {/* Urgency Badge & Actions */}
                    <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-center shrink-0 flex-wrap sm:flex-nowrap justify-end">
                      {item.pdfUrl && (
                        <a
                          href={item.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-bold rounded-xl border border-rose-200/80 flex items-center gap-1.5 transition-all shadow-sm"
                          title="Abrir documento PDF adjunto de la tarea"
                        >
                          <FileText className="w-3.5 h-3.5 text-rose-600" />
                          <span>PDF Adjunto</span>
                          <ExternalLink className="w-3 h-3 text-rose-400" />
                        </a>
                      )}

                      <a
                        href={getGoogleCalendarUrl(item.title, item.description, item.dueDate)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-bold rounded-xl border border-indigo-200/70 flex items-center gap-1.5 transition-colors"
                        title="Crear recordatorio en Google Calendar"
                      >
                        <CalendarPlus className="w-3.5 h-3.5 text-indigo-600" />
                        <span className="hidden sm:inline">Google Calendar</span>
                      </a>

                      <div className="text-right">
                        <div className="text-xs font-bold text-slate-700 flex items-center gap-1 justify-end">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {item.dueDate}
                        </div>
                        <span
                          className={`inline-block mt-0.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                            item.urgentLevel === 'high'
                              ? 'bg-rose-100 text-rose-700 border border-rose-200 animate-pulse'
                              : item.urgentLevel === 'medium'
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {item.urgencyDays === 0
                            ? t('urgentToday')
                            : item.urgencyDays === 1
                            ? t('urgentTomorrow')
                            : t('daysLeft', { days: item.urgencyDays })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Item Details */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-slate-200/60 text-xs text-slate-600 space-y-2.5 animate-in fade-in duration-200 pl-8">
                      <div className="p-3 bg-white/80 rounded-xl border border-slate-200/50 space-y-2">
                        <p className="font-semibold text-slate-800">Descripción detallada de la entrega:</p>
                        <p className="leading-relaxed text-slate-600">{item.description}</p>
                        {item.pdfUrl && (
                          <div className="p-2.5 bg-rose-50/80 rounded-xl border border-rose-200 flex items-center justify-between mt-2">
                            <span className="font-bold text-rose-900 text-xs flex items-center gap-2">
                              <FileText className="w-4 h-4 text-rose-600" />
                              Documento PDF Adjunto de la Tarea:
                            </span>
                            <a
                              href={item.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                            >
                              <span>Abrir en Google Drive</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}
                        <div className="flex items-center gap-2 pt-1">
                          <span className="font-semibold text-slate-700">Responsables sugeridos:</span>
                          <span className="text-slate-500 font-medium">Todo el Equipo de Módulo 3</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredDeadlines.length === 0 && (
              <p className="text-center py-8 text-xs text-slate-400">{t('noDeadlines')}</p>
            )}
          </div>
        )}
      </div>

      {/* 2ND PLACE: AI & Automation News Feed Section */}
      <div id="tour-news" ref={newsRef}>
        <NewsSection
          news={news}
          currentUser={currentUser}
          onAddNews={onAddNews}
          onFetchAINews={onFetchAINews}
          onAddToast={onAddToast}
        />
      </div>

      {/* Discrete Team Members Carousel / Footer Strip */}
      <div className="glass-panel-subtle p-4 rounded-2xl border border-white/80 text-center space-y-2">
        <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
          {t('teamMembers')} (Equipo Módulo 3 - Máximo 6)
        </p>
        <div className="flex items-center justify-center gap-2 flex-wrap text-xs font-semibold text-slate-700">
          {members.map((m, idx) => (
            <React.Fragment key={m.id}>
              {idx > 0 && <span className="text-slate-300">•</span>}
              <span className="hover:text-indigo-600 transition-colors cursor-pointer" title={m.email}>
                {m.name}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

