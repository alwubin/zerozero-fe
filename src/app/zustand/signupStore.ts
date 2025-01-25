import { create } from 'zustand'

interface SignupState {
    step: number;
    nickname: string;
    email: string;
    password: string;
    confirmPassword: string,
    setStep: (step: number) => void;
    setNickname: (nickname: string) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setConfirmPassword: (confirmPassword: string) => void;
    resetState: () => void;
}

export const useSignupStore = create<SignupState>((set) => ({
    step: 1,
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
    setStep: (step) => set({step}),
    setNickname: (nickname) => set({nickname}),
    setEmail: (email) => set({email}),
    setPassword: (password) => set({password}),
    setConfirmPassword: (confirmPassword) => set({confirmPassword}),
    resetState: () => set({
        step: 1,
        nickname: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
}));