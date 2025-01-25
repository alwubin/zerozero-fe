import { useState } from 'react';
import Image from 'next/image';
import { LikeButton, LikedButton } from '@/app/assets';
import { patchReviewLike } from '@/app/api/detail';

interface ReviewUser {
  id: string;
  nickname: string;
  email: string;
  profileImage: {
    url: string;
  };
}

export interface Review {
  id: string;
  content: string;
  zeroDrinks: string[];
  userId: string;
  createdAt: string;
}

export interface UserReviewProps {
  isLiked: boolean;
  likeCount: number;
  review: Review;
  user: ReviewUser;
}

export const UserReview = ({
  review,
  user,
  isLiked: initialLiked,
  likeCount: initialLikeCount,
}: UserReviewProps) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [loading, setLoading] = useState(false);

  const handleLikeClick = async () => {
    if (loading) return;

    try {
      setLoading(true);
      await patchReviewLike(review.id);

      if (isLiked) {
        setLikeCount((prev) => prev - 1);
      } else {
        setLikeCount((prev) => prev + 1);
      }
      setIsLiked((prev) => !prev);
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-point w-full p-4 rounded-2xl flex flex-col">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="font-bold text-xs">{user.nickname}</div>
          <div className="text-[#A5A5A5] text-xs font-light">
            {review.createdAt}
          </div>
        </div>

        <div className="flex flex-row space-x-2">
          {review.zeroDrinks.map((drink, index) => (
            <Image
              key={index}
              src={`/images/${drink}.png`}
              alt={`${drink}-icon`}
              width={40}
              height={40}
              className="rounded w-3"
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-1">
        <div className="text-xs">{review.content}</div>
        <div className="flex flex-row items-center space-x-[2px] h-[13.5px]">
          <span className="text-[9px] text-[#A5A5A5] font-medium">
            {likeCount > 0 ? likeCount : null}
          </span>
          <button onClick={handleLikeClick} disabled={loading}>
            {isLiked ? <LikedButton /> : <LikeButton />}
          </button>
        </div>
      </div>
    </div>
  );
};
