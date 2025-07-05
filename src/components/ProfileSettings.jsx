import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUser, FiMail, FiLock, FiSave, FiCamera } = FiIcons;

const ProfileSettings = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const handleSave = () => {
    // En production, cela ferait appel à une API pour mettre à jour le profil
    console.log('Sauvegarde du profil:', formData);
    // Réinitialiser les champs de mot de passe
    setFormData({
      ...formData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowPasswordFields(false);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        Profil Utilisateur
      </h3>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        {/* Avatar Section */}
        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-20 h-20 rounded-full"
            />
            <button className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors">
              <SafeIcon icon={FiCamera} className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
              Photo de profil
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Cliquez sur l'icône pour changer votre photo
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <SafeIcon icon={FiUser} className="w-4 h-4 inline mr-2" />
              Nom d'utilisateur
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <SafeIcon icon={FiMail} className="w-4 h-4 inline mr-2" />
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Password Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-md font-medium text-gray-900 dark:text-white">
                Mot de passe
              </h5>
              <button
                onClick={() => setShowPasswordFields(!showPasswordFields)}
                className="text-blue-500 hover:text-blue-600 text-sm"
              >
                {showPasswordFields ? 'Annuler' : 'Changer le mot de passe'}
              </button>
            </div>

            {showPasswordFields && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mot de passe actuel
                  </label>
                  <input
                    type="password"
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirmer le nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <SafeIcon icon={FiSave} className="w-4 h-4" />
            Sauvegarder
          </button>
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Informations du compte
        </h4>
        <div className="space-y-2 text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-medium">Compte créé:</span> {new Date(user?.createdAt).toLocaleDateString('fr-FR')}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-medium">Dernière connexion:</span> Maintenant
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;