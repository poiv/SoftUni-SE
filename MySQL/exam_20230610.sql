-- Database Basics MySQL Exam - 10 June 2023

-- create database universities_db; use universities_db;

-- 01. Table Design
CREATE TABLE countries
(
    id   INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL UNIQUE
);

CREATE TABLE cities
(
    id         INT PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(40) NOT NULL UNIQUE,
    population INT,
    country_id INT         NOT NULL,
    CONSTRAINT fk_cities_countries
        FOREIGN KEY (country_id) REFERENCES countries (id)
);

CREATE TABLE universities
(
    id              INT PRIMARY KEY AUTO_INCREMENT,
    name            VARCHAR(60)    NOT NULL UNIQUE,
    address         VARCHAR(80)    NOT NULL UNIQUE,
    tuition_fee     DECIMAL(19, 2) NOT NULL,
    number_of_staff INT,
    city_id         INT,
    CONSTRAINT fk_universities_cities
        FOREIGN KEY (city_id) REFERENCES cities (id)
);

CREATE TABLE students
(
    id           INT PRIMARY KEY AUTO_INCREMENT,
    first_name   VARCHAR(40)  NOT NULL,
    last_name    VARCHAR(40)  NOT NULL,
    age          INT,
    phone        VARCHAR(20)  NOT NULL UNIQUE,
    email        VARCHAR(255) NOT NULL UNIQUE,
    is_graduated TINYINT(1)   NOT NULL,
    city_id      INT,
    CONSTRAINT fk_students_cities
        FOREIGN KEY (city_id) REFERENCES cities (id)
);

CREATE TABLE courses
(
    id             INT PRIMARY KEY AUTO_INCREMENT,
    name           VARCHAR(40) NOT NULL UNIQUE,
    duration_hours DECIMAL(19, 2),
    start_date     DATE,
    teacher_name   VARCHAR(60) NOT NULL UNIQUE,
    description    TEXT,
    university_id  INT,
    CONSTRAINT fk_courses_universities
        FOREIGN KEY (university_id) REFERENCES universities (id)
);

CREATE TABLE students_courses
(
    grade      DECIMAL(19, 2) NOT NULL,
    student_id INT            NOT NULL,
    course_id  INT            NOT NULL,
    CONSTRAINT fk_students_courses_students
        FOREIGN KEY (student_id) REFERENCES students (id),
    CONSTRAINT fk_students_courses_courses
        FOREIGN KEY (course_id) REFERENCES courses (id)
);

-- 02. Insert
INSERT INTO courses(name, duration_hours, start_date, teacher_name, description, university_id)
SELECT CONCAT_WS(' ', teacher_name, 'course'),
       LENGTH(name) / 10,
       DATE(start_date + 5),
       REVERSE(teacher_name),
       CONCAT('Course ', teacher_name, REVERSE(description)),
       DAY(start_date)
FROM courses
WHERE id <= 5;

-- 03. Update
UPDATE universities
SET tuition_fee = tuition_fee + 300
WHERE id >= 5
  AND id <= 12;

-- 04. Delete
DELETE
FROM universities
WHERE number_of_staff IS NULL;

-- 05. Cities
SELECT id, name, population, country_id
FROM cities
ORDER BY population DESC;

-- 06. Students age
SELECT first_name, last_name, age, phone, email
FROM students
WHERE age >= 21
ORDER BY first_name DESC, email, id
LIMIT 10;

-- 07. New students
SELECT CONCAT_WS(' ', first_name, last_name) full_name,
       SUBSTRING(email, 2, 10)               username,
       REVERSE(phone)                        password
FROM students s
         LEFT JOIN students_courses sc ON s.id = sc.student_id
WHERE sc.student_id IS NULL
ORDER BY password DESC;

-- 08. Students count
SELECT COUNT(*) students_count, u.name
FROM universities u
         JOIN courses c ON u.id = c.university_id
         JOIN students_courses sc ON sc.course_id = c.id
GROUP BY c.university_id
HAVING students_count >= 8
ORDER BY students_count DESC, u.name DESC;

-- 09. Price rankings
SELECT u.name university_name,
       c.name city_name,
       u.address,
       (CASE
            WHEN u.tuition_fee < 800 THEN 'cheap'
            WHEN (u.tuition_fee >= 800 AND u.tuition_fee < 1200) THEN 'normal'
            WHEN (u.tuition_fee >= 1200 AND u.tuition_fee < 2500) THEN 'high'
            ELSE 'expensive' END
           )  price_rank,
       u.tuition_fee
FROM universities u
         JOIN cities c ON u.city_id = c.id
GROUP by u.id
ORDER BY u.tuition_fee;

-- 10. Average grades
DELIMITER $$
CREATE FUNCTION udf_average_alumni_grade_by_course_name(course_name VARCHAR(60))
    RETURNS DECIMAL(3, 2)
BEGIN
    RETURN (SELECT AVG(grade) average_alumni_grade
            FROM courses c
                     JOIN students_courses sc ON c.id = sc.course_id
                     JOIN students s ON s.id = sc.student_id
            WHERE c.name = course_name
              AND s.is_graduated
            GROUP BY c.id);
END $$
DELIMITER ;

-- 11. Graduate students
DELIMITER $$
CREATE PROCEDURE udp_graduate_all_students_by_year(year_started INT)
BEGIN
    UPDATE students s
        JOIN students_courses sc ON s.id = sc.student_id
        JOIN courses c ON sc.course_id = c.id
    SET s.is_graduated = 1
    WHERE YEAR(c.start_date) = year_started;

END $$
DELIMITER ;