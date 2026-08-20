/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, ShieldCheck, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { ChatMessage } from '../types';

export default function AIAdvisor() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Olá! Sou o assistente virtual inteligente da BQ Seguros. Posso te ajudar a entender coberturas, esclarecer termos técnicos como "franquia" ou "carência", dar dicas de economia e sugerir o melhor seguro para o seu perfil. Como posso te apoiar hoje?',
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const starterQuestions = [
    'O que é Franquia de Seguro?',
    'Como acionar um sinistro?',
    'Seguro auto cobre terceiros?',
    'Dicas para pagar mais barato'
  ];

  // Scroll to bottom whenever messages list change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Smart local fallback responses for offline or unconfigured API keys
  const getSimulatedResponse = (userText: string): string => {
    const query = userText.toLowerCase();
    
    if (query.includes('franquia')) {
      return 'A **franquia** é a sua participação financeira obrigatória em caso de sinistro de perda parcial (como bater o carro e precisar de reparos). \n\n*Exemplo:* Se o conserto do carro custar R$ 5.000 e sua franquia for R$ 1.500, você paga R$ 1.500 diretamente à oficina credenciada e a seguradora paga os R$ 3.500 restantes. Não há franquia em caso de perda total, roubo ou furto sem recuperação do veículo.';
    }
    
    if (query.includes('sinistro') || query.includes('acionar') || query.includes('bater') || query.includes('roub')) {
      return 'Em caso de **sinistro de urgência**, o procedimento correto é:\n\n1. **Primeiramente**, entre em contato conosco pelo nosso **WhatsApp**. Nós cuidamos de todo o caso no momento para você!\n2. **Em segundo lugar**, caso estejamos fora de área, você deve ligar diretamente para a seguradora no número de contato que enviamos na sua apólice/cartão de seguro.';
    }

    if (query.includes('terceiro') || query.includes('rcf')) {
      return 'Sim! A cobertura contra terceiros — chamada tecnicamente de **RCF-V (Responsabilidade Civil Facultativa Veicular)** — é uma das mais importantes. Ela cobre danos materiais, físicos ou morais que você possa causar a outros carros, pedestres ou propriedades. Recomendamos sempre contratar um limite de no mínimo R$ 100.000 para essa cobertura.';
    }

    if (query.includes('barato') || query.includes('economizar') || query.includes('desconto')) {
      return 'Para reduzir o valor da sua apólice de seguro, listamos 4 excelentes dicas:\n\n1. **Perfil de Condutor Único:** Evite incluir motoristas jovens (abaixo de 25 anos) se eles não usarem o carro com frequência.\n2. **Garagem Fechada:** Ter garagem fechada em casa e no trabalho reduz o prêmio de roubo em até 15%.\n3. **Histórico de bônus (Classe de Bônus):** Renove sempre no prazo para acumular pontos de bônus (classe de bônus), que dão até 50% de desconto cumulativo.\n4. **Franquia Ampliada:** Se você é um motorista muito prudente, pode optar por uma franquia maior para reduzir o valor da mensalidade do seguro.';
    }

    if (query.includes('auto') || query.includes('carro') || query.includes('veiculo')) {
      return 'O **Seguro Auto BQ** é feito sob medida. Temos planos com cobertura compreensiva (colisão, roubo, furto, incêndio e danos a terceiros) ou planos mais econômicos (apenas roubo e furto + assistência 24h). Qual o modelo do seu carro? Podemos simular agora mesmo no nosso cotador online!';
    }

    if (query.includes('vida')) {
      return 'O **Seguro de Vida** não serve apenas em casos de falecimento. Nossos planos modernos incluem indenização em vida por **Doenças Graves** (como câncer, infarto, AVC) e cobertura de **Invalidez por Acidente**, garantindo amparo financeiro para você se focar no seu restabelecimento. É um investimento em paz de espírito que custa menos que um café por dia.';
    }

    if (query.includes('residencial') || query.includes('casa') || query.includes('apartamento')) {
      return 'O **Seguro Residencial** é um dos mais baratos do mercado (geralmente menos de R$ 40/mês). Ele cobre incêndio, danos elétricos (queima de eletrodomésticos por curtos), roubo de bens e ainda dá assistência gratuita de chaveiro, eletricista e conserto de eletrodomésticos 24h. Vale muito a pena para proteger o seu lar.';
    }

    return 'Entendido! Como corretora digital, nós comparamos opções personalizadas nas 19 principais seguradoras do país (como Allianz, Bradesco, Porto Seguro, Tokio Marine). Você gostaria que eu simulasse uma proposta de seguro específica para você ou tem alguma outra dúvida sobre as coberturas?';
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Post query to our server endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map(m => ({ role: m.role, text: m.text }))
        })
      });

      if (!response.ok) {
        throw new Error('Server request failed');
      }

      const data = await response.json();
      
      const modelMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (error) {
      // Fallback gracefully to simulated specialist
      console.log('Gemini API/Server not responding, using smart local specialist responses');
      
      setTimeout(() => {
        const replyText = getSimulatedResponse(textToSend);
        const modelMsg: ChatMessage = {
          id: `model-${Date.now()}`,
          role: 'model',
          text: replyText,
          timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, modelMsg]);
        setIsTyping(false);
      }, 1200);
      return;
    }

    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-[500px] bg-slate-50/50 border border-slate-200/80 rounded-2xl overflow-hidden shadow-inner" id="ai-advisor-panel">
      {/* Title Header bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-primary-500 p-1.5 rounded-lg text-white">
            <Sparkles size={16} />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-800 block">Especialista Virtual</span>
            <span className="text-[10px] text-accent-700 block flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 bg-accent-500 rounded-full animate-pulse" />
              IA Ativa • Resposta Imediata
            </span>
          </div>
        </div>
        <div className="bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 text-[10px] text-slate-500 flex items-center gap-1.5 font-medium">
          <ShieldCheck size={12} className="text-accent-600" />
          Segurança SUSEP
        </div>
      </div>

      {/* Messages Scroll Box */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-200" id="ai-messages-scroll">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            id={`chat-msg-${m.id}`}
          >
            {m.role !== 'user' && (
              <div className="bg-accent-500/10 text-accent-700 p-1.5 rounded-lg border border-accent-500/10 shrink-0">
                <Sparkles size={14} />
              </div>
            )}
            
            <div className="max-w-[80%] space-y-1">
              <div
                className={`px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                  m.role === 'user'
                    ? 'bg-primary-500 text-white font-medium rounded-tr-none shadow-md shadow-primary-500/10'
                    : 'bg-white text-slate-700 border border-slate-200/80 rounded-tl-none shadow-sm'
                }`}
              >
                {m.text}
              </div>
              <span className={`block text-[9px] text-slate-400 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                {m.timestamp}
              </span>
            </div>

            {m.role === 'user' && (
              <div className="bg-primary-500 text-white p-1.5 rounded-lg shrink-0">
                <User size={14} />
              </div>
            )}
          </div>
        ))}

        {/* Typing bubble */}
        {isTyping && (
          <div className="flex items-center gap-2.5 justify-start" id="ai-typing-indicator">
            <div className="bg-accent-500/10 text-accent-700 p-1.5 rounded-lg border border-accent-500/10">
              <Sparkles size={14} />
            </div>
            <div className="bg-white border border-slate-200/80 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-accent-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-accent-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-accent-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Starter chips */}
      {messages.length === 1 && (
        <div className="px-4 pb-3 flex flex-wrap gap-1.5" id="starter-suggestions">
          {starterQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSendMessage(q)}
              className="bg-white hover:bg-accent-500/10 text-slate-600 hover:text-accent-700 border border-slate-200 hover:border-accent-500/20 px-3 py-1.5 rounded-xl text-[10px] sm:text-xs transition-all cursor-pointer shadow-sm"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input controls footer */}
      <div className="p-3 bg-white border-t border-slate-200 flex gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
          placeholder="Escreva sua pergunta sobre seguros..."
          className="flex-1 bg-slate-50 border border-slate-200 focus:border-accent-500 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none transition-colors"
          id="ai-input-field"
        />
        <button
          onClick={() => handleSendMessage(inputMessage)}
          className="bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-xl transition-colors shadow-md shadow-primary-500/10 cursor-pointer shrink-0"
          id="ai-send-btn"
          aria-label="Enviar"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
