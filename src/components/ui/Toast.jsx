import { motion, AnimatePresence } from 'framer-motion'

// yooo dis toast be poppin up wit da notificationz n stuff
const Toast = ({ show, message, type = 'info' }) => {
  // finna get dem colorz based on da vibe check
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500' // itz givin success vibes
      case 'error':
        return 'bg-red-500'   // bruh moment fr
      case 'warning':
        return 'bg-yellow-500' // sus alert
      default:
        return 'bg-blue-500'   // basic tea
    }
  }

  // boutta yeet dis notification on da screen no cap
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white shadow-lg z-50 ${getTypeStyles()}`}
          role="alert"
        >
          <p className="font-medium">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast
