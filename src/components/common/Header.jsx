import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCameraRetro } from 'react-icons/fa'

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 20 }}
              transition={{ duration: 0.3 }}
            >
              <FaCameraRetro className="text-3xl text-accent" />
            </motion.div>
            <span className="font-vt323 text-2xl">Nostalgiagram</span>
          </Link>
          
          <div className="flex space-x-6">
            <Link 
              to="/" 
              className="font-vt323 text-lg hover:text-accent transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/gallery" 
              className="font-vt323 text-lg hover:text-accent transition-colors"
            >
              Gallery
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
