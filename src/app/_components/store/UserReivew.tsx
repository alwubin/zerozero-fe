import Image from 'next/image';

interface ReviewUser {
  id: string;
  nickname: string;
  email: string;
  profileImage: {
    url: string;
  };
}

interface Review {
  id: string;
  content: string;
  zeroDrinks: string[];
  userId: string;
  createdAt: string;
}

interface UserReviewProps {
  review: Review;
  user: ReviewUser;
}

export const UserReview = ({ review, user }: UserReviewProps) => {
  return (
    <div className="bg-point w-full p-4 rounded-2xl flex flex-col space-y-1">
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

      <div className="text-xs mb-2">{review.content}</div>
    </div>
  );
};
