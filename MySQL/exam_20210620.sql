-- Database Basics MySQL Exam - 20 June 2021

-- create database stc; use stc;

-- 1. Table Design

CREATE TABLE addresses (
`id` INT PRIMARY KEY AUTO_INCREMENT,
`name` VARCHAR(100) NOT NULL
);

CREATE TABLE clients (
`id` INT PRIMARY KEY AUTO_INCREMENT,
`full_name` VARCHAR(50) NOT NULL,
`phone_number` VARCHAR(20) NOT NULL
);

CREATE TABLE drivers (
`id` INT PRIMARY KEY AUTO_INCREMENT,
`first_name` VARCHAR(30) NOT NULL,
`last_name` VARCHAR(30) NOT NULL,
`age` INT NOT NULL,
`rating` FLOAT DEFAULT 5.5
);

CREATE TABLE categories (
`id` INT PRIMARY KEY AUTO_INCREMENT,
`name` VARCHAR(10) NOT NULL
);



CREATE TABLE cars (
`id` INT PRIMARY KEY AUTO_INCREMENT,
`make` VARCHAR(20) NOT NULL,
`model` VARCHAR(20),
`year` INT NOT NULL DEFAULT 0,
`mileage` INT DEFAULT 0,
`condition` CHAR(1) NOT NULL,
`category_id` INT NOT NULL,
CONSTRAINT fk_cars_categories
FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE courses (
`id` INT PRIMARY KEY AUTO_INCREMENT,
`from_address_id` INT NOT NULL,
`start` DATETIME NOT NULL,
`car_id` INT NOT NULL,
`client_id` INT NOT NULL,
`bill` DECIMAL(10,2) DEFAULT 10,
CONSTRAINT fk_courses_addresses
FOREIGN KEY (from_address_id) REFERENCES addresses(id),
CONSTRAINT fk_courses_cars
FOREIGN KEY (car_id) REFERENCES cars(id),
CONSTRAINT fk_courses_clients
FOREIGN KEY (client_id) REFERENCES clients(id)
);


CREATE TABLE cars_drivers (
`car_id` INT NOT NULL,
`driver_id` INT NOT NULL,
CONSTRAINT fk_cars_drivers_cars
FOREIGN KEY (car_id) REFERENCES cars(id),
CONSTRAINT fk_cars_drivers_drivers
FOREIGN KEY (driver_id) REFERENCES drivers(id),
PRIMARY KEY (car_id, driver_id)
);

-- 02. Insert

INSERT INTO clients(full_name, phone_number)
SELECT 
CONCAT(first_name, ' ', last_name) full_name, 
CONCAT('(088) 9999', id*2) phone_number
FROM drivers
WHERE id >= 10 AND id <= 20;

-- 03. Update

UPDATE cars
SET cars.condition = 'C'
WHERE (mileage > 800000 AND cars.year > 2010) OR NOT(make = 'Mercedes-Benz');

-- 04. Delete

DELETE FROM clients
WHERE (
SELECT COUNT(*) FROM courses 
WHERE courses.client_id = clients.id 
AND length(full_name) > 3
)=0;

-- 05. Cars

SELECT make, model, `condition` FROM cars
ORDER BY id;

-- 06. Drivers and Cars

SELECT first_name, last_name, make, model, mileage FROM drivers
JOIN cars_drivers ON cars_drivers.driver_id = drivers.id
JOIN cars ON cars.id = cars_drivers.car_id
WHERE cars.mileage IS NOT NULL
ORDER BY mileage DESC, first_name;
