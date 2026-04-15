CREATE TABLE piloti (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    surname VARCHAR(50)
);

CREATE TABLE aerei (
    id SERIAL PRIMARY KEY,
    modello VARCHAR(50),
    capienza INTEGER,
    pilot_id INTEGER REFERENCES piloti(id)
);

CREATE TABLE aereoporti (
    codice_IATA VARCHAR(3) PRIMARY KEY,
    name VARCHAR(50),
    city VARCHAR(50),
    country VARCHAR(50)
);

CREATE TABLE gates (
    id SERIAL,
    aereoporto_codice_IATA VARCHAR(3) REFERENCES aereoporti(codice_IATA),
    PRIMARY KEY (id, aereoporto_codice_IATA)
);

CREATE TABLE tratte (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    aereoporto_partenza VARCHAR(3) REFERENCES aereoporti(codice_IATA),
    aereoporto_arrivo VARCHAR(3) REFERENCES aereoporti(codice_IATA)
);

CREATE TABLE voli (
    id SERIAL PRIMARY KEY,
    tratte_id UUID REFERENCES tratte(id),
    aerei_id INTEGER REFERENCES aerei(id),
    gates_id INTEGER,
    aereoporto_codice_IATA VARCHAR(3),
    orario_partenza TIMESTAMP,
    orario_arrivo TIMESTAMP,
    FOREIGN KEY (gates_id, aereoporto_codice_IATA) REFERENCES gates(id, aereoporto_codice_IATA)
);

CREATE TABLE documento(
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(20),
    numero VARCHAR(10),
    scadenza DATE
);

CREATE TABLE card(
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(20),
    numero VARCHAR(10),
    scadenza DATE,
    cvv VARCHAR(3),
    nome VARCHAR(50),
    cognome VARCHAR(50)
);

CREATE TABLE utenti(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(50),
    surname VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(50),
    documento_id INTEGER REFERENCES documento(id),
    card_id INTEGER REFERENCES card(id)
);

CREATE TABLE prenotazione(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES utenti(id)
);

CREATE TABLE biglietto(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    prenotazione_id UUID REFERENCES prenotazione(id),
    volo_id INTEGER REFERENCES voli(id)
);

-- Mockup Data
INSERT INTO piloti (name, surname) VALUES 
('Mario', 'Rossi'),
('Luigi', 'Verdi');

INSERT INTO aerei (modello, capienza, pilot_id) VALUES 
('Boeing 737', 180, 1),
('Airbus A320', 150, 2);

INSERT INTO aereoporti (codice_IATA, name, city, country) VALUES 
('FCO', 'Leonardo da Vinci', 'Roma', 'Italy'),
('MXP', 'Malpensa', 'Milano', 'Italy'),
('JFK', 'John F. Kennedy', 'New York', 'USA');

INSERT INTO gates (id, aereoporto_codice_IATA) VALUES 
(1, 'FCO'),
(2, 'FCO'),
(1, 'MXP');

INSERT INTO tratte (aereoporto_partenza, aereoporto_arrivo) VALUES 
('FCO', 'MXP'),
('MXP', 'JFK');

INSERT INTO voli (tratte_id, aerei_id, gates_id, aereoporto_codice_IATA, orario_partenza, orario_arrivo) VALUES 
((SELECT id FROM tratte LIMIT 1), 1, 1, 'FCO', '2026-05-20 10:00:00', '2026-05-20 11:15:00');

INSERT INTO documento (tipo, numero, scadenza) VALUES 
('Passaporto', 'AB1234567', '2030-01-01');

INSERT INTO utenti (name, surname, email, password, documento_id) VALUES 
('Luca', 'Zani', 'luca@example.com', 'password123', 1);
