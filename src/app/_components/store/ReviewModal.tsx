'use client';
import React, { useState, ChangeEvent } from 'react';
import { CloseButton } from '@/app/assets';
import Image from 'next/image';
import { postReview } from '@/app/api/detail';
import { useSelectStore } from '@/app/zustand/reportStore';

const ReviewModal = ({ onClose }: { onClose: () => void }) => {
  const [clickedImages, setClickedImages] = useState<string[]>([]);
  const [review, setReview] = useState<string>('');
  const { id } = useSelectStore();

  const handleImageClick = (imageAlt: string) => {
    setClickedImages((prevClickedImages) =>
      prevClickedImages.includes(imageAlt)
        ? prevClickedImages.filter((alt) => alt !== imageAlt)
        : [...prevClickedImages, imageAlt],
    );
  };

  const handleReview = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  const fetchReview = async () => {
    try {
      const result = await postReview(id, {
        content: review,
        zeroDrinks: clickedImages,
      });
      console.log('Review submission result:', result);
    } catch (error) {
      console.error('리뷰 실패', error);
      console.log('Review content:', review);
      console.log('Clicked images:', clickedImages);
    }
  };

  return (
    <div className="h-1/2 w-full space-y-4 flex flex-col py-5 px-6 bg-white rounded-t-3xl">
      <div>
        <div className="flex flex-row justify-between">
          <p className="text-base font-bold">리뷰 작성</p>
          <CloseButton onClick={onClose} className="cursor-pointer" />
        </div>
        <p className="text-[10px] font-base text-[#CBCBCB]">
          판매중인 제로 음료수를 모두 선택해주세요!
        </p>
      </div>
      <div className="flex flex-col justify-center items-center space-y-4">
        <div className="flex flex-wrap w-10/12 justify-center space-y-2.5">
          <div className="space-x-4 flex justify-center">
            <Image
              src="/images/FANTA_ZERO_PINEAPPLE.png"
              alt="FANTA_ZERO_PINEAPPLE"
              width={29.51}
              height={57}
              className={`cursor-pointer ${
                clickedImages.includes('FANTA_ZERO_PINEAPPLE')
                  ? 'contrast-100'
                  : 'contrast-50'
              } hover:contrast-100`}
              onClick={() => handleImageClick('FANTA_ZERO_PINEAPPLE')}
            />
            <Image
              src="/images/CHILSUNG_CIDER_ZERO.png"
              alt="CHILSUNG_CIDER_ZERO"
              width={29.45}
              height={57}
              className={`cursor-pointer ${
                clickedImages.includes('CHILSUNG_CIDER_ZERO')
                  ? 'contrast-100'
                  : 'contrast-50'
              } hover:contrast-100`}
              onClick={() => handleImageClick('CHILSUNG_CIDER_ZERO')}
            />
            <Image
              src="/images/FANTA_ZERO_GRAPE.png"
              alt="FANTA_ZERO_GRAPE"
              width={29.63}
              height={57}
              className={`cursor-pointer ${
                clickedImages.includes('FANTA_ZERO_GRAPE')
                  ? 'contrast-100'
                  : 'contrast-50'
              } hover:contrast-100`}
              onClick={() => handleImageClick('FANTA_ZERO_GRAPE')}
            />
            <Image
              src="/images/COCA_COLA_ZERO.png"
              alt="COKA_COLA_ZERO"
              width={30.31}
              height={57}
              className={`cursor-pointer ${
                clickedImages.includes('COKA_COLA_ZERO')
                  ? 'contrast-100'
                  : 'contrast-50'
              } hover:contrast-100`}
              onClick={() => handleImageClick('COKA_COLA_ZERO')}
            />
            <Image
              src="/images/DR_PEPPER_ZERO.png"
              alt="DR_PEPPER_ZERO"
              width={31.59}
              height={57}
              className={`cursor-pointer ${
                clickedImages.includes('DR_PEPPER_ZERO')
                  ? 'contrast-100'
                  : 'contrast-50'
              } hover:contrast-100`}
              onClick={() => handleImageClick('DR_PEPPER_ZERO')}
            />
            <Image
              src="/images/SPRITE_ZERO.png"
              alt="SPRITE_ZERO"
              width={30.37}
              height={57}
              className={`cursor-pointer ${
                clickedImages.includes('SPRITE_ZERO')
                  ? 'contrast-100'
                  : 'contrast-50'
              } hover:contrast-100`}
              onClick={() => handleImageClick('SPRITE_ZERO')}
            />
            <Image
              src="/images/MILKIS_ZERO.png"
              alt="MILKIS_ZERO"
              width={22.6}
              height={57}
              className={`cursor-pointer ${
                clickedImages.includes('MILKIS_ZERO')
                  ? 'contrast-100'
                  : 'contrast-50'
              } hover:contrast-100`}
              onClick={() => handleImageClick('MILKIS_ZERO')}
            />
            <Image
              src="/images/PEPSI_ZERO.png"
              alt="PEPSI_ZERO"
              width={30.81}
              height={57}
              className={`cursor-pointer ${
                clickedImages.includes('PEPSI_ZERO')
                  ? 'contrast-100'
                  : 'contrast-50'
              } hover:contrast-100`}
              onClick={() => handleImageClick('PEPSI_ZERO')}
            />
          </div>

          <div className="space-x-2.5 flex justify-center">
            <Image
              src="/images/TAMS_ZERO_LEMON.png"
              alt="TAMS_ZERO_LEMON"
              width={29.98}
              height={57}
              className={`cursor-pointer ${
                clickedImages.includes('TAMS_ZERO_LEMON')
                  ? 'contrast-100'
                  : 'contrast-50'
              } hover:contrast-100`}
              onClick={() => handleImageClick('TAMS_ZERO_LEMON')}
            />
            <Image
              src="/images/WELCHS_ZERO_SHINE_MUSCAT.png"
              alt="WELCHS_ZERO_SHINE_MUSCAT"
              width={29.62}
              height={57}
              className={`cursor-pointer ${
                clickedImages.includes('WELCHS_ZERO_SHINE_MUSCAT')
                  ? 'contrast-100'
                  : 'contrast-50'
              } hover:contrast-100`}
              onClick={() => handleImageClick('WELCHS_ZERO_SHINE_MUSCAT')}
            />
            <Image
              src="/images/TAMS_ZERO_GRAPE.png"
              alt="TAMS_ZERO_GRAPE"
              width={30.79}
              height={57}
              className={`cursor-pointer ${
                clickedImages.includes('TAMS_ZERO_GRAPE')
                  ? 'contrast-100'
                  : 'contrast-50'
              } hover:contrast-100`}
              onClick={() => handleImageClick('TAMS_ZERO_GRAPE')}
            />
            <Image
              src="/images/WELCHS_ZERO_ORANGE.png"
              alt="WELCHS_ZERO_ORANGE"
              width={30.08}
              height={57}
              className={`cursor-pointer ${
                clickedImages.includes('WELCHS_ZERO_ORANGE')
                  ? 'contrast-100'
                  : 'contrast-50'
              } hover:contrast-100`}
              onClick={() => handleImageClick('WELCHS_ZERO_ORANGE')}
            />
            <Image
              src="/images/TAMS_ZERO_APPLE_KIWI.png"
              alt="TAMS_ZERO_APPLE_KIWI"
              width={30.67}
              height={57}
              className={`cursor-pointer ${
                clickedImages.includes('TAMS_ZERO_APPLE_KIWI')
                  ? 'contrast-100'
                  : 'contrast-50'
              } hover:contrast-100`}
              onClick={() => handleImageClick('TAMS_ZERO_APPLE_KIWI')}
            />
            <Image
              src="/images/WELCHS_ZERO_GRAPE.png"
              alt="WELCHS_ZERO_GRAPE"
              width={29.7}
              height={57}
              className={`cursor-pointer ${
                clickedImages.includes('WELCHS_ZERO_GRAPE')
                  ? 'contrast-100'
                  : 'contrast-50'
              } hover:contrast-100`}
              onClick={() => handleImageClick('WELCHS_ZERO_GRAPE')}
            />
            <Image
              src="/images/TAMS_ZERO_PINEAPPLE.png"
              alt="TAMS_ZERO_PINEAPPLE"
              width={30.15}
              height={57}
              className={`cursor-pointer ${
                clickedImages.includes('TAMS_ZERO_PINEAPPLE')
                  ? 'contrast-100'
                  : 'contrast-50'
              } hover:contrast-100`}
              onClick={() => handleImageClick('TAMS_ZERO_PINEAPPLE')}
            />
            <Image
              src="/images/TAMS_ZERO_PEACH.png"
              alt="TAMS_ZERO_PEACH"
              width={30.52}
              height={57}
              className={`cursor-pointer ${
                clickedImages.includes('TAMS_ZERO_PEACH')
                  ? 'contrast-100'
                  : 'contrast-50'
              } hover:contrast-100`}
              onClick={() => handleImageClick('TAMS_ZERO_PEACH')}
            />
            <Image
              src="/images/TAMS_ZERO_ORANGE.png"
              alt="TAMS_ZERO_ORANGE"
              width={30.36}
              height={57}
              className={`cursor-pointer ${
                clickedImages.includes('TAMS_ZERO_ORANGE')
                  ? 'contrast-100'
                  : 'contrast-50'
              } hover:contrast-100`}
              onClick={() => handleImageClick('TAMS_ZERO_ORANGE')}
            />
          </div>
        </div>
        <div className="w-full rounded-3xl h-24 bg-[#F2F4F6]">
          <textarea
            className="focus:outline-none w-full h-full placeholder:text-[10px] bg-transparent px-5 py-2 overflow-y-auto text-sm"
            placeholder="판매점에 대한 리뷰를 입력해주세요"
            value={review}
            onChange={handleReview}
          />
        </div>
      </div>

      <button
        className="py-3.5 rounded-2xl px-36 bg-main text-white text-xs font-bold"
        onClick={fetchReview}
      >
        리뷰 쓰기
      </button>
    </div>
  );
};
export default ReviewModal;
