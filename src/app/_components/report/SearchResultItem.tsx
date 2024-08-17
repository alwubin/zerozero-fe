import React from 'react';
import { SearchResult } from './SearchBar';
import { ZeroIcon, NoZeroIcon } from '@/app/assets';
import { useSelectStore, useSearchStore } from '@/app/store/reportStore'; // 상태 가져오기

interface SearchResultItemProps extends SearchResult {
  onClick?: () => void;
}

export const SearchResultItem = ({
  name,
  roadAddress,
  longitude,
  latitude,
  phone,
  status,
}: SearchResultItemProps) => {
  const { setPlaceName, setAddress, setLongitude, setLatitude } =
    useSelectStore();
  const { setSearchResults } = useSearchStore();

  const handleResultClick = () => {
    setPlaceName(name ?? '');
    setAddress(roadAddress ?? '');
    setLongitude(longitude ?? '');
    setLatitude(latitude ?? '');

    setSearchResults([]);
  };

  return (
    <div
      className="bg-[#F2F4F6] cursor-pointer rounded-2xl px-4 py-2 mb-2 mt-2 mx-4 space-y-1 hover:bg-[#E0E3E6] transition-colors"
      onClick={handleResultClick}
    >
      <div className="flex flex-row space-x-1 items-center">
        <p className="font-bold text-xs">{name}</p>
        {status ? (
          <ZeroIcon className="w-4 h-4" />
        ) : (
          <NoZeroIcon className="w-4 h-4 mb-0.5" />
        )}
      </div>
      <p className="text-[10px] text-gray-600 mb-1">{roadAddress}</p>
      <p className="text-[10px] text-[#235A91]">{phone}</p>
    </div>
  );
};
