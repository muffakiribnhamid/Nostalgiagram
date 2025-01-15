import React, { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaSave, FaUndo, FaRedo, FaMusic } from 'react-icons/fa'
import { AppContext } from '../App'

const filters = [
  { name: 'Sepia', filter: 'sepia(50%)' },
  { name: 'Grainy', filter: 'contrast(150%) brightness(90%)' },
  { name: 'Faded', filter: 'brightness(110%) contrast(90%) saturate(85%)' },
  { name: 'Vintage', filter: 'sepia(30%) brightness(90%) contrast(85%)' },
]

const frames = [
  { name: 'Classic White', className: 'border-8 border-white' },
  { name: 'Pastel Pink', className: 'border-8 border-primary' },
  { name: 'Mint', className: 'border-8 border-secondary' },
  { name: 'Doodle', className: 'border-8 border-accent border-dashed' },
]

const Editor = () => {
  const navigate = useNavigate()
  const { selectedImage, showToast } = useContext(AppContext)
  const imageRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState(null)
  const [activeFrame, setActiveFrame] = useState(frames[0])
  const [caption, setCaption] = useState('')
  const [editedImage, setEditedImage] = useState(selectedImage)

  useEffect(() => {
    if (!selectedImage) {
      navigate('/')
    } else {
      setEditedImage(selectedImage)
    }
  }, [selectedImage, navigate])

  const applyFilter = (filter) => {
    if (imageRef.current) {
      imageRef.current.style.filter = filter.filter
      setActiveFilter(filter)
    }
  }

  const saveImage = () => {
    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      if (imageRef.current) {
        // Set canvas size to match image
        canvas.width = imageRef.current.naturalWidth
        canvas.height = imageRef.current.naturalHeight

        // Draw image with applied filter
        ctx.filter = activeFilter?.filter || 'none'
        ctx.drawImage(imageRef.current, 0, 0)

        // Add caption if exists
        if (caption) {
          ctx.filter = 'none'
          ctx.font = '48px "Permanent Marker"'
          ctx.fillStyle = '#333333'
          ctx.textAlign = 'center'
          ctx.fillText(caption, canvas.width / 2, canvas.height - 50)
        }

        // Update edited image state
        const editedDataUrl = canvas.toDataURL('image/png')
        setEditedImage(editedDataUrl)

        // Create download link
        const link = document.createElement('a')
        link.download = 'nostalgiagram.png'
        link.href = editedDataUrl
        link.click()

        showToast('Image saved successfully!', 'success')
      }
    } catch (error) {
      showToast('Failed to save image. Please try again.', 'error')
    }
  }

  return (
    <div className="flex flex-col items-center space-y-8 p-4">
      <div className={`relative max-w-2xl ${activeFrame.className} bg-white`}>
        <img
          ref={imageRef}
          src={editedImage}
          alt="Editing"
          className="w-full h-auto"
          style={{ transition: 'filter 0.3s ease' }}
        />
        {caption && (
          <p className="absolute bottom-4 left-0 right-0 text-center font-permanent text-xl text-gray-800">
            {caption}
          </p>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-4 w-full max-w-2xl">
        {filters.map((filter) => (
          <motion.button
            key={filter.name}
            className={`filter-button ${
              activeFilter?.name === filter.name
                ? 'bg-accent text-white'
                : 'bg-gray-100'
            }`}
            onClick={() => applyFilter(filter)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {filter.name}
          </motion.button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4 w-full max-w-2xl">
        {frames.map((frame) => (
          <motion.button
            key={frame.name}
            className={`filter-button ${
              activeFrame.name === frame.name
                ? 'bg-accent text-white'
                : 'bg-gray-100'
            }`}
            onClick={() => setActiveFrame(frame)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {frame.name}
          </motion.button>
        ))}
      </div>

      <div className="flex items-center space-x-4 w-full max-w-2xl">
        <input
          type="text"
          placeholder="Add a caption..."
          className="retro-input flex-grow"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <motion.button
          className="btn-primary flex items-center space-x-2"
          onClick={saveImage}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaSave />
          <span>Save</span>
        </motion.button>
      </div>
    </div>
  )
}

export default Editor
