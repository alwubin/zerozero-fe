"use client";
import { useState } from "react";
import Image from "next/image";

export const RegisteredStoreImage = () => {
  const imageCounts = 4;
  return (
    <div className="w-10/12 bg-white p-6 rounded-2xl space-y-4 mt-7 ml-10">
      <div className="font-semibold text-sm text-left">가게 사진</div>
      <div className="flex space-x-4 overflow-x-scroll">
        {Array.from({ length: imageCounts }, (_, i) => (
          <div
            key={i}
            className="w-20 h-20 bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden"
          >
            <Image
              src="/images/example-store-image.jpeg"
              alt="rank-icon"
              width={80}
              height={80}
              objectFit="cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
