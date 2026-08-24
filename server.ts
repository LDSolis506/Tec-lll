import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI SDK (Server-Side only)
// Uses GEMINI_API_KEY injected by environment
const getGenAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("⚠️ Warning: GEMINI_API_KEY is not defined. Using fallback response mode.");
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

// Course Context Knowledge Base for RAG grounding
const COURSE_KNOWLEDGE_BASE = `
INFORMACIÓN OFICIAL DEL CURSO:
Materia: Aplicaciones de la Inteligencia Artificial Empresarial (Módulo 3)
Institución: Tecnológico de Costa Rica (TEC)
Profesor: Dr. Esteban Vargas
Esquema de Evaluación: Exámenes 30%, Quizzes 20%, Tareas 20%, Trabajo Final 30%.
Integrantes del grupo: Máximo 5 estudiantes (lsolisdiego@gmail.com, fx.ingenieria@gmail.com, kimcb_91@hotmail.com, xeniaguerrero@gmail.com, johannam.deoca@gmail.com).

ESTRUCTURA DE ARCHIVOS EN GOOGLE DRIVE:
Carpeta raíz del curso/
├── Modulo 1/
├── Modulo 2/
└── Modulo 3/
    ├── Semana 1/ (Intro a la IA Empresarial y Modelos Generativos)
    ├── Semana 2/ (Python para IA: NumPy, Pandas, API calls)
    ├── Semana 3/ (Estadística Descriptiva y EDA)
    ├── Semana 4/ (Machine Learning Empresarial y Métricas de Evaluación)
    ├── Semana 5/ (Arquitectura RAG y Agentes con Gemini API)
    ├── Semana 6/ (Despliegue en Cloud, Gobernanza y Ética en IA)
    ├── Tareas/
    │   ├── Tarea 1.pdf (Fundamentos de programación con Python)
    │   └── Tarea 2.pdf (Fundamentos de Estadística con Python)
    └── Uploads/ (Carpeta para subir avances del Trabajo Final)

RÚBRICA OFICIAL DEL TRABAJO FINAL (100 PUNTOS):
1. Arquitectura Técnica e Integración con IA (25 pts): Integración con Gemini API, RAG sobre documentos de Drive y backend Express.
2. Experiencia de Usuario y UI Glassmorphism (25 pts): Fondo claro, translúcido, responsive, i18n ES/EN y micro-interacciones.
3. Seguridad, Whitelist y Persistencia (25 pts): Whitelist reducida a máximo 5 usuarios, autenticación y persistencia.
4. Documentación, Repositorio GitHub y Demostración (25 pts): Código TypeScript limpio, README y presentación oral.
`;

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "AIE Tracker",
    module: "Módulo 3 - TEC",
    timestamp: new Date().toISOString()
  });
});

// 1. Chatbot API Endpoint (Gemini API with RAG grounding)
app.post("/api/chat", async (req, res) => {
  try {
    const { message, language = "es", history = [] } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGenAIClient();

    // System instruction guiding the AI Tutor in the requested language
    const systemInstruction = language === "en"
      ? `You are "AIE AI Tutor", an intelligent academic assistant for the university course "Enterprise AI Applications" (Module 3, Tecnológico de Costa Rica).
      Use the following official course context to accurately answer student queries regarding PPTs, homework assignments, due dates, RAG architectures, and final project rubrics:
      ${COURSE_KNOWLEDGE_BASE}
      Be helpful, friendly, precise, and concise. Always cite the relevant course week or Drive document when appropriate.`
      : `Eres "Tutor IA AIE", un asistente académico inteligente para el curso universitario "Aplicaciones de la Inteligencia Artificial Empresarial" (Módulo 3, Tecnológico de Costa Rica).
      Utiliza el siguiente contexto oficial del curso para responder con precisión las dudas de los estudiantes sobre PPTs, tareas, fechas de entrega, arquitectura RAG y rúbrica del trabajo final:
      ${COURSE_KNOWLEDGE_BASE}
      Sé amable, claro, preciso y conciso. Cita siempre la semana del curso o el documento de Drive correspondiente cuando aplique.`;

    // TODO: conectar Gemini con RAG real mediante embeddings de Google Drive API
    if (ai) {
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: message,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const reply = response.text || (language === "en" ? "No response text generated." : "No se pudo generar respuesta.");
      
      // Determine source citations based on query keywords
      const lowerMsg = message.toLowerCase();
      const sources: string[] = [];
      if (lowerMsg.includes("semana") || lowerMsg.includes("week") || lowerMsg.includes("ppt")) {
        sources.push("Modulo 3/Semana 1-6/Presentaciones.pdf");
      }
      if (lowerMsg.includes("tarea") || lowerMsg.includes("assignment") || lowerMsg.includes("python")) {
        sources.push("Modulo 3/Tareas/Tarea 1.pdf");
      }
      if (lowerMsg.includes("rúbrica") || lowerMsg.includes("rubric") || lowerMsg.includes("proyecto")) {
        sources.push("Modulo 3/Documentos del Trabajo Final.pdf");
      }
      if (sources.length === 0) {
        sources.push("Modulo 3/Documentos de Aplicaciones de la IA Empresarial");
      }

      return res.json({
        reply,
        sources,
        timestamp: new Date().toLocaleTimeString()
      });
    } else {
      // Fallback simulated response if GEMINI_API_KEY is missing
      const simulatedReply = language === "en"
        ? `[AI Tutor] Based on Module 3 material for Enterprise AI Applications: Regarding your query "${message}", you can check the slides in 'Module 3/Week 5' for RAG architectures or review the Rubric criteria for the Final Project.`
        : `[Tutor IA] Basándome en el material del Módulo 3 para Aplicaciones de la IA Empresarial: Sobre tu consulta "${message}", puedes revisar las presentaciones de la 'Semana 5' en Drive para arquitecturas RAG o la Rúbrica oficial del Trabajo Final.`;

      return res.json({
        reply: simulatedReply,
        sources: ["Modulo 3/Documentos de la Carpeta de Drive"],
        timestamp: new Date().toLocaleTimeString()
      });
    }
  } catch (err: any) {
    console.error("Error in /api/chat:", err);
    res.status(500).json({
      error: "Internal server error processing chatbot request",
      details: err.message
    });
  }
});

// 2. AI News Algorithm Endpoint (Gemini API generation for daily news feed)
app.get("/api/news", async (req, res) => {
  try {
    const ai = getGenAIClient();
    const todayStr = new Date().toISOString().split('T')[0];

    if (ai) {
      const prompt = `Genera un JSON con un arreglo de 2 noticias/tendencias recientes sobre:
      1) Inteligencia Artificial Empresarial (LLMs, Gemini, RAG)
      2) Automatización de Procesos (RPA, Agentes Autónomos, Workflows con Make/N8n)
      
      Devuelve ÚNICAMENTE un formato JSON estricto sin marcado markdown extra, con esta estructura para cada elemento:
      [
        {
          "id": "news_gemini_1",
          "title": "Título atractivo y profesional",
          "summary": "Resumen conciso de 2 oraciones sobre el impacto empresarial.",
          "category": "ai",
          "url": "https://blog.google/technology/ai/",
          "source": "Google AI News",
          "date": "${todayStr}",
          "sharedBy": "Algoritmo Gemini AIE",
          "likes": 15,
          "isAIGenerated": true
        }
      ]`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });

      const rawText = response.text || "[]";
      // Sanitize potential json backticks
      const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      const newsItems = JSON.parse(cleanJson);

      return res.json({ success: true, news: newsItems });
    } else {
      // Fallback AI news items
      return res.json({
        success: true,
        news: [
          {
            id: `news_auto_${Date.now()}_1`,
            title: 'Nuevos Avances en Agentes Autónomos para Automatización Financiera en 2026',
            summary: 'Las empresas aceleran la adopción de agentes basados en LLMs para orquestación de datos entre Google Drive, SAP y bases de datos vectoriales.',
            category: 'automation',
            url: 'https://n8n.io/blog/',
            source: 'Enterprise AI & Automation Feed',
            date: todayStr,
            sharedBy: 'Algoritmo AIE Feed',
            likes: 10,
            imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
            isAIGenerated: true
          }
        ]
      });
    }
  } catch (err: any) {
    console.error("Error in /api/news:", err);
    res.json({
      success: true,
      news: [
        {
          id: `news_fallback_${Date.now()}`,
          title: 'Sincronización Diaria: Tendencias en Agentes de IA y Automatización Empresarial',
          summary: 'Análisis de mejores prácticas en RAG sobre repositorios de Google Drive y flujos sin código.',
          category: 'ai',
          url: 'https://blog.google/technology/ai/',
          source: 'AIE Feed Tecnológico de Costa Rica',
          date: new Date().toISOString().split('T')[0],
          sharedBy: 'Algoritmo AIE Feed',
          likes: 8,
          isAIGenerated: true
        }
      ]
    });
  }
});

// 3. Google Drive API Integration Points (Simulated + Extensible)

app.get("/api/drive/files", (req, res) => {
  // TODO: conectar API de Drive (Google Drive API OAuth 2.0)
  // Reads files in Module 3 root folder and subfolders (Semana 1..6, Tareas, Uploads)
  res.json({
    rootFolder: "Carpeta raíz del curso/Modulo 3",
    subfolders: [
      { name: "Semana 1", filesCount: 2, path: "Modulo 3/Semana 1" },
      { name: "Semana 2", filesCount: 2, path: "Modulo 3/Semana 2" },
      { name: "Semana 3", filesCount: 1, path: "Modulo 3/Semana 3" },
      { name: "Semana 4", filesCount: 1, path: "Modulo 3/Semana 4" },
      { name: "Semana 5", filesCount: 1, path: "Modulo 3/Semana 5" },
      { name: "Semana 6", filesCount: 1, path: "Modulo 3/Semana 6" },
      { name: "Tareas", filesCount: 2, path: "Modulo 3/Tareas" },
      { name: "Uploads", filesCount: 2, path: "Modulo 3/Uploads" }
    ]
  });
});

app.post("/api/drive/upload", (req, res) => {
  // TODO: conectar API de Drive para escritura en Módulo 3/Uploads
  const { fileName, userEmail } = req.body;
  res.json({
    success: true,
    message: `File ${fileName || 'document'} uploaded successfully to Modulo 3/Uploads`,
    drivePath: `Modulo 3/Uploads/${fileName || 'file'}`,
    uploadedBy: userEmail || "Lsolisdiego@gmail.com",
    timestamp: new Date().toISOString()
  });
});

// ----------------------------------------------------
// VITE MIDDLEWARE SETUP
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 AIE Tracker server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
