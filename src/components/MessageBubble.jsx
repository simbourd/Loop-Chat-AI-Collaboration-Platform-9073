import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const MessageBubble = ({ message }) => {
  const isUser = message.sender === 'user';
  const timestamp = format(new Date(message.timestamp), 'HH:mm', { locale: fr });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} message-fade-in`}
    >
      <div className={`flex items-start gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : ''}`}>
        {!isUser && (
          <div className="text-2xl mt-1">🤖</div>
        )}
        
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          {!isUser && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {message.agentName}
            </p>
          )}
          
          <div
            className={`px-4 py-3 rounded-2xl chat-bubble ${
              isUser
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
            }`}
          >
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
          
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {timestamp}
          </p>
        </div>
        
        {isUser && (
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium text-sm mt-1">
            U
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MessageBubble;