import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { QuizQuestion, WeekPPT, StudentMember } from '../../types';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, X, HelpCircle, Trophy } from 'lucide-react';

interface PracticeQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  week: WeekPPT;
  currentUser?: StudentMember;
}

export const PracticeQuizModal: React.FC<PracticeQuizModalProps> = ({
  isOpen,
  onClose,
  week,
  currentUser,
}) => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ: QuizQuestion = week.quizQuestions[currentIndex] || {
    id: currentIndex + 1,
    question: `[Semana ${week.weekNumber}] Pregunta ${currentIndex + 1} sobre ${week.title}`,
    options: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
    correctAnswer: 0,
    explanation: 'Explicación del concepto clave expuesto en la presentación oficial.'
  };

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < week.quizQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setIsFinished(true);
      // Save user quiz score in localStorage
      if (currentUser) {
        const userId = currentUser.id || currentUser.email;
        const quizKey = `aie_quiz_score_${userId}_week_${week.weekNumber}`;
        try {
          localStorage.setItem(
            quizKey,
            JSON.stringify({
              score,
              total: week.quizQuestions.length,
              date: new Date().toISOString(),
            })
          );
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-2xl p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/90 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 glass-button rounded-full z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Semana {week.weekNumber}</span>
          </div>
          <h3 className="text-xl font-bold text-slate-800">
            {t('quizTitle', { week: week.weekNumber })}
          </h3>
          <p className="text-xs text-slate-500 mt-1">{t('quizDesc')}</p>
        </div>

        {!isFinished ? (
          <div className="space-y-6">
            {/* Question Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-600">
                <span>
                  {t('questionOf', { current: currentIndex + 1, total: week.quizQuestions.length })}
                </span>
                <span>Puntaje: {score} / {week.quizQuestions.length}</span>
              </div>
              <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
                  style={{
                    width: `${((currentIndex + 1) / week.quizQuestions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="glass-panel-subtle p-5 rounded-2xl border border-slate-200/60 space-y-4">
              <h4 className="text-sm sm:text-base font-semibold text-slate-800 leading-snug">
                {currentQ.question}
              </h4>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  let optStyle = "bg-white/70 hover:bg-white text-slate-700 border-slate-200";

                  if (selectedOption === idx) {
                    optStyle = "bg-indigo-50 text-indigo-900 border-indigo-400 font-medium shadow-sm";
                  }

                  if (isSubmitted) {
                    if (idx === currentQ.correctAnswer) {
                      optStyle = "bg-emerald-100/80 text-emerald-900 border-emerald-400 font-medium";
                    } else if (selectedOption === idx && idx !== currentQ.correctAnswer) {
                      optStyle = "bg-rose-100/80 text-rose-900 border-rose-400";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isSubmitted}
                      className={`w-full text-left p-3.5 rounded-2xl text-xs sm:text-sm border transition-all flex items-center justify-between ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {isSubmitted && idx === currentQ.correctAnswer && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {isSubmitted && selectedOption === idx && idx !== currentQ.correctAnswer && (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Answer Explanation Feedback Block */}
            {isSubmitted && (
              <div
                className={`p-4 rounded-2xl border animate-in fade-in duration-200 ${
                  selectedOption === currentQ.correctAnswer
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50/80 border-rose-200 text-rose-900'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs mb-1">
                  {selectedOption === currentQ.correctAnswer ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{t('correctAnswerMsg')}</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>{t('incorrectAnswerMsg')}</span>
                    </>
                  )}
                </div>
                <p className="text-xs leading-relaxed mt-1">
                  <strong>{t('explanationLabel')}</strong> {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex justify-end gap-3 pt-2">
              {!isSubmitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedOption === null}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-2xl text-xs font-semibold hover:bg-indigo-700 disabled:opacity-40 disabled:hover:bg-indigo-600 transition-all shadow-md shadow-indigo-500/20"
                >
                  {t('submitAnswer')}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-2xl text-xs font-semibold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-md shadow-indigo-500/20"
                >
                  <span>
                    {currentIndex < week.quizQuestions.length - 1 ? t('nextQuestion') : t('finishQuiz')}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Finished Quiz Summary */
          <div className="text-center py-8 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-purple-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-indigo-500/20">
              <Trophy className="w-10 h-10" />
            </div>

            <div>
              <h4 className="text-2xl font-extrabold text-slate-800">{t('quizResultsTitle')}</h4>
              <p className="text-sm font-semibold text-indigo-600 mt-2">
                {t('yourScore')} {score} / {week.quizQuestions.length} (
                {Math.round((score / week.quizQuestions.length) * 100)}%)
              </p>
              <p className="text-xs text-slate-600 max-w-md mx-auto mt-2">
                {score >= 14 ? t('passedMsg') : t('needsReviewMsg')}
              </p>
            </div>

            <div className="flex justify-center gap-3 pt-4">
              <button
                onClick={handleReset}
                className="glass-button px-5 py-2.5 rounded-2xl text-xs font-semibold text-slate-700 flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                {t('retryQuiz')}
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-2xl text-xs font-semibold hover:bg-indigo-700 transition-all shadow-md"
              >
                {t('closeQuiz')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
