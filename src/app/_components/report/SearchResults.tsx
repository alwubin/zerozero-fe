'use client';
import React from 'react';
import { SearchResultItem } from './SearchResultItem';
import { SearchResult } from './SearchBar';
import { useSelectStore } from '@/app/store/reportStore';

interface SearchResultsProps {
  results: SearchResult[];
}

export const SearchResults = ({ results }: SearchResultsProps) => {
  const { setPlaceName, setAddress, setLongitude, setLatitude } =
    useSelectStore();

  return (
    <div className=" bg-white rounded-xl h-72 overflow-scroll">
      {results.map((result) => (
        <SearchResultItem
          key={result.id}
          {...result}
          onClick={() => {
            setPlaceName(result.name ?? '');
            setAddress(result.roadAddress ?? '');
            setLongitude(result.longitude ?? '');
            setLatitude(result.latitude ?? '');
          }}
        />
      ))}
    </div>
  );
};
