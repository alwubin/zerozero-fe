'use client';
import React from 'react';
import { useImageUpload } from '@/app/hooks/useImageUpload';
import { ImagePreview } from '@/app/_components/report/ImagePreview';
import { ImageUploadButton } from '@/app/_components/report/ImageUploadButton';

export const ImageUploader: React.FC = () => {
  const { images, addImage, isFull, isUploading } = useImageUpload(
    'store-images',
    3,
  );

  return (
    <div className="bg-white flex flex-col space-y-3 rounded-xl p-4 pb-6 mt-4">
      <div className="font-semibold text-sm text-left">가게 사진</div>
      <ImageUploadButton
        imageCount={images.length}
        isFull={isFull}
        onUpload={addImage}
      />
      {isUploading ? (
        <div className="text-center">업로드 중...</div>
      ) : (
        images.map((image, index) => (
          <ImagePreview key={index} imgUrl={image} />
        ))
      )}
    </div>
  );
};

export default ImageUploader;
