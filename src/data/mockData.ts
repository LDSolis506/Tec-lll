import { DeadlineItem, StudentMember, WeekPPT, VideoItem, RubricCriterion, ProjectTask, DriveUploadItem, NewsItem } from '../types';

export const initialDeadlines: DeadlineItem[] = [
  {
    id: 'd1',
    title: 'Tarea 1: Fundamentos de Programación con Python para IA',
    description: 'Entrega de Jupyter Notebook (.ipynb) con ejercicios prácticos de NumPy, Pandas y API calls.',
    dueDate: '2026-08-12',
    category: 'course',
    urgencyDays: 3,
    urgentLevel: 'high',
    pdfUrl: 'https://docs.google.com/file/d/0B5VsS3feMSSgNTU4OGJkZDktMjgzNy00NGNlLWFkYjUtYmQ1ZWI1NDBjOTVj/edit?hl=es&resourcekey=0-bAgfYp82Tah5u0Xaj7pGgQ'
  },
  {
    id: 'd2',
    title: 'Entrega de Avance #1: Arquitectura y Dataset del Proyecto Final',
    description: 'Documento PDF con diseño de arquitectura RAG, esquema de Firestore y muestra de datos.',
    dueDate: '2026-08-17',
    category: 'project',
    urgencyDays: 8,
    urgentLevel: 'medium'
  },
  {
    id: 'd3',
    title: 'Tarea 2: Fundamentos de Estadística y EDA para IA',
    description: 'Análisis exploratorio de datos, distribuciones y métricas de desempeño de modelos.',
    dueDate: '2026-08-24',
    category: 'course',
    urgencyDays: 15,
    urgentLevel: 'normal'
  },
  {
    id: 'd4',
    title: 'Quiz de Retroalimentación Semana 4: ML Empresarial',
    description: 'Evaluación corta en línea sobre algoritmos supervisados y métricas de evaluación.',
    dueDate: '2026-08-30',
    category: 'course',
    urgencyDays: 21,
    urgentLevel: 'normal'
  },
  {
    id: 'd5',
    title: 'Entrega Final del Proyecto y Presentación Ejecutiva',
    description: 'Demostración en vivo, código en GitHub, archivos en Drive y presentación ejecutiva.',
    dueDate: '2026-09-10',
    category: 'project',
    urgencyDays: 32,
    urgentLevel: 'normal'
  }
];

export const initialMembers: StudentMember[] = [
  {
    id: 'm1',
    name: 'lsolisdiego@gmail.com',
    email: 'lsolisdiego@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'TEC AI Architect',
    contributionPercent: 0,
    isCurrentUser: true
  },
  {
    id: 'm2',
    name: 'fx.ingenieria@gmail.com',
    email: 'fx.ingenieria@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'TEC AI Architect',
    contributionPercent: 0,
    isCurrentUser: false
  },
  {
    id: 'm3',
    name: 'kimcb_91@hotmail.com',
    email: 'kimcb_91@hotmail.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    role: 'TEC AI Architect',
    contributionPercent: 0,
    isCurrentUser: false
  },
  {
    id: 'm4',
    name: 'xeniaguerrero@gmail.com',
    email: 'xeniaguerrero@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'TEC AI Architect',
    contributionPercent: 0,
    isCurrentUser: false
  },
  {
    id: 'm5',
    name: 'johannam.deoca@gmail.com',
    email: 'johannam.deoca@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    role: 'TEC AI Architect',
    contributionPercent: 0,
    isCurrentUser: false
  }
];

export const initialNews: NewsItem[] = [
  {
    id: 'n1',
    title: 'Google lanza el modelo Gemini 1.5 Pro con ventana contextual de 2 millones de tokens',
    summary: 'Avance revolucionario para la indexación empresarial de documentos masivos y código sin necesidad de dividir en pequeños fragmentos.',
    category: 'ai',
    url: 'https://blog.google/technology/ai/google-gemini-next-generation-model-feb-2024/',
    source: 'Google AI Blog',
    date: '2026-08-09',
    sharedBy: 'Algoritmo AIE Feed',
    likes: 12,
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    isAIGenerated: true,
    itemType: 'noticia',
    aiName: 'Gemini 1.5 Pro'
  },
  {
    id: 'n2',
    title: 'Automatización de Procesos Empresariales con Agentes Autónomos e N8N / Zapier',
    summary: 'Cómo conectar sistemas legados con LLMs para procesar correos, extraer datos de facturas en Drive y responder consultas automáticamente.',
    category: 'automation',
    url: 'https://n8n.io/blog/ai-agents-automation/',
    source: 'Workflow Automation Review',
    date: '2026-08-09',
    sharedBy: 'Diego Solís',
    likes: 8,
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    isAIGenerated: false,
    itemType: 'tutorial',
    aiName: 'n8n AI Agents'
  },
  {
    id: 'n3',
    title: 'Google DeepMind y la Nueva Era de Agentes Autónomos Multimodales 2026',
    summary: 'Orquestación de agentes capaces de ejecutar scripts de Python, consultar Google Drive y resolver flujos de trabajo complejos de forma autónoma.',
    category: 'ai',
    url: 'https://deepmind.google/technologies/',
    source: 'Google DeepMind Research',
    date: '2026-08-09',
    sharedBy: 'Algoritmo AIE Feed',
    likes: 18,
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=80',
    isAIGenerated: true,
    itemType: 'noticia',
    aiName: 'DeepMind Autonomous Agents'
  },
  {
    id: 'n4',
    title: 'OpenAI GPT-4o Realtime & Vision: Transformando la Automatización RPA',
    summary: 'Procesamiento de audio e imágenes en tiempo real para optimizar tareas operativas y reducir errores en facturación y atención al cliente.',
    category: 'ai',
    url: 'https://openai.com/news/',
    source: 'OpenAI Research',
    date: '2026-08-08',
    sharedBy: 'Algoritmo AIE Feed',
    likes: 16,
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80',
    isAIGenerated: true,
    itemType: 'noticia',
    aiName: 'GPT-4o Realtime'
  },
  {
    id: 'n5',
    title: 'LangChain & LlamaIndex 2026: El Estándar para RAG Empresarial sobre Drive',
    summary: 'Técnicas avanzadas de Hybrid Search, Reranking con Cohere y manejo de permisos por usuario en bases de datos vectoriales.',
    category: 'automation',
    url: 'https://blog.langchain.dev/',
    source: 'LangChain Official Blog',
    date: '2026-08-08',
    sharedBy: 'kimcb_91@hotmail.com',
    likes: 14,
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    isAIGenerated: false,
    itemType: 'tutorial',
    aiName: 'LangChain RAG'
  },
  {
    id: 'n6',
    title: 'n8n + Gemini Pro: Guía Paso a Paso para Automatizar Tareas del Módulo 3',
    summary: 'Creación de webhooks con Google Workspace para automatizar la revisión de código y resúmenes semanales de clases.',
    category: 'automation',
    url: 'https://n8n.io/integrations/google-drive/',
    source: 'n8n Community',
    date: '2026-08-08',
    sharedBy: 'fx.ingenieria@gmail.com',
    likes: 15,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    isAIGenerated: false,
    itemType: 'tutorial',
    aiName: 'n8n Workflows'
  },
  {
    id: 'n7',
    title: 'TikTok Tech: 3 Prompts clave para optimizar la arquitectura RAG en Python',
    summary: 'Explicación dinámica en 60 segundos sobre cómo hacer chunking híbrido y reranking de resultados con embeddings vectoriales.',
    category: 'tiktok',
    url: 'https://www.tiktok.com/@tech_ai_daily/video/rag_prompts_123',
    source: 'TikTok @tech_ai_daily',
    date: '2026-08-08',
    sharedBy: 'kimcb_91@hotmail.com',
    likes: 15,
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    isAIGenerated: false,
    itemType: 'tutorial',
    aiName: 'RAG Prompts'
  },
  {
    id: 'n8',
    title: 'DotCSV: ¿Cómo funcionan los Agentes de IA en producción para Automatización?',
    summary: 'Video magistral del reconocido canal DotCSV analizando bucles de razonamiento, Function Calling y memoria persistente.',
    category: 'youtube',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    source: 'Canal DotCSV (YouTube)',
    date: '2026-08-07',
    sharedBy: 'fx.ingenieria@gmail.com',
    likes: 19,
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    isAIGenerated: false,
    itemType: 'tutorial',
    aiName: 'Agentes DotCSV'
  },
  {
    id: 'n9',
    title: 'Anthropic lanza Claude 3.5 Sonnet: Benchmark en automatización de código',
    summary: 'Análisis de la herramienta Computer Use y cómo los modelos pueden operar sistemas de escritorio y navegar por interfaces de usuario.',
    category: 'ai',
    url: 'https://www.anthropic.com/news',
    source: 'Anthropic News',
    date: '2026-08-07',
    sharedBy: 'Algoritmo AIE Feed',
    likes: 11,
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    isAIGenerated: true,
    itemType: 'noticia',
    aiName: 'Claude 3.5 Sonnet'
  },
  {
    id: 'n10',
    title: 'TikTok Shorts: Cómo crear pipelines de ETL sin código usando Make e IA',
    summary: 'Aprende a integrar Google Drive, WhatsApp Business y ChatGPT en 5 pasos directos sin programar.',
    category: 'tiktok',
    url: 'https://www.tiktok.com/@ai_automation_pro/video/etl_make_ai',
    source: 'TikTok @ai_automation_pro',
    date: '2026-08-07',
    sharedBy: 'johannam.deoca@gmail.com',
    likes: 14,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    isAIGenerated: false,
    itemType: 'tutorial',
    aiName: 'Make & ChatGPT'
  }
];

// 20 Questions generator helper for practice quizzes
const generate20QuestionsForWeek = (weekNum: number, topic: string) => {
  return Array.from({ length: 20 }, (_, i) => {
    const qNum = i + 1;
    return {
      id: qNum,
      question: `[Semana ${weekNum} - Pregunta ${qNum}] ¿Cuál es el concepto clave relacionado con ${topic} expuesto en el punto ${qNum} de la presentación?`,
      options: [
        `Opción A: Implementación directa mediante patrones recomendados en ${topic}`,
        `Opción B: Evaluación secundaria sin impacto en la arquitectura de IA`,
        `Opción C: Configuración por defecto de modelos sin parámetros personalizados`,
        `Opción D: Modelo abstracto no aplicable a entornos empresariales reales`
      ],
      correctAnswer: 0,
      explanation: `Según la presentación oficial de la Semana ${weekNum} sobre "${topic}", la opción A representa la práctica recomendada explicada por el profesor.`
    };
  });
};

export const initialWeeks: WeekPPT[] = [
  {
    id: 'w1',
    weekNumber: 1,
    title: 'Introducción a la IA Empresarial y Modelos Generativos',
    summary: 'Panorama de la Inteligencia Artificial en las organizaciones, evolución de LLMs y estrategia de adopción empresarial.',
    drivePath: 'Modulo 3/Semana 1/Semana_1_Intro_IA_Empresarial.pdf',
    pptUrl: 'https://docs.google.com/presentation/d/1vUAS1UMT5UvQ0GuioyRKx6O3fhAN73hW/edit?usp=drive_link&ouid=101588645698187977930&rtpof=true&sd=true',
    presentations: [
      {
        title: 'Estrategia_Empresarial_2',
        url: 'https://docs.google.com/presentation/d/1vUAS1UMT5UvQ0GuioyRKx6O3fhAN73hW/edit?usp=drive_link&ouid=101588645698187977930&rtpof=true&sd=true'
      },
      {
        title: 'Inteligencia_Artificial_1',
        url: 'https://docs.google.com/presentation/d/17mDYSNc9ce_tvPqkSTHO5mDFaEuJNfU_/edit?usp=drive_link&ouid=101588645698187977930&rtpof=true&sd=true'
      }
    ],
    hasVideo: true,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    slidesCount: 38,
    quizQuestions: generate20QuestionsForWeek(1, 'Introducción a la IA Empresarial')
  },
  {
    id: 'w2',
    weekNumber: 2,
    title: 'Fundamentos de Programación con Python para Inteligencia Artificial',
    summary: 'Entornos virtuales, sintaxis avanzada, manipulación de estructuras de datos con NumPy y Pandas para workflows de datos.',
    drivePath: 'Modulo 3/Semana 2/Semana_2_Python_para_IA.pdf',
    pptUrl: 'https://drive.google.com/drive/folders/1QFpombXI9sTy7okfLZWiJ7NkFLdyoxDt?usp=drive_link',
    presentations: [
      {
        title: 'Configuración Cloud / Python',
        url: 'https://drive.google.com/drive/folders/1QFpombXI9sTy7okfLZWiJ7NkFLdyoxDt?usp=drive_link'
      }
    ],
    hasVideo: true,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    slidesCount: 45,
    quizQuestions: generate20QuestionsForWeek(2, 'Python y Manipulación de Datos'),
    homeworkTitle: 'Tarea 1: Fundamentos de Programación con Python para IA',
    homeworkPdfUrl: 'https://docs.google.com/file/d/0B5VsS3feMSSgNTU4OGJkZDktMjgzNy00NGNlLWFkYjUtYmQ1ZWI1NDBjOTVj/edit?hl=es&resourcekey=0-bAgfYp82Tah5u0Xaj7pGgQ'
  },
  {
    id: 'w3',
    weekNumber: 3,
    title: 'Estadística Descriptiva, EDA y Preprocesamiento de Datos',
    summary: 'Análisis exploratorio de datos (EDA), limpieza de datasets, imputación de valores faltantes y detección de outliers.',
    drivePath: 'Modulo 3/Semana 3/Semana_3_Estadistica_EDA.pdf',
    pptUrl: 'https://drive.google.com/file/d/1yaeJ5B1maTVDR7eECZUrRp2ikzo7XizH/view?usp=drive_link',
    presentations: [
      {
        title: 'Fundamentos de Estadistica',
        url: 'https://drive.google.com/file/d/1yaeJ5B1maTVDR7eECZUrRp2ikzo7XizH/view?usp=drive_link'
      }
    ],
    hasVideo: false,
    slidesCount: 42,
    quizQuestions: generate20QuestionsForWeek(3, 'Estadística Descriptiva y EDA')
  },
  {
    id: 'w4',
    weekNumber: 4,
    title: 'Algoritmos de Machine Learning y Evaluación de Modelos',
    summary: 'Clasificación, regresión, métricas de desempeño (Precision, Recall, F1-Score, ROC-AUC) y validación cruzada.',
    drivePath: 'Modulo 3/Semana 4/Semana_4_ML_Evaluacion.pdf',
    pptUrl: 'https://drive.google.com/drive/folders/1oj147ciKhfsahbFbgYSCTgREl2uYn4zm?usp=drive_link',
    presentations: [
      {
        title: 'Limpieza de datos',
        url: 'https://drive.google.com/drive/folders/1oj147ciKhfsahbFbgYSCTgREl2uYn4zm?usp=drive_link'
      }
    ],
    hasVideo: false,
    slidesCount: 50,
    quizQuestions: generate20QuestionsForWeek(4, 'Algoritmos de ML y Métricas')
  },
  {
    id: 'w5',
    weekNumber: 5,
    title: 'Arquitectura RAG (Retrieval-Augmented Generation) y Agentes de IA',
    summary: 'Embeddings de texto, bases de datos vectoriales, chunking de documentos de Drive y orquestación de agentes con Gemini.',
    drivePath: 'Modulo 3/Semana 5/Semana_5_RAG_y_Agentes.pdf',
    pptUrl: 'https://drive.google.com/drive/folders/1nx-S9s2IROPdWTn_yD-kFBBrJb8tYl5e?usp=drive_link',
    presentations: [
      {
        title: 'Modelos supervisados',
        url: 'https://drive.google.com/drive/folders/1nx-S9s2IROPdWTn_yD-kFBBrJb8tYl5e?usp=drive_link'
      }
    ],
    hasVideo: false,
    slidesCount: 48,
    quizQuestions: generate20QuestionsForWeek(5, 'Arquitectura RAG y Agentes')
  },
  {
    id: 'w6',
    weekNumber: 6,
    title: 'Despliegue Empresarial, Gobernanza de Datos y Ética en IA',
    summary: 'Monitoreo de drift, despliegue en Google Cloud Platform, seguridad en API Keys y marcos de responsabilidad ética.',
    drivePath: 'Modulo 3/Semana 6/Semana_6_Despliegue_y_Etica.pdf',
    pptUrl: 'https://drive.google.com/file/d/1ch1qnLwvWsvKg3I1YB8M-7fPZjeGqxEM/view?usp=drive_link',
    presentations: [
      {
        title: 'Modelos supervisados ll',
        url: 'https://drive.google.com/file/d/1ch1qnLwvWsvKg3I1YB8M-7fPZjeGqxEM/view?usp=drive_link'
      }
    ],
    hasVideo: false,
    slidesCount: 36,
    quizQuestions: generate20QuestionsForWeek(6, 'Despliegue en GCP y Ética en IA')
  }
];

export const initialVideos: VideoItem[] = [
  {
    id: 'v1',
    title: 'Tutorial Completo de RAG con Gemini API y Google Drive Indexing',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    platform: 'youtube',
    videoId: 'dQw4w9WgXcQ',
    thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    sharedBy: 'lsolisdiego@gmail.com',
    comment: 'Excelente explicación de cómo conectar documentos de Google Drive a Gemini sin perder contexto.',
    createdAt: '2026-08-05',
    likes: 4
  },
  {
    id: 'v2',
    title: 'Cómo estructurar un Dashboard de Métricas en React para Proyectos de IA',
    url: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
    platform: 'youtube',
    videoId: '3JZ_D3ELwOQ',
    thumbnailUrl: 'https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg',
    sharedBy: 'fx.ingenieria@gmail.com',
    comment: 'Sirve mucho de referencia para el diseño de los gráficos de nuestro Trabajo Final.',
    createdAt: '2026-08-07',
    likes: 3
  }
];

export const initialRubric: RubricCriterion[] = [
  {
    id: 'r1',
    title: '1. Entendimiento e Investigación del Dataset (5%)',
    weight: 5,
    description: 'Conoce y entiende el dataset asignado para el trabajo final (Spotify40, SAHeart, Voces o Tumores). Investiga variables para llegar a un mejor entendimiento.',
    excellent: '5 Pts (Aceptable): Demuestra dominio completo del dataset, origen de los datos, fiabilidad y definición matemática/negocio de todas las variables.',
    good: '4 Pts (Bien): Conoce el dataset y sus variables principales, con una investigación satisfactoria de contexto.',
    fair: '3 Pts (Competente) / 2 Pts (Malo): Comprensión parcial de las columnas o falta de investigación profunda sobre el origen de los datos.',
    poor: '1 Pt (Inaceptable): Desconoce las características esenciales del dataset asignado o comete errores graves de interpretación.'
  },
  {
    id: 'r2',
    title: '2. Estructuras de Datos y Programación en Python / Colab (10%)',
    weight: 10,
    description: 'Utiliza de forma correcta estructuras de datos (Pandas, NumPy, Arrays), principios de programación en Python y manipula datos correctamente.',
    excellent: '5 Pts (Aceptable): Código limpio, comentado y estructurado en Google Colab con slicing, feature engineering, imputación estadística de nulos y manipulación perfecta.',
    good: '4 Pts (Bien): Uso correcto de estructuras de datos y transformación básica en Python sin errores de ejecución.',
    fair: '3 Pts (Competente) / 2 Pts (Malo): Errores en manipulación de arrays/dataframes o comentarios insuficientes en el código.',
    poor: '1 Pt (Inaceptable): Incapacidad para manipular datos en Python o notebook inejecutable.'
  },
  {
    id: 'r3',
    title: '3. Análisis Exploratorio de Datos (EDA) y Visualizaciones (10%)',
    weight: 10,
    description: 'Realiza EDA completo: estadísticos (mín, máx, medias, modas, desviaciones), correlaciones, histogramas, sesgos, ANOVA, tablas pivote y gráficos explicativos.',
    excellent: '5 Pts (Aceptable): EDA exhaustivo con interpretación profunda de cada gráfico, tabla pivote, análisis de sesgos, correlaciones e insights de negocio.',
    good: '4 Pts (Bien): Presenta estadísticos principales, gráficos y tablas pivote bien explicadas.',
    fair: '3 Pts (Competente) / 2 Pts (Malo): Muestra únicamente los resultados de los gráficos sin análisis crítico o sin interpretación estadística.',
    poor: '1 Pt (Inaceptable): Omite estadísticos clave o no realiza tablas pivote ni análisis de distribuciones.'
  },
  {
    id: 'r4',
    title: '4. Modelo de Machine Learning y Hyperparameter Tuning (10%)',
    weight: 10,
    description: 'Elige de forma correcta el modelo de Machine Learning (Regresión Logística, Clasificación, Clustering), tunnea algoritmos y evalúa con Matriz de Confusión o R2.',
    excellent: '5 Pts (Aceptable): Selección y justificación perfecta del algoritmo, tuning rigoroso, evaluación detallada con Matriz de Confusión/R2 y análisis de explicabilidad.',
    good: '4 Pts (Bien): Algoritmo configurado y evaluado correctamente con métricas estándar de ML.',
    fair: '3 Pts (Competente) / 2 Pts (Malo): Modelo seleccionado sin justificación clara o evaluación incompleta sin matriz de confusión.',
    poor: '1 Pt (Inaceptable): Selección errónea del modelo o incapacidad para entrenar/evaluar el algoritmo.'
  },
  {
    id: 'r5',
    title: '5. Conclusiones Consultivas y Abstracción de Problemas (5%)',
    weight: 5,
    description: 'Capaz de analizar y llegar a un entendimiento profundo creando conclusiones basadas en métodos científicos y explicando el problema de la vida real.',
    excellent: '5 Pts (Aceptable): Enfoque de consultoría estratégica de alto nivel, recomendaciones fundamentadas estrictamente en datos e impacto real en el negocio.',
    good: '4 Pts (Bien): Conclusiones sólidas y coherentes con los hallazgos del modelo.',
    fair: '3 Pts (Competente) / 2 Pts (Malo): Conclusiones genéricas o no respaldadas por los datos analizados.',
    poor: '1 Pt (Inaceptable): Sin conclusiones de valor o contradictorias.'
  },
  {
    id: 'r6',
    title: '6. Presentación Ejecutiva y Metodología CRISP-DM (10%)',
    weight: 10,
    description: 'Presentación ejecutiva de 12 min (+5 min preguntas), metodología CRISP-DM, vocabulario técnico, gesticulación, cámara encendida y respuesta al jurado (Prof. Heiner Romero).',
    excellent: '5 Pts (Aceptable): Presentación impecable siguiendo CRISP-DM, excelente dominio escénico, uso de lenguaje técnico y respuestas sólidas al jurado.',
    good: '4 Pts (Bien): Buena exposición ejecutiva y manejo del tiempo en los 12 minutos asignados.',
    fair: '3 Pts (Competente) / 2 Pts (Malo): Exposición desorganizada, exceso de tiempo o falta de fluidez en respuestas.',
    poor: '1 Pt (Inaceptable): Presentación incompleta o no responde las preguntas del jurado.'
  }
];

export const initialTasks: ProjectTask[] = [
  {
    id: 't1',
    title: 'Configurar arquitectura y entorno de trabajo en Google Colab',
    assignedTo: 'lsolisdiego@gmail.com',
    status: 'pending',
    dueDate: '2026-08-08',
    category: 'Frontend'
  },
  {
    id: 't2',
    title: 'Análisis exploratorio y preparación del dataset asignado',
    assignedTo: 'fx.ingenieria@gmail.com',
    status: 'pending',
    dueDate: '2026-08-09',
    category: 'Backend'
  },
  {
    id: 't3',
    title: 'Modelado y entrenamiento de algoritmos de Machine Learning',
    assignedTo: 'kimcb_91@hotmail.com',
    status: 'pending',
    dueDate: '2026-08-14',
    category: 'AI / ML'
  },
  {
    id: 't4',
    title: 'Evaluación de métricas de precisión, recall y matriz de confusión',
    assignedTo: 'xeniaguerrero@gmail.com',
    status: 'pending',
    dueDate: '2026-08-16',
    category: 'Evaluación'
  },
  {
    id: 't5',
    title: 'Redacción del informe técnico .ipynb con interpretaciones de negocio',
    assignedTo: 'johannam.deoca@gmail.com',
    status: 'pending',
    dueDate: '2026-08-18',
    category: 'Informe'
  },
  {
    id: 't6',
    title: 'Preparación de presentación ejecutiva de 12 minutos para el jurado',
    assignedTo: 'lsolisdiego@gmail.com',
    status: 'pending',
    dueDate: '2026-08-25',
    category: 'Presentación'
  }
];

export const initialUploads: DriveUploadItem[] = [
  {
    id: 'up1',
    fileName: 'Propuesta_Trabajo_Final_Modulo3.pdf',
    fileSize: '2.4 MB',
    fileType: 'PDF Document',
    uploadedBy: 'lsolisdiego@gmail.com',
    uploadedAt: '2026-08-08 14:30',
    driveFolder: 'Modulo 3/Uploads',
    driveUrl: 'https://drive.google.com',
    status: 'synced'
  },
  {
    id: 'up2',
    fileName: 'Dataset_Muestra_Empresarial.csv',
    fileSize: '5.1 MB',
    fileType: 'CSV Dataset',
    uploadedBy: 'kimcb_91@hotmail.com',
    uploadedAt: '2026-08-09 10:15',
    driveFolder: 'Modulo 3/Uploads',
    driveUrl: 'https://drive.google.com',
    status: 'synced'
  }
];
