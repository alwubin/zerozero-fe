import Image from "next/image";
import { UserReview } from "./UserReivew";

export const StoreReview = () => {
  const imageCounts = 4;
  return (
    <div className="w-10/12 bg-white p-6 rounded-2xl space-y-4 mt-7 ml-10 h-96 overflow-scroll">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-sm text-left">가게 리뷰</div>
        <div className="font-semibold text-xs text-main">리뷰 쓰기</div>
      </div>

      <div className="flex flex-row justify-center space-x-10">
        <div className="flex flex-row space-x-3">
          <Image
            src="/images/rank-icon-first.png"
            alt="rank-icon"
            width={65}
            height={65}
            className="w-5 h-5"
          />
          <Image
            src="/images/COCA_COLA_ZERO.png"
            alt="rank-icon"
            width={201}
            height={378}
            className="w-7"
          />
        </div>
        <div className="flex flex-row space-x-3">
          <Image
            src="/images/rank-icon-second.png"
            alt="rank-icon"
            width={65}
            height={65}
            className="w-5 h-5"
          />
          <Image
            src="/images/FANTA_ZERO_GRAPE.png"
            alt="rank-icon"
            width={201}
            height={378}
            className="w-7"
          />
        </div>
        <div className="flex flex-row space-x-3">
          <Image
            src="/images/rank-icon-third.png"
            alt="rank-icon"
            width={65}
            height={65}
            className="w-5 h-5"
          />
          <Image
            src="/images/CHILSUNG_CIDER_ZERO.png"
            alt="rank-icon"
            width={201}
            height={378}
            className="w-7"
          />
        </div>
      </div>

      <div className="mt-7 space-y-4">
        {Array.from({ length: imageCounts }, (_, i) => (
          <UserReview />
        ))}
      </div>
    </div>
  );
};
