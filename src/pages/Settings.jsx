import { motion } from 'framer-motion'
import { useContext } from 'react'
import { AppContext } from '../App'

const Settings = () => {
  const { userSettings, updateSettings, toggleTheme, theme } = useContext(AppContext)

  const handleToggle = (setting) => {
    updateSettings({ [setting]: !userSettings[setting] })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <div className="space-y-6">
        {/* Theme Toggle */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Theme</h3>
              <p className="text-gray-500 dark:text-gray-400">Toggle between light and dark mode</p>
            </div>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-lg bg-primary text-white"
            >
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>
        </div>

        {/* App Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">App Settings</h3>
          <div className="space-y-4">
            {Object.entries(userSettings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {getSettingDescription(key)}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={value}
                    onChange={() => handleToggle(key)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const getSettingDescription = (key) => {
  const descriptions = {
    autoSave: 'Automatically save changes while editing',
    highQuality: 'Use high quality image processing',
    showTutorial: 'Show tutorial tips for new features',
    notifications: 'Enable desktop notifications'
  }
  return descriptions[key] || ''
}

export default Settings
