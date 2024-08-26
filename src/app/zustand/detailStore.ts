import { create } from 'zustand'

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
  filter: 'RECENT' | 'RECOMMEND'; 
  images: Image[];
  reviews: Review[];
  zeroDrinks: ZeroDrink[][];
  setFilter: (filter: 'RECENT' | 'RECOMMEND') => void; 
  setImages: (images: Image[]) => void;
  setReviews: (reviews: Review[]) => void;
  setZeroDrinks: (zeroDrinks: ZeroDrink[][]) => void;
  resetSelectedStore: () => void; 
}
  
export const useSelectedStore = create<SelectedStoreState>((set) => ({
  filter: 'RECENT',  
  images: [],
  reviews: [],
  zeroDrinks: [[]],
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