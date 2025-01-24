'use client';
import React from 'react';
import Lottie from 'react-lottie-player';
import spinner from '@/app/assets/spinner.json';

const Loading = () => {
  return (
    <div className="space-y-2 flex h-screen flex-col items-center justify-center bg-white">
      <Lottie loop animationData={spinner} play />
      <div className="pl-[7.5px] text-gray-400 text-base font-semibold">
        로딩 중...
      </div>
    </div>
  );
};

export default Loading;
