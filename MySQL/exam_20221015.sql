-- Database Basics MySQL Exam - 15 October 2022

-- create database restaurant_db; use restaurant_db;

-- 01. Table Design
CREATE TABLE products (
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(30) NOT NULL UNIQUE,
type VARCHAR(30) NOT NULL,
price DECIMAL(10,2) NOT NULL
);

CREATE TABLE clients (
id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
birthdate DATE NOT NULL,
card VARCHAR(50),
review TEXT
);

CREATE TABLE `tables` (
id INT PRIMARY KEY AUTO_INCREMENT,
floor INT NOT NULL,
reserved TINYINT(1),
capacity INT NOT NULL
);

CREATE TABLE waiters (
id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL,
phone VARCHAR(50),
salary DECIMAL(10,2)
);

CREATE TABLE orders (
id INT PRIMARY KEY AUTO_INCREMENT,
table_id INT NOT NULL,
waiter_id INT NOT NULL,
order_time TIME NOT NULL,
payed_status TINYINT(1),
CONSTRAINT fk_orders_tables
	FOREIGN KEY (table_id) REFERENCES `tables`(id),
CONSTRAINT fk_orders_waiters
	FOREIGN KEY (waiter_id) REFERENCES waiters(id)
);

CREATE TABLE orders_clients (
order_id INT, client_id INT,
CONSTRAINT fk_orders_clients_orders
	FOREIGN KEY (order_id) REFERENCES orders(id),
CONSTRAINT fk_orders_clients_clients
	FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE TABLE orders_products (
order_id INT, product_id INT,
CONSTRAINT fk_orders_products_order
	FOREIGN KEY (order_id) REFERENCES orders(id),
CONSTRAINT fk_orders_products_product
	FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 02. Insert
INSERT INTO products(name, type, price)
	SELECT CONCAT_WS(' ', last_name, 'specialty'), 'Cocktail', CEIL(salary/100) 
	FROM waiters 
    WHERE id > 6;

-- 03. Update
UPDATE orders 
	SET table_id = table_id - 1 
	WHERE id >= 12 and id <= 23;

-- 04. Delete
DELETE FROM waiters w
	WHERE (
	SELECT COUNT(*) FROM orders WHERE waiter_id = w.id
    ) = 0;
    
-- 05. Clients
SELECT * FROM clients
ORDER BY birthdate DESC, id DESC;

-- 06. Birthdate
SELECT first_name, last_name, birthdate, review FROM clients
WHERE card IS NULL
AND (YEAR(birthdate) >= 1978 AND YEAR(birthdate) <= 1993)
ORDER BY last_name DESC, id
LIMIT 5;

-- 07. Accounts
SELECT 
	CONCAT(last_name, first_name, LENGTH(first_name), 'Restaurant') AS username,
	REVERSE(SUBSTRING(email, 2, 12)) AS password
	FROM waiters 
WHERE salary IS NOT NULL
ORDER BY password DESC;

-- 08. Top from menu
SELECT op.product_id id, p.name, COUNT(*) count 
	FROM orders_products op
	LEFT JOIN products p ON op.product_id = p.id
GROUP BY product_id
HAVING count >= 5
ORDER BY count DESC, p.name;

-- 09. Availability
SELECT o.table_id, t.capacity, count(*) as count_clients, 
(CASE
	WHEN t.capacity > count(*) THEN 'Free seats' 
	WHEN t.capacity = count(*) THEN 'Full' 
	ELSE 'Extra seats' END) 
as availability from tables t
JOIN orders o ON t.id = o.table_id
JOIN orders_clients oc ON o.id = oc.order_id
where floor = 1
GROUP BY o.table_id
ORDER BY o.table_id DESC;

-- 10. Extract bill
DELIMITER $$
CREATE FUNCTION udf_client_bill(full_name VARCHAR(50)) 
RETURNS DECIMAL(19,2)
DETERMINISTIC
BEGIN
RETURN (
SELECT SUM(price) bill from clients c
JOIN orders_clients oc ON c.id = oc.client_id
JOIN orders_products op ON oc.order_id = op.order_id
JOIN products p ON op.product_id = p.id
GROUP BY first_name, last_name
HAVING full_name = CONCAT_WS(' ', first_name, last_name)
);
END $$
DELIMITER ;

-- 11. Happy hour
DELIMITER $$
CREATE PROCEDURE udp_happy_hour(type VARCHAR(50))
BEGIN
	UPDATE products
	SET price = price * 0.8
	WHERE products.type = type AND price >= 10;
END $$
DELIMITER ;