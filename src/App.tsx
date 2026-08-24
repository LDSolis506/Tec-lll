import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LanguageProvider } from './i18n/LanguageContext';
import { Header } from './components/Header';
import { MainDashboard } from './components/MainDashboard';
import { CourseTrackingView } from './components/CourseTracking/CourseTrackingView';
import { FinalProjectView } from './components/FinalProject/FinalProjectView';
import { AIChatbot } from './components/Chatbot/AIChatbot';
import { ToastContainer } from './components/Toast';
import { AuthModal } from './components/AuthModal';
import { IntroSplash } from './components/IntroSplash';
import { UserProfileModal } from './components/UserProfileModal';
import { GuidedTourModal } from './components/GuidedTourModal';
import { ActiveScreen, ToastNotification, StudentMember, VideoItem, ProjectTask, DriveUploadItem, NewsItem } from './types';
import {
  initialDeadlines,
  initialMembers,
  initialWeeks,
  initialVideos,
  initialRubric,
  initialTasks,
  initialUploads,
  initialNews
} from './data/mockData';

export function AppContent() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('home');
  const [members, setMembers] = useState<StudentMember[]>(initialMembers);
  const [showIntro, setShowIntro] = useState(() => {
    // Show splash screen on session start
    return sessionStorage.getItem('aie_session_active') !== 'true';
  });
  const [currentMember, setCurrentMember] = useState<StudentMember>(() => {
    const savedId = localStorage.getItem('aie_selected_member_id');
    const found = initialMembers.find((m) => m.id === savedId || m.email === savedId);
    return found || initialMembers[0];
  });
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [videos, setVideos] = useState<VideoItem[]>(initialVideos);
  const [tasks, setTasks] = useState<ProjectTask[]>(initialTasks);
  const [uploads, setUploads] = useState<DriveUploadItem[]>(initialUploads);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);

  const addToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const newToast: ToastNotification = {
      id: `toast_${Date.now()}_${Math.random()}`,
      type,
      message,
    };
    setToasts((prev) => [newToast, ...prev]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddNews = (newItem: NewsItem) => {
    setNews((prev) => [newItem, ...prev]);
  };

  const handleFetchAINews = async () => {
    try {
      const res = await fetch('/api/news');
      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();
      if (data.news && Array.isArray(data.news)) {
        setNews((prev) => [...data.news, ...prev]);
      }
    } catch (err) {
      console.warn('API fallback for news');
      const todayStr = new Date().toISOString().split('T')[0];
      const fallbackItem: NewsItem = {
        id: `news_ai_${Date.now()}`,
        title: 'Nuevos Avances en Agentes Autónomos e Integración de RAG para 2026',
        summary: 'Resumen diario generado por el algoritmo de IA sobre automatización de procesos y RAG sobre Google Drive.',
        category: 'ai',
        url: 'https://blog.google/technology/ai/',
        source: 'Google AI & Enterprise Review',
        date: todayStr,
        sharedBy: 'Algoritmo AIE Feed',
        likes: 10,
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
        isAIGenerated: true,
      };
      setNews((prev) => [fallbackItem, ...prev]);
    }
  };

  const handleAddVideo = (newVideo: VideoItem) => {
    setVideos((prev) => [newVideo, ...prev]);
  };

  const handleAddTask = (newTask: ProjectTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleUploadFile = (newFile: DriveUploadItem) => {
    setUploads((prev) => [newFile, ...prev]);
  };

  const handleRegisterMember = (newMem: StudentMember) => {
    setMembers((prev) => [...prev, newMem]);
  };

  const handleUpdateMemberAvatar = (memberId: string, avatarUrl: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, avatar: avatarUrl } : m))
    );
    if (currentMember.id === memberId) {
      setCurrentMember((prev) => ({ ...prev, avatar: avatarUrl }));
    }
  };

  const handleIntroComplete = () => {
    sessionStorage.setItem('aie_session_active', 'true');
    setShowIntro(false);
  };

  const handleOpenIntro = () => {
    sessionStorage.removeItem('aie_session_active');
    setShowIntro(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white relative">
      
      {/* Intro Splash Animation Overlay */}
      {showIntro && (
        <IntroSplash
          members={members}
          onSelectMember={(mem) => setCurrentMember(mem)}
          onComplete={handleIntroComplete}
        />
      )}

      {/* Header Bar */}
      <Header
        activeScreen={activeScreen}
        onNavigate={setActiveScreen}
        currentUser={currentMember}
        onOpenWhitelist={() => setIsAuthOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenIntro={handleOpenIntro}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6">
        {activeScreen === 'home' && (
          <MainDashboard
            onNavigate={setActiveScreen}
            deadlines={initialDeadlines}
            members={members}
            news={news}
            currentUser={currentMember}
            onAddNews={handleAddNews}
            onFetchAINews={handleFetchAINews}
            onOpenIntro={() => setShowIntro(true)}
            onStartTour={() => setIsTourOpen(true)}
            onAddToast={addToast}
          />
        )}

        {activeScreen === 'course' && (
          <CourseTrackingView
            weeks={initialWeeks}
            videos={videos}
            currentUser={currentMember}
            onAddVideo={handleAddVideo}
            onAddToast={addToast}
          />
        )}

        {activeScreen === 'project' && (
          <FinalProjectView
            members={members}
            rubric={initialRubric}
            tasks={tasks}
            uploads={uploads}
            currentUser={currentMember}
            onAddTask={handleAddTask}
            onUploadFile={handleUploadFile}
            onAddToast={addToast}
          />
        )}
      </main>

      {/* Floating AI Chatbot (Only visible after initiating session) */}
      {!showIntro && <AIChatbot activeScreen={activeScreen} onNavigate={setActiveScreen} />}

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Guided Tour Modal */}
      {isTourOpen && (
        <GuidedTourModal
          onClose={() => setIsTourOpen(false)}
          onNavigate={setActiveScreen}
          onAddToast={addToast}
        />
      )}

      {/* User Profile Info & Avatar Upload Modal */}
      {isProfileOpen && (
        <UserProfileModal
          currentUser={currentMember}
          onClose={() => setIsProfileOpen(false)}
          onUpdateUser={(updatedUser) => {
            setCurrentMember(updatedUser);
            setMembers((prev) =>
              prev.map((m) => (m.id === updatedUser.id ? updatedUser : m))
            );
          }}
          onAddToast={addToast}
        />
      )}

      {/* Whitelist Security & Student Switcher Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        members={members}
        currentMember={currentMember}
        onLoginSuccess={(mem) => setCurrentMember(mem)}
        onRegisterMember={handleRegisterMember}
        onUpdateMemberAvatar={handleUpdateMemberAvatar}
        onAddToast={addToast}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

