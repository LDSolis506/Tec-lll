export type Language = 'es' | 'en';

export type ActiveScreen = 'home' | 'course' | 'project';

export type CourseTab = 'ppts' | 'videoteca';

export type ProjectTab = 'metrics' | 'rubric' | 'uploads';

export interface DeadlineItem {
  id: string;
  title: string;
  description: string;
  dueDate: string; // ISO date string or formatted date
  category: 'course' | 'project';
  urgencyDays: number;
  urgentLevel: 'high' | 'medium' | 'normal';
  pdfUrl?: string;
}

export interface StudentMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  contributionPercent: number;
  isCurrentUser?: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
}

export interface PresentationItem {
  title: string;
  url: string;
}

export interface WeekPPT {
  id: string;
  weekNumber: number;
  title: string;
  summary: string;
  drivePath: string; // e.g. "Modulo 3/Semana 1/Presentacion.pdf"
  pptUrl: string;
  presentations?: PresentationItem[];
  hasVideo: boolean;
  videoUrl?: string;
  slidesCount: number;
  quizQuestions: QuizQuestion[];
  homeworkTitle?: string;
  homeworkPdfUrl?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  url: string;
  platform: 'youtube' | 'tiktok' | 'other';
  videoId: string;
  thumbnailUrl: string;
  sharedBy: string; // Member name or email
  sharedByAvatar?: string;
  comment: string;
  createdAt: string;
  likes: number;
}

export interface RubricCriterion {
  id: string;
  title: string;
  weight: number; // Percentage or max points (e.g. 25)
  description: string;
  excellent: string; // 100% criteria
  good: string;      // 75% criteria
  fair: string;      // 50% criteria
  poor: string;      // 0-25% criteria
}

export type TaskStatus = 'pending' | 'in_production' | 'stopped' | 'finished';

export interface ProjectTask {
  id: string;
  title: string;
  assignedTo: string; // Student name or ID
  status: TaskStatus | 'todo' | 'in_progress' | 'review' | 'completed';
  dueDate: string;
  category: string;
}

export interface DriveUploadItem {
  id: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  uploadedBy: string;
  uploadedAt: string;
  driveFolder: string; // "Modulo 3/Uploads"
  driveUrl: string;
  status: 'synced' | 'pending';
}

export interface AdaptiveCardActionButton {
  label: string;
  action: string;
  screen?: ActiveScreen;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  sources?: string[];
  isThinking?: boolean;
  cardType?: 'rubric' | 'datasets' | 'recommendation' | 'upload_guide' | 'videoteca' | 'tasks' | 'welcome_menu' | 'general';
  cardTitle?: string;
  cardMetrics?: Array<{ label: string; value: string }>;
  actionButtons?: AdaptiveCardActionButton[];
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

export type NewsCategory = 'ai' | 'automation' | 'tiktok' | 'youtube';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: NewsCategory;
  url: string;
  source: string; // e.g. "Google AI Blog", "DotCSV", "TikTok Tech", "OpenAI"
  date: string; // e.g. "2026-08-09"
  sharedBy: string;
  likes: number;
  imageUrl?: string;
  isAIGenerated?: boolean;
  itemType?: 'noticia' | 'tutorial'; // 'noticia' or 'tutorial' for slice filter
  aiName?: string; // Optional AI Name for AI Recommendations
}

export interface AuthSession {
  isAuthenticated: boolean;
  currentUser: StudentMember | null;
}

