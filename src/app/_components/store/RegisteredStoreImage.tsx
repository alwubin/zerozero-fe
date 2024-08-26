'use client';
import { useSelectedStore } from '@/app/zustand/detailStore';
import Image from 'next/image';
import { useEffect } from 'react';

export const RegisteredStoreImage = () => {
  const { images } = useSelectedStore();

  useEffect(() => {
    console.log(images);
  }, []);

  return (
    <div className="w-10/12 bg-white p-6 rounded-2xl space-y-4 mt-7 ml-10">
      <div className="font-semibold text-sm text-left">가게 사진</div>
      <div className="flex space-x-4 overflow-x-scroll">
        {images.length > 0 ? (
          images.map((image, i) => (
            <div
              key={i}
              className="w-20 h-20 bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden"
            >
              <Image
                src={image.url}
                alt={`store-image-${i}`}
                width={80}
                height={80}
                objectFit="cover"
              />
            </div>
          ))
        ) : (
          <div>이미지가 없습니다</div>
        )}
      </div>
    </div>
  );
};
