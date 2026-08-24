import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { StudentMember } from '../types';
import { TecLogo } from './TecLogo';
import { KeyRound, Mail, User, ShieldCheck, UserPlus, LogIn, AlertCircle, CheckCircle2, X, Image as ImageIcon, Camera } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: StudentMember[];
  currentMember: StudentMember;
  onLoginSuccess: (member: StudentMember) => void;
  onRegisterMember: (newMember: StudentMember) => void;
  onUpdateMemberAvatar?: (memberId: string, avatarUrl: string) => void;
  onAddToast: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  members,
  currentMember,
  onLoginSuccess,
  onRegisterMember,
  onUpdateMemberAvatar,
  onAddToast,
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'profile'>('login');

  const [selectedMemberId, setSelectedMemberId] = useState<string>(currentMember.id || members[0]?.id || 'm1');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [roleInput, setRoleInput] = useState('TEC AI Architect');
  const [avatarInput, setAvatarInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const UNIVERSAL_PASSWORD = 'Cursolll2026';
  const MAX_MEMBERS = 5;

  const ALLOWED_EMAILS = [
    'lsolisdiego@gmail.com',
    'fx.ingenieria@gmail.com',
    'kimcb_91@hotmail.com',
    'xeniaguerrero@gmail.com',
    'johannam.deoca@gmail.com',
  ];

  const validatePassword = (pass: string) => {
    const clean = pass.trim().toLowerCase();
    return clean === 'cursolll2026' || clean === 'cursoiii2026' || pass.trim() === UNIVERSAL_PASSWORD;
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validatePassword(passwordInput)) {
      setErrorMessage('Clave de acceso incorrecta. Por favor intenta de nuevo.');
      return;
    }

    const found = members.find((m) => m.id === selectedMemberId) || members[0];

    localStorage.setItem('aie_selected_member_id', found.id);
    onLoginSuccess(found);
    onAddToast(`Sesión iniciada como: ${found.name}`, 'success');
    onClose();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (members.length >= MAX_MEMBERS) {
      setErrorMessage(`Capacidad máxima alcanzada (${MAX_MEMBERS} miembros autorizados).`);
      return;
    }

    if (!validatePassword(passwordInput)) {
      setErrorMessage(`La clave requerida para el registro es ${UNIVERSAL_PASSWORD}`);
      return;
    }

    const cleanEmail = emailInput.toLowerCase().trim();
    if (!cleanEmail || !nameInput.trim()) {
      setErrorMessage('Por favor ingresa un nombre y correo válidos.');
      return;
    }

    if (!ALLOWED_EMAILS.includes(cleanEmail)) {
      setErrorMessage('Correo no autorizado. Únicamente los 5 correos de la whitelist oficial tienen acceso.');
      return;
    }

    if (members.some((m) => m.email.toLowerCase() === cleanEmail)) {
      setErrorMessage('Este correo ya está registrado.');
      return;
    }

    const isEditor = cleanEmail === 'lsolisdiego@gmail.com';
    const chosenAvatar = avatarInput.trim() || PRESET_AVATARS[members.length % PRESET_AVATARS.length];

    const newMem: StudentMember = {
      id: `m_${Date.now()}`,
      name: nameInput.trim(),
      email: cleanEmail,
      avatar: chosenAvatar,
      role: isEditor ? 'Único Editor (lsolisdiego@gmail.com)' : (roleInput || 'Estudiante TEC (Lector)'),
      contributionPercent: 80,
      isCurrentUser: true,
    };

    onRegisterMember(newMem);
    onLoginSuccess(newMem);
    onAddToast(`Miembro registrado e iniciado correctamente: ${newMem.name}`, 'success');
    onClose();
  };

  const handleUpdateAvatarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!avatarInput.trim()) return;

    if (onUpdateMemberAvatar) {
      onUpdateMemberAvatar(currentMember.id, avatarInput.trim());
    } else {
      currentMember.avatar = avatarInput.trim();
    }
    onAddToast('Avatar actualizado correctamente', 'success');
    setActiveTab('login');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-lg p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/90 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 glass-button rounded-full z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <TecLogo size="sm" showSubtitle={false} />
          <div>
            <h3 className="text-xl font-extrabold text-slate-800">Autenticación AIE TEC</h3>
            <p className="text-xs text-slate-500">
              Control de acceso de miembros de equipo
            </p>
          </div>
        </div>

        {/* Capacity Indicator Pill */}
        <div className="mb-5 p-3 bg-indigo-50/80 rounded-2xl border border-indigo-100 flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            Capacidad total del equipo:
          </span>
          <span className="px-2.5 py-1 bg-indigo-600 text-white rounded-full font-bold">
            {members.length} / {MAX_MEMBERS} Miembros
          </span>
        </div>

        {/* Auth Tabs */}
        <div className="flex bg-slate-100/80 p-1 rounded-2xl border border-white/80 mb-6">
          <button
            onClick={() => {
              setActiveTab('login');
              setErrorMessage('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'login'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LogIn className="w-4 h-4" />
            Ingresar
          </button>
          <button
            onClick={() => {
              setActiveTab('register');
              setErrorMessage('');
            }}
            disabled={members.length >= MAX_MEMBERS}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'register'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            } disabled:opacity-40`}
          >
            <UserPlus className="w-4 h-4" />
            Registrar ({members.length}/{MAX_MEMBERS})
          </button>
          <button
            onClick={() => {
              setActiveTab('profile');
              setAvatarInput(currentMember.avatar);
              setErrorMessage('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'profile'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Camera className="w-4 h-4" />
            Personalizar
          </button>
        </div>

        {/* Error Feedback */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* FORM 1: LOGIN */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-600" />
                Selecciona tu Usuario
              </label>
              <select
                value={selectedMemberId}
                onChange={(e) => setSelectedMemberId(e.target.value)}
                className="w-full p-3 glass-input rounded-2xl text-xs font-semibold text-slate-800"
              >
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.email})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-indigo-600" />
                Clave de Acceso del Equipo
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Ingresa la clave de acceso"
                className="w-full p-3 glass-input rounded-2xl text-xs font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-2xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Ingresar a la Plataforma
            </button>
          </form>
        )}

        {/* FORM 2: REGISTER */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-600" />
                Nombre Completo del Estudiante
              </label>
              <input
                type="text"
                required
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Ej. María Rodríguez"
                className="w-full p-3 glass-input rounded-2xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-600" />
                Correo Personalizado
              </label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="ej. mrodriguez@tec.ac.cr"
                className="w-full p-3 glass-input rounded-2xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-indigo-600" />
                Clave Universal Requerida
              </label>
              <input
                type="text"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="TEC2026M3"
                className="w-full p-3 glass-input rounded-2xl text-xs font-mono bg-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
                Avatar de Perfil (URL o seleccionar preset)
              </label>
              <div className="flex gap-2 mb-2">
                {PRESET_AVATARS.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAvatarInput(url)}
                    className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-transform ${
                      avatarInput === url ? 'border-indigo-600 scale-110 shadow' : 'border-transparent hover:scale-105'
                    }`}
                  >
                    <img src={url} alt="preset" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <input
                type="url"
                value={avatarInput}
                onChange={(e) => setAvatarInput(e.target.value)}
                placeholder="https://o.unsplash.com/..."
                className="w-full p-3 glass-input rounded-2xl text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={members.length >= MAX_MEMBERS}
              className="w-full py-3 bg-purple-600 text-white rounded-2xl text-xs font-bold hover:bg-purple-700 disabled:opacity-40 transition-all shadow-md shadow-purple-500/20 flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Registrar Miembro ({members.length + 1}/6)
            </button>
          </form>
        )}

        {/* FORM 3: CUSTOMIZE AVATAR */}
        {activeTab === 'profile' && (
          <form onSubmit={handleUpdateAvatarSubmit} className="space-y-4">
            <div className="text-center space-y-2">
              <img
                src={avatarInput || currentMember.avatar}
                alt={currentMember.name}
                className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-indigo-200 shadow-lg"
              />
              <h4 className="font-bold text-sm text-slate-800">{currentMember.name}</h4>
              <p className="text-xs text-slate-500">{currentMember.email}</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2 text-center">
                Elige una foto predefinida o pega una URL de imagen
              </label>
              <div className="flex justify-center gap-2 mb-3">
                {PRESET_AVATARS.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAvatarInput(url)}
                    className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-transform ${
                      avatarInput === url ? 'border-indigo-600 scale-110 shadow-md' : 'border-white hover:scale-105'
                    }`}
                  >
                    <img src={url} alt="preset" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <input
                type="url"
                required
                value={avatarInput}
                onChange={(e) => setAvatarInput(e.target.value)}
                placeholder="https://..."
                className="w-full p-3 glass-input rounded-2xl text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-2xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4" />
              Guardar Nuevo Avatar
            </button>
          </form>
        )}

        {/* Existing Registered Members Quick Selector */}
        <div className="mt-6 pt-5 border-t border-slate-200/60 space-y-3">
          <h4 className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span>Miembros Registrados ({members.length}/6)</span>
            <span className="text-[10px] text-slate-400 font-normal">Clic para cambiar sesión</span>
          </h4>

          <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto pr-1">
            {members.map((m) => {
              const isSelected = m.id === currentMember.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    onLoginSuccess(m);
                    onAddToast(`Sesión cambiada a: ${m.name}`, 'info');
                    onClose();
                  }}
                  className={`p-2.5 rounded-2xl text-left border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-bold'
                      : 'bg-white/60 hover:bg-white border-slate-200/60 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <img src={m.avatar} alt={m.name} className="w-7 h-7 rounded-full object-cover shrink-0" />
                    <div className="truncate">
                      <p className="text-xs truncate">{m.name}</p>
                      <p className="text-[10px] text-slate-500 truncate">{m.email}</p>
                    </div>
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
