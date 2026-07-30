/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const PORT = 3000;
const app = express();

app.use(express.json());

// Initialize Gemini SDK lazily to prevent crash on startup if key is missing or placeholder
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    console.warn('GEMINI_API_KEY is not defined or is a placeholder. Chat will use smart fallback response mode.');
    return null;
  }
  
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// AI Specialist Chat Route
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message parameter is required.' });
  }

  const ai = getAiClient();

  if (!ai) {
    return res.status(503).json({ 
      error: 'API key not configured',
      fallback: true 
    });
  }

  try {
    const formattedHistory = (history || []).map((m: any) => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.text }]
    }));

    const systemInstruction = 
      "Você é a Clara, a assistente e especialista virtual em seguros da BQ Seguros (Registro SUSEP: 10.1234567.8, CNPJ: 45.123.456/0001-89). " +
      "Seu objetivo é auxiliar os usuários com simulações, esclarecer dúvidas sobre coberturas (Automóvel, Residencial, Vida, Saúde, Empresarial, Viagem, Equipamentos, Pet), " +
      "explicar conceitos como 'franquia', 'sinistro', 'carência' e dar dicas de economia. " +
      "Sempre responda em português brasileiro de forma acolhedora, profissional, ágil e muito confiável. " +
      "Seja objetiva, utilize formatações em negrito para termos importantes e faça listas de forma legível.";

    const contents = [
      ...formattedHistory,
      { role: 'user', parts: [{ text: message }] }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ reply: response.text });
  } catch (err: any) {
    console.error('Error in Gemini API execution:', err);
    res.status(500).json({ error: 'Failed to generate response', details: err.message, fallback: true });
  }
});

// App Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', serverTime: new Date().toISOString() });
});

async function bootstrap() {
  // Vite Integration
  if (process.env.NODE_ENV !== 'production') {
    console.log('Mounting Vite dev server middleware...');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    console.log('Serving production static bundle...');
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BQ Seguros Server running on http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start server:', err);
});
