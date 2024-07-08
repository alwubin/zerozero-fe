import { create } from 'zustand'

type SignupState = {
    currentStep: number;
    nickname: string;
    email: string;
    password: string;
    confirmPassword: string;
    nextStep: () => void;
    setField: (field: string, value: string) => void;
}
  
export const useSignupStore = create<SignupState>((set) => ({
    currentStep: 0,
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
    nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
    setField: (field, value) => set((state) => ({ [field]: value })),
}))