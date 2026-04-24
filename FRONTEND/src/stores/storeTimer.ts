import { create } from 'zustand';

interface TimerState {
  timer: number;
  setTimer: (value?: number) => void;
  getTimer: () => number;
}

export const useStoreTimer = create<TimerState>((set, get) => ({
  timer: 0,
  setTimer: (value?: number) => set({ timer: value ?? Date.now()}),
  getTimer: () => get().timer,
}));