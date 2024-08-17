import { ChangeEvent } from 'react';
import { SearchIcon } from '@/app/assets';

interface SearchBarProps {
  query: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export function SearchBar({ query, onChange, onSearch }: SearchBarProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={onChange}
        placeholder="키워드 또는 장소명 검색"
        className="w-full py-5 pl-4 pr-10 text-sm bg-white rounded-xl focus:outline-none focus:border-gray-400"
      />
      <SearchIcon
        className="absolute right-5 bottom-4 flex items-center"
        onClick={onSearch}
      />
    </div>
  );
}
