import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaHeart, FaComment, FaShare } from 'react-icons/fa'

// Static posts with Unsplash images
const dummyPosts = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1495121553079-4c61bcce1894',
    caption: "Vintage vibes from the analog days 📷",
    likes: 234,
    comments: 12,
    isLiked: false
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa',
    caption: 'Retro memories in sepia tones 🎞',
    likes: 187,
    comments: 8,
    isLiked: false
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1542567455-cd733f23fbb1',
    caption: 'Classic moments frozen in time ⏰',
    likes: 342,
    comments: 15,
    isLiked: false
  },
  {
    id: 4,
    imageUrl: 'https://images.unsplash.com/photo-1599689018034-48e2ead82951',
    caption: 'Polaroid dreams and vintage schemes 🌅',
    likes: 156,
    comments: 9,
    isLiked: false
  },
  {
    id: 5,
    imageUrl: 'https://images.unsplash.com/photo-1551373880-bddd1c63f5ca',
    caption: 'Nostalgia in every frame 🎭',
    likes: 289,
    comments: 21,
    isLiked: false
  }
]

const Gallery = () => {
  const [posts, setPosts] = useState(dummyPosts)

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        }
      }
      return post
    }))
  }

  const handleShare = (postId) => {
    const post = posts.find(p => p.id === postId)
    if (post) {
      // In a real app, this would open a share dialog
      alert('Sharing: ' + post.caption)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-permanent mb-8 text-center">Nostalgia Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <motion.div
            key={post.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={post.imageUrl}
              alt={post.caption}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <p className="text-gray-800 mb-4">{post.caption}</p>
              <div className="flex items-center justify-between text-gray-600">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-1 ${post.isLiked ? 'text-red-500' : ''}`}
                >
                  <FaHeart />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1">
                  <FaComment />
                  <span>{post.comments}</span>
                </button>
                <button
                  onClick={() => handleShare(post.id)}
                  className="flex items-center space-x-1"
                >
                  <FaShare />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Gallery
