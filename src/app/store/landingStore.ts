import { create } from 'zustand'

interface LandingState {
    latitude: string;
    longitude: string;
    query: string;
    setLatitude: (latitude: string) => void;
    setLongitude: (longitude: string) => void;
    setQuery: (query: string) => void;
}

export const useLandingStore = create<LandingState>((set) => ({
    latitude: '',
    longitude: '',
    query: '',
    setLatitude: (latitude) => set({latitude}),
    setLongitude: (longitude) => set({longitude}),
    setQuery: (query) => set({ query }),
}));  