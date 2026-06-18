/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCheck, Smile, Phone, Video, MoreVertical, MessageCircleCode, ArrowRight } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'aura';
  text: string;
  time: string;
}

export default function WhatsAppChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'aura',
      text: 'Bendiciones, alma de luz. Soy la Maestra Aura. Siento que estás buscando respuestas, sanación o recuperar un amor perdido. Cuéntame tu situación, tu nombre y tu fecha de nacimiento.',
      time: 'Justo ahora'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      sender: 'user',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulated responses from Maestra Aura
    setTimeout(() => {
      setIsTyping(false);
      let replyText = "";
      if (userMsg.text.toLowerCase().includes('amor') || userMsg.text.toLowerCase().includes('pareja') || userMsg.text.toLowerCase().includes('ex')) {
        replyText = "Entiendo profundamente el dolor de la distancia. Te confirmo que las energías espirituales pueden endulzarse y entrelazarse de nuevo con respeto. Me gustaría realizarte un chequeo más detallado con tu fecha de nacimiento directamente por WhatsApp para revelarte la solución exacta.";
      } else if (userMsg.text.toLowerCase().includes('cansado') || userMsg.text.toLowerCase().includes('bloqueo') || userMsg.text.toLowerCase().includes('mal')) {
        replyText = "Ese cansancio y nudo en el pecho son síntomas claros de un bloqueo energético profundo. No te preocupes, hay remedios espirituales muy poderosos para limpiar tu aura de raíz. Continuemos en WhatsApp para darte prioridad de consulta.";
      } else {
        replyText = "Gracias por tu sinceridad, alma bella. Veo que tu caso merece una lectura profunda y confidencial. Vamos a transferirnos directamente a WhatsApp para que pueda atenderte de manera personalizada y sin ningún costo por este primer diagnóstico.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'aura',
          text: replyText,
          time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1800);
  };

  const getWhatsAppURL = () => {
    const lastMsg = messages[messages.length - 1];
    let customText = "Hola Maestra Aura, vengo de la app de Aura Mystica y me gustaría una consulta de sanación espiritual.";
    if (messages.length > 1) {
      // Find the last user message to prefill WhatsApp
      const userMsgs = messages.filter((m) => m.sender === 'user');
      if (userMsgs.length > 0) {
        customText = `Hola Maestra Aura, mi nombre y consulta es: "${userMsgs[userMsgs.length - 1].text}". Me gustaría recibir mi diagnóstico espiritual complementario.`;
      }
    }
    return `https://wa.me/5217721515173?text=${encodeURIComponent(customText)}`;
  };

  return (
    <div id="whatsapp-sim-container" className="max-w-md mx-auto bg-[#0a0a0a] rounded border border-[#af8d11]/20 shadow-2xl overflow-hidden flex flex-col h-[520px]">
      {/* Target header simulating original WhatsApp aesthetics in style system */}
      <div className="bg-[#141414] border-b border-[#af8d11]/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="w-10 h-10 rounded-full bg-[#8b0000]/10 border border-[#af8d11]/30 flex items-center justify-center font-serif text-lg text-[#af8d11] font-bold">
              AM
            </span>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#141414]" />
          </div>
          <div>
            <h4 className="text-white text-xs font-bold leading-tight flex items-center gap-1">
              Maestra Aura <span className="text-[10px] text-[#af8d11]">✦ Guía</span>
            </h4>
            <span className="text-gray-400 text-[10px] block">En línea • Asistencia Inmediata</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-gray-400">
          <Phone className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
          <Video className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
          <MoreVertical className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
        </div>
      </div>

      {/* Message Body Canvas Container */}
      <div className="flex-1 bg-neutral-950 p-4 overflow-y-auto space-y-3 flex flex-col scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        <div className="bg-[#141414] border border-neutral-850 px-3 py-2 rounded text-center text-[10px] text-[#ffb4a8] max-w-xs mx-auto mb-2 italic">
          🔒 Los mensajes están protegidos en Aura Mystica. Tu consulta espiritual es estrictamente confidencial.
        </div>

        {messages.map((msg, index) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={index}
              className={`flex flex-col max-w-[85%] ${isUser ? 'self-end items-end' : 'self-start items-start'}`}
            >
              <div
                className={`p-3 rounded text-xs leading-relaxed ${
                  isUser
                    ? 'bg-[#8b0000] text-white rounded-tr-none border border-[#ffb4a8]/10'
                    : 'bg-[#141414] text-gray-200 rounded-tl-none border border-[#af8d11]/10'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[8px] text-gray-500 mt-1 flex items-center gap-1 px-1">
                {msg.time} {isUser && <CheckCheck className="w-3 h-3 text-emerald-500" />}
              </span>
            </div>
          );
        })}

        {isTyping && (
          <div className="self-start flex items-center gap-1.5 p-3 rounded-full bg-[#141414] text-gray-400 text-[11px] italic scale-95 border border-[#af8d11]/10">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce [animation-delay:0.4s]" />
            Maestra Aura está canalizando...
          </div>
        )}
      </div>

      {/* Input or Call action bottom footer */}
      <div className="p-3 bg-[#141414] border-t border-[#af8d11]/10 space-y-3">
        {messages.length > 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-2.5 bg-emerald-950/40 border border-emerald-500/20 rounded flex items-center justify-between gap-2"
          >
            <div className="text-[10px] text-emerald-400">
              <strong className="block text-emerald-300">¡Canal de prioridad listo!</strong>
              Continúa esta plática confidencial directamente en tu WhatsApp original.
            </div>
            <a
              href={getWhatsAppURL()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] uppercase rounded flex items-center gap-1 whitespace-nowrap transition-colors cursor-pointer"
            >
              Abrir WhatsApp <ArrowRight className="w-3 h-3" />
            </a>
          </motion.div>
        )}

        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <button type="button" className="text-gray-400 hover:text-white p-1 focus:outline-none">
            <Smile className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Mensaje de consulta espiritual..."
            className="flex-1 bg-[#050505] text-xs text-white p-2.5 rounded border border-[#af8d11]/10 outline-none focus:border-[#af8d11] transition-all"
          />
          <button
            type="submit"
            className="p-2.5 bg-[#8b0000] hover:bg-[#8b0000]/85 text-white rounded transition-colors duration-200 cursor-pointer focus:outline-none"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
