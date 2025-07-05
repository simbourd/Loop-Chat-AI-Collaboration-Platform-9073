import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useChat } from '../contexts/ChatContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMoreVertical, FiEdit2, FiTrash2, FiCopy } = FiIcons;

const ChatItem = ({ chat }) => {
  const { activeChat, setActiveChat, deleteChat, renameChat } = useChat();
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');

  const isActive = activeChat === chat.id;
  const displayName = chat.customName || chat.agentName;
  const lastMessage = chat.messages[chat.messages.length - 1];

  const handleClick = () => {
    setActiveChat(chat.id);
  };

  const handleRename = () => {
    setEditName(displayName);
    setIsEditing(true);
    setShowMenu(false);
  };

  const handleSaveRename = () => {
    if (editName.trim()) {
      renameChat(chat.id, editName.trim());
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteChat(chat.id);
    setShowMenu(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveRename();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative mb-2 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
        isActive 
          ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500' 
          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        <div className="text-2xl">{chat.agentAvatar}</div>
        
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={handleSaveRename}
              onKeyPress={handleKeyPress}
              className="w-full bg-transparent border-b border-blue-500 focus:outline-none text-sm font-medium"
              autoFocus
            />
          ) : (
            <h3 className="font-medium text-gray-900 dark:text-white truncate text-sm">
              {displayName}
            </h3>
          )}
          
          {lastMessage && (
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
              {lastMessage.sender === 'user' ? 'Vous: ' : ''}
              {lastMessage.content}
            </p>
          )}
        </div>

        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <SafeIcon icon={FiMoreVertical} className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>

          {showMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute right-0 top-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 py-1 min-w-[120px]"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRename();
                }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
              >
                <SafeIcon icon={FiEdit2} className="w-4 h-4" />
                Renommer
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-red-600 dark:text-red-400"
              >
                <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                Supprimer
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Click outside to close menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowMenu(false)}
        />
      )}
    </motion.div>
  );
};

export default ChatItem;