-- Database Basics MySQL Exam - 11 December 2022

create database airlines_db;
use airlines_db;

-- 01. Table Design
-- 26/40 score
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
    id                  iNT PRIMARY KEY AUTO_INCREMENT,
    flight_code         VARCHAR(30) NOT NULL UNIQUE,
    departure_country   INT         NOT NULL,
    destination_country INT         NOT NULL,
    airplane_id         INT         NOT NULL,
    has_delay           TINYINT(1),
    departure           DATETIME,

    CONSTRAINT fk_flights_countries_departure
        FOREIGN KEY (departure_country) REFERENCES countries (id),
    CONSTRAINT fk_flights_countries_destination
        FOREIGN KEY (destination_country) REFERENCES countries (id)
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
