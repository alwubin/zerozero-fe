'use client';
import React from 'react';
import { SearchIcon } from '@/app/assets';
import { searchStore } from '@/app/api/report';
import { useSearchStore, useSelectStore } from '@/app/zustand/reportStore';

export interface SearchResult {
  id?: string;
  kakaoId?: string;
  name?: string;
  category?: string;
  phone?: string;
  address?: string;
  roadAddress?: string;
  longitude?: string;
  latitude?: string;
  status?: boolean;
  placeUrl?: string;
}

export const SearchBar = () => {
  const { query, setQuery, setSearchResults } = useSearchStore();
  const { placeName, setPlaceName } = useSelectStore();

  const fetchStoreList = async (query: string) => {
    const storeList = await searchStore(query);
    if (storeList) {
      setSearchResults(storeList);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPlaceName('');
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="제보할 장소명 또는 키워드 입력"
        className="w-full p-4 pr-10 rounded-lg"
        value={placeName || query}
        onChange={handleInputChange}
      />
      <SearchIcon
        className="absolute right-5 bottom-3 text-black cursor-pointer"
        onClick={() => fetchStoreList(query)}
      />
    </div>
  );
};
