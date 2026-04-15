CREATE TABLE piloti (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    surname VARCHAR(50)
)

CREATE TABLE aerei (
    id SERIAL PRIMARY KEY,
    modello VARCHAR(50),
    capienza INTEGER,
    pilot_id INTEGER
)

CREATE TABLE aereoporti (
    codice_IATA VARCHAR(3) PRIMARY KEY,
    name VARCHAR(50),
    city VARCHAR(50),
    country VARCHAR(50)
)

CREATE TABLE gates (
    id SERIAL,
    aereoporto_codice_IATA VARCHAR(3),
    FOREIGN KEY (aereoporto_codice_IATA) REFERENCES aereoporti(codice_IATA)
    PRIMARY KEY (id, aereoporto_codice_IATA)
)

CREATE TABLE tratte (
    aereoporto_partenza VARCHAR(3),
    aereoporto_arrivo VARCHAR(3),
    FOREIGN KEY (aereoporto_partenza) REFERENCES aereoporti(codice_IATA),
    FOREIGN KEY (aereoporto_arrivo) REFERENCES aereoporti(codice_IATA),
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY
)

CREATE TABLE voli (
    id SERIAL PRIMARY KEY,
    FOREIGN KEY (tratte_id) REFERENCES tratte(id),
    FOREIGN KEY (aerei_id) REFERENCES aerei(id),
    FOREIGN KEY (gates_id) REFERENCES gates(id),
    orario_partenza TIMESTAMP,
    orario_arrivo TIMESTAMP,
)

CREATE TABLE documento(
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(20),
    numero VARCHAR(10),
    scadenza DATE,
)
CREATE TABLE card(
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(20),
    numero VARCHAR(10),
    scadenza DATE,
    cvv VARCHAR(3),
    nome VARCHAR(50),
    cognome VARCHAR(50),
    )

CREATE TABLE user(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(50),
    surname VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(50),
    documento_id INTEGER
    card_id INTEGER optional
)
CREATE TABLE prenotazione(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID,
    FOREIGN KEY (user_id) REFERENCES user(id),
)
CREATE TABLE biglietto(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    prenotazione_id UUID,
    FOREIGN KEY (prenotazione_id) REFERENCES prenotazione(id),
    volo_id INTEGER
)