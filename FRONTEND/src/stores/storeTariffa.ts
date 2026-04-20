import { create } from 'zustand';

interface Flight {
  id: string;
  type: 'outbound' | 'inbound';
  price: number;
}

interface TariffaState {
  outboundFlight: Flight | null;
  inboundFlight: Flight | null;
  toggleFlight: (flight: Flight) => void;
  getTotalPrice: () => number;
  getTaxPrice: () => number;
}

export const useStoreTariffa = create<TariffaState>((set, get) => ({
  outboundFlight: null,
  inboundFlight: null,

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
    // Supponiamo che le tasse siano il 15% del costo del volo o un valore fisso per semplicità se i voli non sono selezionati
    if (flightTotal === 0) return 0;
    const taxes = flightTotal * 0.16; // Esempio per arrivare a valori simili a quelli statici
    return flightTotal + taxes;
  },

  getTaxPrice: () => {
    const { outboundFlight, inboundFlight } = get();
    const flightTotal = (outboundFlight?.price || 0) + (inboundFlight?.price || 0);
    return flightTotal * 0.16;
  }
}));
