'use client';
import Image from 'next/image';
import { UserReview, UserReviewProps } from './UserReivew';
import ReviewModal from './ReviewModal';
import {
  FirstIcon,
  SecondIcon,
  ThirdIcon,
  Emoji,
  UnrankedDrink,
} from '@/app/assets';
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getStoreInfo } from '@/app/api/detail';

interface StoreReviewProps {
  storeId: string;
}

export const StoreReview = ({ storeId }: StoreReviewProps) => {
  const [reviews, setReviews] = useState<UserReviewProps[]>([]);
  const [zeroDrinks, setZeroDrinks] = useState<string[][]>([[], [], []]);
  const [filter, setFilter] = useState<'RECENT' | 'RECOMMEND'>('RECENT');
  const [isOpen, setIsOpen] = useState(false);

  const maxRank = 3;

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSort = (sortType: 'RECENT' | 'RECOMMEND') => {
    setFilter(sortType);
  };

  const fetchStoreInfo = useCallback(async () => {
    try {
      const storeInfo = await getStoreInfo(storeId, filter);
      if (storeInfo) {
        console.log(storeInfo);
        setReviews(storeInfo.reviews || []);
        setZeroDrinks(storeInfo.zeroDrinks || [[], [], []]);
      }
    } catch (error) {
      console.error('판매점 리뷰 조회 오류', error);
    }
  }, [storeId, filter]);

  useEffect(() => {
    if (storeId) {
      fetchStoreInfo();
    }
  }, [storeId, filter, fetchStoreInfo]);

  return (
    <div className="w-10/12 bg-white p-6 rounded-2xl mt-7 ml-10 h-96 overflow-scroll mb-7">
      <div className="flex justify-between items-center mb-5">
        <div className="font-semibold text-sm text-left">가게 리뷰</div>
        <div
          className="font-semibold text-xs text-main cursor-pointer"
          onClick={handleModal}
        >
          리뷰 쓰기
        </div>
      </div>

      <div className="flex flex-row justify-center space-x-10">
        {[...Array(maxRank)].map((_, i) => (
          <div className="flex flex-row space-x-3" key={i}>
            {zeroDrinks[i] ? (
              <>
                {i === 0 && <FirstIcon />}
                {i === 1 && <SecondIcon />}
                {i === 2 && <ThirdIcon />}
                <Image
                  src={`/images/${zeroDrinks[i]}.png`}
                  alt={`${zeroDrinks[i]}-icon`}
                  width={35}
                  height={66}
                />
              </>
            ) : (
              <>
                {i === 0 && <FirstIcon />}
                {i === 1 && <SecondIcon />}
                {i === 2 && <ThirdIcon />}
                <UnrankedDrink />
              </>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end mt-4 mr-2 space-x-[2px] text-[10px]">
        {reviews.length > 0 && (
          <>
            <button
              onClick={() => handleSort('RECENT')}
              className={`${
                filter === 'RECENT'
                  ? 'font-medium text-[#E2A0A1]'
                  : 'font-extralight text-[#A5A5A5]'
              }`}
            >
              최신순
            </button>
            <div className="h-[9px] border-r border-[#CBCBCB]" />
            <button
              onClick={() => handleSort('RECOMMEND')}
              className={`${
                filter === 'RECOMMEND'
                  ? 'font-medium text-[#E2A0A1]'
                  : 'font-extralight text-[#A5A5A5]'
              }`}
            >
              추천순
            </button>
          </>
        )}
      </div>

      <div className="mt-2 space-y-4">
        {reviews.length > 0 ? (
          reviews.map((reviewData, i) => (
            <UserReview
              key={i}
              review={reviewData.review}
              user={reviewData.user}
              isLiked={reviewData.isLiked}
              likeCount={reviewData.likeCount}
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
