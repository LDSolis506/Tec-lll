import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { ActiveScreen, StudentMember } from '../types';
import { TecLogo } from './TecLogo';
import { ShieldCheck, BookOpen, Layers, Home, ChevronRight, LogOut } from 'lucide-react';

interface HeaderProps {
  activeScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  currentUser: StudentMember;
  onOpenWhitelist: () => void;
  onOpenProfile?: () => void;
  onOpenIntro?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  onNavigate,
  currentUser,
  onOpenWhitelist,
  onOpenProfile,
  onOpenIntro,
}) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3">
      <div className="max-w-7xl mx-auto glass-panel rounded-3xl px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 border border-white/80 shadow-sm">
        
        {/* Brand / Title & Navigation Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 group text-left transition-all"
          >
            <TecLogo size="sm" showSubtitle={false} className="group-hover:scale-105 transition-transform" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-rounded-title font-black tracking-tight text-slate-800 bg-clip-text text-transparent bg-gradient-to-r from-indigo-950 via-purple-900 to-indigo-800">
                  AIE Tracker 2026
                </h1>
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-indigo-100/80 text-indigo-700 rounded-full border border-indigo-200 shadow-2xs">
                  Módulo 3 • TEC
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Aplicaciones de la Inteligencia Artificial Empresarial
              </p>
            </div>
          </button>

          {/* Breadcrumb indicator when inside sub-screens */}
          {activeScreen !== 'home' && (
            <div className="hidden md:flex items-center gap-1.5 text-slate-400 text-xs pl-2 border-l border-slate-200">
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="font-medium text-indigo-600">
                {activeScreen === 'course' ? t('courseTracking') : t('finalProject')}
              </span>
            </div>
          )}
        </div>

        {/* Quick Screen Navigation Pills */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100/60 p-1 rounded-2xl border border-white/60">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeScreen === 'home'
                ? 'bg-white text-indigo-600 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            {t('home')}
          </button>
          <button
            onClick={() => onNavigate('course')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeScreen === 'course'
                ? 'bg-white text-indigo-600 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            {t('courseTracking')}
          </button>
          <button
            onClick={() => onNavigate('project')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeScreen === 'project'
                ? 'bg-white text-indigo-600 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            {t('finalProject')}
          </button>
        </nav>

        {/* Right Action Tools: Language Switcher, Whitelist, User & Logout */}
        <div className="flex items-center gap-2">
          {/* User Profile Avatar Button */}
          <button
            onClick={onOpenProfile || onOpenWhitelist}
            className="glass-button p-1.5 sm:px-3 sm:py-1.5 rounded-2xl flex items-center gap-2 text-xs font-medium text-slate-700 hover:border-indigo-400 hover:shadow-md transition-all group"
            title="Ver información de perfil y cambiar foto"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover border-2 border-indigo-500 group-hover:scale-105 transition-transform shrink-0"
            />
            <span className="hidden sm:inline font-bold text-slate-800 max-w-[110px] truncate">
              {currentUser.name}
            </span>
          </button>

          {/* Whitelist Pill */}
          <button
            onClick={onOpenWhitelist}
            className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-[10px] font-bold flex items-center gap-1 transition-all"
            title="Lista blanca de acceso (5 autorizados - lsolisdiego@gmail.com Único Editor)"
          >
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span className="hidden md:inline">Whitelist</span>
          </button>

          {/* Return to Intro / Logout Button */}
          {onOpenIntro && (
            <button
              onClick={onOpenIntro}
              className="p-1.5 sm:px-2.5 sm:py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl text-[11px] font-medium border border-slate-200 flex items-center gap-1 transition-all"
              title="Pantalla de Inicio / Bloquear sesión"
            >
              <LogOut className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Inicio</span>
            </button>
          )}

          {/* Language Switcher Segmented Button */}
          <div className="flex items-center bg-slate-100/80 p-0.5 rounded-2xl border border-white/80">
            <button
              onClick={() => setLanguage('es')}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-xl transition-all ${
                language === 'es'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              ES
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-xl transition-all ${
                language === 'en'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

