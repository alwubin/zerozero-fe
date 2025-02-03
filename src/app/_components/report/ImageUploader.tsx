'use client';
import { ImagePreview } from '@/app/_components/report/ImagePreview';
import { ImageUploadButton } from '@/app/_components/report/ImageUploadButton';
import React, { useState } from 'react';

interface ImageUploaderProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  setImages,
}) => {
  return (
    <div className="bg-white flex flex-col space-y-3 rounded-xl p-4 pb-6 mt-4">
      <div className="font-semibold text-sm text-left">가게 사진</div>
      <ImageUploadButton
        imageCount={images.length}
        onUploadFiles={() => alert('클릭됨')}
      />
      {images.map((image, index) => (
        <ImagePreview key={index} imgUrl={image} />
      ))}
    </div>
  );
};

export default ImageUploader;
