/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw, MessageSquare, ArrowRight, BookOpen } from 'lucide-react';
import { TAROT_DECK, TarotCard } from '../types';

export default function TarotReader() {
  const [selectedCards, setSelectedCards] = useState<(TarotCard | null)[]>([null, null, null]);
  const [isReading, setIsReading] = useState(false);
  const [currentStep, setCurrentStep] = useState<0 | 1 | 2>(0); // 0: Select, 1: Reading, 2: Final
  const [shuffledDeck, setShuffledDeck] = useState<TarotCard[]>([]);

  const startTarotSession = () => {
    // Shuffle deck and take cards
    const shuffled = [...TAROT_DECK].sort(() => Math.random() - 0.5);
    setShuffledDeck(shuffled);
    setSelectedCards([null, null, null]);
    setCurrentStep(1);
    setIsReading(true);
  };

  const handlePickCard = (deckIndex: number) => {
    if (selectedCards[0] === null) {
      const card = { ...shuffledDeck[deckIndex], role: 'Pasado' as const };
      setSelectedCards([card, null, null]);
    } else if (selectedCards[1] === null) {
      const card = { ...shuffledDeck[deckIndex], role: 'Presente' as const };
      setSelectedCards([selectedCards[0], card, null]);
    } else if (selectedCards[2] === null) {
      const card = { ...shuffledDeck[deckIndex], role: 'Futuro' as const };
      setSelectedCards([selectedCards[0], selectedCards[1], card]);
      // Complete selection!
      setTimeout(() => {
        setCurrentStep(2);
        setIsReading(false);
      }, 1000);
    }
  };

  const resetSession = () => {
    setCurrentStep(0);
    setSelectedCards([null, null, null]);
  };

  const whatsappLink = (msg: string) => {
    const encoded = encodeURIComponent(msg);
    return `https://wa.me/5217721515173?text=${encoded}`;
  };

  return (
    <div id="tarot-reader-container" className="bg-[#0a0a0a] border border-[#af8d11]/20 rounded p-6 md:p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      {/* Visual background lights */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#8b0000]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#af8d11]/5 blur-3xl pointer-events-none" />

      <div className="text-center mb-6">
        <span className="text-[#af8d11] text-xs font-bold tracking-widest uppercase block mb-1">El Oráculo de Aura Mystica</span>
        <h3 className="font-serif text-2xl md:text-3xl text-white tracking-tight">Lectura Virtual de las 3 Cartas</h3>
        <p className="text-gray-400 text-sm max-w-lg mx-auto mt-2">
          Concentra tu mente en tu mayor duda sobre el amor, el destino o tu energía. El tarot guiará tu camino.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {currentStep === 0 && (
          <motion.div
            key="start-screen"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center py-8"
          >
            <div className="w-20 h-20 rounded-full border border-[#af8d11]/40 flex items-center justify-center bg-[#050505] mb-6 shadow-lg shadow-[#8b0000]/25">
              <Sparkles className="w-10 h-10 text-[#af8d11] animate-pulse" />
            </div>
            <p className="text-[#ffb4a8] text-sm text-center max-w-md mb-6 leading-relaxed italic">
              &quot;Cuando las cartas hablan, revelan lo que el alma ya sabe pero la mente teme aceptar.&quot;
            </p>
            <button
              id="start-tarot-btn"
              onClick={startTarotSession}
              className="px-8 py-3 bg-[#8b0000] text-white rounded font-sans tracking-wider text-sm font-semibold uppercase relative group overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 border border-[#ffb4a8]/20 focus:outline-none"
            >
              <span className="relative z-10 flex items-center gap-2">
                Consultar el Tarot Ahora <BookOpen className="w-4 h-4" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#af8d11] to-[#8b0000] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            key="pick-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            {/* Status indicators */}
            <div className="grid grid-cols-3 gap-4 w-full max-w-md mb-8">
              {(['Pasado', 'Presente', 'Futuro'] as const).map((role, idx) => (
                <div
                  key={role}
                  className={`border-b-2 pb-2 text-center transition-all duration-500 ${
                    selectedCards[idx]
                      ? 'border-[#8b0000] text-white'
                      : selectedCards[idx - 1] !== null || idx === 0
                      ? 'border-[#af8d11] text-[#af8d11] animate-pulse'
                      : 'border-neutral-800 text-neutral-600'
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-widest block">Carta {idx + 1}</span>
                  <span className="text-xs font-semibold">{role}</span>
                </div>
              ))}
            </div>

            <p className="text-[#ffb4a8] text-xs mb-4 text-center">
              {selectedCards[0] === null
                ? 'Siente la energía y elije la primera carta: tu PASADO inmediato.'
                : selectedCards[1] === null
                ? 'Perfecto. Ahora elije la segunda carta: tu PRESENTE actual.'
                : 'Por último, escoge la tercera carta: tu FUTURO inmediato.'}
            </p>

            {/* Simulated fan of cards */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-w-2xl justify-center py-4">
              {shuffledDeck.slice(0, 12).map((_, index) => {
                const isPicked = selectedCards.some(
                  (c) => c !== null && shuffledDeck[index].id === c.id
                );
                return (
                  <button
                    key={index}
                    disabled={isPicked}
                    onClick={() => handlePickCard(index)}
                    className={`aspect-[2/3] w-16 sm:w-20 rounded border bg-[#050505] transition-all duration-300 relative overflow-hidden flex flex-col justify-between p-1 cursor-pointer select-none ${
                      isPicked
                        ? 'opacity-20 scale-90 border-transparent shadow-none'
                        : 'border-[#af8d11]/30 hover:border-[#af8d11] hover:-translate-y-2 hover:shadow-lg hover:shadow-[#af8d11]/10'
                    }`}
                  >
                    {/* Exquisite Esoteric Card Back Design */}
                    <div className="absolute inset-1 border border-[#af8d11]/10 rounded flex flex-col items-center justify-between p-1 bg-gradient-to-b from-[#141414] to-black">
                      <span className="text-[6px] text-[#af8d11]/30">AURA</span>
                      <div className="w-5 h-5 rounded-full border border-[#af8d11]/30 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-[#8b0000]/40 animate-pulse" />
                      </div>
                      <span className="text-[6px] text-[#af8d11]/30">MYSTICA</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="result-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8"
          >
            {/* Show three revealed cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedCards.map((card, idx) => {
                if (!card) return null;
                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.2 }}
                    className="bg-[#050505] border border-[#ffb4a8]/10 rounded p-4 flex flex-col items-center space-y-4 shadow-xl"
                  >
                    <div className="text-center">
                      <span className="text-[#af8d11] text-[10px] tracking-widest uppercase font-bold px-2 py-0.5 bg-[#af8d11]/10 rounded-full">
                        {card.role}
                      </span>
                      <span className="text-xs text-gray-500 block mt-1">Aspecto: {card.aspect}</span>
                    </div>

                    {/* Exquisite Card Front Visual Card representation */}
                    <div className="w-28 h-40 rounded border border-[#af8d11] bg-gradient-to-b from-[#141414] to-[#050505] flex flex-col justify-between p-3 relative shadow-md shadow-[#af8d11]/10">
                      <div className="absolute inset-1 border border-[#af8d11]/10 rounded" />
                      <span className="text-xs text-[#af8d11] text-left">✦</span>
                      <div className="text-center font-mono text-4xl my-auto select-none animate-float">
                        {card.image}
                      </div>
                      <span className="text-[10px] text-[#ffb4a8] font-bold text-center block">
                        {card.name}
                      </span>
                    </div>

                    <p className="text-gray-300 text-xs italic text-center leading-relaxed px-2">
                      &quot;{card.meaning}&quot;
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Synthesised Wisdom and Spiritual CTA */}
            <div className="bg-[#141414] border-l-4 border-[#8b0000] p-4 rounded max-w-2xl mx-auto space-y-3">
              <h4 className="font-serif text-sm text-white font-semibold flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-[#af8d11]" /> Revelación en Conjunto
              </h4>
              <p className="text-gray-300 text-xs leading-relaxed">
                Tus cartas muestran una clara necesidad de reconciliación energética. Tu <strong className="text-white">Pasado ({selectedCards[0]?.name})</strong> ha dejado huellas en silencio, mientras que tu <strong className="text-white">Presente ({selectedCards[1]?.name})</strong> indica cansancio que puede sanar rápidamente si abres las puertas indicadas en tu <strong className="text-white">Futuro ({selectedCards[2]?.name})</strong>.
              </p>
              <div className="pt-2 border-t border-neutral-850 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <span className="text-[11px] text-gray-400">
                  ¿Deseas una lectura más personalizada y profunda de las 38 cartas restantes?
                </span>
                <a
                  href={whatsappLink(
                    `Hola Maestra Aura, acabo de realizar la lectura de 3 cartas en Aura Mystica. Me salieron las cartas: Pasado: ${selectedCards[0]?.name}, Presente: ${selectedCards[1]?.name}, Futuro: ${selectedCards[2]?.name}. Me gustaría recibir mi diagnóstico completo y resolver mis preguntas sobre el amor.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#8b0000] text-xs font-semibold uppercase text-white rounded flex items-center justify-center gap-2 hover:bg-[#8b0000]/80 transition-colors duration-200"
                >
                  Confirmar Revelación Completa por WhatsApp <MessageSquare className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={resetSession}
                className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors duration-200"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Intentar otra lectura
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
