/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Sparkles, Heart, Trash2, Shield, Coins, HeartPulse, History } from 'lucide-react';
import { CANDLE_OPTIONS } from '../types';

interface CleanCandle {
  id: string; // unique ID
  name: string;
  intention: string;
  candleType: string;
  litAt: string;
}

export default function VirtualAltar() {
  const [litCandles, setLitCandles] = useState<CleanCandle[]>(() => {
    try {
      const stored = localStorage.getItem('aura_mystica_candles');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [name, setName] = useState('');
  const [intention, setIntention] = useState('');
  const [selectedCandleType, setSelectedCandleType] = useState('love');
  const [isLiting, setIsLiting] = useState(false);

  useEffect(() => {
    localStorage.setItem('aura_mystica_candles', JSON.stringify(litCandles));
  }, [litCandles]);

  const handleLightCandle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !intention.trim()) return;

    setIsLiting(true);

    setTimeout(() => {
      const newCandle: CleanCandle = {
        id: Math.random().toString(36).substr(2, 9),
        name: name.trim(),
        intention: intention.trim(),
        candleType: selectedCandleType,
        litAt: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      };

      setLitCandles([newCandle, ...litCandles].slice(0, 4)); // max 4 candles lit simultaneously
      setName('');
      setIntention('');
      setIsLiting(false);
    }, 1500);
  };

  const extinguishCandle = (id: string) => {
    setLitCandles(litCandles.filter((c) => c.id !== id));
  };

  const getCandleIcon = (type: string) => {
    switch (type) {
      case 'love': return <Heart className="w-4 h-4 text-rose-500" />;
      case 'protection': return <Shield className="w-4 h-4 text-blue-500" />;
      case 'wealth': return <Coins className="w-4 h-4 text-yellow-500" />;
      case 'health': return <HeartPulse className="w-4 h-4 text-emerald-500" />;
      default: return <Flame className="w-4 h-4 text-[#af8d11]" />;
    }
  };

  return (
    <div id="altar-container" className="bg-[#0a0a0a] border border-[#ffb4a8]/10 rounded-sm p-6 md:p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      {/* Visual Ambient Gold Halo background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#af8d11]/5 blur-[120px] pointer-events-none" />

      <div className="text-center mb-8">
        <span className="text-[#af8d11] text-xs font-bold tracking-widest uppercase block mb-1">Unión de Almas en la Plegaria</span>
        <h3 className="font-serif text-2xl md:text-3xl text-white tracking-tight">Altar Virtual de Intenciones</h3>
        <p className="text-gray-400 text-xs max-w-lg mx-auto mt-2">
          Enciende una llama consagrada, escribe tu nombre y deposita tu petición. Maestra Aura rezará por ti esta medianoche ante el santuario sagrado.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Intention Form */}
        <form onSubmit={handleLightCandle} className="lg:col-span-5 space-y-4 bg-black/40 p-5 rounded border border-neutral-900">
          <h4 className="text-white font-serif text-sm font-semibold border-b border-neutral-900 pb-2">
            Consagrar Nueva Llama
          </h4>

          <div className="space-y-1">
            <label className="block text-[10px] text-gray-400 uppercase tracking-wider font-bold">Tu Nombre Completo / Iniciales</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Elena G."
              className="w-full bg-[#050505] border-b border-[#af8d11]/40 focus:border-[#af8d11] text-xs text-white p-2.5 transition-all outline-none focus:ring-0"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] text-gray-400 uppercase tracking-wider font-bold">Tu Intención Sagrada</label>
            <textarea
              required
              rows={3}
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              placeholder="Ej. Deseo recuperar la armonía con mi esposo y disipar todo bloqueo..."
              className="w-full bg-[#050505] border-b border-[#af8d11]/40 focus:border-[#af8d11] text-xs text-white p-2.5 transition-all outline-none resize-none focus:ring-0"
            />
          </div>

          {/* Candle choice selector */}
          <div className="space-y-1">
            <label className="block text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-1">Color de la Llama / Propósito</label>
            <div className="grid grid-cols-2 gap-2">
              {CANDLE_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setSelectedCandleType(opt.id)}
                  className={`p-2 rounded text-left border transition-all flex items-center justify-between cursor-pointer ${
                    selectedCandleType === opt.id
                      ? 'border-[#af8d11] bg-[#af8d11]/10 text-white'
                      : 'border-neutral-900 bg-[#050505] hover:bg-neutral-950 text-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-1.5 h-3 rounded-full block flex-shrink-0" style={{ backgroundColor: opt.color }} />
                    <span className="text-[10px] font-medium truncate">{opt.name}</span>
                  </div>
                  {getCandleIcon(opt.id)}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLiting}
            className="w-full py-2.5 bg-[#8b0000] hover:bg-[#8b0000]/85 text-white rounded text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden focus:outline-none"
          >
            {isLiting ? (
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 animate-bounce text-[#af8d11]" /> Consagrando Llama...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-yellow-400" /> Encender Vela Sagrada <Sparkles className="w-3.5 h-3.5" />
              </span>
            )}
          </button>
        </form>

        {/* Visual Altar Stage with Lit candles */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <h4 className="text-gray-400 font-serif text-xs font-bold mb-4 tracking-widest uppercase flex items-center gap-2">
            <History className="w-4 h-4 text-[#af8d11]" /> El Altar de Oración ({litCandles.length} Activas)
          </h4>

          {/* Table top representing the altar */}
          <div className="w-full bg-[#050505] border border-neutral-900 rounded p-6 min-h-[280px] flex flex-col justify-between relative shadow-inner">
            {litCandles.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2 py-12">
                <Flame className="w-12 h-12 text-zinc-800 animate-pulse" />
                <p className="text-gray-500 text-xs italic">
                  El altar está en penumbra. Enciende la primera vela para impregnar el santuario de intención.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end mt-auto mb-4">
                <AnimatePresence>
                  {litCandles.map((candle) => {
                    const opt = CANDLE_OPTIONS.find((o) => o.id === candle.candleType) || CANDLE_OPTIONS[0];
                    return (
                      <motion.div
                        key={candle.id}
                        initial={{ opacity: 0, scale: 0.8, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: -20 }}
                        className="flex flex-col items-center space-y-2 relative group"
                      >
                        {/* Extinguish button */}
                        <button
                          onClick={() => extinguishCandle(candle.id)}
                          className="absolute -top-3 right-0 opacity-0 group-hover:opacity-100 bg-[#8b0000] text-white p-1 rounded-full hover:bg-red-700 transition-opacity z-10 cursor-pointer"
                          title="Apagar vela"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>

                        {/* Intention message popup on hover */}
                        <div className="absolute bottom-full mb-4 w-40 bg-[#141414] border border-neutral-800 rounded p-2 text-center text-[10px] text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl">
                          <strong className="text-white block">{candle.name}</strong>
                          <p className="truncate italic mt-0.5">&quot;{candle.intention}&quot;</p>
                          <span className="text-[8px] text-gray-500 block">Encendida {candle.litAt}</span>
                        </div>

                        {/* Animated Flame */}
                        <div className="relative flex flex-col items-center">
                          <div
                            className="w-4 h-6 rounded-full animate-float relative"
                            style={{
                              background: `radial-gradient(circle, #ffffff 10%, ${opt.color} 60%, transparent 100%)`,
                              boxShadow: `0 0 20px 4px ${opt.glow}`
                            }}
                          >
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-yellow-400 rounded-full blur-[1px] animate-pulse" />
                          </div>
                          {/* Candle stick */}
                          <div
                            className="w-4 h-16 rounded-t-sm shadow-md"
                            style={{
                              background: `linear-gradient(to right, ${opt.color}e0, ${opt.color}, #000000d0)`,
                              borderTop: `1px solid ${opt.color}`
                            }}
                          />
                        </div>

                        {/* Candle Meta */}
                        <div className="text-center w-full">
                          <span className="text-white text-[10px] font-semibold block truncate px-1">
                            {candle.name}
                          </span>
                          <span className="text-gray-500 text-[8px] block">{candle.litAt}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}

            {/* Brass Altar Base Divider */}
            <div className="h-2 w-full bg-gradient-to-r from-zinc-900 via-neutral-600 to-zinc-900 border-t border-b border-[#af8d11]/30 rounded-full mt-4 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#af8d11] block" />
            </div>
            <div className="text-[10px] text-gray-500 text-center mt-2 font-serif italic">
              ✦ Tu llama es depositada virtualmente en nuestro Santuario Sagrado ✦
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
