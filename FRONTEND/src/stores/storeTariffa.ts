import { create } from 'zustand';

interface Flight {
  id: string;
  type: 'outbound' | 'inbound';
  price: number;
  fromCity: string;
  toCity: string;
  orario: string;
  data: Date
}
interface Utente {
  nome: string;
  cognome: string;
  dataNascita: string;
  codiceFiscale: string;
  documento: string;
};

interface Pagamento {
  titolare: string;
  numeroCarta?: string;
  scadenza?: string;
  cvv?: string;
  email?: string;
}



interface TariffaState {
  isRoundTrip: boolean;
  fromCity: string;
  toCity: string;
  departureDate: Date | null;
  returnDate: Date | null;
  outboundFlight: Flight | null;
  inboundFlight: Flight | null;
  passegero: Utente ;
  pagamento: Pagamento;
  setSearchCriteria: (data: { fromCity: string, toCity: string, departureDate: Date | null, returnDate: Date | null, isRoundTrip: boolean }) => void;
  setIsRoundTrip: (isRoundTrip: boolean) => void;
  toggleFlight: (flight: Flight) => void;
  getTotalPrice: () => number;
  getTaxPrice: () => number;
  setPassegero: (data: Partial<Utente>) => void;
  setPagamento: (data: Partial<Pagamento>) => void;
  clearForm: () => void;
  reset: () => void;
}

export const useStoreTariffa = create<TariffaState>((set, get) => ({
  isRoundTrip: true,
  fromCity: '',
  toCity: '',
  departureDate: new Date(),
  returnDate: new Date(),
  outboundFlight: null,
  inboundFlight: null,
 passegero: {
  nome: "",
  cognome: "",
  dataNascita: "",
  codiceFiscale: "",
  documento: "",
},

pagamento: {
  titolare: "",
  numeroCarta: "",
  scadenza: "",
  cvv: "",
  email: "",
},
  //crea metodi set per i campi
  setSearchCriteria: (data) => set({ ...data }),
  setIsRoundTrip: (isRoundTrip: boolean) => set({ isRoundTrip }),
  setPassegero: (data: Partial<Utente>) =>
  set((state) => ({
    passegero: { ...state.passegero, ...data },
  })),

  setPagamento: (data: Partial<Pagamento>) =>
  set((state) => ({
    pagamento: { ...state.pagamento, ...data },
  })),

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
  },

  clearForm: () => set({
  passegero: {
    nome: "",
    cognome: "",
    dataNascita: "",
    codiceFiscale: "",
    documento: "",
  },
  pagamento: {
    titolare: "",
    numeroCarta: "",
    scadenza: "",
    cvv: "",
    email: "",
  }
}),
reset: () =>
  set({
    isRoundTrip: true,
    fromCity: "",
    toCity: "",
    departureDate: null,
    returnDate: null,
    outboundFlight: null,
    inboundFlight: null,

    passegero: {
      nome: "",
      cognome: "",
      dataNascita: "",
      codiceFiscale: "",
      documento: "",
    },

    pagamento: {
      titolare: "",
      numeroCarta: "",
      scadenza: "",
      cvv: "",
      email: "",
    },
  }),
}));
