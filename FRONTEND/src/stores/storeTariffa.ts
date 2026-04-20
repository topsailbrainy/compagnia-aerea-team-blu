import { create } from 'zustand';

interface Flight {
  id: string;
  type: 'outbound' | 'inbound';
  price: number;
}

interface TariffaState {
  isRoundTrip: boolean;
  fromCity: string;
  toCity: string;
  departureDate: Date | null;
  returnDate: Date | null;
  outboundFlight: Flight | null;
  inboundFlight: Flight | null;
  setSearchCriteria: (data: { fromCity: string, toCity: string, departureDate: Date | null, returnDate: Date | null, isRoundTrip: boolean }) => void;
  setIsRoundTrip: (isRoundTrip: boolean) => void;
  toggleFlight: (flight: Flight) => void;
  getTotalPrice: () => number;
  getTaxPrice: () => number;
}

export const useStoreTariffa = create<TariffaState>((set, get) => ({
  isRoundTrip: true,
  fromCity: '',
  toCity: '',
  departureDate: new Date(),
  returnDate: new Date(),
  outboundFlight: null,
  inboundFlight: null,

  setSearchCriteria: (data) => set({ ...data }),
  setIsRoundTrip: (isRoundTrip: boolean) => set({ isRoundTrip }),

  toggleFlight: (flight: Flight) => {
    set((state) => {
      if (flight.type === 'outbound') {
        const isSelected = state.outboundFlight?.id === flight.id;
        return { outboundFlight: isSelected ? null : flight };
      } else {
        const isSelected = state.inboundFlight?.id === flight.id;
        return { inboundFlight: isSelected ? null : flight };
      }
    });
  },

  getTotalPrice: () => {
    const { outboundFlight, inboundFlight } = get();
    const flightTotal = (outboundFlight?.price || 0) + (inboundFlight?.price || 0);
    if (flightTotal === 0) return 0;
    const taxes = flightTotal * 0.16;
    return flightTotal + taxes;
  },

  getTaxPrice: () => {
    const { outboundFlight, inboundFlight } = get();
    const flightTotal = (outboundFlight?.price || 0) + (inboundFlight?.price || 0);
    return flightTotal * 0.16;
  }
}));
