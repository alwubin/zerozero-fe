'use client';
import React from 'react';
import { useImageUpload } from '@/app/hooks/useImageUpload';
import { ImagePreview } from '@/app/_components/report/ImagePreview';
import { ImageUploadButton } from '@/app/_components/report/ImageUploadButton';

export const ImageUploader = () => {
  const { images, addImage, isFull, isUploading } = useImageUpload('store', 3);

  return (
    <div className="bg-white flex flex-col space-y-3 rounded-xl p-4 pb-6 mt-4">
      <div className="font-semibold text-sm text-left">가게 사진</div>
      <div className="flex flex-row space-x-2">
        <ImageUploadButton
          imageCount={images.length}
          isFull={isFull}
          onUpload={addImage}
        />
        {isUploading ? (
          <div className="text-center text-xs text-gray-300">업로드 중...</div>
        ) : (
          images.map((image, index) => (
            <ImagePreview key={index} imgUrl={image} />
          ))
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
