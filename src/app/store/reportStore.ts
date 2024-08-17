import { create } from 'zustand';
import { SearchResult } from '@/app/_components/report/SearchBar';

interface SearchStoreState {
  searchResults: SearchResult[];
  query: string;
  setSearchResults: (results: SearchResult[]) => void;
  setQuery: (query: string) => void;
  resetSearchStore: () => void;  
}

interface SelectStoreState {
  placeName: string;
  address: string;
  longitude: string;
  latitude: string;
  imageFiles: File[];
  setPlaceName: (placeName: string) => void;
  setAddress: (address: string) => void;
  setLongitude: (longitude: string) => void;
  setLatitude: (latitude: string) => void;
  setImageFiles: (imageFiles: File[]) => void;
  resetSelectStore: () => void;  
}

export const useSearchStore = create<SearchStoreState>((set) => ({
  searchResults: [],
  query: '',
  setSearchResults: (results) => set({ searchResults: results }),
  setQuery: (query) => set({ query }),
  resetSearchStore: () => set({ searchResults: [], query: '' }),  
}));

export const useSelectStore = create<SelectStoreState>((set) => ({
  placeName: '',
  address: '',
  longitude: '',
  latitude: '',
  imageFiles: [],
  setPlaceName: (placeName) => set({ placeName }),
  setAddress: (address) => set({ address }),
  setLongitude: (longitude) => set({ longitude }),
  setLatitude: (latitude) => set({ latitude }),
  setImageFiles: (imageFiles) => set({ imageFiles }),
  resetSelectStore: () =>
    set({
      placeName: '',
      address: '',
      longitude: '',
      latitude: '',
      imageFiles: [],
    }),  
}));