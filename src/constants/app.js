// fr fr dis where we keep da local storage keys no cap
export const STORAGE_KEYS = {
  THEME: 'nostalgiagram-theme',
  SETTINGS: 'nostalgiagram-settings',
  USER_IMAGES: 'nostalgiagram-images',
  LAST_EDIT: 'nostalgiagram-last-edit'
}

// bruh dont upload thicc images plzzz
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB
export const MAX_IMAGE_DIMENSION = 2000 // pixels
export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif']

// no cap these r da vibez for da UI n stuff
export const TOAST_DURATION = 3000 // milliseconds
export const DEFAULT_THEME = 'light'

// sheeeesh filter game strong
export const FILTERS = {
  SEPIA: 'sepia',
  GRAYSCALE: 'grayscale',
  BLUR: 'blur',
  VINTAGE: 'vintage',
  POLAROID: 'polaroid',
  NOSTALGIA: 'nostalgia'
}

// ong these r da default settingz
export const DEFAULT_SETTINGS = {
  autoSave: true,
  highQuality: false,
  showTutorial: true,
  notifications: true
}

// sum API endpointz n stuff iykyk
export const API_ENDPOINTS = {
  UPLOAD: '/api/upload',
  PROCESS: '/api/process',
  SAVE: '/api/save'
}
