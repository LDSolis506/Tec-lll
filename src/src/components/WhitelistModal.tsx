import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { StudentMember } from '../types';
import { ShieldCheck, UserCheck, X, Sparkles } from 'lucide-react';

interface WhitelistModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: StudentMember[];
  currentMember: StudentMember;
  onSelectMember: (member: StudentMember) => void;
}

export const WhitelistModal: React.FC<WhitelistModalProps> = ({
  isOpen,
  onClose,
  members,
  currentMember,
  onSelectMember,
}) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-lg p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/90 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 glass-button rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">{t('whitelistTitle')}</h3>
            <p className="text-xs text-slate-500">{t('whitelistDesc')}</p>
          </div>
        </div>

        <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-3.5 mb-5 flex items-start gap-2.5 text-xs text-amber-800">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>{t('simulatedSwitchDesc')}</p>
        </div>

        <div className="space-y-2.5 mb-6 max-h-64 overflow-y-auto pr-1">
          {members.map((member) => {
            const isActive = member.id === currentMember.id;
            return (
              <div
                key={member.id}
                onClick={() => {
                  onSelectMember(member);
                  onClose();
                }}
                className={`p-3.5 rounded-2xl cursor-pointer transition-all flex items-center justify-between border ${
                  isActive
                    ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-900 shadow-sm'
                    : 'bg-white/60 hover:bg-white/90 border-slate-200/60 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-slate-800">{member.name}</h4>
                    <p className="text-[11px] text-slate-500">{member.email}</p>
                    <span className="inline-block mt-0.5 px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded-full font-medium">
                      {member.role}
                    </span>
                  </div>
                </div>

                {isActive ? (
                  <span className="flex items-center gap-1 text-xs font-medium text-indigo-600 bg-indigo-100/80 px-2.5 py-1 rounded-full">
                    <UserCheck className="w-3.5 h-3.5" />
                    {t('activeBadge')}
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 hover:text-indigo-600 font-medium">
                    {t('switchStudent')}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="glass-button px-5 py-2.5 rounded-2xl text-xs font-medium text-slate-700 hover:text-indigo-600"
          >
            {t('closeModal')}
          </button>
        </div>
      </div>
    </div>
  );
};
