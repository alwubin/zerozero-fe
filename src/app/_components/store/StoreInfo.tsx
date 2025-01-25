'use client';
import { useSelectStore } from '@/app/zustand/reportStore';
import { Marker, Phone, Category } from '@/app/assets';

interface StoreInfoProps {
  placeName?: string;
  phone?: string;
  address?: string;
  category?: string;
}

export const StoreInfo = ({
  placeName,
  phone,
  address,
  category,
}: StoreInfoProps) => {
  const selectStore = useSelectStore();

  const displayPlaceName = placeName || selectStore.placeName;
  const displayPhone = phone || selectStore.phone;
  const displayAddress = address || selectStore.address;
  const displayCategory = category || selectStore.category;

  return (
    <div className="w-10/12 bg-white py-4 px-5 rounded-2xl space-y-4 mt-8 ml-10">
      <div className="font-bold text-2xl">{displayPlaceName}</div>
      <div className="flex flex-row font-extralight text-sm">
        <Marker className="mr-2" />
        {displayAddress}
      </div>

      <div className="flex flex-row font-extralight text-sm">
        <Phone className="mr-2" />
        {displayPhone ? displayPhone : <p>제공되지 않음</p>}
      </div>

      <div className="flex flex-row font-extralight text-sm">
        <Category className="mr-2" />
        {displayCategory}
      </div>
    </div>
  );
};
