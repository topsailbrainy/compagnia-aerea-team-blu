import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  logged: boolean;
  isAdmin: boolean;
  userAuth: string | null; // email:password in base64
  setLogged: (value: boolean, auth?: string, admin?: boolean) => void;
}

export const useStoreUser = create<UserState>()(
  persist(
    (set) => ({
      logged: false,
      isAdmin: false,
      userAuth: null,
      setLogged: (value: boolean, auth?: string, admin?: boolean) => 
        set({ logged: value, userAuth: auth || null, isAdmin: admin || false }),
    }),
    {
      name: 'ghoan-user-storage', // nome della chiave nel localStorage
    }
  )
);