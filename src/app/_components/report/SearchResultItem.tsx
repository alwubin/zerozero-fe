import React from "react";

interface SearchResult {
  name: string;
  address: string;
  phone: string;
}

export const SearchResultItem: React.FC<SearchResult> = ({
  name,
  address,
  phone,
}) => {
  return (
    <div className="bg-[#F2F4F6] rounded-2xl px-4 py-2 mb-2 mt-2 mx-4">
      <p className="font-bold mb-1 text-xs">{name}</p>
      <p className="text-[10px] text-gray-600 mb-1">{address}</p>
      <p className="text-[10px] text-[#235A91]">{phone}</p>
    </div>
  );
};
