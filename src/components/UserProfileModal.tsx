import React, { useState } from 'react';
import { StudentMember } from '../types';
import { User, Mail, ShieldCheck, Camera, Check, Sparkles, Award } from 'lucide-react';

interface UserProfileModalProps {
  currentUser: StudentMember;
  onClose: () => void;
  onUpdateUser: (updatedUser: StudentMember) => void;
  onAddToast: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

const defaultAvatars = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
];

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  currentUser,
  onClose,
  onUpdateUser,
  onAddToast,
}) => {
  const [name, setName] = useState(currentUser.name);
  const [role, setRole] = useState(currentUser.role);
  const [selectedAvatar, setSelectedAvatar] = useState(currentUser.avatar);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAvatar = customAvatarUrl.trim() ? customAvatarUrl.trim() : selectedAvatar;

    const updated: StudentMember = {
      ...currentUser,
      name: name.trim() || currentUser.name,
      role: role.trim() || currentUser.role,
      avatar: finalAvatar,
    };

    onUpdateUser(updated);
    onAddToast('Perfil actualizado correctamente', 'success');
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setSelectedAvatar(event.target.result as string);
        setCustomAvatarUrl('');
        onAddToast('Imagen de perfil cargada desde tu dispositivo', 'info');
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-lg p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/90 bg-white/95 relative space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Perfil de Usuario</h3>
              <p className="text-xs text-slate-500">Módulo III • Tecnológico de Costa Rica</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-2xl text-slate-400 hover:text-slate-700 transition-colors text-xs font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Avatar Section */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700">Foto de Perfil</label>
            
            <div className="flex items-center gap-4">
              <div className="relative group shrink-0">
                <img
                  src={customAvatarUrl.trim() || selectedAvatar}
                  alt={currentUser.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500 shadow-md"
                />
                <label className="absolute inset-0 bg-slate-900/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white">
                  <Camera className="w-5 h-5" />
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-800">{name}</span>
                <p className="text-[11px] text-slate-500">{currentUser.email}</p>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Usuario Verificado Whitelist</span>
                </div>
              </div>
            </div>

            {/* Avatar Preset Selector */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-semibold text-slate-600">Seleccionar Avatar Predefinido o Subir Foto:</span>
              <div className="flex items-center gap-2.5 flex-wrap">
                {defaultAvatars.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedAvatar(url);
                      setCustomAvatarUrl('');
                    }}
                    className={`relative rounded-full p-0.5 transition-all ${
                      selectedAvatar === url && !customAvatarUrl
                        ? 'ring-2 ring-indigo-600 scale-105'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={url} alt="Avatar option" className="w-10 h-10 rounded-full object-cover" />
                    {selectedAvatar === url && !customAvatarUrl && (
                      <span className="absolute -bottom-1 -right-1 bg-indigo-600 text-white rounded-full p-0.5 text-[8px]">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setShowCustomInput(!showCustomInput)}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-[11px] font-semibold transition-colors"
                >
                  {showCustomInput ? 'Ocultar URL' : 'Usar URL de Imagen'}
                </button>
              </div>

              {showCustomInput && (
                <input
                  type="url"
                  placeholder="https://ejemplo.com/mi-foto.jpg"
                  value={customAvatarUrl}
                  onChange={(e) => setCustomAvatarUrl(e.target.value)}
                  className="w-full p-3 glass-input rounded-2xl text-xs mt-2"
                />
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre Completo</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 glass-input rounded-2xl text-xs font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Rol en el Proyecto</label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-3 glass-input rounded-2xl text-xs font-semibold text-slate-800"
              />
            </div>

            {/* Readonly Stats */}
            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200/80 rounded-2xl">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Aporte en el Proyecto</span>
                <span className="text-sm font-black text-indigo-600">{currentUser.contributionPercent}%</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Nivel de Acceso</span>
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                  <Award className="w-3.5 h-3.5" /> Estudiante Whitelist
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 glass-button rounded-2xl text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-2xl text-xs font-bold hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition-all"
            >
              Guardar Cambios
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
