import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../contexts/ChatContext';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import ChatItem from './ChatItem';
import NewChatModal from './NewChatModal';

const { FiPlus, FiSettings, FiHelpCircle, FiSun, FiMoon, FiMenu, FiX, FiPin } = FiIcons;

const Sidebar = ({ onSettingsClick, onTutorialClick, isOpen, onToggle, isPinned, onTogglePin }) => {
  const { chats, agents } = useChat();
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [showNewChatModal, setShowNewChatModal] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`${
              isPinned ? 'relative' : 'fixed lg:relative'
            } z-30 h-full w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg flex flex-col`}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Loop Chat
                </h1>
                <div className="flex items-center gap-2">
                  <button
                    onClick={onTogglePin}
                    className={`p-2 rounded-lg transition-colors ${
                      isPinned 
                        ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}
                    title={isPinned ? 'Détacher la sidebar' : 'Épingler la sidebar'}
                  >
                    <SafeIcon icon={FiPin} className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onToggle}
                    className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <SafeIcon icon={FiX} className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowNewChatModal(true)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <SafeIcon icon={FiPlus} className="w-4 h-4" />
                Nouveau Chat
              </motion.button>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <div className="p-2">
                <AnimatePresence>
                  {chats.map((chat) => (
                    <motion.div
                      key={chat.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChatItem chat={chat} />
                    </motion.div>
                  ))}
                </AnimatePresence>
                {chats.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <p>Aucun chat pour le moment</p>
                    <p className="text-sm mt-2">Créez votre premier chat !</p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title={isDark ? 'Mode clair' : 'Mode sombre'}
                >
                  <SafeIcon icon={isDark ? FiSun : FiMoon} className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                <button
                  onClick={onTutorialClick}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title="Aide et tutoriel"
                >
                  <SafeIcon icon={FiHelpCircle} className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                <button
                  onClick={onSettingsClick}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title="Paramètres"
                >
                  <SafeIcon icon={FiSettings} className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Chat Modal */}
      <NewChatModal
        isOpen={showNewChatModal}
        onClose={() => setShowNewChatModal(false)}
      />
    </>
  );
};

export default Sidebar;