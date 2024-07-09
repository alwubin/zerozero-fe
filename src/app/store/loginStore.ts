import { create } from 'zustand'

interface LoginState {
    email: string;
    password: string;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    resetState: () => void;
}

export const useLoginStore = create<LoginState>((set) => ({
    email: '',
    password: '',
    setEmail: (email) => set({email}),
    setPassword: (password) => set({password}),
    resetState: () => set({
        email: '',
        password: ''
    })
}));  