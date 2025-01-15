import { FaHeart } from 'react-icons/fa'

const Footer = () => {
//i just took footer from a online website :)
  return (
    <footer className="bg-white shadow-md mt-auto">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="font-vt323 text-lg flex items-center">
            Made with <FaHeart className="text-accent mx-2" /> for the nostalgic souls
          </p>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Nostalgiagram. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
