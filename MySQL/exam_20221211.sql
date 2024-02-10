-- Database Basics MySQL Exam - 11 December 2022

create database airlines_db;
use airlines_db;

-- 01. Table Design
CREATE TABLE countries
(
    id          INT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(30) NOT NULL UNIQUE,
    description TEXT,
    currency    VARCHAR(5)  NOT NULL
);

CREATE TABLE airplanes
(
    id                  INT PRIMARY KEY AUTO_INCREMENT,
    model               VARCHAR(50)    NOT NULL UNIQUE,
    passengers_capacity INT            NOT NULL,
    tank_capacity       DECIMAL(19, 2) NOT NULL,
    cost                DECIMAL(19, 2) NOT NULL
);

CREATE TABLE passengers
(
    id         INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name  VARCHAR(30) NOT NULL,
    country_id INT         NOT NULL,

    CONSTRAINT fk_passengers_countries
        FOREIGN KEY (country_id) REFERENCES countries (id)
);

CREATE TABLE flights
(
    id                  INT PRIMARY KEY AUTO_INCREMENT,
    flight_code         VARCHAR(30) NOT NULL UNIQUE,
    departure_country   INT         NOT NULL,
    destination_country INT         NOT NULL,
    airplane_id         INT         NOT NULL,
    has_delay           TINYINT(1),
    departure           DATETIME,

    CONSTRAINT fk_flights_countries_departure
        FOREIGN KEY (departure_country) REFERENCES countries (id),
    CONSTRAINT fk_flights_countries_destination
        FOREIGN KEY (destination_country) REFERENCES countries (id),
    CONSTRAINT fk_flights_airplanes
        FOREIGN KEY (airplane_id) REFERENCES airplanes (id)
);

CREATE TABLE flights_passengers
(
    flight_id    INT,
    passenger_id INT,
    CONSTRAINT fk_flights_passengers_flights
        FOREIGN KEY (flight_id) REFERENCES flights (id),
    CONSTRAINT fk_flights_passengers_passengers
        FOREIGN KEY (passenger_id) REFERENCES passengers (id)
);

-- 2. Insert
INSERT INTO airplanes(model, passengers_capacity, tank_capacity, cost)
SELECT CONCAT(REVERSE(first_name), 797),
       LENGTH(last_name) * 17,
       id * 790,
       LENGTH(first_name) * 50.6
FROM passengers
WHERE id <= 5;

-- 3. Update
UPDATE flights
    INNER JOIN countries ON flights.departure_country = countries.id
SET airplane_id = flights.airplane_id + 1
WHERE countries.name like 'Armenia';

-- 4. Delete FIXME
DELETE
FROM flights
WHERE id NOT IN (SELECT passenger_id FROM flights_passengers);

-- 5. Airplanes
SELECT *
FROM airplanes
ORDER BY cost desc, id desc;

-- 6. Flights from 2022
SELECT flight_code, departure_country, airplane_id, departure
FROM flights
WHERE YEAR(departure) = 2022
ORDER BY airplane_id, flight_code
LIMIT 20;

-- 7. Private flights
SELECT CONCAT(UPPER(LEFT(p.last_name, 2)), p.country_id) flight_code,
       CONCAT_WS(' ', p.first_name, p.last_name)         full_name,
       p.country_id
FROM passengers p
         LEFT JOIN flights_passengers fp on p.id = fp.passenger_id
WHERE fp.flight_id iS NULL
ORDER BY p.country_id;

-- 8. Leading destination FIXME
SELECT *
FROM countries c
         JOIN flights f on c.id = f.destination_country;