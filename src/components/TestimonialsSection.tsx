/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, Plus, PenTool, Sparkles, Check } from 'lucide-react';
import { INITIAL_TESTIMONIALS, Testimonial } from '../types';

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const stored = localStorage.getItem('aura_mystica_testimonials');
      return stored ? JSON.parse(stored) : INITIAL_TESTIMONIALS;
    } catch {
      return INITIAL_TESTIMONIALS;
    }
  });

  const [isOpenForm, setIsOpenForm] = useState(false);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [source, setSource] = useState('Consulta Online');
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem('aura_mystica_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !quote.trim() || !title.trim()) return;

    const newTestimonial: Testimonial = {
      id: Math.random().toString(36).substr(2, 9),
      title: title.trim(),
      name: name.trim(),
      quote: quote.trim(),
      rating,
      date: 'Justo ahora',
      source
    };

    setTestimonials([newTestimonial, ...testimonials]);
    setName('');
    setTitle('');
    setQuote('');
    setRating(5);
    setIsSubmitSuccess(true);
    setIsOpenForm(false);

    setTimeout(() => {
      setIsSubmitSuccess(false);
    }, 4000);
  };

  return (
    <div id="testimonials-block" className="space-y-10">
      <div className="text-center">
        <span className="text-[#af8d11] text-xs font-bold tracking-widest uppercase block mb-1">
          Almas que han recuperado su camino
        </span>
        <h3 className="font-serif text-3xl text-white tracking-tight">Testimonios de Luz</h3>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#af8d11] to-transparent mx-auto mt-3" />
      </div>

      {/* Floating alert for custom testimonials */}
      <AnimatePresence>
        {isSubmitSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 bg-emerald-950/80 border border-emerald-500/20 text-emerald-300 rounded text-xs text-center max-w-md mx-auto"
          >
            <span className="font-bold flex items-center justify-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" /> ¡Tu testimonio se ha publicado con luz!
            </span>
            Gracias por compartir tu sagrado testimonio con la hermandad de Templo de Sanación.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Testimonials grid with luxury borders & hover effects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((test, index) => (
          <motion.div
            id={`testimonial-card-${test.id}`}
            key={test.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#0a0a0a] border border-[#ffb4a8]/10 hover:border-[#af8d11]/30 rounded p-6 shadow-xl flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 relative"
          >
            {/* Soft background light */}
            <div className="absolute top-0 right-0 w-12 h-12 bg-[#8b0000]/5 rounded-full blur-2xl group-hover:bg-[#af8d11]/10 transition-colors pointer-events-none" />

            <div className="space-y-4">
              {/* Stars */}
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < test.rating ? 'text-[#af8d11] fill-[#af8d11]' : 'text-neutral-800'
                    }`}
                  />
                ))}
              </div>

              <div className="space-y-1">
                <h4 className="text-[#ffb4a8] font-serif text-sm font-bold tracking-wide">
                  {test.title}
                </h4>
                <p className="text-gray-300 text-xs italic leading-relaxed font-sans">
                  &quot;{test.quote}&quot;
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-900 mt-4 flex items-center justify-between text-[11px] text-gray-500 font-mono">
              <span className="text-white font-serif">{test.name}</span>
              <div className="flex items-center gap-2">
                <span>{test.source}</span>
                <span className="text-[#af8d11]">•</span>
                <span>{test.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Write a testimonial CTA trigger */}
      <div className="text-center pt-2">
        {!isOpenForm ? (
          <button
            onClick={() => setIsOpenForm(true)}
            className="inline-flex items-center gap-1.5 text-xs text-[#af8d11] hover:text-[#e9c349] transition-colors duration-200 cursor-pointer bg-neutral-950 px-4 py-2 rounded-full border border-neutral-850"
          >
            <PenTool className="w-3.5 h-3.5" /> Compartir mi Testimonio de Luz
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-[#0a0a0a] border border-[#af8d11]/20 rounded p-6 max-w-lg mx-auto text-left shadow-2xl relative"
          >
            <h4 className="text-white font-serif text-sm font-bold mb-4 flex items-center gap-1.5 border-b border-neutral-900 pb-2">
              <Sparkles className="w-4 h-4 text-[#af8d11]" /> Relato de Sanación Espiritual
            </h4>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] text-gray-400 uppercase tracking-wider font-bold">Tu Nombre / Inicial</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Elena G."
                    className="w-full bg-black border-b border-[#af8d11]/40 focus:border-[#af8d11] text-xs text-white p-2 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] text-gray-400 uppercase tracking-wider font-bold">Título de tu Relato</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ej. Mi alma recuperó la paz"
                    className="w-full bg-black border-b border-[#af8d11]/40 focus:border-[#af8d11] text-xs text-white p-2 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] text-gray-400 uppercase tracking-wider font-bold">Tu Testimonio de Luz</label>
                <textarea
                  required
                  rows={3}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Relata cómo la Maestra Aura te ayudó a encauzar tus caminos o reconectar con tu energía..."
                  className="w-full bg-black border border-neutral-900 focus:border-[#af8d11] text-xs text-white p-2 outline-none transition-all resize-none"
                />
              </div>

              <div className="flex items-center justify-between">
                {/* Rating selection star bar */}
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider mr-2">Valoración:</span>
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      type="button"
                      key={val}
                      onClick={() => setRating(val)}
                      className="p-1 focus:outline-none cursor-pointer"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          val <= rating ? 'text-[#af8d11] fill-[#af8d11]' : 'text-zinc-800'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsOpenForm(false)}
                    className="px-3 py-1.5 text-xs text-gray-500 hover:text-white transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#8b0000] hover:bg-[#8b0000]/80 text-white rounded text-xs font-bold uppercase transition-all duration-200 cursor-pointer"
                  >
                    Publicar
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}
