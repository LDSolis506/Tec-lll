import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  StudentMember,
  RubricCriterion,
  ProjectTask,
  DriveUploadItem,
  TaskStatus
} from '../../types';
import {
  Layers,
  BarChart3,
  CheckSquare,
  UploadCloud,
  FileCheck,
  ChevronDown,
  ChevronUp,
  Plus,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Award,
  PlayCircle,
  PauseCircle,
  CheckCircle2,
  AlertCircle,
  Folder,
  FileText
} from 'lucide-react';

import { AdvancedPmDashboardModal } from './AdvancedPmDashboardModal';
import { FileUploadModal } from '../FileUploadModal';

interface FinalProjectViewProps {
  members: StudentMember[];
  rubric: RubricCriterion[];
  tasks: ProjectTask[];
  uploads: DriveUploadItem[];
  currentUser: StudentMember;
  onAddTask: (task: ProjectTask) => void;
  onUploadFile: (file: DriveUploadItem) => void;
  onAddToast: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const FinalProjectView: React.FC<FinalProjectViewProps> = ({
  members,
  rubric,
  tasks,
  uploads,
  currentUser,
  onAddTask,
  onUploadFile,
  onAddToast,
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'metrics' | 'rubric' | 'uploads'>('metrics');
  const [expandedCriteria, setExpandedCriteria] = useState<string | null>(rubric[0]?.id || null);

  // Local state copy of tasks to allow instant status switching
  const [taskList, setTaskList] = useState<ProjectTask[]>(tasks);

  // Sync if parent updates
  React.useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  // New Task form modal state
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState(currentUser.name);
  const [newTaskStatus, setNewTaskStatus] = useState<TaskStatus>('pending');

  // Advanced PM Dashboard Modal & File Upload Modal states
  const [showPmModal, setShowPmModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // File Upload Drag & Drop state
  const [isDragging, setIsDragging] = useState(false);

  const toggleCriteria = (id: string) => {
    setExpandedCriteria(expandedCriteria === id ? null : id);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: ProjectTask = {
      id: `task_${Date.now()}`,
      title: newTaskTitle,
      assignedTo: newTaskAssignee,
      status: newTaskStatus,
      dueDate: '2026-08-28',
      category: 'General'
    };

    onAddTask(newTask);
    setTaskList((prev) => [...prev, newTask]);
    onAddToast('Nueva tarea agregada al tablero del proyecto', 'info');
    setNewTaskTitle('');
    setNewTaskStatus('pending');
    setShowTaskModal(false);
  };

  const handleTaskStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTaskList((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
    const statusLabels: Record<TaskStatus, string> = {
      pending: 'Pendiente',
      in_production: 'En producción',
      stopped: 'Detenido',
      finished: 'Terminado'
    };
    onAddToast(`Estado actualizado a "${statusLabels[newStatus]}"`, 'info');
  };

  const handleSimulatedFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    const newUp: DriveUploadItem = {
      id: `up_${Date.now()}`,
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      fileType: file.type || 'Documento',
      uploadedBy: currentUser.name,
      uploadedAt: new Date().toLocaleString(),
      driveFolder: 'Modulo 3/Uploads',
      driveUrl: 'https://drive.google.com',
      status: 'synced'
    };

    onUploadFile(newUp);
    onAddToast(t('uploadSuccessToast'), 'success');
  };

  // Metrics Calculations based on 4 states
  const totalTasks = taskList.length || 1;
  const pendingCount = taskList.filter((t) => t.status === 'pending').length;
  const inProdCount = taskList.filter((t) => t.status === 'in_production' || t.status === 'in_progress').length;
  const stoppedCount = taskList.filter((t) => t.status === 'stopped').length;
  const finishedCount = taskList.filter((t) => t.status === 'finished' || t.status === 'completed').length;

  const overallProgressPercent = Math.round((finishedCount / totalTasks) * 100);

  const statusConfig: Record<TaskStatus, { label: string; icon: React.ReactNode; color: string; badgeColor: string }> = {
    pending: {
      label: 'Pendiente',
      icon: <Clock className="w-3.5 h-3.5 text-amber-500" />,
      color: 'border-amber-200 bg-amber-50/40 text-amber-800',
      badgeColor: 'bg-amber-100 text-amber-700 border-amber-200'
    },
    in_production: {
      label: 'En producción',
      icon: <PlayCircle className="w-3.5 h-3.5 text-indigo-500" />,
      color: 'border-indigo-200 bg-indigo-50/40 text-indigo-800',
      badgeColor: 'bg-indigo-100 text-indigo-700 border-indigo-200'
    },
    stopped: {
      label: 'Detenido',
      icon: <PauseCircle className="w-3.5 h-3.5 text-rose-500" />,
      color: 'border-rose-200 bg-rose-50/40 text-rose-800',
      badgeColor: 'bg-rose-100 text-rose-700 border-rose-200'
    },
    finished: {
      label: 'Terminado',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />,
      color: 'border-emerald-200 bg-emerald-50/40 text-emerald-800',
      badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200'
    }
  };

  return (
    <div id="tour-project-view" className="space-y-8 animate-in fade-in duration-300 pb-20">
      
      {/* Header Block */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/90 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>{t('finalProject')} • Tecnológico de Costa Rica</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
              Trabajo Final Módulo III – Aplicaciones de IA Empresarial
            </h2>
            <p className="text-xs text-slate-500">
              Profesor: Ph.D. Heiner Romero Leiva • Entrega Oficial: 11 de junio antes de las 05:00 p.m. (.ipynb en Google Colab)
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-2xl border border-white/80 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('metrics')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'metrics'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              {t('tabMetrics')}
            </button>
            <button
              onClick={() => setActiveTab('rubric')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'rubric'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4" />
              {t('tabRubric')}
            </button>
            <button
              onClick={() => setActiveTab('uploads')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'uploads'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              {t('tabUploads')}
            </button>
          </div>
        </div>

        {/* Guidelines Quick Pill Summary from PDF */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-200/60 text-xs">
          <div className="p-3 bg-purple-50/70 border border-purple-100 rounded-2xl space-y-1">
            <span className="font-bold text-purple-800 flex items-center gap-1">
              📅 Entrega en Campus
            </span>
            <p className="text-[11px] text-purple-900">11 de Junio a más tardar 05:00 p.m. Formato obligatorio: <strong>.ipynb (Google Colab)</strong>.</p>
          </div>

          <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-2xl space-y-1">
            <span className="font-bold text-indigo-800 flex items-center gap-1">
              🎤 Presentación Ejecutiva
            </span>
            <p className="text-[11px] text-indigo-900">Máximo 12 min exposición + 5 min preguntas. Enfoque consultoría estratégica y cámara encendida.</p>
          </div>

          <div className="p-3 bg-cyan-50/70 border border-cyan-100 rounded-2xl space-y-1">
            <span className="font-bold text-cyan-800 flex items-center gap-1">
              📊 4 Datasets Asignados
            </span>
            <p className="text-[11px] text-cyan-900">Grupo 01 (Spotify40), Grupo 02 (SAHeart), Grupo 03 (Voces), Grupo 04 (Tumores).</p>
          </div>

          <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-2xl space-y-1">
            <span className="font-bold text-emerald-800 flex items-center gap-1">
              🏆 Peso de la Nota (50%)
            </span>
            <p className="text-[11px] text-emerald-900">40% Informe técnico en Google Colab + 10% Presentación oral al jurado.</p>
          </div>
        </div>
      </div>

      {/* SUB-SECTION 1: Metrics & PM Dashboard */}
      {activeTab === 'metrics' && (
        <div className="space-y-6">
          
          {/* Top PM Metrics & 4 States Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Overall Progress Ring Card */}
            <div className="md:col-span-4 glass-panel p-6 rounded-3xl space-y-4 border border-white/90 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avance Global</span>
                <span className="p-2 bg-purple-50 text-purple-600 rounded-2xl">
                  <BarChart3 className="w-4 h-4" />
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-4xl font-black text-slate-800">{overallProgressPercent}%</span>
                  <span className="text-xs text-slate-500 font-bold">{finishedCount} de {totalTasks} Terminadas</span>
                </div>
                
                {/* Multi-segment Color Bar for 4 States */}
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex border border-slate-200">
                  <div style={{ width: `${(finishedCount / totalTasks) * 100}%` }} className="bg-emerald-500 h-full" title="Terminadas" />
                  <div style={{ width: `${(inProdCount / totalTasks) * 100}%` }} className="bg-indigo-500 h-full" title="En producción" />
                  <div style={{ width: `${(pendingCount / totalTasks) * 100}%` }} className="bg-amber-400 h-full" title="Pendientes" />
                  <div style={{ width: `${(stoppedCount / totalTasks) * 100}%` }} className="bg-rose-500 h-full" title="Detenidas" />
                </div>
              </div>

              {/* Action Button to Open Advanced PM & AI Dashboard */}
              <button
                onClick={() => setShowPmModal(true)}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-2xl text-xs font-extrabold transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                <span>Dashboard Avanzado PM & AI</span>
              </button>

              <p className="text-[11px] text-slate-400 text-center">
                Porcentaje calculado con base en tareas marcadas como <strong className="text-emerald-700">Terminado</strong>.
              </p>
            </div>

            {/* 4 States Breakdown Metric Badges */}
            <div className="md:col-span-8 glass-panel p-6 rounded-3xl space-y-4 border border-white/90">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Métricas por Estado de Tarea</h4>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                
                {/* State 1: Pendiente */}
                <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-2xl space-y-1">
                  <div className="flex items-center justify-between text-amber-800 font-bold text-xs">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Pendiente</span>
                    <span className="text-base font-black">{pendingCount}</span>
                  </div>
                  <div className="text-[10px] text-amber-600 font-medium">
                    {Math.round((pendingCount / totalTasks) * 100)}% del total
                  </div>
                </div>

                {/* State 2: En producción */}
                <div className="bg-indigo-50/80 border border-indigo-200 p-4 rounded-2xl space-y-1">
                  <div className="flex items-center justify-between text-indigo-800 font-bold text-xs">
                    <span className="flex items-center gap-1"><PlayCircle className="w-3.5 h-3.5" /> En Producción</span>
                    <span className="text-base font-black">{inProdCount}</span>
                  </div>
                  <div className="text-[10px] text-indigo-600 font-medium">
                    {Math.round((inProdCount / totalTasks) * 100)}% del total
                  </div>
                </div>

                {/* State 3: Detenido */}
                <div className="bg-rose-50/80 border border-rose-200 p-4 rounded-2xl space-y-1">
                  <div className="flex items-center justify-between text-rose-800 font-bold text-xs">
                    <span className="flex items-center gap-1"><PauseCircle className="w-3.5 h-3.5" /> Detenido</span>
                    <span className="text-base font-black">{stoppedCount}</span>
                  </div>
                  <div className="text-[10px] text-rose-600 font-medium">
                    {Math.round((stoppedCount / totalTasks) * 100)}% del total
                  </div>
                </div>

                {/* State 4: Terminado */}
                <div className="bg-emerald-50/80 border border-emerald-200 p-4 rounded-2xl space-y-1">
                  <div className="flex items-center justify-between text-emerald-800 font-bold text-xs">
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Terminado</span>
                    <span className="text-base font-black">{finishedCount}</span>
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium">
                    {Math.round((finishedCount / totalTasks) * 100)}% del total
                  </div>
                </div>

              </div>

              {/* Individual Student Contribution */}
              <div className="space-y-2 pt-2 border-t border-slate-200/60">
                <div className="flex items-center justify-between">
                  <h5 className="text-[11px] font-bold text-slate-500">Aporte Individual por Estudiante (TEC AI Architect):</h5>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                    5 Miembros
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {members.map((m) => (
                    <div key={m.id} className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
                      <img src={m.avatar} alt={m.name} className="w-7 h-7 rounded-full object-cover border border-indigo-200 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="font-semibold text-slate-800 truncate">{m.name}</span>
                          <span className="font-bold text-purple-600 shrink-0">{m.contributionPercent}%</span>
                        </div>
                        <span className="text-[9px] font-bold text-indigo-700 block truncate">TEC AI Architect</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Kanban / Task Management Board (4 Columns for the 4 States) */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 border border-white/90">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/60">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Tablero Kanban de Gestión (4 Estados)</h3>
                <p className="text-xs text-slate-500">Asignación de tareas con selección de dropdown: Pendiente, En producción, Detenido, Terminado</p>
              </div>

              <button
                onClick={() => setShowTaskModal(true)}
                className="px-4 py-2.5 bg-purple-600 text-white rounded-2xl text-xs font-bold hover:bg-purple-700 transition-all flex items-center gap-1.5 shadow-md shadow-purple-500/20 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar Tarea</span>
              </button>
            </div>

            {/* Tasks Columns for 4 States */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(['pending', 'in_production', 'stopped', 'finished'] as TaskStatus[]).map((statusKey) => {
                const conf = statusConfig[statusKey];
                const columnTasks = taskList.filter((tk) => {
                  if (statusKey === 'in_production') return tk.status === 'in_production' || tk.status === 'in_progress';
                  if (statusKey === 'finished') return tk.status === 'finished' || tk.status === 'completed';
                  return tk.status === statusKey;
                });

                return (
                  <div key={statusKey} className={`p-4 rounded-2xl space-y-3 border min-h-[260px] ${conf.color}`}>
                    
                    {/* Column Header */}
                    <div className="flex items-center justify-between font-bold text-xs px-1">
                      <span className="flex items-center gap-1.5">
                        {conf.icon}
                        <span>{conf.label}</span>
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${conf.badgeColor}`}>
                        {columnTasks.length}
                      </span>
                    </div>

                    {/* Task Cards in this Column */}
                    <div className="space-y-3">
                      {columnTasks.map((tk) => (
                        <div key={tk.id} className="glass-panel p-3.5 rounded-2xl border border-white space-y-2 shadow-xs bg-white/90">
                          <h5 className="text-xs font-bold text-slate-800 leading-snug">{tk.title}</h5>
                          
                          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                            <span>👤 {tk.assignedTo}</span>
                            <span>📅 {tk.dueDate}</span>
                          </div>

                          {/* Quick Dropdown Status Changer */}
                          <div className="pt-2 flex items-center justify-between gap-1">
                            <span className="text-[10px] font-bold text-slate-400">Estado:</span>
                            <select
                              value={tk.status === 'completed' ? 'finished' : tk.status === 'in_progress' ? 'in_production' : (tk.status as TaskStatus)}
                              onChange={(e) => handleTaskStatusChange(tk.id, e.target.value as TaskStatus)}
                              className="text-[10px] font-bold py-1 px-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl text-slate-700 cursor-pointer transition-colors"
                            >
                              <option value="pending">⏳ Pendiente</option>
                              <option value="in_production">⚙️ En producción</option>
                              <option value="stopped">🛑 Detenido</option>
                              <option value="finished">✅ Terminado</option>
                            </select>
                          </div>
                        </div>
                      ))}

                      {columnTasks.length === 0 && (
                        <div className="text-center py-6 text-[11px] text-slate-400 font-medium italic border border-dashed border-slate-200 rounded-xl">
                          Sin tareas en esta categoría
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SUB-SECTION 2: Rubric */}
      {activeTab === 'rubric' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 border border-white/90">
          <div>
            <h3 className="text-xl font-bold text-slate-800">{t('rubricTitle')}</h3>
            <p className="text-xs text-slate-500 mt-1">{t('rubricDesc')}</p>
            <p className="text-xs text-purple-600 font-medium mt-1">{t('clickCriteriaToExpand')}</p>
          </div>

          <div className="space-y-4">
            {rubric.map((item) => {
              const isExpanded = expandedCriteria === item.id;
              return (
                <div
                  key={item.id}
                  className="glass-panel-subtle rounded-2xl overflow-hidden border border-slate-200/60 transition-all"
                >
                  <button
                    onClick={() => toggleCriteria(item.id)}
                    className="w-full p-5 text-left flex items-center justify-between bg-white/70 hover:bg-white transition-colors"
                  >
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                      <p className="text-xs text-slate-500">{item.description}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-4">
                      <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-bold border border-purple-100">
                        {item.weight} {t('points')}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Bands */}
                  {isExpanded && (
                    <div className="p-5 bg-white/40 border-t border-slate-200/50 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
                      <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-1">
                        <span className="text-xs font-bold text-emerald-800">{t('excellentScore')}</span>
                        <p className="text-xs text-emerald-900 leading-relaxed">{item.excellent}</p>
                      </div>

                      <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-2xl space-y-1">
                        <span className="text-xs font-bold text-blue-800">{t('goodScore')}</span>
                        <p className="text-xs text-blue-900 leading-relaxed">{item.good}</p>
                      </div>

                      <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-1">
                        <span className="text-xs font-bold text-amber-800">{t('fairScore')}</span>
                        <p className="text-xs text-amber-900 leading-relaxed">{item.fair}</p>
                      </div>

                      <div className="p-3.5 bg-rose-50/80 border border-rose-200 rounded-2xl space-y-1">
                        <span className="text-xs font-bold text-rose-800">{t('poorScore')}</span>
                        <p className="text-xs text-rose-900 leading-relaxed">{item.poor}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-SECTION 3: Google Drive Uploads & Embedded Folder */}
      {activeTab === 'uploads' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 border border-white/90">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Archivos y Entregables del Trabajo Final</h3>
            <p className="text-xs text-slate-500 mt-1">
              Accede directamente a la carpeta compartida en Google Drive para consultar y subir avances del proyecto.
            </p>
          </div>

          {/* Big Drive Folder Button */}
          <div className="pt-2">
            <a
              href="https://drive.google.com/drive/folders/1oWyNbF09fhACAJ0a5o08ZZTqRJIHK_h_"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center gap-3 group border border-white/20"
            >
              <Folder className="w-6 h-6 text-cyan-300 group-hover:scale-110 transition-transform" />
              <span>Abrir carpeta de Drive del Trabajo Final</span>
              <ExternalLink className="w-5 h-5 text-indigo-200" />
            </a>
          </div>

          {/* Embedded Google Drive Folder Preview iFrame */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
              <span className="flex items-center gap-1.5 text-slate-700 font-bold">
                <FileText className="w-4 h-4 text-purple-600" />
                Vista Previa de la Carpeta Oficial de Google Drive
              </span>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Actualizado en tiempo real
              </span>
            </div>
            
            <div className="w-full h-[550px] rounded-2xl overflow-hidden border border-slate-200/80 shadow-md bg-white">
              <iframe
                src="https://drive.google.com/embeddedfolderview?id=1oWyNbF09fhACAJ0a5o08ZZTqRJIHK_h_#grid"
                className="w-full h-full border-0"
                title="Vista previa de carpeta Google Drive Trabajo Final"
              />
            </div>
          </div>
        </div>
      )}

      {/* New Task Modal with 4 States Dropdown */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-md p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/90 relative">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Agregar Tarea al Proyecto</h3>
            
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Título de la Tarea</label>
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Ej. Diseñar modelo Firestore para entregar RAG..."
                  className="w-full p-3 glass-input rounded-2xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Asignar a Estudiante</label>
                <select
                  value={newTaskAssignee}
                  onChange={(e) => setNewTaskAssignee(e.target.value)}
                  className="w-full p-3 glass-input rounded-2xl text-xs"
                >
                  {members.map((m) => (
                    <option key={m.id} value={m.name}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* State Dropdown Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Estado Inicial (Dropdown)</label>
                <select
                  value={newTaskStatus}
                  onChange={(e) => setNewTaskStatus(e.target.value as TaskStatus)}
                  className="w-full p-3 glass-input rounded-2xl text-xs font-bold text-slate-800"
                >
                  <option value="pending">⏳ Pendiente</option>
                  <option value="in_production">⚙️ En producción</option>
                  <option value="stopped">🛑 Detenido</option>
                  <option value="finished">✅ Terminado</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  className="glass-button px-4 py-2 rounded-2xl text-xs font-medium text-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 text-white rounded-2xl text-xs font-bold hover:bg-purple-700 shadow-md"
                >
                  Agregar Tarea
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Advanced PM & AI Architect Dashboard Modal */}
      {showPmModal && (
        <AdvancedPmDashboardModal
          tasks={taskList}
          members={members}
          onClose={() => setShowPmModal(false)}
          onAddToast={onAddToast}
        />
      )}

      {/* Multi-Stage File Upload & Verification Modal */}
      {showUploadModal && (
        <FileUploadModal
          currentUser={currentUser}
          onClose={() => setShowUploadModal(false)}
          onUploadSuccess={(fileItem) => {
            onUploadFile(fileItem);
          }}
          onAddToast={onAddToast}
        />
      )}

    </div>
  );
};
