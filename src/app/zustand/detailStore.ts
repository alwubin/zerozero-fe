'use client';

import { create } from 'zustand';

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
  id: string;
  content: string;
  zeroDrinks: string[];
  userId: string;
  createdAt: string;
}

interface ReviewData {
  review: Review;
  user: ReviewUser;
  likeCount: number;
  isLiked: boolean;
}

interface ZeroDrink {
  type: string;
}

interface SelectedStoreState {
  storeId: string;
  filter: 'RECENT' | 'RECOMMEND'; 
  images: string[];
  reviews: ReviewData[];
  zeroDrinks: ZeroDrink[][];
  setStoreId: (storeId: string) => void;
  setFilter: (filter: 'RECENT' | 'RECOMMEND') => void; 
  setImages: (images: string[]) => void;
  setReviews: (reviews: ReviewData[]) => void;
  setZeroDrinks: (zeroDrinks: ZeroDrink[][]) => void;
  resetSelectedStore: () => void; 
}

export const useSelectedStore = create<SelectedStoreState>((set) => ({
  storeId: typeof window !== 'undefined' ? localStorage.getItem('storeId') || '' : '', // 서버 환경 체크
  filter: 'RECENT',
  images: [],
  reviews: [],
  zeroDrinks: [[]],
  setStoreId: (storeId) => {
    set({ storeId });
    if (typeof window !== 'undefined') {
      localStorage.setItem('storeId', storeId);
    }
  },
  setFilter: (filter) => set({ filter }),
  setImages: (images) => set({ images }),
  setReviews: (reviews) => set({ reviews }),
  setZeroDrinks: (zeroDrinks) => set({ zeroDrinks }),
  resetSelectedStore: () => {
    set({
      storeId: '',
      filter: 'RECENT',
      images: [],
      reviews: [],
      zeroDrinks: [[]],
    });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('storeId');
    }
  },
}));
