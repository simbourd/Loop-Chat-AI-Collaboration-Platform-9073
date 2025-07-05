import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from './AuthContext';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [agents, setAgents] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Agents par défaut
  const defaultAgents = [
    {
      id: 'chef-agent',
      name: 'Chef Agent',
      type: 'general',
      platform: 'n8n',
      webhookUrl: 'https://webhook.n8n.io/chef-agent',
      avatar: '🤖',
      description: 'Agent principal qui distribue les tâches',
      isActive: true
    },
    {
      id: 'dev-agent',
      name: 'Agent Développeur',
      type: 'specialist',
      platform: 'n8n',
      webhookUrl: 'https://webhook.n8n.io/dev-agent',
      avatar: '💻',
      description: 'Spécialisé dans le développement',
      isActive: true
    },
    {
      id: 'design-agent',
      name: 'Agent Design',
      type: 'specialist',
      platform: 'make',
      webhookUrl: 'https://hook.make.com/design-agent',
      avatar: '🎨',
      description: 'Spécialisé dans le design',
      isActive: true
    }
  ];

  useEffect(() => {
    if (user) {
      // Charger les données sauvegardées
      const savedChats = localStorage.getItem(`loop-chat-chats-${user.id}`);
      const savedAgents = localStorage.getItem(`loop-chat-agents-${user.id}`);
      
      if (savedChats) {
        const parsedChats = JSON.parse(savedChats);
        setChats(parsedChats);
        if (parsedChats.length > 0) {
          setActiveChat(parsedChats[0].id);
        }
      } else {
        // Créer un chat initial avec le Chef Agent
        const initialChat = createNewChat(defaultAgents[0]);
        setChats([initialChat]);
        setActiveChat(initialChat.id);
      }

      if (savedAgents) {
        setAgents(JSON.parse(savedAgents));
      } else {
        setAgents(defaultAgents);
        localStorage.setItem(`loop-chat-agents-${user.id}`, JSON.stringify(defaultAgents));
      }
    }
  }, [user]);

  useEffect(() => {
    if (user && chats.length > 0) {
      localStorage.setItem(`loop-chat-chats-${user.id}`, JSON.stringify(chats));
    }
  }, [chats, user]);

  useEffect(() => {
    if (user && agents.length > 0) {
      localStorage.setItem(`loop-chat-agents-${user.id}`, JSON.stringify(agents));
    }
  }, [agents, user]);

  const createNewChat = (agent) => {
    const newChat = {
      id: uuidv4(),
      agentId: agent.id,
      agentName: agent.name,
      agentAvatar: agent.avatar,
      type: agent.type,
      platform: agent.platform,
      webhookUrl: agent.webhookUrl,
      messages: [
        {
          id: uuidv4(),
          sender: 'agent',
          agentName: agent.name,
          content: `Bonjour ! Je suis ${agent.name}. Comment puis-je vous aider aujourd'hui ?`,
          timestamp: new Date().toISOString()
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    return newChat;
  };

  const addNewChat = (agent) => {
    const newChat = createNewChat(agent);
    setChats(prev => [newChat, ...prev]);
    setActiveChat(newChat.id);
    return newChat;
  };

  const sendMessage = async (content, chatId = activeChat) => {
    if (!content.trim() || !chatId) return;

    const chat = chats.find(c => c.id === chatId);
    if (!chat) return;

    const userMessage = {
      id: uuidv4(),
      sender: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString()
    };

    // Ajouter le message utilisateur
    setChats(prev => prev.map(c => 
      c.id === chatId 
        ? { 
            ...c, 
            messages: [...c.messages, userMessage],
            updatedAt: new Date().toISOString()
          }
        : c
    ));

    // Simuler la réponse de l'agent
    setIsTyping(true);
    
    try {
      // En production, cela ferait appel au webhook
      await simulateAgentResponse(chatId, content, chat);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const simulateAgentResponse = async (chatId, userMessage, chat) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const responses = {
          'chef-agent': [
            "Je vais analyser votre demande et la rediriger vers l'agent approprié.",
            "Laissez-moi examiner cela et trouver la meilleure solution pour vous.",
            "Parfait ! Je vais coordonner avec les agents spécialisés pour vous aider."
          ],
          'dev-agent': [
            "Excellent ! Je peux vous aider avec le développement. Voici ma suggestion...",
            "C'est un défi intéressant en programmation. Laissez-moi vous proposer une solution.",
            "Pour résoudre ce problème technique, je recommande cette approche..."
          ],
          'design-agent': [
            "Super ! Je vais créer un design magnifique pour votre projet.",
            "Voici mes idées créatives pour améliorer l'expérience utilisateur.",
            "Laissez-moi vous proposer une solution design élégante et moderne."
          ]
        };

        const agentResponses = responses[chat.agentId] || responses['chef-agent'];
        const randomResponse = agentResponses[Math.floor(Math.random() * agentResponses.length)];

        const agentMessage = {
          id: uuidv4(),
          sender: 'agent',
          agentName: chat.agentName,
          content: randomResponse,
          timestamp: new Date().toISOString()
        };

        setChats(prev => prev.map(c => 
          c.id === chatId 
            ? { 
                ...c, 
                messages: [...c.messages, agentMessage],
                updatedAt: new Date().toISOString()
              }
            : c
        ));

        resolve();
      }, 1000 + Math.random() * 2000);
    });
  };

  const deleteChat = (chatId) => {
    setChats(prev => {
      const newChats = prev.filter(c => c.id !== chatId);
      if (activeChat === chatId && newChats.length > 0) {
        setActiveChat(newChats[0].id);
      } else if (newChats.length === 0) {
        setActiveChat(null);
      }
      return newChats;
    });
  };

  const renameChat = (chatId, newName) => {
    setChats(prev => prev.map(c => 
      c.id === chatId 
        ? { ...c, customName: newName }
        : c
    ));
  };

  const updateAgent = (agentId, updates) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, ...updates }
        : agent
    ));
  };

  const addAgent = (agentData) => {
    const newAgent = {
      id: uuidv4(),
      ...agentData,
      createdAt: new Date().toISOString()
    };
    setAgents(prev => [...prev, newAgent]);
    return newAgent;
  };

  const deleteAgent = (agentId) => {
    setAgents(prev => prev.filter(agent => agent.id !== agentId));
    // Supprimer aussi les chats associés
    setChats(prev => prev.filter(chat => chat.agentId !== agentId));
  };

  const getCurrentChat = () => {
    return chats.find(c => c.id === activeChat);
  };

  const value = {
    chats,
    activeChat,
    agents,
    isTyping,
    setActiveChat,
    addNewChat,
    sendMessage,
    deleteChat,
    renameChat,
    updateAgent,
    addAgent,
    deleteAgent,
    getCurrentChat
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};