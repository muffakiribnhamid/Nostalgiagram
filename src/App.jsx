import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect, createContext, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './styles/globals.css'
import './App.css'

// Components
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import LoadingSpinner from './components/ui/LoadingSpinner'
import Toast from './components/ui/Toast'
import Modal from './components/ui/Modal'

// Pages
import Home from './pages/Home'
import Editor from './pages/Editor'
import Gallery from './pages/Gallery'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

// Constants
import { STORAGE_KEYS, MAX_IMAGE_SIZE } from './constants/app'

// Utils
import { getImageDimensions, resizeImage } from './utils/imageUtils'

// Create contexts
export const AppContext = createContext(null)
export const ThemeContext = createContext(null)

function App() {
  // State management
  const [selectedImage, setSelectedImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' })
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light'
  })
  const [modal, setModal] = useState({ show: false, content: null })
  const [userSettings, setUserSettings] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS)
    return saved ? JSON.parse(saved) : {
      autoSave: true,
      highQuality: false,
      showTutorial: true,
      notifications: true
    }
  })

  // Image handling
  const handleImageSelect = useCallback(async (file) => {
    try {
      setLoading(true)
      setError(null)

      // Validate file size
      if (file.size > MAX_IMAGE_SIZE) {
        throw new Error('Image size too large (max 5MB)')
      }

      const dimensions = await getImageDimensions(file)
      
      // Resize if necessary
      let processedFile = file
      if (dimensions.width > 2000 || dimensions.height > 2000) {
        processedFile = await resizeImage(file)
      }

      // Create object URL
      const reader = new FileReader()
      reader.onload = () => {
        setSelectedImage(reader.result)
        setLoading(false)
      }
      reader.readAsDataURL(processedFile)

    } catch (err) {
      setError(err.message)
      setLoading(false)
      showToast(err.message, 'error')
    }
  }, [])

  // Toast handling
  const showToast = useCallback((message, type = 'info') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: 'info' }), 3000)
  }, [])

  // Theme handling
  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem(STORAGE_KEYS.THEME, newTheme)
      return newTheme
    })
  }, [])

  // Settings handling
  const updateSettings = useCallback((newSettings) => {
    setUserSettings(prev => {
      const updated = { ...prev, ...newSettings }
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated))
      return updated
    })
  }, [])

  // Modal handling
  const showModal = useCallback((content) => {
    setModal({ show: true, content })
  }, [])

  const hideModal = useCallback(() => {
    setModal({ show: false, content: null })
  }, [])

  // Context value
  const contextValue = {
    selectedImage,
    setSelectedImage: handleImageSelect,
    loading,
    error,
    showToast,
    theme,
    toggleTheme,
    userSettings,
    updateSettings,
    showModal,
    hideModal
  }

  // Effects
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <AppContext.Provider value={contextValue}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Router>
          <motion.div 
            className={`min-h-screen bg-background flex flex-col ${theme}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route 
                    path="/editor" 
                    element={selectedImage ? <Editor /> : <Navigate to="/" />} 
                  />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />

            {/* Overlay Components */}
            {loading && <LoadingSpinner />}
            <Toast {...toast} />
            <Modal 
              show={modal.show} 
              onClose={hideModal}
              content={modal.content}
            />
          </motion.div>
        </Router>
      </ThemeContext.Provider>
    </AppContext.Provider>
  )
}

export default App