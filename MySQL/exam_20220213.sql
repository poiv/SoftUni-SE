-- Database Basics MySQL Exam - 13 February 2022

-- create database online_store; use online_store;

-- 01. Table Design
CREATE TABLE brands
(
    id   INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL UNIQUE
);

CREATE TABLE categories
(
    id   INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL UNIQUE
);

CREATE TABLE reviews
(
    id           INT PRIMARY KEY AUTO_INCREMENT,
    content      text,
    rating       DECIMAL(10, 2) NOT NULL,
    picture_url  VARCHAR(80)    NOT NULL,
    published_at DATETIME       NOT NULL
);

CREATE TABLE products
(
    id                INT PRIMARY KEY AUTO_INCREMENT,
    name              VARCHAR(40)    NOT NULL,
    price             DECIMAL(19, 2) NOT NULL,
    quantity_in_stock INT,
    description       text,
    brand_id          INT            NOT NULL,
    category_id       INT            NOT NULL,
    review_id         INT,
    CONSTRAINT fk_products_brands
        FOREIGN KEY (brand_id) REFERENCES brands (id),
    CONSTRAINT fk_products_categories
        FOREIGN KEY (category_id) REFERENCES categories (id),
    CONSTRAINT fk_products_reviews
        FOREIGN KEY (review_id) REFERENCES reviews (id)
);

CREATE TABLE customers
(
    id            INT PRIMARY KEY AUTO_INCREMENT,
    first_name    VARCHAR(20) NOT NULL,
    last_name     VARCHAR(20) NOT NULL,
    phone         VARCHAR(30) NOT NULL UNIQUE,
    address       VARCHAR(60) NOT NULL,
    discount_card bit(1)      NOT NULL DEFAULT FALSE
);

CREATE TABLE orders
(
    id             INT PRIMARY KEY AUTO_INCREMENT,
    order_datetime DATETIME NOT NULL,
    customer_id    INT      NOT NULL,
    CONSTRAINT fk_orders_customers
        FOREIGN KEY (customer_id) REFERENCES customers (id)
);

CREATE TABLE orders_products
(
    order_id   INT,
    product_id INT,
    CONSTRAINT fk_orders_products_orders
        FOREIGN KEY (order_id) REFERENCES orders (id),
    CONSTRAINT fk_orders_products_products
        FOREIGN KEY (product_id) REFERENCES products (id)
);

-- 02. Insert
INSERT INTO reviews(`content`, `picture_url`, `published_at`, `rating`)
SELECT LEFT(`description`, 15),
       REVERSE(`name`),
       '2010-10-10',
       ROUND(`price` / 8, 2)
FROM `products`
WHERE `id` >= 5;

-- 03. Update
UPDATE products
SET quantity_in_stock = quantity_in_stock - 5
WHERE quantity_in_stock >= 60
  AND quantity_in_stock <= 70;

-- 04. Delete
DELETE
FROM customers c
WHERE (SELECT COUNT(*)
       FROM orders
       WHERE customer_id = c.id) = 0;

-- 05. Categories
SELECT *
FROM categories
ORDER BY name DESC;

-- 06. Quantity
SELECT id product_id, brand_id, name, quantity_in_stock quantity
FROM products
WHERE price > 1000
  AND quantity_in_stock < 30
ORDER BY quantity_in_stock, id;

-- 07. Review
SELECT id, content, rating, picture_url, published_at
FROM reviews
WHERE content LIKE 'My%'
  AND LENGTH(content) > 61
ORDER BY rating DESC;

-- 08. First customers
SELECT CONCAT_WS(' ', first_name, last_name) full_name,
       c.address,
       o.order_datetime                      order_date
FROM customers c
         JOIN orders o ON c.id = o.customer_id
WHERE YEAR(o.order_datetime) <= 2018
ORDER BY full_name DESC;

-- 09. Best categories
SELECT COUNT(*) items_count, c.name, SUM(quantity_in_stock) total_quantity
FROM categories c
         JOIN products p ON c.id = p.category_id
GROUP BY c.id
ORDER BY items_count DESC, total_quantity
LIMIT 5;

-- 10. Extract client cards count
DELIMITER $$
CREATE FUNCTION udf_customer_products_count(name VARCHAR(50))
    RETURNS INT
    DETERMINISTIC
BEGIN
    RETURN (SELECT COUNT(*)
            FROM customers c
                     JOIN orders o ON c.id = o.customer_id
                     JOIN orders_products op ON o.id = op.order_id
            WHERE first_name = name
            GROUP BY c.id);
END $$
DELIMITER ;

-- 11. Reduce price
DELIMITER $$
CREATE PROCEDURE udp_reduce_price(category_name VARCHAR(50))
BEGIN
    UPDATE products p
        JOIN categories c ON p.category_id = c.id
        JOIN reviews r ON r.id = p.review_id
    SET p.price = p.price * 0.7
    WHERE r.rating < 4
      AND c.name = category_name;

END $$
DELIMITER ;