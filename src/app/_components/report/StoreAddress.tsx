'use client';
import { useSelectStore } from '@/app/store/reportStore';

export const StoreAddress = () => {
  const { address } = useSelectStore();
  return (
    <div className="bg-white flex flex-col space-y-1 rounded-xl p-4 pb-6 mt-4">
      <div className="font-semibold text-sm text-left">가게 주소</div>
      <div className="text-md text-center">{address}</div>
    </div>
  );
};
