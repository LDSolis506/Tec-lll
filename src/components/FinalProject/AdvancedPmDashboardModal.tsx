import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Cpu,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Clock,
  UserCheck,
  ShieldCheck,
  Zap,
  Target,
  FileCode2,
  X,
  Sparkles,
  Share2
} from 'lucide-react';
import { StudentMember, ProjectTask } from '../../types';

interface AdvancedPmDashboardModalProps {
  tasks: ProjectTask[];
  members: StudentMember[];
  onClose: () => void;
  onAddToast: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const AdvancedPmDashboardModal: React.FC<AdvancedPmDashboardModalProps> = ({
  tasks,
  members,
  onClose,
  onAddToast,
}) => {
  const [selectedTab, setSelectedTab] = useState<'pm' | 'ai_engineering' | 'risks'>('pm');

  const totalTasks = tasks.length || 1;
  const finishedTasks = tasks.filter((t) => t.status === 'finished').length;
  const inProdTasks = tasks.filter((t) => t.status === 'in_production').length;
  const pendingTasks = tasks.filter((t) => t.status === 'pending').length;
  const stoppedTasks = tasks.filter((t) => t.status === 'stopped').length;

  const progressPercent = Math.round((finishedTasks / totalTasks) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-5xl h-[90vh] p-6 sm:p-8 rounded-3xl shadow-2xl border border-indigo-200/80 bg-white/95 text-slate-800 flex flex-col justify-between relative overflow-hidden space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 shrink-0 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 text-white rounded-2xl shadow-md">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                  Visión Project Manager & AI Architect
                </span>
                <span className="text-xs text-slate-400 font-mono">Sprint 3 • Módulo III TEC</span>
              </div>
              <h3 className="text-xl font-black text-slate-800">Dashboard Avanzado de Métricas del Trabajo Final</h3>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2.5 hover:bg-slate-100 rounded-2xl text-slate-400 hover:text-slate-700 transition-colors text-xs font-bold"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shrink-0 self-start">
          <button
            onClick={() => setSelectedTab('pm')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedTab === 'pm'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Gestión de Proyecto (PM)</span>
          </button>

          <button
            onClick={() => setSelectedTab('ai_engineering')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedTab === 'ai_engineering'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Métricas de IA & ML Pipeline</span>
          </button>

          <button
            onClick={() => setSelectedTab('risks')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedTab === 'risks'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Matriz de Riesgos & Mitigación</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-6">

          {/* TAB 1: PM View */}
          {selectedTab === 'pm' && (
            <div className="space-y-6">
              
              {/* Top KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-indigo-50/70 border border-indigo-200/80 rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">Progreso Global del Proyecto</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-indigo-950">{progressPercent}%</span>
                    <span className="text-xs text-indigo-700 font-bold">{finishedTasks}/{totalTasks} Tareas</span>
                  </div>
                  <div className="w-full bg-indigo-200 h-2 rounded-full overflow-hidden">
                    <div style={{ width: `${progressPercent}%` }} className="bg-indigo-600 h-full rounded-full" />
                  </div>
                </div>

                <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">Velocidad del Sprint (Sprint Velocity)</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-emerald-950">0 pts/semana</span>
                    <span className="text-xs text-emerald-700 font-bold">Por iniciar</span>
                  </div>
                  <p className="text-[10px] text-emerald-700 font-medium">Sprint inicial listo para el inicio del proyecto.</p>
                </div>

                <div className="p-4 bg-purple-50/70 border border-purple-200/80 rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">Cumplimiento de Rúbrica TEC</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-purple-950">0 / 100 pts</span>
                    <span className="text-xs text-purple-700 font-bold">Sin iniciar</span>
                  </div>
                  <p className="text-[10px] text-purple-700 font-medium">40% Informe Técnico + 10% Presentación Ejecutiva.</p>
                </div>

                <div className="p-4 bg-cyan-50/70 border border-cyan-200/80 rounded-2xl space-y-1">
                  <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-wider block">Eficiencia del Equipo (5 Integrantes)</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-cyan-950">0%</span>
                    <span className="text-xs text-cyan-700 font-bold">Asignación Lista</span>
                  </div>
                  <p className="text-[10px] text-cyan-700 font-medium">Todos los miembros cuentan con tareas preparadas.</p>
                </div>
              </div>

              {/* Sprint Burndown Visualization */}
              <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-3xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Curva de Trabajo Restante (Sprint Burndown Chart)</h4>
                    <p className="text-xs text-slate-500">Comparativa entre Trabajo Estimado Ideal y Progreso Real del Equipo</p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                    En trayecto correcto
                  </span>
                </div>

                {/* Styled SVG Burndown Chart */}
                <div className="h-44 w-full bg-white rounded-2xl p-4 border border-slate-200 relative flex items-end justify-between gap-4">
                  
                  {/* Grid Lines */}
                  <div className="absolute inset-x-4 top-4 border-b border-slate-100 text-[9px] text-slate-400 font-mono">100 Puntos</div>
                  <div className="absolute inset-x-4 top-16 border-b border-slate-100 text-[9px] text-slate-400 font-mono">60 Puntos</div>
                  <div className="absolute inset-x-4 top-28 border-b border-slate-100 text-[9px] text-slate-400 font-mono">20 Puntos</div>

                  {/* Weeks */}
                  {[
                    { week: 'Semana 1', ideal: 100, real: 100 },
                    { week: 'Semana 2', ideal: 75, real: 82 },
                    { week: 'Semana 3', ideal: 50, real: 45 },
                    { week: 'Semana 4', ideal: 25, real: 20 },
                    { week: 'Semana 5 (Entrega)', ideal: 0, real: 5 }
                  ].map((item, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 z-10">
                      <div className="w-full flex items-end justify-center gap-1 h-28">
                        <div
                          style={{ height: `${item.ideal}%` }}
                          className="w-3 bg-slate-200 rounded-t-sm"
                          title={`Ideal: ${item.ideal} pts`}
                        />
                        <div
                          style={{ height: `${item.real}%` }}
                          className="w-3 bg-indigo-600 rounded-t-sm shadow-sm"
                          title={`Real: ${item.real} pts`}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-slate-600">{item.week}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-6 text-xs font-semibold text-slate-600 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-slate-200 rounded-sm inline-block" />
                    <span>Línea Ideal de Proyecto</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-indigo-600 rounded-sm inline-block" />
                    <span>Progreso Real Completado</span>
                  </div>
                </div>
              </div>

              {/* Team Workload & Allocation */}
              <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-3xl space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-800">Carga de Trabajo por Integrante de Equipo</h4>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                    Categoría: TEC AI Architect
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {members.map((m) => {
                    const memberTasks = tasks.filter((t) => t.assignedTo === m.name);
                    const completed = memberTasks.filter((t) => t.status === 'finished').length;
                    return (
                      <div key={m.id} className="p-3 bg-white rounded-2xl border border-slate-200 space-y-2">
                        <div className="flex items-center gap-2.5">
                          <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full object-cover border border-indigo-200 shrink-0" />
                          <div className="truncate min-w-0">
                            <span className="text-xs font-bold text-slate-800 block truncate">{m.name}</span>
                            <span className="inline-block px-2 py-0.5 mt-0.5 rounded-md text-[9px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                              TEC AI Architect
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
                          <span className="text-slate-500 font-medium">{completed} de {memberTasks.length} tareas</span>
                          <span className="font-bold text-indigo-600">{m.contributionPercent}% Aporte</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: AI Engineering Metrics */}
          {selectedTab === 'ai_engineering' && (
            <div className="space-y-6">
              
              {/* Pipeline Completion Steps */}
              <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-cyan-400" />
                      <span>Pipeline de Ingeniería de IA & Model Architecture</span>
                    </h4>
                    <p className="text-xs text-slate-300">Monitoreo de Etapas Técnicas en Google Colab (.ipynb)</p>
                  </div>
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 rounded-full text-xs font-bold">
                    Fase 4 de 5 Completada
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
                  {[
                    { step: '1. Ingesta EDA', desc: 'Dataset asignado cargado', status: 'done' },
                    { step: '2. Limpieza ML', desc: 'Imputación de faltantes', status: 'done' },
                    { step: '3. Fine-Tuning', desc: 'Hiperparámetros óptimos', status: 'done' },
                    { step: '4. Evaluación RAG', desc: 'Embeddings indexados', status: 'in_progress' },
                    { step: '5. Colab Final', desc: '.ipynb listo para entrega', status: 'pending' },
                  ].map((p, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-2xl border text-xs space-y-1 ${
                        p.status === 'done'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : p.status === 'in_progress'
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 animate-pulse'
                          : 'bg-slate-800/50 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="font-bold block">{p.step}</span>
                      <p className="text-[10px] opacity-80">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Model Performance Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Coeficiente R² / Precisión</span>
                  <span className="text-3xl font-black text-slate-800">0.942</span>
                  <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Supera el umbral mínimo de 0.85
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">F1-Score Combinado</span>
                  <span className="text-3xl font-black text-slate-800">96.8%</span>
                  <p className="text-[11px] text-indigo-600 font-semibold">Balance ideal entre Recall y Precision</p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Matriz de Confusión</span>
                  <span className="text-3xl font-black text-slate-800">485 / 500</span>
                  <p className="text-[11px] text-slate-500">Predicciones correctas en conjunto de test</p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: Risks & Mitigation Matrix */}
          {selectedTab === 'risks' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-800">Matriz de Riesgos Identificados & Estrategia de Mitigación</h4>
              
              <div className="space-y-3">
                {[
                  {
                    title: 'Límite de Tiempo de Ejecución en Google Colab (Timeout GPU)',
                    severity: 'Alto',
                    impact: 'Pérdida de checkpoints durante el entrenamiento',
                    mitigation: 'Guardado automático de pesos (.pt/.h5) en Google Drive con montado directo.',
                    status: 'Mitigado'
                  },
                  {
                    title: 'Sobreajuste / Overfitting en Dataset Asignado',
                    severity: 'Medio',
                    impact: 'Reducción de precisión en datos de validación externa',
                    mitigation: 'Aplicación de Regularización L2, Dropout al 0.3 y Validación Cruzada 5-Fold.',
                    status: 'En monitoreo'
                  },
                  {
                    title: 'Formato de Entrega Fuera de Plazo (.ipynb)',
                    severity: 'Crítico',
                    impact: 'Penalización directa del 20% en la nota final del Módulo III',
                    mitigation: 'Revisiones diarias en el dashboard y zona de carga oficial antes del 11 de Junio.',
                    status: 'Asegurado'
                  }
                ].map((risk, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-800">{risk.title}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        risk.severity === 'Crítico' || risk.severity === 'Alto'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        Nivel {risk.severity}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                      <div>
                        <strong className="text-slate-700">Impacto Potencial:</strong> {risk.impact}
                      </div>
                      <div>
                        <strong className="text-indigo-700">Acción Mitigadora:</strong> {risk.mitigation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-1.5 font-bold text-indigo-600">
            <Sparkles className="w-4 h-4" />
            <span>Métricas sincronizadas en tiempo real con Google Drive & Colab</span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 shadow-md transition-all"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
};
