import React, { useState, useEffect } from 'react';
import { TecLogo } from './TecLogo';
import { Sparkles, ArrowRight, Lock, Mail, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { StudentMember } from '../types';

interface IntroSplashProps {
  members: StudentMember[];
  onSelectMember: (member: StudentMember) => void;
  onComplete: () => void;
}

export const IntroSplash: React.FC<IntroSplashProps> = ({ members, onSelectMember, onComplete }) => {
  const [emailInput, setEmailInput] = useState(() => {
    return localStorage.getItem('aie_last_entered_email') || '';
  });
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validatePassword = (pass: string) => {
    const clean = pass.trim().toLowerCase();
    return clean === 'cursolll2026' || clean === 'cursoiii2026' || pass.trim() === 'Cursolll2026';
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanEmail = emailInput.trim().toLowerCase();
    if (!cleanEmail) {
      setErrorMessage('Por favor ingresa tu correo electrónico.');
      return;
    }

    // Check if email belongs to authorized team members
    const matchedMember = members.find(
      (m) => m.email.toLowerCase() === cleanEmail || m.name.toLowerCase() === cleanEmail
    );

    if (!matchedMember) {
      setErrorMessage('Correo no autorizado. Solo los 5 miembros autorizados del equipo tienen acceso a esta plataforma.');
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage('Clave de acceso incorrecta. Por favor intenta de nuevo.');
      return;
    }

    setIsAuthenticating(true);

    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthSuccess(true);
      
      // Save selected user and email to localStorage
      localStorage.setItem('aie_selected_member_id', matchedMember.id);
      localStorage.setItem('aie_last_entered_email', matchedMember.email);
      onSelectMember(matchedMember);

      setTimeout(() => {
        onComplete();
      }, 500);
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070e1f] text-white p-6 overflow-hidden"
    >
      {/* High-Contrast Card */}
      <div className="relative z-10 max-w-md w-full space-y-6 border border-slate-700 bg-[#0d162e] p-8 sm:p-10 rounded-3xl shadow-2xl">
        
        {/* TEC FUNDATEC Logo */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center items-center w-full"
        >
          <TecLogo size="xl" className="shadow-lg" />
        </motion.div>

        {/* Title & Tagline */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-950/80 border border-indigo-500/40 rounded-full text-cyan-300 text-[11px] font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Módulo 3 • Tecnológico de Costa Rica</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-rounded-title font-black tracking-tight text-white">
            AIE Tracker 2026
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed font-normal">
            Ingresa tu correo autorizado y la clave de acceso del equipo
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4 pt-2">
          
          {/* User Email Input (Manual Entry, No predefined dropdown) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-cyan-400" />
              Correo Electrónico
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="ejemplo@gmail.com"
                className="w-full px-4 py-3 bg-[#080e20] border border-slate-600 rounded-2xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors font-medium"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-cyan-400" />
              Clave de Acceso del Equipo
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa la clave de acceso"
                className="w-full px-4 py-3 bg-[#080e20] border border-slate-600 rounded-2xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors font-mono"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 bg-rose-950/80 border border-rose-600 text-rose-200 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Whitelist Security Pill */}
          <div className="flex items-center justify-between text-[10px] text-slate-400 px-1 pt-1">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Acceso Exclusivo Autorizado</span>
            </span>
            <span className="text-slate-400 font-mono font-bold">5 Integrantes</span>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={isAuthenticating || authSuccess}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-2xl shadow-lg hover:scale-[1.01] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 text-xs border border-white/20 disabled:opacity-75"
          >
            {isAuthenticating ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Verificando credenciales...</span>
              </span>
            ) : authSuccess ? (
              <span className="flex items-center gap-2 text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>¡Acceso Concedido!</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>Ingresar a la Plataforma</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </form>

      </div>

      <p className="absolute bottom-4 text-[10px] text-slate-500 font-mono">
        © 2026 TEC • FUNDATEC • Tecnológico de Costa Rica
      </p>
    </motion.div>
  );
};
