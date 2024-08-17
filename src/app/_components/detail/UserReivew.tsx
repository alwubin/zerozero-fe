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
  review: string;
  user: ReviewUser;
}

interface UserReviewProps {
  review: Review;
}

export const UserReview: React.FC<UserReviewProps> = ({ review }) => {
  return (
    <div className="bg-point w-full p-4 rounded-2xl flex flex-col space-y-1">
      <div className="font-bold text-xs">{review.user.nickname}</div>

      <div className="flex flex-row space-x-1">
        <Image
          src={review.user.profileImage.url}
          alt={`${review.user.nickname}-profile`}
          width={201}
          height={378}
          className="w-2 rounded-full"
        />
        <Image
          src="/images/CHILSUNG_CIDER_ZERO.png"
          alt="related-image"
          width={201}
          height={378}
          className="w-2"
        />
      </div>

      <div className="text-xs">{review.review}</div>
    </div>
  );
};
