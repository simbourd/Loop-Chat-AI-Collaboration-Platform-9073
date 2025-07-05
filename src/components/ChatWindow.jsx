import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useChat } from '../contexts/ChatContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import MessageBubble from './MessageBubble';
import InputBox from './InputBox';

const { FiMenu, FiMoreVertical, FiPin } = FiIcons;

const ChatWindow = ({ sidebarOpen, onToggleSidebar, isPinned, onTogglePin }) => {
  const { getCurrentChat, chats, isTyping } = useChat();
  const messagesEndRef = useRef(null);
  const currentChat = getCurrentChat();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages, isTyping]);

  if (!currentChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="text-6xl mb-4">🤖</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Bienvenue dans Loop Chat
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Sélectionnez un chat ou créez-en un nouveau pour commencer
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center gap-3">
          {!isPinned && (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <SafeIcon icon={FiMenu} className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          )}
          <div className="text-2xl">{currentChat.agentAvatar}</div>
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">
              {currentChat.customName || currentChat.agentName}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {currentChat.type === 'general' ? 'Agent Général' : 'Agent Spécialisé'} • {currentChat.platform}
            </p>
          </div>
        </div>
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
            <SafeIcon icon={FiPin} className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <SafeIcon icon={FiMoreVertical} className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {currentChat.messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3"
          >
            <div className="text-2xl">{currentChat.agentAvatar}</div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-3 max-w-xs">
              <div className="flex gap-1">
                <div className="typing-indicator"></div>
                <div className="typing-indicator"></div>
                <div className="typing-indicator"></div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <InputBox />
    </div>
  );
};

export default ChatWindow;