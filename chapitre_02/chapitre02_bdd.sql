CREATE TABLE `students` (  
  `id` int UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR (30),
  `city` VARCHAR (30)
  )

INSERT INTO students (name, city)
VALUES
('Véronique', 'Paris'),
('Steeven', 'Lyon'),
('Marc', 'Marseille'),
('Nour', 'Lyon'),
('Romain', 'Paris'),
('Sophie', 'Paris')

SELECT id, name "prénom", city "nom de la ville"
FROM students

CREATE TABLE `languages` (  
  `id` int UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR (30)
)

INSERT INTO languages (name)
VALUES
("French"),
("English"),
("German"),
("Spanish"),
("Mandarin")

SELECT id, name "langues"
FROM languages

CREATE TABLE `favorites` (  
  `id` int UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `class` VARCHAR (30),
  `sport` VARCHAR (30),
  `students_id` INT UNSIGNED NOT NULL
)

INSERT INTO favorites (class, sport, students_id)
VALUES
("Maths", "Cricket", 2),
("Music", "Hip-Hop", 6),
("Arts", "Boxing", 1),
("Literature", "Tennis", 3),
("Computer science", "Tennis", 5),
("Arts", "Baseball", 4)


SELECT id, class "Class", sport "Sport", students_id "Student ID"
FROM favorites


CREATE TABLE `student_languages` (  
  `id` int UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `students_id` INT UNSIGNED NOT NULL,
  `language_id` INT UNSIGNED NOT NULL,
  `title` VARCHAR (30) NOT NULL 
) 

INSERT INTO student_languages (students_id, language_id, title)
VALUES
(1, 1, ""),
(1, 2, ""),
(2, 1, ""),
(2, 3, ""),
(3, 1, ""),
(4, 1, ""),
(4, 2, ""),
(4, 4, ""),
(4, 5, ""),
(5, 1, ""),
(5, 5, ""),
(6, 1, ""),
(6, 2, ""),
(6, 3, "")

SELECT id, students_id "Student ID", language_id "Language ID", title "Title"
FROM student_languages

-- Rapport LVL1
SELECT * from students where id = 3;
SELECT * from students where id = 6;
SELECT name, city FROM students where id = 1;
SELECT name from students where id = 2;
SELECT * from students where city = "Paris";
SELECT name from students where city = "Lyon";

-- Rapport LVL2

SELECT s.id, s.name, s.city, f.class, f.sport, f.students_id
from students s INNER JOIN favorites f ON s.id = f.students_id
WHERE s.id = 5;

SELECT s.name, f.sport 
from students s inner join favorites f on s.id = f.students_id
where s.id = 4;

SELECT s.name, f.class 
from students s inner join favorites f on s.id = f.students_id
where s.id = 1;

SELECT * 
from students s INNER join favorites f on s.id = f.students_id 
WHERE class = "Music";

select s.name 
FROM students s INNER join favorites f on s.id = f.students_id 
where sport = "Tennis";

select s.name 
FROM students s INNER join favorites f on s.id = f.students_id 
where class = "Arts";

SELECT count (name) 
FROM students s INNER join favorites f on s.id = f.students_id 
where city = "Paris";

-- Rapport LVL3


SELECT l.name as "Langue", s.id as "student ID", s.name as "Student" ,s.city as "City"
FROM students s
INNER JOIN student_languages sl on s.id = sl.students_id
INNER JOIN languages l ON l.id = sl.language_id
WHERE s.id = 1;

--  les 2 en commentaire ne fonctionnent pas pourtant la logique est bonne

-- SELECT s.*, l.name
-- FROM students s
-- inner JOIN student_languages sl on s.id = sl.language_id 
-- INNER join languages l on s.id = sl.language_id 
-- where s.id = 1;

-- ou

-- SELECT l.name, s.*
-- FROM languages l
-- inner JOIN student_languages sl on l.id = sl.language_id
-- INNER join students s on s.id = sl.language_id
-- where s.id = 1; 

SELECT l.name as "Langue", s.id as "student ID", s.name as "Student" ,s.city as "City"
FROM students s
INNER JOIN student_languages sl on s.id = sl.students_id
INNER JOIN languages l ON l.id = sl.language_id
WHERE s.id = 4;


SELECT l.*, s.id "id student", s.name
FROM students s
INNER JOIN student_languages sl on s.id = sl.students_id
INNER JOIN languages l ON l.id = sl.language_id
WHERE s.id = 5;


SELECT s.name "Student name", count (l.name) "Language name"       /*l.*, s.id "id student", s.name */
FROM students s
INNER JOIN student_languages sl on s.id = sl.students_id
INNER JOIN languages l ON l.id = sl.language_id
group by s.name;


-- BONUS

SELECT name FROM students WHERE name LIKE '%e%'

SELECT name, sport FROM students JOIN favorites ON students.id = favorites.student_id WHERE name LIKE '%e%'

SELECT name, class, city FROM students JOIN favorites ON students.id = favorites.student_id WHERE city LIKE '%i%'