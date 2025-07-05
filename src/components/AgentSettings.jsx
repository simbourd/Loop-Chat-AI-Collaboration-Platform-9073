import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useChat } from '../contexts/ChatContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPlus, FiEdit2, FiTrash2, FiToggleLeft, FiToggleRight, FiSave, FiX } = FiIcons;

const AgentSettings = () => {
  const { agents, updateAgent, addAgent, deleteAgent } = useChat();
  const [editingAgent, setEditingAgent] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    avatar: '🤖',
    description: '',
    type: 'specialist',
    platform: 'n8n',
    webhookUrl: '',
    isActive: true
  });

  const handleEdit = (agent) => {
    setEditingAgent(agent.id);
    setFormData({
      name: agent.name,
      avatar: agent.avatar,
      description: agent.description,
      type: agent.type,
      platform: agent.platform,
      webhookUrl: agent.webhookUrl,
      isActive: agent.isActive
    });
  };

  const handleSave = () => {
    if (editingAgent) {
      updateAgent(editingAgent, formData);
      setEditingAgent(null);
    } else {
      addAgent(formData);
      setShowAddForm(false);
    }
    resetForm();
  };

  const handleCancel = () => {
    setEditingAgent(null);
    setShowAddForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      avatar: '🤖',
      description: '',
      type: 'specialist',
      platform: 'n8n',
      webhookUrl: '',
      isActive: true
    });
  };

  const handleToggleActive = (agentId, currentStatus) => {
    updateAgent(agentId, { isActive: !currentStatus });
  };

  const handleDelete = (agentId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet agent ?')) {
      deleteAgent(agentId);
    }
  };

  const availableEmojis = ['🤖', '💻', '🎨', '📊', '🔧', '📝', '🎯', '🚀', '⚡', '🌟'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Gestion des Agents IA
        </h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          Ajouter un agent
        </button>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingAgent) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {editingAgent ? 'Modifier l\'agent' : 'Nouvel agent'}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nom de l'agent
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Ex: Agent Marketing"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Avatar
              </label>
              <div className="flex gap-2 flex-wrap">
                {availableEmojis.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setFormData({ ...formData, avatar: emoji })}
                    className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center text-xl transition-colors ${
                      formData.avatar === emoji
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                rows="2"
                placeholder="Décrivez les capacités de cet agent..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="specialist">Spécialisé</option>
                <option value="general">Général</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Plateforme
              </label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="n8n">n8n</option>
                <option value="make">Make.com</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                URL Webhook
              </label>
              <input
                type="url"
                value={formData.webhookUrl}
                onChange={(e) => setFormData({ ...formData, webhookUrl: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="https://webhook.example.com/agent"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <SafeIcon icon={FiX} className="w-4 h-4 mr-2" />
              Annuler
            </button>
            <button
              onClick={handleSave}
              disabled={!formData.name || !formData.webhookUrl}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <SafeIcon icon={FiSave} className="w-4 h-4" />
              Sauvegarder
            </button>
          </div>
        </motion.div>
      )}

      {/* Agents List */}
      <div className="space-y-4">
        {agents.map((agent) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-3xl">{agent.avatar}</div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {agent.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {agent.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      agent.platform === 'n8n' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
                    }`}>
                      {agent.platform}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {agent.type === 'general' ? 'Général' : 'Spécialisé'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleActive(agent.id, agent.isActive)}
                  className={`p-2 rounded-lg transition-colors ${
                    agent.isActive 
                      ? 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
                      : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  title={agent.isActive ? 'Désactiver' : 'Activer'}
                >
                  <SafeIcon icon={agent.isActive ? FiToggleRight : FiToggleLeft} className="w-6 h-6" />
                </button>
                
                <button
                  onClick={() => handleEdit(agent)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title="Modifier"
                >
                  <SafeIcon icon={FiEdit2} className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
                
                <button
                  onClick={() => handleDelete(agent.id)}
                  className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  title="Supprimer"
                >
                  <SafeIcon icon={FiTrash2} className="w-4 h-4 text-red-600 dark:text-red-400" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AgentSettings;