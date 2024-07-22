import Image from "next/image";

export const UserReview = () => {
  return (
    <div className="bg-point w-full p-4 rounded-2xl flex flex-col space-y-1">
      <div className="font-bold text-xs">서호빵</div>
      <div className="flex flex-row space-x-1">
        <Image
          src="/images/CHILSUNG_CIDER_ZERO.png"
          alt="rank-icon"
          width={201}
          height={378}
          className="w-2"
        />
        <Image
          src="/images/FANTA_ZERO_GRAPE.png"
          alt="rank-icon"
          width={201}
          height={378}
          className="w-2"
        />
        <Image
          src="/images/COCA_COLA_ZERO.png"
          alt="rank-icon"
          width={201}
          height={378}
          className="w-2"
        />
      </div>
      <div className="text-xs">맛있어용 또 방문할게요!</div>
    </div>
  );
};
