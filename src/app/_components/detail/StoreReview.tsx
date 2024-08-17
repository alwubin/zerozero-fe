'use client';
import { useSelectedStore } from '@/app/store/detailStore';
import Image from 'next/image';
import { UserReview } from './UserReivew';
import { FirstIcon, SecondIcon, ThirdIcon } from '@/app/assets';

export const StoreReview = () => {
  const { reviews, zeroDrinks } = useSelectedStore();

  return (
    <div className="w-10/12 bg-white p-6 rounded-2xl space-y-4 mt-7 ml-10 h-96 overflow-scroll mb-7">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-sm text-left">가게 리뷰</div>
        <div className="font-semibold text-xs text-main">리뷰 쓰기</div>
      </div>

      <div className="flex flex-row justify-center space-x-10">
        {zeroDrinks.length > 0 &&
          zeroDrinks[0].map((drink, i) => (
            <div className="flex flex-row space-x-3" key={i}>
              {i === 0 && <FirstIcon />}
              {i === 1 && <SecondIcon />}
              {i === 2 && <ThirdIcon />}
              <Image
                src={`/images/${drink.type}.png`}
                alt={`${drink.type}-icon`}
                width={201}
                height={378}
                className="w-7"
              />
            </div>
          ))}
      </div>

      <div className="mt-7 space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review, i) => <UserReview key={i} review={review} />)
        ) : (
          <div className="text-xs text-[#A5A5A5]"></div>
        )}
      </div>
    </div>
  );
};
