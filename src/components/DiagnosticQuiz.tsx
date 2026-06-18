/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronRight, Activity, MessageSquare, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../types';

export default function DiagnosticQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleSelectOption = (score: number) => {
    const nextAnswers = [...answers, score];
    setAnswers(nextAnswers);

    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  // Calculations
  const calculateTotalScore = () => answers.reduce((a, b) => a + b, 0);
  const maxScore = QUIZ_QUESTIONS.length * 4;
  const rawScore = calculateTotalScore();
  const auraHarmonyPercent = Math.max(12, Math.round(100 - (rawScore / maxScore) * 100));

  const getAuraColor = () => {
    if (auraHarmonyPercent >= 75) return 'text-emerald-500 shadow-emerald-500/20';
    if (auraHarmonyPercent >= 45) return 'text-[#ca8a04] shadow-yellow-500/20';
    return 'text-[#8b0000] shadow-[#8b0000]/20';
  };

  const getDiagnosis = () => {
    if (auraHarmonyPercent >= 75) {
      return {
        title: "Campo Energético Fluyente y Estable",
        desc: "Tu aura mantiene un grado de resistencia saludable. Tus cansancios son naturales del día a día, pero tus chacras están libres de ataduras oscuras o intenciones destructivas.",
        tip: "Perfecto para trabajos preventivos de bendición, prosperidad y abundancia para afianzar tus éxitos.",
        priority: "Prioridad: Baja (Mantenimiento)"
      };
    }
    if (auraHarmonyPercent >= 45) {
      return {
        title: "Bloqueo Energético Moderado / Absorción de Envidia",
        desc: "Estás absorbiendo las vibraciones pesadas de personas en tu entorno (vecinos, trabajo o antiguas parejas). Sientes un cansancio que no se quita al dormir y dolores sordos en el cuello/pecho.",
        tip: "Se recomienda ampliamente una Alineación de Chakras y Limpieza de Aura Express para disipar la neblina áurica.",
        priority: "Prioridad: Media (Atención requerida)"
      };
    }
    return {
      title: "Desequilibrio Severo / Atadura Espiritual Detectada",
      desc: "Presentas síntomas críticos de debilitamiento áurico o un trabajo espiritual activo en tu contra. Es por eso que sientes el famoso 'nudo en el pecho', pesadez extrema al despertar e inestabilidad repentina con tu ser amado.",
      tip: "Urgente: Requiere una sesión de Sanación Energética Profunda o Amarre Conyugal para restaurar tu paz interior antes de que los bloqueos se consoliden.",
      priority: "Prioridad: ALTA (Urgente)"
    };
  };

  const diagnosis = getDiagnosis();

  const getWhatsAppMessage = () => {
    return `Hola Maestra Aura, acabo de realizar mi Consulta de Diagnóstico Energético en Templo de Sanación. Obtuve un resultado de ${auraHarmonyPercent}% de Armonía Áurica (${diagnosis.title}). Me gustaría recibir ayuda directa sobre mi caso para sanar mi energía y superar mis bloqueos.`;
  };

  return (
    <div id="quiz-container" className="bg-[#0a0a0a] border border-[#ffb4a8]/10 rounded-sm p-6 md:p-8 max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
      {/* Decorative aura border glowing */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#af8d11] to-transparent opacity-60" />

      <h3 className="font-serif text-xl md:text-2xl text-white text-center mb-1 flex items-center justify-center gap-2">
        <Activity className="w-5 h-5 text-[#af8d11]" /> Diagnóstico de Equilibrio Energético
      </h3>
      <p className="text-gray-400 text-xs text-center max-w-md mx-auto mb-6">
        Responde con absoluta honestidad. Tu información es completamente anónima y sagrada.
      </p>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key="question-box"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Step indicators */}
            <div className="flex items-center justify-between text-[11px] text-gray-500 font-mono">
              <span>PREGUNTA {currentQuestion + 1} DE {QUIZ_QUESTIONS.length}</span>
              <span>{Math.round(((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100)}% Completado</span>
            </div>
            
            <div className="w-full bg-neutral-900 h-1 rounded-full overflow-hidden">
              <div 
                className="bg-[#af8d11] h-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>

            <p className="text-white text-sm font-semibold tracking-tight leading-relaxed">
              {QUIZ_QUESTIONS[currentQuestion].text}
            </p>

            <div className="space-y-3">
              {QUIZ_QUESTIONS[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option.score)}
                  className="w-full text-left p-3.5 bg-[#050505] hover:bg-[#141414] border border-[#af8d11]/10 hover:border-[#af8d11]/40 rounded text-xs text-gray-300 hover:text-white transition-all duration-200 flex items-center justify-between group cursor-pointer focus:outline-none"
                >
                  <span>{option.text}</span>
                  <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-[#af8d11] transition-colors" />
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="quiz-results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6 py-2"
          >
            {/* Core Score Display with pulsing glowing ring */}
            <div className="flex flex-col items-center justify-center space-y-2 py-4">
              <div className="relative w-28 h-28 rounded-full border-4 border-neutral-950 flex flex-col items-center justify-center bg-[#050505]">
                {/* Simulated circle border color based on percent */}
                <div 
                  className={`absolute inset-0 rounded-full border-4 border-t-transparent ${
                    auraHarmonyPercent >= 75 ? 'border-emerald-500' : auraHarmonyPercent >= 45 ? 'border-yellow-500' : 'border-rose-900'
                  } animate-spin`}
                  style={{ animationDuration: '6s' }}
                />
                <span className="text-gray-500 text-[10px] uppercase font-mono tracking-widest block">Armonía</span>
                <span className={`text-3xl font-serif font-black ${getAuraColor().split(' ')[0]}`}>
                  {auraHarmonyPercent}%
                </span>
                <span className="text-[9px] text-gray-400 font-mono mt-0.5">ESTADO</span>
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider ${getAuraColor().split(' ')[0]}`}>
                {auraHarmonyPercent >= 75 ? 'CANALES FLUYENTES' : auraHarmonyPercent >= 45 ? 'SINTONÍA ALTERADA' : 'BLOQUEO SEVERO'}
              </span>
            </div>

            {/* Structured Diagnosis */}
            <div className="bg-[#050505] border border-neutral-900 p-4 rounded space-y-3">
              <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
                <h4 className="text-[#ffb4a8] font-serif text-sm font-bold flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-[#af8d11]" /> {diagnosis.title}
                </h4>
                <span className="text-[10px] text-[#ffb4a8] font-bold px-2 py-0.5 bg-[#8b0000]/20 rounded uppercase">
                  {diagnosis.priority}
                </span>
              </div>

              <p className="text-gray-300 text-xs leading-relaxed">
                {diagnosis.desc}
              </p>

              <div className="bg-[#141414] p-3 rounded text-neutral-400 text-xs border-l-2 border-[#af8d11]">
                <strong className="text-white block mb-1 text-[11px] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#af8d11]" /> Sugerencia de Sanación:
                </strong>
                {diagnosis.tip}
              </div>
            </div>

            {/* Quick CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={resetQuiz}
                className="flex-1 py-3 bg-[#0a0a0a] hover:bg-[#141414] border border-neutral-800 text-gray-400 hover:text-white transition-all text-xs font-semibold uppercase rounded flex items-center justify-center gap-1 cursor-pointer focus:outline-none"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Repetir Test
              </button>

              <a
                href={`https://wa.me/5217721515173?text=${encodeURIComponent(getWhatsAppMessage())}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-[#8b0000] hover:bg-[#8b0000]/80 text-white transition-all text-xs font-bold uppercase rounded flex items-center justify-center gap-2 shadow-lg hover:shadow-[#8b0000]/25 cursor-pointer"
              >
                Atención Sanadora Gratuita por WhatsApp <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
