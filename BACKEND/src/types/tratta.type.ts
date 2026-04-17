export interface Tratta {
    id: string;
    aereoporto_partenza: string; // codice IATA
    aereoporto_arrivo: string; //   codice IATA
    data_partenza: Date;
    data_arrivo: Date;
    prezzo: number;
}