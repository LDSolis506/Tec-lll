import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { WeekPPT, StudentMember } from '../../types';
import { PracticeQuizModal } from './PracticeQuizModal';
import {
  BookOpen,
  HelpCircle,
  FileText,
  ExternalLink,
  Folder,
  Sparkles,
  NotebookPen,
  PenTool,
  Save,
  Code2
} from 'lucide-react';

interface CourseTrackingViewProps {
  weeks: WeekPPT[];
  currentUser: StudentMember;
  onAddToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const CourseTrackingView: React.FC<CourseTrackingViewProps> = ({
  weeks,
  currentUser,
  onAddToast,
}) => {
  const { t } = useLanguage();
  const [selectedWeekForQuiz, setSelectedWeekForQuiz] = useState<WeekPPT | null>(null);

  // Notes per week state (scoped per user)
  const getUserNotesKey = (userId: string) => `aie_class_notes_${userId}`;
  const getUserProgressKey = (userId: string) => `aie_week_progress_${userId}`;

  const [classNotes, setClassNotes] = useState<Record<string, string>>({});
  const [weekProgress, setWeekProgress] = useState<Record<string, number>>({});

  // Reload notes & progress whenever currentUser changes
  useEffect(() => {
    if (!currentUser) return;
    const userId = currentUser.id || currentUser.email;
    try {
      const savedNotes = localStorage.getItem(getUserNotesKey(userId)) || localStorage.getItem('aie_class_notes');
      if (savedNotes) setClassNotes(JSON.parse(savedNotes));
      else setClassNotes({});

      const savedProg = localStorage.getItem(getUserProgressKey(userId)) || localStorage.getItem('aie_week_progress');
      if (savedProg) setWeekProgress(JSON.parse(savedProg));
      else setWeekProgress({});
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  const [activeNoteWeekId, setActiveNoteWeekId] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState('');

  // Save notes to localStorage (user-scoped)
  const handleSaveNotes = (weekId: string) => {
    const updated = { ...classNotes, [weekId]: editingNote };
    setClassNotes(updated);
    const userId = currentUser.id || currentUser.email;
    try {
      localStorage.setItem(getUserNotesKey(userId), JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    onAddToast('Notas de clase guardadas correctamente', 'success');
    setActiveNoteWeekId(null);
  };

  const handleUpdateProgress = (weekId: string, maxSlides: number, completed: number) => {
    const val = Math.min(maxSlides, Math.max(0, completed));
    const updated = { ...weekProgress, [weekId]: val };
    setWeekProgress(updated);
    const userId = currentUser.id || currentUser.email;
    try {
      localStorage.setItem(getUserProgressKey(userId), JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const totalSlidesAcrossWeeks = weeks.reduce((acc, w) => acc + w.slidesCount, 0);
  const totalCompletedSlides = weeks.reduce((acc, w) => acc + (weekProgress[w.id] || 0), 0);
  const overallPercentage = Math.round((totalCompletedSlides / totalSlidesAcrossWeeks) * 100) || 0;

  return (
    <div id="tour-course-view" className="space-y-8 animate-in fade-in duration-300 pb-16">
      
      {/* Header Block with Syllabus & Key Info */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-100">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t('courseHeaderTitle')}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
              Aplicaciones de la Inteligencia Artificial Empresarial
            </h2>
            <p className="text-xs text-slate-500">{t('courseHeaderDesc')}</p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <a
              href="https://notebook.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-blue-500/20"
              title="Abrir Google Notebook para editar y practicar con código"
            >
              <Code2 className="w-4 h-4 text-cyan-200" />
              <span>Editar con Notebook</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>

        {/* Global Slide Tracker & Notes Progress Bar */}
        <div className="p-4 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-2xl border border-blue-100/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-800">Tracker Personalizado de Presentaciones y Lectura</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Progresión global: {totalCompletedSlides} de {totalSlidesAcrossWeeks} diapositivas estudiadas ({overallPercentage}%)
            </p>
          </div>

          <div className="w-full sm:w-64 space-y-1">
            <div className="h-2.5 w-full bg-slate-200/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* SUB-SECTION: PPTs, Tareas y Prácticas Notebook por Semana */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weeks.map((wk) => {
            const completed = weekProgress[wk.id] || 0;
            const hasNotes = !!classNotes[wk.id];
            const isNoteOpen = activeNoteWeekId === wk.id;

            return (
              <div
                key={wk.id}
                className="glass-panel p-6 rounded-3xl space-y-4 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Folder Header */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100 flex items-center gap-1.5">
                      <Folder className="w-3.5 h-3.5 text-blue-600" />
                      {t('week')} {wk.weekNumber}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">
                      {completed} / {wk.slidesCount} slides
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-800 leading-snug">
                    {wk.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {wk.summary}
                  </p>

                  {/* Progress Slider per Week */}
                  <div className="space-y-1 bg-slate-50 p-2.5 rounded-2xl border border-slate-200/60">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-700">
                      <span>Avance de lectura PPT</span>
                      <span>{Math.round((completed / wk.slidesCount) * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={wk.slidesCount}
                      value={completed}
                      onChange={(e) => handleUpdateProgress(wk.id, wk.slidesCount, parseInt(e.target.value))}
                      className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Notes, PPTs, Notebook & Action Buttons */}
                <div className="space-y-2.5 pt-4 border-t border-slate-200/50">
                  {/* Class Notes Button */}
                  <button
                    onClick={() => {
                      if (isNoteOpen) {
                        setActiveNoteWeekId(null);
                      } else {
                        setActiveNoteWeekId(wk.id);
                        setEditingNote(classNotes[wk.id] || '');
                      }
                    }}
                    className={`w-full px-3.5 py-2 rounded-2xl text-xs font-semibold flex items-center justify-between transition-all ${
                      hasNotes
                        ? 'bg-amber-50 text-amber-800 border border-amber-200/80'
                        : 'bg-slate-100/80 text-slate-700 border border-slate-200/60 hover:bg-slate-200/80'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <NotebookPen className="w-4 h-4 text-amber-600" />
                      <span>{hasNotes ? 'Notas de Clase Guardadas' : 'Añadir Notas de Clase'}</span>
                    </span>
                    <PenTool className="w-3.5 h-3.5" />
                  </button>

                  {/* Notes Drawer */}
                  {isNoteOpen && (
                    <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-200/80 space-y-2 animate-in fade-in duration-200">
                      <label className="block text-[11px] font-bold text-amber-900">
                        Mis Apuntes - Semana {wk.weekNumber}
                      </label>
                      <textarea
                        rows={4}
                        value={editingNote}
                        onChange={(e) => setEditingNote(e.target.value)}
                        placeholder="Escribe tus notas clave, dudas para el profesor o formulas aprendidas..."
                        className="w-full p-2.5 bg-white rounded-xl text-xs border border-amber-200 text-slate-800 resize-none focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                      <button
                        onClick={() => handleSaveNotes(wk.id)}
                        className="w-full py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Guardar Apuntes</span>
                      </button>
                    </div>
                  )}

                  {/* Homework / Tarea PDF Link Block */}
                  {wk.homeworkPdfUrl && (
                    <div className="p-3 bg-gradient-to-r from-rose-50 to-amber-50 rounded-2xl border border-rose-200/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-rose-600" />
                          {wk.homeworkTitle || 'Tarea Asignada'}
                        </span>
                      </div>
                      <a
                        href={wk.homeworkPdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center justify-between transition-colors shadow-sm"
                      >
                        <span className="flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5" />
                          Ver PDF de la Tarea en Google Drive
                        </span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}

                  {/* PPT / Presentation Links */}
                  {wk.presentations && wk.presentations.length > 0 ? (
                    <div className="space-y-2">
                      {wk.presentations.map((pres, idx) => (
                        <a
                          key={idx}
                          href={pres.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full glass-button px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-700 hover:text-blue-600 flex items-center justify-between transition-all hover:bg-blue-50/80 border border-blue-100/80 shadow-sm"
                          title={`Abrir presentación: ${pres.title}`}
                        >
                          <span className="flex items-center gap-2 truncate pr-2">
                            <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                            <span className="truncate">{pres.title}</span>
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <a
                      href={wk.pptUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full glass-button px-3.5 py-2 rounded-2xl text-xs font-semibold text-slate-700 hover:text-blue-600 flex items-center justify-between transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-500" />
                        {t('viewPPT')}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </a>
                  )}

                  {/* Editar con Notebook Button */}
                  <a
                    href="https://notebook.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm shadow-blue-500/20"
                    title="Editar y ejecutar prácticas en Google Notebook"
                  >
                    <Code2 className="w-4 h-4 text-cyan-200" />
                    <span>Editar con Notebook</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>

                  {/* 20-Question Practice Quiz Button */}
                  <button
                    onClick={() => setSelectedWeekForQuiz(wk)}
                    className="w-full px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    <HelpCircle className="w-4 h-4 text-amber-300" />
                    <span>{t('practiceQuizBtn')}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Practice Quiz Modal Trigger */}
      {selectedWeekForQuiz && (
        <PracticeQuizModal
          isOpen={!!selectedWeekForQuiz}
          onClose={() => setSelectedWeekForQuiz(null)}
          week={selectedWeekForQuiz}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};
