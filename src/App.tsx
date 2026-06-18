/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, Sparkles, MessageSquare, ShieldCheck, Play, 
  MapPin, Clock, Star, Phone, CheckCircle2, ChevronRight, X, Heart, Shield, Award 
} from 'lucide-react';
import { SERVICES, INITIAL_TESTIMONIALS, Service } from './types';
import TarotReader from './components/TarotReader';
import DiagnosticQuiz from './components/DiagnosticQuiz';
import VirtualAltar from './components/VirtualAltar';
import WhatsAppChat from './components/WhatsAppChat';
import TestimonialsSection from './components/TestimonialsSection';

export default function App() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState<'tarot' | 'quiz' | 'altar'>('tarot');
  const [videoStartIndex, setVideoStartIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeVideoTitle, setActiveVideoTitle] = useState('');
  const [isVideoTranscript, setIsVideoTranscript] = useState('');
  const [isFloatingVideoOpen, setIsFloatingVideoOpen] = useState(true);
  const [videoDismissed, setVideoDismissed] = useState(false);
  const floatingVideos = ["/src/assets/videos/Curandera.mp4", "/src/assets/videos/curandera2.mp4"];
  const [floatingVideoIdx, setFloatingVideoIdx] = useState(0);
  
  // Floating simulated WhatsApp toggle
  const [isFloatChatOpen, setIsFloatChatOpen] = useState(false);

  const openVideoModal = (title: string, transcript: string) => {
    setActiveVideoTitle(title);
    setIsVideoTranscript(transcript);
    setIsVideoModalOpen(true);
  };

  const allVideoData = [
    { id: "v1", title: "Testimonio 1", src: "/src/assets/videos/WhatsApp Video 2026-06-11 at 11.38.38 AM.mp4" },
    { id: "v2", title: "Testimonio 2", src: "/src/assets/videos/WhatsApp Video 2026-06-11 at 11.38.38 AM (1).mp4" },
    { id: "v3", title: "Testimonio 3", src: "/src/assets/videos/WhatsApp Video 2026-06-11 at 11.38.38 AM (2).mp4" },
    { id: "v4", title: "Testimonio 4", src: "/src/assets/videos/WhatsApp Video 2026-06-11 at 11.38.38 AM (3).mp4" },
    { id: "v5", title: "Testimonio 5", src: "/src/assets/videos/WhatsApp Video 2026-06-11 at 11.38.39 AM.mp4" },
    { id: "v6", title: "Testimonio 6", src: "/src/assets/videos/WhatsApp Video 2026-06-11 at 11.38.40 AM.mp4" },
    { id: "v7", title: "Testimonio 7", src: "/src/assets/videos/WhatsApp Video 2026-06-11 at 11.38.40 AM (1).mp4" },
    { id: "v8", title: "Testimonio 8", src: "/src/assets/videos/WhatsApp Video 2026-06-11 at 11.38.40 AM (2).mp4" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setVideoStartIndex((prev) => (prev + 1 >= allVideoData.length ? 0 : prev + 1));
    }, 300000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setFloatingVideoIdx((prev) => (prev + 1 >= floatingVideos.length ? 0 : prev + 1));
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const baseWhatsAppLink = (msg: string) => {
    return `https://wa.me/5217721515173?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div id="aura-app" className="min-h-screen relative bg-[#050505] text-[#e5e2e1] font-sans antialiased selection:bg-[#8b0000] selection:text-white pb-12">
      
      {/* Smoke/fog animated background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="/src/assets/images/1606744552065.gif" 
          alt=""
          className="w-full h-full object-cover opacity-20 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-[#050505]/40 to-[#050505]/80" />
      </div>
      
      <div className="relative z-10">
      
      {/* 1. Header / Glassmorphic Navigation Bar */}
      <header id="app-header" className="sticky top-0 z-50 bg-[#050505]/75 backdrop-blur-md border-b border-[#af8d11]/10 px-4 py-3 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero-section')}>
            <span className="font-serif text-lg md:text-xl font-bold tracking-widest text-[#e9c349] hover:text-white transition-colors">
              TEMPLO DE SANACIÓN
            </span>
          </div>

          <nav id="navbar" className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-widest uppercase text-gray-400">
            <button onClick={() => scrollToSection('energy-reconnection')} className="hover:text-white transition-colors cursor-pointer">
              Conexión
            </button>
            <button onClick={() => scrollToSection('services-section')} className="hover:text-white transition-colors cursor-pointer">
              Sanación
            </button>
            <button onClick={() => scrollToSection('santuario-section')} className="hover:text-white transition-colors cursor-pointer">
              Santuario
            </button>
            <button onClick={() => scrollToSection('testimonials-block')} className="hover:text-white transition-colors cursor-pointer">
              Testimonios
            </button>
          </nav>

          <a 
            href={baseWhatsAppLink("Hola Maestra Aura, me gustaría solicitar una consulta espiritual inmediata.")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#8b0000] hover:bg-[#8b0000]/80 text-white text-[10px] font-bold uppercase tracking-wider rounded transition-colors duration-200 shadow-md shadow-[#8b0000]/15"
          >
            Consultar Ahora
          </a>
        </div>
      </header>

      {/* 2. Hero Quote Banner Section */}
      <section id="hero-section" className="relative min-h-[85vh] flex flex-col justify-center py-16 px-4 md:px-8 border-b border-[#af8d11]/5 overflow-hidden">
        {/* Immersive background image with traditional healer woman */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/background_healer_1781751566563.jpg" 
            alt="Santuario de Sanidad Espiritual" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-50 filter brightness-[0.35] saturate-[1.3] sepia-[0.1]"
          />
          {/* Subtle custom background overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a0a]/20 via-[#0a0505]/70 to-[#050505]/95" />
        </div>

        {/* Soft background candle warmth effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#8b0000]/15 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-[#af8d11]/10 blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-8 z-10">
          <span className="px-3 py-1 bg-neutral-950 border border-[#af8d11]/20 text-[#af8d11] text-[10px] uppercase tracking-widest font-bold rounded-full">
            Santuario Espiritual
          </span>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl md:text-5xl text-white tracking-tight leading-[1.2] md:leading-[1.15]"
          >
            &quot;A veces, el cansancio y ese nudo en el pecho no son solo físicos; son señales de que tu energía necesita equilibrio. Estoy aquí para ayudarte a recuperar tu paz interior y sentirte bien de nuevo.&quot;
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-4"
          >
            <button
              onClick={() => scrollToSection('interactive-tab-section')}
              className="px-6 py-2.5 bg-transparent border border-[#af8d11] hover:bg-[#af8d11]/10 text-[#af8d11] font-serif text-xs font-semibold tracking-wider uppercase rounded transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-[#af8d11]/5 cursor-pointer focus:outline-none"
            >
              Descubrir Más
            </button>
          </motion.div>
        </div>
      </section>

      {/* 4. Reconecta con tu Energía segment */}
      <section id="energy-reconnection" className="py-24 px-4 bg-black/30 border-b border-[#af8d11]/5">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="font-serif text-3xl text-[#e9c349] tracking-tight">Reconecta con tu Energía</h2>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Estoy aquí para ayudarte a recuperar tu paz interior y sentirte bien de nuevo. Especialistas en retornos de pareja y sanación espiritual, guiamos tu alma hacia el reencuentro con su esencia más pura.
          </p>
          <div className="flex items-center justify-center gap-3 py-4">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#af8d11]/40" />
            <span className="text-[#af8d11]">✦</span>
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#af8d11]/40" />
          </div>
        </div>
      </section>

      {/* 5. Lo que Ofrezco (Servicios Grid) */}
      <section id="services-section" className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-b border-[#af8d11]/5">
        <div className="text-center mb-16">
          <span className="text-[#af8d11] text-xs font-bold tracking-widest uppercase block mb-1">Servicios para tu Bienestar Espiritual</span>
          <h2 className="font-serif text-3xl text-white tracking-tight">Lo que ofrezco</h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#af8d11] to-transparent mx-auto mt-3" />
        </div>

        {/* Beautiful high quality grid matching screenshots layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((serv) => (
            <div 
              key={serv.id}
              onClick={() => setSelectedService(serv)}
              className="bg-[#0a0a0a] border border-[#ffb4a8]/10 hover:border-[#af8d11]/40 rounded overflow-hidden shadow-xl flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:-translate-y-1 relative"
            >
              {/* Image thumbnail matching exactly */}
              <div className="aspect-[4/3] relative overflow-hidden bg-zinc-950">
                <img 
                  src={serv.image} 
                  alt={serv.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.8]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                
                {/* Custom price/tag rendering */}
                {serv.tag && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 bg-[#8b0000] text-white text-[9px] font-bold uppercase rounded tracking-wider">
                    {serv.tag}
                  </span>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <h3 className="font-serif text-[#e9c349] font-bold text-base leading-tight">
                    {serv.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {serv.subtitle}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-neutral-900 text-xs">
                  {serv.price ? (
                    <span className="text-white font-serif font-black">{serv.price}</span>
                  ) : (
                    <span className="text-gray-500 font-serif">Consulta Privada</span>
                  )}
                  <span className="text-[#af8d11] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Ver más <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Nuestro Santuario Sagrado Segment */}
      <section id="santuario-section" className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-b border-[#af8d11]/5">
        <div className="text-center mb-16">
          <span className="text-[#af8d11] text-xs font-bold tracking-widest uppercase block mb-1">Donde lo imposible se vuelve destino</span>
          <h2 className="font-serif text-3xl text-white tracking-tight">Nuestro Santuario Sagrado</h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#af8d11] to-transparent mx-auto mt-3" />
        </div>

        {/* Grid layout matching design: 1 tall portrait image on the left, 2 grouped stacked landscape pictures on the right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Vertical Large Image */}
          <div className="md:col-span-5 h-[400px] md:h-auto relative rounded overflow-hidden border border-[#ffb4a8]/10 group">
            <img 
              src="/src/assets/images/santuario_rojo_1781750817396.jpg" 
              alt="Altar Rojo del Santuario" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 brightness-[0.75]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#ffb4a8] block">SANTUARIO PRINCIPAL</span>
              <h4 className="text-white font-serif text-sm font-bold text-shadow-sm">Altar de Veladoras y Rezo Sagrado</h4>
            </div>
          </div>

          {/* Right stacked collection */}
          <div className="md:col-span-7 flex flex-col gap-6">
            
            {/* Top landscape */}
            <div className="h-[200px] md:h-[240px] relative rounded overflow-hidden border border-[#ffb4a8]/10 group">
              <img 
                src="/src/assets/images/santuario_consejo_1781750836180.jpg" 
                alt="Sala de Consulta" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#ffb4a8] block">SALA DE SANACIÓN</span>
                <h4 className="text-white font-serif text-sm font-bold">Oficina de Orientación y Diagnósticos</h4>
              </div>
            </div>

            {/* Bottom landscape */}
            <div className="h-[200px] md:h-[240px] relative rounded overflow-hidden border border-[#ffb4a8]/10 group">
              <img 
                src="/src/assets/images/santuario_capilla_1781750852932.jpg" 
                alt="Capilla de Santos" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 brightness-[0.8]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#ffb4a8] block">LA CAPILLA</span>
                <h4 className="text-white font-serif text-sm font-bold">Pedestales Consagrados de Aliento y Fe</h4>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Poderosos Amarres y Retornos de Pareja - Detailed Card */}
      <section id="amarres-detailed" className="py-20 px-4 md:px-8 max-w-4xl mx-auto border-b border-[#af8d11]/5">
        <div className="bg-[#0a0a0a] border border-[#ffb4a8]/10 rounded shadow-2xl overflow-hidden p-6 md:p-10 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[#af8d11] text-[10px] font-bold tracking-widest uppercase block">
              TRABAJOS SAGRADOS DE UNIÓN
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-[#e9c349]">
              Poderosos Amarres y Retornos de Pareja
            </h3>
            <p className="text-gray-400 text-xs max-w-xl mx-auto">
              En este espacio sagrado, canalizamos las fuerzas más antiguas para garantizar el retorno de quien amas. No es solo un ritual, es un decreto espiritual. Si tu corazón clama por su presencia, aquí es donde el destino se dobla ante tu voluntad. Resultados ciertos, uniones eternas.
            </p>
          </div>

          <div className="aspect-[16/9] max-w-xl mx-auto rounded overflow-hidden border border-[#af8d11]/20">
            <img 
              src="/src/assets/images/altar_pareja_1781750868047.jpg" 
              alt="Altar de Amarres de Pareja" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-[0.85]"
            />
          </div>
        </div>
      </section>

      {/* 7. Interactive Sacred Tab Center */}
      <section id="interactive-tab-section" className="py-24 px-4 md:px-8 bg-black/40 border-b border-[#af8d11]/5">
        <div className="max-w-5xl mx-auto space-y-10">
          
          <div className="text-center space-y-3">
            <span className="px-3 py-1 bg-[#8b0000]/10 border border-[#8b0000]/40 text-[#ffb4a8] text-[9px] uppercase tracking-widest font-bold rounded">
              INTERACTIVO Y CONFIDENCIAL
            </span>
            <h2 className="font-serif text-3xl text-white tracking-tight">Consúltale a lo Invisible</h2>
            <p className="text-gray-400 text-xs max-w-lg mx-auto">
              Interactúa directamente con nuestras herramientas sagradas virtuales. Elige la que mejor se adapte a tu inquietud y recibe guía inmediata.
            </p>
          </div>

          {/* Interactive Navigation button bar tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg mx-auto border-b border-neutral-900 pb-4">
            <button
              onClick={() => setActiveInteractiveTab('tarot')}
              className={`px-4 py-2 text-xs uppercase font-bold tracking-wider transition-all flex items-center gap-1 cursor-pointer focus:outline-none ${
                activeInteractiveTab === 'tarot'
                  ? 'text-[#e9c349] border-b-2 border-[#af8d11]'
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              🃏 Tarot Virtual
            </button>
            <button
              onClick={() => setActiveInteractiveTab('quiz')}
              className={`px-4 py-2 text-xs uppercase font-bold tracking-wider transition-all flex items-center gap-1 cursor-pointer focus:outline-none ${
                activeInteractiveTab === 'quiz'
                  ? 'text-[#e9c349] border-b-2 border-[#af8d11]'
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              ⚡ Test de Energía
            </button>
            <button
              onClick={() => setActiveInteractiveTab('altar')}
              className={`px-4 py-2 text-xs uppercase font-bold tracking-wider transition-all flex items-center gap-1 cursor-pointer focus:outline-none ${
                activeInteractiveTab === 'altar'
                  ? 'text-[#e9c349] border-b-2 border-[#af8d11]'
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              🕯️ Altar de Velas
            </button>
          </div>

          {/* Render of selected mystical widget */}
          <div className="pt-4">
            {activeInteractiveTab === 'tarot' && <TarotReader />}
            {activeInteractiveTab === 'quiz' && <DiagnosticQuiz />}
            {activeInteractiveTab === 'altar' && <VirtualAltar />}
          </div>

        </div>
      </section>

      {/* 8. Video Testimonials Section */}
      <section id="teaser-video-section" className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-b border-[#af8d11]/5">
        <div className="text-center mb-12">
          <span className="text-[#af8d11] text-xs font-bold tracking-widest uppercase block mb-1">Almas que han recuperado su camino</span>
          <h2 className="font-serif text-3xl text-white tracking-tight">Nuestros pacientes dan testimonios de la efectividad de nuestros guías espirituales</h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#af8d11] to-transparent mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 max-w-3xl mx-auto gap-6">
          {allVideoData.slice(videoStartIndex, videoStartIndex + 1).map((video) => (
            <div 
              key={video.id}
              className="bg-[#0a0a0a] border border-[#ffb4a8]/10 hover:border-[#af8d11]/40 rounded shadow-xl overflow-hidden group transition-all duration-350 hover:-translate-y-1"
            >
              <video 
                src={video.src}
                controls
                muted
                playsInline
                className="w-full aspect-video object-cover"
              />
              <div className="p-4">
                <h4 className="text-white font-serif text-sm font-semibold tracking-wide">{video.title}</h4>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: allVideoData.length }, (_, i) => (
            <button
              key={i}
              onClick={() => setVideoStartIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                videoStartIndex === i ? 'bg-[#e9c349] w-6' : 'bg-[#af8d11]/40 hover:bg-[#af8d11]/60'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 9. Live Written Testimonials Guestbook Custom section */}
      <section id="guestbook-section" className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-b border-[#af8d11]/5">
        <TestimonialsSection />
      </section>

      {/* 10. Pre-footer Call Banner "No camines en la oscuridad" */}
      <section id="no-camines-section" className="py-24 px-4 bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
        <div className="max-w-2xl mx-auto bg-[#0a0a0a] border border-[#af8d11]/30 rounded-sm p-8 md:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          {/* Subtle decoration line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#8b0000]" />

          <h3 className="font-serif text-2xl md:text-3xl text-white tracking-tight">No camines en la oscuridad</h3>
          <p className="text-gray-300 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
            Cada momento de espera es un momento de conexión perdida. Permíteme ser tu guía.
          </p>

          <div className="pt-4">
            <a
              href={baseWhatsAppLink("Hola Maestra Aura, leí el mensaje 'No camines en la oscuridad'. Deseo su guía espiritual discreta y profesional.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#8b0000] hover:bg-[#8b0000]/85 text-white text-xs md:text-sm font-bold uppercase tracking-widest rounded transition-all transform hover:scale-103 shadow-lg shadow-red-950/20"
            >
              <MessageSquare className="w-4 h-4 fill-white" /> Hablar por WhatsApp
            </a>
          </div>

          <span className="text-[10px] text-gray-500 tracking-widest block uppercase font-mono">
            Atención 100% discreta y profesional
          </span>
        </div>
      </section>

      {/* Floating video vignette - bottom right */}
      {!videoDismissed && isFloatingVideoOpen && (
        <div className="fixed bottom-24 right-6 z-30 group">
          <div className="relative w-36 md:w-48 rounded-xl overflow-hidden shadow-2xl border border-[#af8d11]/30 cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => {
              const vid = document.getElementById('floating-vid') as HTMLVideoElement;
              if (vid) vid.muted = false;
              setIsFloatingVideoOpen(false);
            }}
          >
            <video
              id="floating-vid"
              key={floatingVideoIdx}
              src={floatingVideos[floatingVideoIdx]}
              muted
              autoPlay
              loop
              playsInline
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-[10px] font-bold uppercase tracking-wider bg-black/60 px-2 py-1 rounded">Click para ver</span>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setVideoDismissed(true); }}
            className="absolute -top-2 -right-2 w-5 h-5 bg-black/80 border border-[#af8d11]/40 rounded-full flex items-center justify-center hover:bg-black transition-colors"
          >
            <X className="w-3 h-3 text-[#af8d11]" />
          </button>
        </div>
      )}

      {/* Expanded video modal */}
      {!videoDismissed && !isFloatingVideoOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setIsFloatingVideoOpen(true)}>
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <video
              key={floatingVideoIdx}
              src={floatingVideos[floatingVideoIdx]}
              controls
              autoPlay
              playsInline
              className="w-full rounded-lg shadow-2xl"
            />
            <button
              onClick={() => setIsFloatingVideoOpen(true)}
              className="absolute -top-10 right-0 text-white/80 hover:text-white text-sm"
            >
              Cerrar ✕
            </button>
          </div>
        </div>
      )}

      {/* 11. Custom Real-Time WhatsApp floating assistant widget wrapper on bottom right */}
      <div id="floating-whatsapp-trigger" className="fixed top-[15vh] right-6 z-40 flex flex-col items-end space-y-3">
        
        {/* Immersive chat bubble toggled online */}
        <AnimatePresence>
          {isFloatChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              className="mb-2 shadow-2xl"
            >
              <WhatsAppChat />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse button trigger */}
        <button
          onClick={() => setIsFloatChatOpen(!isFloatChatOpen)}
          className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-900/30 hover:scale-105 active:scale-95 transition-all duration-300 relative group cursor-pointer focus:outline-none overflow-hidden"
        >
          {isFloatChatOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <>
              <img 
                src="/src/assets/images/pngtree-whatsapp-icon-new-png-image_6315990.png" 
                alt="WhatsApp" 
                className="w-full h-full object-cover"
              />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full text-[9px] font-bold text-white flex items-center justify-center animate-bounce">
                1
              </span>
              <span className="absolute inset-0 rounded-full border border-emerald-500 opacity-75 animate-ping [animation-duration:1.8s]" />
            </>
          )}
        </button>
      </div>

      {/* 12. App Footer */}
      <footer id="app-footer" className="mt-20 border-t border-[#af8d11]/10 pt-12 px-4 text-center space-y-6">
        <h4 className="font-serif text-xl tracking-widest text-[#e9c349]">TEMPLO DE SANACIÓN</h4>

        <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
          <button onClick={() => alert("Aviso de Privacidad: Templo de Sanación protege los datos de sus clientes con confidencialidad absoluta.")} className="hover:text-white transition-colors cursor-pointer">
            Aviso de Privacidad
          </button>
          <span>•</span>
          <button onClick={() => alert("Términos de Servicio: Todas las lecturas y rituales se realizan respetando el libre albedrío de los seres bajo pautas éticas.")} className="hover:text-white transition-colors cursor-pointer">
            Términos de Servicio
          </button>
          <span>•</span>
          <button onClick={() => alert("Contacto Directo: Puede comunicarse por WhatsApp al canal confidencial o mediante correo soporte@auramystica.com")} className="hover:text-white transition-colors cursor-pointer">
            Contacto Directo
          </button>
          <span>•</span>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">
            Facebook
          </a>
        </div>

        <p className="text-gray-600 text-xs font-serif italic">
          © 2026 Templo de Sanación • Santuario de Sanación Espiritual. Todos los derechos reservados.
        </p>

        {/* Dynamic credential accreditation badge */}
        <div className="max-w-[120px] mx-auto opacity-40 hover:opacity-100 transition-opacity flex flex-col items-center gap-1 p-2 border border-[#af8d11]/30 rounded">
          <Award className="w-6 h-6 text-[#af8d11]" />
          <span className="text-[7.5px] font-mono uppercase text-gray-400 font-black">Consagración</span>
          <span className="text-[6.5px] text-gray-500">Santuario Sagrado</span>
        </div>
      </footer>

      {/* Video transcript Modal overlay */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#0a0a0a] border border-[#af8d11]/40 rounded p-6 max-w-lg w-full relative space-y-4 shadow-2xl"
            >
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-[#af8d11] border-b border-neutral-900 pb-3">
                <Flame className="w-5 h-5 text-[#af8d11] animate-pulse" />
                <h4 className="font-serif text-base text-white font-bold">{activeVideoTitle}</h4>
              </div>

              {/* Simulated Ambient Video Container */}
              <div className="aspect-[16/9] bg-neutral-900 rounded border border-neutral-850 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                {/* Soft mystical glowing particles */}
                <div className="absolute inset-0 bg-radial-gradient from-[#8b0000]/10 via-transparent to-transparent pointer-events-none" />
                <p className="text-[#ffb4a8] text-xs font-serif leading-relaxed max-w-xs text-center z-10 animate-pulse italic">
                  &quot;...en ese instante sentí cómo se libraba el nudo del pecho, agradecida con el santuario sagrado...&quot;
                </p>
                <span className="text-[9px] text-[#af8d11] uppercase font-mono tracking-widest mt-4">Transmisión de Aliento En Progreso</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Transcripción del Testimonio:</span>
                <p className="text-gray-300 text-xs leading-relaxed italic block max-h-[140px] overflow-y-auto pr-2">
                  &quot; {isVideoTranscript} &quot;
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/5217721515173?text=${encodeURIComponent(
                    `Hola Maestra Aura, acabo de ver el testimonio de: "${activeVideoTitle}" y me sentí muy identificado/a. Me gustaría recibir una asesoría confidencial para mi propio caso.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-[#8b0000] hover:bg-[#8b0000]/80 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 focus:outline-none"
                >
                  Deseo el Mismo Resultado por WhatsApp <MessageSquare className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Service Details Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0a0a0a] border border-[#af8d11]/40 rounded overflow-hidden max-w-xl w-full relative shadow-2xl flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 text-white z-10 bg-black/60 hover:bg-black/80 p-1.5 rounded-full hover:scale-105 transition-all cursor-pointer focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-[16/9] w-full relative bg-zinc-950">
                <img 
                  src={selectedService.image} 
                  alt={selectedService.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-[0.8]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/30" />
                <div className="absolute bottom-4 left-4 right-12 text-left">
                  <span className="text-[#af8d11] text-[9px] uppercase tracking-widest font-mono font-bold block mb-0.5">
                    {selectedService.tag || 'RITUAL SAGRADO'}
                  </span>
                  <h3 className="text-white font-serif text-lg md:text-xl font-bold leading-tight">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-gray-300 text-xs italic leading-relaxed">
                  {selectedService.subtitle}
                </p>

                <p className="text-gray-400 text-xs">
                  {selectedService.description}
                </p>

                <div className="space-y-2">
                  <span className="text-[10px] text-[#ffb4a8] uppercase font-mono tracking-widest block border-b border-neutral-900 pb-1 font-bold">
                    ¿Qué incluye la sesión espiritual?
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-gray-300">
                    {selectedService.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 flex items-center justify-between gap-4">
                  {selectedService.price && (
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-500 uppercase font-mono">Oferta Especial</span>
                      <span className="text-white font-serif font-black text-sm">{selectedService.price}</span>
                    </div>
                  )}

                  <a
                    href={baseWhatsAppLink(
                      `Hola Maestra Aura, estoy interesado/a en solicitar el servicio sagrado de: "${selectedService.title}". Me gustaría recibir detalles sobre costos y agendar una sesión privada confidencial.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 bg-[#8b0000] hover:bg-[#8b0000]/80 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 focus:outline-none"
                  >
                    Agendar por WhatsApp <MessageSquare className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      </div>
    </div>
  );
}
