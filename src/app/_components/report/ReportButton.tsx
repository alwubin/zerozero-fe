'use client';
import React from 'react';
import { registerStore } from '@/app/api/report';
import { useSelectStore } from '@/app/store/reportStore';
import { useRouter } from 'next/navigation';

export const ReportButton: React.FC = () => {
  const { placeName, longitude, latitude, imageFiles } = useSelectStore();
  const router = useRouter();
  const handleReport = async () => {
    if (!placeName || !longitude || !latitude) {
      alert('가게를 선택해주세요!');
      return;
    } else if (imageFiles.length === 0) {
      alert('사진을 추가해주세요!');
      return;
    }

    try {
      const response = await registerStore(
        placeName,
        longitude,
        latitude,
        imageFiles,
      );
      if (response) {
        alert('판매점이 등록되었습니다!');
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
      className="w-full mt-7 bg-[#CD5C5C] text-white py-4 rounded-lg shadow-sm font-semibold text-sm"
    >
      제보하기
    </button>
  );
};
