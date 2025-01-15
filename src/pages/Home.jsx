import { useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { FaCloudUploadAlt, FaImages } from 'react-icons/fa'
import { AppContext } from '../App'

const Home = () => {
  const navigate = useNavigate()
  const { setSelectedImage } = useContext(AppContext)

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      setSelectedImage(file)
      navigate('/editor')
    }
  }, [navigate, setSelectedImage])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: false
  })

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-12">
      <div className="text-center space-y-4">
        <motion.h1 
          className="text-5xl font-vt323"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to Nostalgiagram
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Transform your photos with retro vibes from the 90s and 2000s
        </motion.p>
      </div>

      <motion.div 
        className="w-full max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div
          {...getRootProps()}
          className={`border-4 border-dashed rounded-lg p-12 text-center cursor-pointer
            transition-colors ${isDragActive ? 'border-accent bg-accent/10' : 'border-gray-300 hover:border-accent'}`}
        >
          <input {...getInputProps()} />
          <FaCloudUploadAlt className="mx-auto text-5xl text-gray-400 mb-4" />
          <p className="text-lg">
            {isDragActive
              ? "Drop your photo here..."
              : "Drag & drop a photo, or click to select"}
          </p>
        </div>
      </motion.div>

      <motion.button
        className="btn-secondary flex items-center space-x-2"
        onClick={() => navigate('/gallery')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaImages />
        <span>View Gallery</span>
      </motion.button>
    </div>
  )
}

export default Home
