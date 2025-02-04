import React from 'react';
import Image from 'next/image';

interface ImagePreviewProps {
  imgUrl: string;
}

export const ImagePreview = ({ imgUrl }: ImagePreviewProps) => {
  return (
    <Image
      className="relative rounded-md border-[1px] border-gray-200"
      src={imgUrl}
      alt={imgUrl}
      width={64}
      height={64}
    />
  );
};
