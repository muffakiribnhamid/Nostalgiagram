export const applyFilter = (image, filter) => {
  if (!image) return;
  image.style.filter = filter;
};

export const saveImageWithEffects = (imageElement, filter, caption) => {
  if (!imageElement) return;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Set canvas size to match image
  canvas.width = imageElement.naturalWidth;
  canvas.height = imageElement.naturalHeight;

  // Apply filter and draw image
  ctx.filter = filter || 'none';
  ctx.drawImage(imageElement, 0, 0);

  // Add caption if exists
  if (caption) {
    ctx.filter = 'none';
    ctx.font = '48px "Permanent Marker"';
    ctx.fillStyle = '#333333';
    ctx.textAlign = 'center';
    ctx.fillText(caption, canvas.width / 2, canvas.height - 50);
  }

  return canvas.toDataURL('image/png');
};

export const downloadImage = (dataUrl, filename = 'nostalgiagram.png') => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
};

export const getImageDimensions = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
        aspectRatio: img.width / img.height,
      });
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

export const resizeImage = (file, maxWidth = 1200, maxHeight = 1200) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        resolve(blob);
      }, file.type);
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};
