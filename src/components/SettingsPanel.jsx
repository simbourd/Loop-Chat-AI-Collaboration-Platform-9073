import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';
import { useTheme } from '../contexts/ThemeContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import AgentSettings from './AgentSettings';
import ProfileSettings from './ProfileSettings';

const { FiX, FiBot, FiUser, FiSun, FiMoon, FiLogOut } = FiIcons;

const SettingsPanel = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('agents');
  const { logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const tabs = [
    { id: 'agents', label: 'Agents IA', icon: FiBot },
    { id: 'profile', label: 'Profil', icon: FiUser },
  ];

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Paramètres
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <SafeIcon icon={FiX} className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="flex h-[calc(90vh-80px)]">
              {/* Sidebar */}
              <div className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-500 text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <SafeIcon icon={tab.icon} className="w-5 h-5" />
                      {tab.label}
                    </button>
                  ))}
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
                  
                  <button
                    onClick={toggleTheme}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    <SafeIcon icon={isDark ? FiSun : FiMoon} className="w-5 h-5" />
                    {isDark ? 'Mode clair' : 'Mode sombre'}
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                  >
                    <SafeIcon icon={FiLogOut} className="w-5 h-5" />
                    Déconnexion
                  </button>
                </nav>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  {activeTab === 'agents' && <AgentSettings />}
                  {activeTab === 'profile' && <ProfileSettings />}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SettingsPanel;