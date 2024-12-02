'use client';

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

const getFromLocalStorage = (key: string, defaultValue: any) => {
  if (typeof window === 'undefined') return defaultValue; 
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : defaultValue;
};

export const useSelectStore = create<SelectStoreState>((set) => ({
  id: getFromLocalStorage('id', ''),
  placeName: getFromLocalStorage('placeName', ''),
  phone: getFromLocalStorage('phone', ''),
  category: getFromLocalStorage('category', ''),
  address: getFromLocalStorage('address', ''),
  longitude: getFromLocalStorage('longitude', ''),
  latitude: getFromLocalStorage('latitude', ''),
  status: getFromLocalStorage('status', false),
  imageFiles: getFromLocalStorage('imageFiles', []),
  setId: (id) => {
    set({ id });
    if (typeof window !== 'undefined') {
      localStorage.setItem('id', JSON.stringify(id));
    }
  },
  setPlaceName: (placeName) => {
    set({ placeName });
    if (typeof window !== 'undefined') {
      localStorage.setItem('placeName', JSON.stringify(placeName));
    }
  },
  setPhone: (phone) => {
    set({ phone });
    if (typeof window !== 'undefined') {
      localStorage.setItem('phone', JSON.stringify(phone));
    }
  },
  setCategory: (category) => {
    set({ category });
    if (typeof window !== 'undefined') {
      localStorage.setItem('category', JSON.stringify(category));
    }
  },
  setAddress: (address) => {
    set({ address });
    if (typeof window !== 'undefined') {
      localStorage.setItem('address', JSON.stringify(address));
    }
  },
  setLongitude: (longitude) => {
    set({ longitude });
    if (typeof window !== 'undefined') {
      localStorage.setItem('longitude', JSON.stringify(longitude));
    }
  },
  setLatitude: (latitude) => {
    set({ latitude });
    if (typeof window !== 'undefined') {
      localStorage.setItem('latitude', JSON.stringify(latitude));
    }
  },
  setStatus: (status) => {
    set({ status });
    if (typeof window !== 'undefined') {
      localStorage.setItem('status', JSON.stringify(status));
    }
  },
  setImageFiles: (imageFiles) => {
    set({ imageFiles });
    if (typeof window !== 'undefined') {
      localStorage.setItem('imageFiles', JSON.stringify(imageFiles.map(file => file.name)));
    }
  },
  resetSelectStore: () => {
    set({
      id: '',
      placeName: '',
      phone: '',
      category: '',
      address: '',
      longitude: '',
      latitude: '',
      status: false,
      imageFiles: [],
    });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('id');
      localStorage.removeItem('placeName');
      localStorage.removeItem('phone');
      localStorage.removeItem('category');
      localStorage.removeItem('address');
      localStorage.removeItem('longitude');
      localStorage.removeItem('latitude');
      localStorage.removeItem('status');
      localStorage.removeItem('imageFiles');
    }
  },
}));