'use client';
import React from 'react';
import { Navbar } from '@/app/_components/Navbar';
import { SearchBar } from '@/app/_components/report/SearchBar';
import { SearchResults } from '@/app/_components/report/SearchResults';
import { ReportButton } from '@/app/_components/report/ReportButton';
import { StoreAddress } from '@/app/_components/report/StoreAddress';
import StoreImage from '@/app/_components/report/StoreImages';
import { useSearchStore } from '@/app/zustand/reportStore';

export default function Report() {
  const { searchResults } = useSearchStore();

  return (
    <div className="flex flex-col min-h-screen bg-[#F2F4F6] w-full">
      <div className="mt-8 font-bold text-lg ml-7">가게 제보</div>
      <div className="flex-1 p-4 overflow-y-auto mx-3 relative">
        <SearchBar />
        {searchResults.length > 0 && (
          <div className="absolute top-16 left-0 right-0 bg-white z-10 mt-4 mx-4 shadow-lg rounded-lg">
            <SearchResults results={searchResults} />
          </div>
        )}
        <StoreAddress />
        <StoreImage />
        <ReportButton />
      </div>

      <div className="mt-auto">
        <Navbar />
      </div>
    </div>
  );
}
