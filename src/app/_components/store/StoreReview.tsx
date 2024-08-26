'use client';
import { useSelectedStore } from '@/app/zustand/detailStore';
import Image from 'next/image';
import { UserReview } from './UserReivew';
import ReviewModal from './ReviewModal';
import { FirstIcon, SecondIcon, ThirdIcon, Emoji } from '@/app/assets';
import { useState } from 'react';
import { motion } from 'framer-motion';

export const StoreReview = () => {
  const { reviews, zeroDrinks } = useSelectedStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-10/12 bg-white p-6 rounded-2xl  mt-7 ml-10 h-96 overflow-scroll mb-7">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-sm text-left">가게 리뷰</div>
        <div
          className="font-semibold text-xs text-main cursor-pointer"
          onClick={() => handleModal()}
        >
          리뷰 쓰기
        </div>
      </div>

      <div className="flex flex-row justify-center space-x-10">
        {zeroDrinks.length > 0 &&
          zeroDrinks.map((drink, i) => (
            <div className="flex flex-row space-x-3" key={i}>
              {i === 0 && <FirstIcon />}
              {i === 1 && <SecondIcon />}
              {i === 2 && <ThirdIcon />}
              <Image
                src={`/images/${drink}.png`}
                alt={`${drink}-icon`}
                width={201}
                height={378}
                className="w-7"
              />
            </div>
          ))}
      </div>

      <div className="mt-7 space-y-4">
        {reviews.length > 0 ? (
          reviews.map((reviewData, i) => (
            <UserReview
              key={i}
              review={reviewData.review}
              user={reviewData.user}
            />
          ))
        ) : (
          <div className="text-xs text-[#A5A5A5] space-y-3 pt-10 flex flex-col justify-center items-center">
            <Emoji />
            <p className="text-xs">아직 등록된 리뷰가 없어요</p>
          </div>
        )}
      </div>

      {isOpen && (
        <div
          className="cursor-pointer fixed inset-0 z-50 w-full h-full flex items-end justify-center bg-black bg-opacity-50"
          onClick={() => handleModal()}
        >
          <motion.div
            className="w-full max-w-[480px] bg-white rounded-t-3xl"
            animate={isOpen ? { y: [100, 0] } : {}}
            transition={{ duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ReviewModal onClose={handleModal} />
          </motion.div>
        </div>
      )}
    </div>
  );
};
