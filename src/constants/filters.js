export const filters = [
  {
    name: 'Sepia',
    filter: 'sepia(50%)',
    description: 'Classic vintage look',
  },
  {
    name: 'Grainy',
    filter: 'contrast(150%) brightness(90%)',
    description: 'Film grain effect',
  },
  {
    name: 'Faded',
    filter: 'brightness(110%) contrast(90%) saturate(85%)',
    description: 'Soft, faded colors',
  },
  {
    name: 'Vintage',
    filter: 'sepia(30%) brightness(90%) contrast(85%)',
    description: 'Nostalgic color palette',
  },
  {
    name: 'Dreamy',
    filter: 'brightness(105%) contrast(95%) saturate(90%) blur(0.5px)',
    description: 'Soft, dreamy effect',
  },
  {
    name: 'Retro',
    filter: 'sepia(20%) saturate(140%) contrast(110%)',
    description: 'Vibrant retro look',
  },
];

export const frames = [
  {
    name: 'Classic White',
    className: 'frame-classic',
    description: 'Simple white border',
  },
  {
    name: 'Pastel Pink',
    className: 'frame-pastel',
    description: 'Soft pink frame',
  },
  {
    name: 'Mint',
    className: 'frame-mint',
    description: 'Fresh mint border',
  },
  {
    name: 'Doodle',
    className: 'frame-doodle',
    description: 'Fun dashed border',
  },
];

export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
  scale: {
    initial: { scale: 0.95 },
    animate: { scale: 1 },
    transition: { duration: 0.2 },
  },
};
