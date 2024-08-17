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
  id: string;
  placeName: string;
  phone: string;
  address: string;
  category: string;
  longitude: string;
  latitude: string;
  status: boolean;
  imageFiles: File[];
  setId: (id: string) => void;
  setPlaceName: (placeName: string) => void;
  setPhone: (phone: string) => void;
  setCategory: (category: string) => void;
  setAddress: (address: string) => void;
  setLongitude: (longitude: string) => void;
  setLatitude: (latitude: string) => void;
  setImageFiles: (imageFiles: File[]) => void;
  setStatus: (status: boolean) => void;
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
  id: '',
  placeName: '',
  phone: '',
  category: '',
  address: '',
  longitude: '',
  latitude: '',
  status: false,
  imageFiles: [],
  setId: (id) => set({ id }),
  setPlaceName: (placeName) => set({ placeName }),
  setPhone: (phone) => set({ phone }),
  setCategory: (category) => set({ category }),
  setAddress: (address) => set({ address }),
  setLongitude: (longitude) => set({ longitude }),
  setLatitude: (latitude) => set({ latitude }),
  setStatus: (status) => set({ status }),
  setImageFiles: (imageFiles) => set({ imageFiles }),
  resetSelectStore: () =>
    set({
      id: '',
      placeName: '',
      phone:'',
      category: '',
      address: '',
      longitude: '',
      latitude: '',
      status: false,
      imageFiles: [],
    }),  
}));