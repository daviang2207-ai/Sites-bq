/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import pedroMascotImg from '../assets/images/pedro_bq_mascot_1784731525933.jpg';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleOpenWidget = () => {
    setIsOpen(!isOpen);
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const finalMsg = message.trim() || 'Olá! Gostaria de saber mais sobre as coberturas de seguros.';
    const encoded = encodeURIComponent(finalMsg);
    window.open(`https://wa.me/5532998800325?text=${encoded}`, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40" id="whatsapp-floating-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className="mb-4 w-72 sm:w-80 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl"
            id="whatsapp-chat-bubble"
          >
            {/* Header */}
            <div className="bg-primary-500 p-4 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={pedroMascotImg}
                    alt="Mascote Pedro do Seguro"
                    className="w-10 h-10 rounded-full object-cover bg-white border-2 border-blue-300 shadow-sm"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-blue-400 border-2 border-primary-500 rounded-full animate-pulse" />
                </div>
                <div>
                  <span className="font-display font-bold text-xs sm:text-sm block">Pedro do Seguro</span>
                  <span className="text-[10px] text-blue-100 block">Consultor BQ • Online</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                id="whatsapp-close-bubble-btn"
                aria-label="Fechar"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="p-4 bg-blue-50/50 max-h-48 overflow-y-auto space-y-3 text-xs leading-relaxed">
              <div className="bg-white border border-blue-200/60 px-3 py-2.5 rounded-2xl rounded-tl-none text-slate-700 shadow-sm">
                Olá! Sou o Pedro do Seguro. 👋 Como posso te ajudar a escolher, simular ou fechar o seu seguro hoje?
              </div>
              <div className="bg-white border border-blue-200/60 px-3 py-2.5 rounded-2xl rounded-tl-none text-slate-700 shadow-sm">
                Se preferir, me diga o tipo de seguro que você procura abaixo!
              </div>
            </div>

            {/* Form Input */}
            <form onSubmit={handleSendWhatsApp} className="p-3 bg-white border-t border-slate-200 flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escreva sua mensagem..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-500 focus:bg-white transition-colors"
                id="whatsapp-chat-input"
              />
              <button
                type="submit"
                className="bg-primary-500 hover:bg-primary-600 text-white p-2.5 rounded-xl transition-colors cursor-pointer shrink-0 shadow-sm shadow-primary-500/20"
                id="whatsapp-chat-send-btn"
                aria-label="Enviar WhatsApp"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Circle Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpenWidget}
        className="bg-primary-500 hover:bg-primary-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer relative z-40 transition-colors border border-blue-400/30 shadow-primary-500/30 group"
        id="whatsapp-floating-btn"
        aria-label="Atendimento WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 z-50">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-400 border-2 border-white" />
        </span>
        <MessageSquare size={24} className="fill-white" />
      </motion.button>
    </div>
  );
}
