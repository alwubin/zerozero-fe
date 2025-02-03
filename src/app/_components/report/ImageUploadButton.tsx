import { Camera } from '@/app/assets';
import React, { useRef } from 'react';

export interface ImageUploadButtonProps {
  imageTotalCount?: number;
  imageCount: number;
  onUploadFiles: () => void;
}

export const ImageUploadButton = ({
  imageTotalCount = 3,
  imageCount,
  onUploadFiles,
}: ImageUploadButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { files } = event.target;

    if (files) {
      const newImageFiles = Array.from(files);
      const remainingCount = imageTotalCount - imageCount;
      const limitedNewFiles = newImageFiles.slice(0, remainingCount);

      await onUploadFiles();
    }
  };

  const handleButtonClick = () => {
    if (imageCount >= imageTotalCount) return;
    fileInputRef.current?.click();
  };

  return (
    <button
      type="button"
      onClick={handleButtonClick}
      className="cursor-pointer rounded-md border-[1px] border-gray-200 bg-white w-16 h-16"
      disabled={imageCount >= imageTotalCount}
    >
      <div className="flex flex-col items-center space-y-[3px]">
        <Camera />
        <div className="text-xs font-semibold">
          <span className={imageCount === 0 ? 'text-gray-400' : 'text-red-300'}>
            {imageCount}
          </span>
          <span className="text-gray-400">/{imageTotalCount}</span>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="hidden"
      />
    </button>
  );
};
