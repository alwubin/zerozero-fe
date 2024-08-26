'use client';
import React from 'react';
import { registerStore } from '@/app/api/report';
import { useSelectStore, useSearchStore } from '@/app/zustand/reportStore';
import { useLandingStore } from '@/app/zustand/landingStore';

import { useRouter } from 'next/navigation';

export const ReportButton: React.FC = () => {
  const { placeName, longitude, latitude, imageFiles, resetSelectStore } =
    useSelectStore();
  const { resetSearchStore } = useSearchStore();
  const { resetLanding } = useLandingStore();

  const router = useRouter();
  const handleReport = async () => {
    try {
      const response = await registerStore(
        placeName,
        longitude,
        latitude,
        imageFiles,
      );
      if (response) {
        alert('판매점이 등록되었습니다!');
        resetSearchStore();
        resetSelectStore();
        resetLanding();
        router.push('/landing');
      } else {
        alert('다시 시도해주세요.');
      }
    } catch (error) {
      console.error('제보 중 오류 발생:', error);
      alert('다시 시도해주세요.');
    }
  };

  return (
    <button
      onClick={handleReport}
      className="w-full mt-20 bg-[#CD5C5C] text-white py-4 rounded-lg shadow-sm font-semibold text-sm"
    >
      제보하기
    </button>
  );
};
