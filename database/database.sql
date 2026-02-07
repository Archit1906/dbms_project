-- COLLEGE EVENT PARTICIPATION & CERTIFICATE SYSTEM
-- Database Schema and Data

-- 1. DATABASE/SCHEMA CREATION
CREATE DATABASE IF NOT EXISTS college_event_db;
USE college_event_db;

-- Table: STUDENT
CREATE TABLE IF NOT EXISTS STUDENT (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    department VARCHAR(50),
    year INT CHECK (year BETWEEN 1 AND 4)
);

-- Table: EVENT
CREATE TABLE IF NOT EXISTS EVENT (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    date DATE NOT NULL,
    organizer VARCHAR(100),
    venue VARCHAR(100)
);

-- Table: REGISTRATION
CREATE TABLE IF NOT EXISTS REGISTRATION (
    reg_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    event_id INT,
    registration_date DATE DEFAULT (CURRENT_DATE),
    participation_status VARCHAR(20) DEFAULT 'Registered' CHECK (participation_status IN ('Registered', 'Present', 'Absent')),
    FOREIGN KEY (student_id) REFERENCES STUDENT(student_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES EVENT(event_id) ON DELETE CASCADE,
    UNIQUE(student_id, event_id)
);

-- Table: CERTIFICATE
CREATE TABLE IF NOT EXISTS CERTIFICATE (
    cert_id INT PRIMARY KEY AUTO_INCREMENT,
    reg_id INT UNIQUE,
    issue_date DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (reg_id) REFERENCES REGISTRATION(reg_id) ON DELETE CASCADE
);

-- 2. SAMPLE DATA INSERTION

-- Students
INSERT IGNORE INTO STUDENT (name, email, department, year) VALUES 
('Alice Johnson', 'alice@college.edu', 'Computer Science', 3),
('Bob Smith', 'bob@college.edu', 'Mechanical', 2),
('Charlie Brown', 'charlie@college.edu', 'Electrical', 4),
('David Lee', 'david@college.edu', 'Computer Science', 1),
('Eva Green', 'eva@college.edu', 'Civil', 3);

-- Events
INSERT IGNORE INTO EVENT (title, date, organizer, venue) VALUES 
('Tech Symposium 2024', '2024-03-15', 'CS Department', 'Auditorium A'),
('Robotics Workshop', '2024-04-10', 'Robotics Club', 'Lab 2'),
('Cultural Fest', '2024-05-20', 'Student Council', 'Main Ground');

-- Registrations
INSERT IGNORE INTO REGISTRATION (student_id, event_id, participation_status) VALUES 
(1, 1, 'Present'),
(2, 1, 'Absent'),
(3, 2, 'Present'),
(4, 2, 'Registered');

-- Certificates
INSERT IGNORE INTO CERTIFICATE (reg_id) 
SELECT reg_id FROM REGISTRATION WHERE participation_status = 'Present';

-- 3. EXAMPLE QUERIES (As requested)

-- List all students who attended 'Tech Symposium 2024'
-- SELECT S.name, S.department FROM STUDENT S JOIN REGISTRATION R ON S.student_id = R.student_id JOIN EVENT E ON R.event_id = E.event_id WHERE E.title = 'Tech Symposium 2024' AND R.participation_status = 'Present';
