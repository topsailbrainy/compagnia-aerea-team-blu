import { create } from 'zustand';

interface UserState {
  logged: boolean;
  setLogged: (value: boolean) => void;
}

export const useStoreUser = create<UserState>((set) => ({
  logged: false,
  setLogged: (value: boolean) => set({ logged: value }),
}));