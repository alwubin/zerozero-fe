import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Image {
  url: string;
}

interface ReviewUser {
  id: string;
  nickname: string;
  email: string;
  profileImage: Image;
}

interface Review {
  review: string;
  user: ReviewUser;
}

interface ZeroDrink {
  type: string;
}

interface SelectedStoreState {
  storeId: string;
  filter: 'RECENT' | 'RECOMMEND'; 
  images: Image[];
  reviews: Review[];
  zeroDrinks: ZeroDrink[][];
  setStoreId: (storeId: string) => void;
  setFilter: (filter: 'RECENT' | 'RECOMMEND') => void; 
  setImages: (images: Image[]) => void;
  setReviews: (reviews: Review[]) => void;
  setZeroDrinks: (zeroDrinks: ZeroDrink[][]) => void;
  resetSelectedStore: () => void; 
}
  
export const useSelectedStore = create<SelectedStoreState>((set) => ({
  storeId: localStorage.getItem('storeId') || '',
  filter: 'RECENT',  
  images: [],
  reviews: [],
  zeroDrinks: [[]],
  setStoreId: (storeId) => {
    set({ storeId });
    localStorage.setItem('storeId', storeId); 
  },
  setFilter: (filter) => set({ filter }), 
  setImages: (images) => set({ images }),
  setReviews: (reviews) => set({ reviews }),
  setZeroDrinks: (zeroDrinks) => set({ zeroDrinks }),
  resetSelectedStore: () =>
    set({
      filter: 'RECENT',  
      images: [],
      reviews: [],
      zeroDrinks: [[]],
    }),
}));