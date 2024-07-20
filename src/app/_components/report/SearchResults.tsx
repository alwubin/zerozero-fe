import React from "react";
import { SearchResultItem } from "./SearchResultItem";

interface SearchResult {
  name: string;
  address: string;
  phone: string;
}

interface SearchResultsProps {
  results: SearchResult[];
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div className=" bg-white rounded-xl h-72 overflow-scroll">
      {results.map((result, index) => (
        <SearchResultItem key={index} {...result} />
      ))}
    </div>
  );
};
