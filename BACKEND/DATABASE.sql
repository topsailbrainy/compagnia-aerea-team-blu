CREATE TABLE piloti (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    surname VARCHAR(50)
);

CREATE TABLE aerei (
    id SERIAL PRIMARY KEY,
    modello VARCHAR(50),
    capienza INTEGER,
    pilot_id INTEGER REFERENCES piloti(id) ON DELETE CASCADE
);

CREATE TABLE aereoporti (
    codice_IATA VARCHAR(3) PRIMARY KEY,
    name VARCHAR(50),
    city VARCHAR(50),
    country VARCHAR(50)
);

CREATE TABLE gates (
    id SERIAL,
    aereoporto_codice_IATA VARCHAR(3) REFERENCES aereoporti(codice_IATA) ON DELETE CASCADE,
    PRIMARY KEY (id, aereoporto_codice_IATA)
);

CREATE TABLE tratte (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    aereoporto_partenza VARCHAR(3) REFERENCES aereoporti(codice_IATA) ON DELETE CASCADE,
    aereoporto_arrivo VARCHAR(3) REFERENCES aereoporti(codice_IATA) ON DELETE CASCADE,
    prezzo NUMERIC
);

CREATE TABLE voli (
    id SERIAL PRIMARY KEY,
    tratte_id UUID REFERENCES tratte(id) ON DELETE CASCADE,
    aerei_id INTEGER REFERENCES aerei(id) ON DELETE CASCADE,
    gates_id INTEGER,
    data_partenza DATE,
    data_arrivo DATE,
    aereoporto_codice_IATA VARCHAR(3),
    orario_partenza TIME,
    orario_arrivo TIME,
    FOREIGN KEY (gates_id, aereoporto_codice_IATA) REFERENCES gates(id, aereoporto_codice_IATA) ON DELETE CASCADE
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
    documento_id INTEGER REFERENCES documento(id) ON DELETE CASCADE,
    card_id INTEGER REFERENCES card(id) ON DELETE CASCADE ,
    admin BOOLEAN
);

CREATE TABLE prenotazione(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES utenti(id) ON DELETE CASCADE
);

CREATE TABLE biglietto(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    prenotazione_id UUID REFERENCES prenotazione(id) ON DELETE CASCADE,
    volo_id INTEGER REFERENCES voli(id) ON DELETE CASCADE
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
(1, 'MXP'),
(2, 'MXP');

INSERT INTO tratte (aereoporto_partenza, aereoporto_arrivo, prezzo) VALUES 
('FCO', 'MXP', 100),
('MXP', 'JFK', 200);

INSERT INTO voli (tratte_id, aerei_id, gates_id, aereoporto_codice_IATA, data_partenza, data_arrivo, orario_partenza, orario_arrivo) VALUES 
((SELECT id FROM tratte LIMIT 1), 1, 1, 'FCO', '2026-05-20', '2026-05-20', '10:00:00', '11:15:00'),
((SELECT id FROM tratte LIMIT 1), 2, 2, 'FCO', '2026-06-15', '2026-06-15', '08:00:00', '10:30:00'),
((SELECT id FROM tratte LIMIT 1), 1, 1, 'MXP', '2026-07-10', '2026-07-10', '14:00:00', '22:00:00'),
((SELECT id FROM tratte LIMIT 1), 2, 2, 'MXP', '2026-08-05', '2026-08-05', '09:00:00', '10:45:00')
;

INSERT INTO documento (tipo, numero, scadenza) VALUES 
('Passaporto', 'AB1234567', '2030-01-01');


-- Additional Mockup Data
INSERT INTO piloti (name, surname) VALUES 
('Giovanni', 'Bianchi'),
('Anna', 'Neri'),
('Paolo', 'Bruni');

INSERT INTO aerei (modello, capienza, pilot_id) VALUES 
('Boeing 787', 250, 3),
('Airbus A350', 300, 4),
('Boeing 747', 400, 5);

INSERT INTO aereoporti (codice_IATA, name, city, country) VALUES 
('LHR', 'Heathrow', 'London', 'UK'),
('CDG', 'Charles de Gaulle', 'Paris', 'France'),
('FRA', 'Frankfurt Airport', 'Frankfurt', 'Germany'),
('MAD', 'Adolfo Suárez Madrid-Barajas', 'Madrid', 'Spain'),
('AMS', 'Schiphol', 'Amsterdam', 'Netherlands'),
('DXB', 'Dubai International', 'Dubai', 'UAE'),
('NRT', 'Narita', 'Tokyo', 'Japan'),
('SYD', 'Kingsford Smith', 'Sydney', 'Australia'),
('BCN', 'El Prat', 'Barcelona', 'Spain');

INSERT INTO gates (id, aereoporto_codice_IATA) VALUES 
(1, 'LHR'),
(2, 'LHR'),
(1, 'CDG'),
(2, 'CDG'),
(1, 'FRA'),
(1, 'MAD'),
(1, 'AMS'),
(2, 'AMS'),
(1, 'DXB'),
(1, 'NRT'),
(1, 'SYD'),
(1, 'BCN');

INSERT INTO tratte (aereoporto_partenza, aereoporto_arrivo, prezzo) VALUES 
('FCO', 'LHR', 100),
('LHR', 'JFK', 200),
('CDG', 'FRA', 300),
('FRA', 'FCO', 400),
('MAD', 'FCO', 100),
('MXP', 'CDG', 100),
('FCO', 'AMS', 100),
('AMS', 'DXB', 250),
('DXB', 'NRT', 200),
('NRT', 'SYD', 100),
('JFK', 'LHR', 200),
('CDG', 'BCN', 300),
('BCN', 'MAD', 100);

INSERT INTO voli (tratte_id, aerei_id, gates_id, aereoporto_codice_IATA, data_partenza, data_arrivo, orario_partenza, orario_arrivo) VALUES 
((SELECT id FROM tratte WHERE aereoporto_partenza = 'FCO' AND aereoporto_arrivo = 'LHR' LIMIT 1), 2, 2, 'FCO', '2026-06-15', '2026-06-15','08:00:00','10:30:00'),
((SELECT id FROM tratte WHERE aereoporto_partenza = 'MXP' AND aereoporto_arrivo = 'JFK' LIMIT 1), 3, 1, 'MXP', '2026-07-10', '2026-07-10', '14:00:00', '22:00:00'),
((SELECT id FROM tratte WHERE aereoporto_partenza = 'CDG' AND aereoporto_arrivo = 'FRA' LIMIT 1), 4, 1, 'CDG', '2026-08-05', '2026-08-05', '09:00:00', '10:45:00');

INSERT INTO card (tipo, numero, scadenza, cvv, nome, cognome) VALUES 
('Visa', '1234567890', '2028-12-31', '123', 'Luca', 'Zani'),
('Mastercard', '0987654321', '2027-06-30', '456', 'Paola', 'Bruni');

INSERT INTO documento (tipo, numero, scadenza) VALUES 
('Carta Identità', 'CA98765ZZ', '2031-05-20');

INSERT INTO utenti (name, surname, email, password, documento_id, card_id, admin) VALUES 
('Paola', 'Bruni', 'paola@example.com', 'securepass', 2, 2, false),
('Luca', 'Zotto', 'luca@example.com', 'securepass', 1, 1, true),
('Giuseppe', 'Verdi', 'giuseppe@example.com', 'securepass', 1, 1, false);

-- Update existing user to link card
UPDATE utenti SET card_id = 1 WHERE email = 'luca@example.com';
