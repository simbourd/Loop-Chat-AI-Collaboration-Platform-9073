import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useChat } from '../contexts/ChatContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSend, FiPaperclip } = FiIcons;

const InputBox = () => {
  const [message, setMessage] = useState('');
  const { sendMessage, activeChat, isTyping } = useChat();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isTyping) {
      sendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        <button
          type="button"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Joindre un fichier"
        >
          <SafeIcon icon={FiPaperclip} className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
        
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tapez votre message..."
            className="w-full resize-none bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 max-h-32"
            rows="1"
            style={{
              minHeight: '48px',
              height: 'auto',
              overflow: 'hidden'
            }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
          />
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!message.trim() || isTyping}
          className={`p-3 rounded-xl transition-all ${
            message.trim() && !isTyping
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
          }`}
        >
          <SafeIcon icon={FiSend} className="w-5 h-5" />
        </motion.button>
      </form>
    </div>
  );
};

export default InputBox;