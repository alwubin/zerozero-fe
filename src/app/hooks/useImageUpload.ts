'use client';
import { useState } from 'react';

export const useImageUpload = (maxImages: number = 3) => {
  const [images, setImages] = useState<string[]>([]);

  const addImage = (newImage: string) => {
    if (images.length < maxImages) {
      setImages([...images, newImage]);
    }
  };

  return {
    images,
    setImages,
    addImage,
    isFull: images.length >= maxImages,
  };
};