import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import SettingsPanel from '../components/SettingsPanel';
import TutorialModal from '../components/TutorialModal';
import { useChat } from '../contexts/ChatContext';

const ChatPage = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isPinned, setIsPinned] = useState(false);
  const { chats, activeChat } = useChat();

  // Gérer l'état de la sidebar sur mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sauvegarder l'état épinglé
  useEffect(() => {
    const savedPinState = localStorage.getItem('sidebar-pinned');
    if (savedPinState) {
      setIsPinned(JSON.parse(savedPinState));
    }
  }, []);

  const handleTogglePin = () => {
    const newPinState = !isPinned;
    setIsPinned(newPinState);
    localStorage.setItem('sidebar-pinned', JSON.stringify(newPinState));
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        onSettingsClick={() => setShowSettings(true)}
        onTutorialClick={() => setShowTutorial(true)}
        isOpen={sidebarOpen}
        onToggle={handleToggleSidebar}
        isPinned={isPinned}
        onTogglePin={handleTogglePin}
      />

      {/* Overlay pour mobile quand la sidebar n'est pas épinglée */}
      <AnimatePresence>
        {sidebarOpen && !isPinned && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={handleToggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <ChatWindow
          sidebarOpen={sidebarOpen}
          onToggleSidebar={handleToggleSidebar}
          isPinned={isPinned}
          onTogglePin={handleTogglePin}
        />
      </div>

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />

      {/* Tutorial Modal */}
      <TutorialModal
        isOpen={showTutorial}
        onClose={() => setShowTutorial(false)}
      />
    </div>
  );
};

export default ChatPage;