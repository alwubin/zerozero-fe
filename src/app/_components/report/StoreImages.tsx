'use client';
import { PlusIcon } from '@/app/assets';
import { useSelectStore } from '@/app/zustand/reportStore';
import Image from 'next/image';
import { useEffect } from 'react';

const StoreImage = () => {
  const { imageFiles, setImageFiles } = useSelectStore();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImageFiles = Array.from(event.target.files).filter(
        (file) => file instanceof File,
      ) as File[];
      setImageFiles([...imageFiles, ...newImageFiles]);
    }
  };

  useEffect(() => {
    return () => {
      imageFiles.forEach((imageFile) => {
        if (imageFile instanceof File) {
          const objectURL = URL.createObjectURL(imageFile);
          URL.revokeObjectURL(objectURL);
        }
      });
    };
  }, [imageFiles]);

  return (
    <div className="bg-white flex flex-col space-y-3 rounded-xl p-4 pb-6 mt-4">
      <div className="font-semibold text-sm text-left">가게 사진</div>
      <div className="flex flex-row">
        {imageFiles.length > 0 && (
          <div className="flex flex-wrap">
            {imageFiles.map((imageFile) => {
              if (!(imageFile instanceof File)) return null;
              const objectURL = URL.createObjectURL(imageFile);
              return (
                <div
                  key={imageFile.name}
                  className="w-16 h-16 bg-[#CBCBCB] rounded-2xl mr-2 mb-2 relative overflow-hidden"
                >
                  <Image
                    src={objectURL}
                    alt={imageFile.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl"
                  />
                </div>
              );
            })}
          </div>
        )}
        <div className="cursor-pointer w-16 h-16 bg-[#CBCBCB] rounded-2xl flex items-center justify-center">
          <label htmlFor="imageInput">
            <PlusIcon />
          </label>
          <input
            id="imageInput"
            className="imageInput hidden"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default StoreImage;
