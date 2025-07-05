import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiX, FiChevronLeft, FiChevronRight, FiCheck } = FiIcons;

const TutorialModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: 'Bienvenue dans Loop Chat',
      content: 'Loop Chat est votre assistant IA collaboratif. Découvrez comment utiliser toutes ses fonctionnalités pour optimiser votre productivité.',
      image: '🚀',
      tips: ['Interface intuitive', 'Agents IA spécialisés', 'Collaboration en temps réel']
    },
    {
      title: 'Créer un nouveau chat',
      content: 'Cliquez sur le bouton "Nouveau Chat" dans la sidebar pour démarrer une conversation avec un agent IA spécialisé.',
      image: '💬',
      tips: ['Bouton "+" dans la sidebar', 'Choisissez votre agent', 'Commencez à discuter']
    },
    {
      title: 'Gestion des agents',
      content: 'Configurez vos agents IA dans les paramètres. Définissez leurs webhooks n8n ou Make.com pour une intégration parfaite.',
      image: '🤖',
      tips: ['Paramètres > Agents IA', 'Webhooks personnalisés', 'Activation/désactivation']
    },
    {
      title: 'Canal Général',
      content: 'Le Chef Agent distribue automatiquement vos requêtes vers les agents appropriés selon le contexte de votre message.',
      image: '🎯',
      tips: ['Distribution automatique', 'Analyse intelligente', 'Réponses optimisées']
    },
    {
      title: 'Personnalisation',
      content: 'Personnalisez votre expérience avec les thèmes sombre/clair, gérez votre profil et configurez vos préférences.',
      image: '⚙️',
      tips: ['Thèmes personnalisés', 'Profil utilisateur', 'Paramètres avancés']
    }
  ];

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    onClose();
  };

  const isLastStep = currentStep === tutorialSteps.length - 1;
  const currentTutorial = tutorialSteps[currentStep];

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
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Guide d'utilisation
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {currentStep + 1} / {tutorialSteps.length}
                </span>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <SafeIcon icon={FiX} className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-3 bg-gray-50 dark:bg-gray-900">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                  className="bg-blue-500 h-2 rounded-full"
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="text-6xl mb-4">{currentTutorial.image}</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {currentTutorial.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {currentTutorial.content}
                </p>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Points clés :
                  </h4>
                  <ul className="space-y-1">
                    {currentTutorial.tips.map((tip, index) => (
                      <li key={index} className="text-blue-800 dark:text-blue-200 text-sm flex items-center gap-2">
                        <SafeIcon icon={FiCheck} className="w-4 h-4" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <SafeIcon icon={FiChevronLeft} className="w-4 h-4" />
                Précédent
              </button>
              
              <div className="flex gap-2">
                {tutorialSteps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentStep
                        ? 'bg-blue-500'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={isLastStep ? handleClose : nextStep}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                {isLastStep ? 'Terminé' : 'Suivant'}
                {!isLastStep && <SafeIcon icon={FiChevronRight} className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TutorialModal;