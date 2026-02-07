-- Database Creation
CREATE DATABASE IF NOT EXISTS college_event_db;
USE college_event_db;

-- 1. Table: STUDENT
CREATE TABLE STUDENT (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    department VARCHAR(50),
    year INT CHECK (year BETWEEN 1 AND 4)
);

-- 2. Table: EVENT
CREATE TABLE EVENT (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    date DATE NOT NULL,
    organizer VARCHAR(100),
    venue VARCHAR(100)
);

-- 3. Table: REGISTRATION
CREATE TABLE REGISTRATION (
    reg_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    event_id INT,
    registration_date DATE DEFAULT (CURRENT_DATE),
    participation_status VARCHAR(20) DEFAULT 'Registered' CHECK (participation_status IN ('Registered', 'Present', 'Absent')),
    FOREIGN KEY (student_id) REFERENCES STUDENT(student_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES EVENT(event_id) ON DELETE CASCADE,
    UNIQUE(student_id, event_id) -- Prevent duplicate registration for same event
);

-- 4. Table: CERTIFICATE
CREATE TABLE CERTIFICATE (
    cert_id INT PRIMARY KEY AUTO_INCREMENT,
    reg_id INT UNIQUE, -- One certificate per registration
    issue_date DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (reg_id) REFERENCES REGISTRATION(reg_id) ON DELETE CASCADE
);
