'use client';
import { useSelectStore } from '@/app/store/reportStore';
import { Marker, Phone, Category } from '@/app/assets';

export const StoreInfo = () => {
  const { placeName, phone, address, category } = useSelectStore();
  return (
    <div className="w-10/12 bg-white p-6 rounded-2xl space-y-4 mt-8 ml-10">
      <div className="font-bold text-2xl">{placeName}</div>
      <div className="flex flex-row font-extralight text-sm">
        <Marker className="mr-2" />
        {address}
      </div>

      <div className="flex flex-row font-extralight text-sm">
        <Phone className="mr-2" />
        {phone ? phone : <p>제공되지 않음</p>}
      </div>

      <div className="flex flex-row font-extralight text-sm">
        <Category className="mr-2" />
        {category}
      </div>
    </div>
  );
};
