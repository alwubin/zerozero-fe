"use client";
import React, { useState } from "react";
import { Navbar } from "@/app/_components/Navbar";
import { SearchBar } from "@/app/_components/report/SearchBar";
import { SearchResults } from "@/app/_components/report/SearchResults";
import { ReportButton } from "@/app/_components/report/ReportButton";
import { StoreAddress } from "@/app/_components/report/StoreAddress";
import { StoreImage } from "@/app/_components/report/StoreImages";

interface SearchResult {
  name: string;
  address: string;
  phone: string;
}

export default function Report() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = (query: string) => {
    const dummyResults: SearchResult[] = [
      {
        name: "명동교자 이태원점",
        address: "서울 용산구 녹사평대로 136",
        phone: "02-790-7300",
      },
      {
        name: "라쿠치나",
        address: "서울 용산구 회나무로44길 10",
        phone: "02-794-6006",
      },
      {
        name: "바토스 이태원점",
        address: "서울 용산구 이태원로15길 1",
        phone: "02-797-8226",
      },
      {
        name: "바토스 이태원점",
        address: "서울 용산구 이태원로15길 1",
        phone: "02-797-8226",
      },
      {
        name: "바토스 이태원점",
        address: "서울 용산구 이태원로15길 1",
        phone: "02-797-8226",
      },
      {
        name: "바토스 이태원점",
        address: "서울 용산구 이태원로15길 1",
        phone: "02-797-8226",
      },
    ];
    setSearchResults(dummyResults);
  };
  return (
    <div className="flex flex-col min-h-screen bg-[#F2F4F6] w-full">
      <div className="mt-8 font-bold text-lg ml-7">가게 제보</div>
      <div className="flex-1 p-4 overflow-y-auto mx-3 relative">
        <SearchBar onSearch={handleSearch} />
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
