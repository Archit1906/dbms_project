-- seed.sql
USE college_events_db;

-- Clear previous data
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE Certificates;
TRUNCATE TABLE Waitlist;
TRUNCATE TABLE Registrations;
TRUNCATE TABLE Events;
TRUNCATE TABLE Students;
TRUNCATE TABLE Users;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Insert Admin & Students
-- Passwords are all 'password123'
INSERT INTO Users (email, password_hash, role) VALUES
('admin@college.edu', '$2b$12$UAo6dr2B3ePL2bcV9C29hehiwlQIuq/z9vWw/yPLwrtk5rJgI2cMm', 'Admin'),
('alice.smith@college.edu', '$2b$12$UAo6dr2B3ePL2bcV9C29hehiwlQIuq/z9vWw/yPLwrtk5rJgI2cMm', 'Student'),
('bob.johnson@college.edu', '$2b$12$UAo6dr2B3ePL2bcV9C29hehiwlQIuq/z9vWw/yPLwrtk5rJgI2cMm', 'Student'),
('charlie.brown@college.edu', '$2b$12$UAo6dr2B3ePL2bcV9C29hehiwlQIuq/z9vWw/yPLwrtk5rJgI2cMm', 'Student'),
('diana.prince@college.edu', '$2b$12$UAo6dr2B3ePL2bcV9C29hehiwlQIuq/z9vWw/yPLwrtk5rJgI2cMm', 'Student'),
('evan.wright@college.edu', '$2b$12$UAo6dr2B3ePL2bcV9C29hehiwlQIuq/z9vWw/yPLwrtk5rJgI2cMm', 'Student'),
('fiona.g@college.edu', '$2b$12$UAo6dr2B3ePL2bcV9C29hehiwlQIuq/z9vWw/yPLwrtk5rJgI2cMm', 'Student'),
('george.m@college.edu', '$2b$12$UAo6dr2B3ePL2bcV9C29hehiwlQIuq/z9vWw/yPLwrtk5rJgI2cMm', 'Student'),
('hannah.a@college.edu', '$2b$12$UAo6dr2B3ePL2bcV9C29hehiwlQIuq/z9vWw/yPLwrtk5rJgI2cMm', 'Student'),
('ian.s@college.edu', '$2b$12$UAo6dr2B3ePL2bcV9C29hehiwlQIuq/z9vWw/yPLwrtk5rJgI2cMm', 'Student'),
('jane.doe@college.edu', '$2b$12$UAo6dr2B3ePL2bcV9C29hehiwlQIuq/z9vWw/yPLwrtk5rJgI2cMm', 'Student'),
('kevin.t@college.edu', '$2b$12$UAo6dr2B3ePL2bcV9C29hehiwlQIuq/z9vWw/yPLwrtk5rJgI2cMm', 'Student'),
('laura.p@college.edu', '$2b$12$UAo6dr2B3ePL2bcV9C29hehiwlQIuq/z9vWw/yPLwrtk5rJgI2cMm', 'Student'),
('michael.s@college.edu', '$2b$12$UAo6dr2B3ePL2bcV9C29hehiwlQIuq/z9vWw/yPLwrtk5rJgI2cMm', 'Student'),
('nancy.w@college.edu', '$2b$12$UAo6dr2B3ePL2bcV9C29hehiwlQIuq/z9vWw/yPLwrtk5rJgI2cMm', 'Student'),
('oliver.q@college.edu', '$2b$12$UAo6dr2B3ePL2bcV9C29hehiwlQIuq/z9vWw/yPLwrtk5rJgI2cMm', 'Student'),
('pam.b@college.edu', '$2b$12$UAo6dr2B3ePL2bcV9C29hehiwlQIuq/z9vWw/yPLwrtk5rJgI2cMm', 'Student'),
('quinn.f@college.edu', '$2b$12$UAo6dr2B3ePL2bcV9C29hehiwlQIuq/z9vWw/yPLwrtk5rJgI2cMm', 'Student'),
('rachel.g@college.edu', '$2b$12$UAo6dr2B3ePL2bcV9C29hehiwlQIuq/z9vWw/yPLwrtk5rJgI2cMm', 'Student'),
('steve.h@college.edu', '$2b$12$UAo6dr2B3ePL2bcV9C29hehiwlQIuq/z9vWw/yPLwrtk5rJgI2cMm', 'Student'),
('tony.s@college.edu', '$2b$12$UAo6dr2B3ePL2bcV9C29hehiwlQIuq/z9vWw/yPLwrtk5rJgI2cMm', 'Student');

INSERT INTO Students (user_id, name, department, year) VALUES
(2, 'Alice Smith', 'Computer Science', 3),
(3, 'Bob Johnson', 'Electrical Engineering', 2),
(4, 'Charlie Brown', 'Mechanical Engineering', 1),
(5, 'Diana Prince', 'Computer Science', 4),
(6, 'Evan Wright', 'Information Technology', 2),
(7, 'Fiona Gallagher', 'Data Science', 3),
(8, 'George Martin', 'Cybersecurity', 4),
(9, 'Hannah Abbott', 'Computer Science', 1),
(10, 'Ian Somerhalder', 'Electrical Engineering', 3),
(11, 'Jane Doe', 'Mechanical Engineering', 2),
(12, 'Kevin Tran', 'Data Science', 2),
(13, 'Laura Palmer', 'Information Technology', 4),
(14, 'Michael Scott', 'Business Tech', 3),
(15, 'Nancy Wheeler', 'Computer Science', 2),
(16, 'Oliver Queen', 'Cybersecurity', 1),
(17, 'Pam Beesly', 'Business Tech', 2),
(18, 'Quinn Fabray', 'Data Science', 4),
(19, 'Rachel Green', 'Information Technology', 3),
(20, 'Steve Harrington', 'Electrical Engineering', 4),
(21, 'Tony Stark', 'Mechanical Engineering', 5);

-- 2. Insert 10 Events
INSERT INTO Events (title, description, date, venue, max_participants, category) VALUES
('Tech Symposium 2026', 'Annual college technology symposium covering AI and web trends.', '2026-05-15 10:00:00', 'Main Auditorium', 250, 'Technical'),
('Hackathon: Code for Good', '24-hour hackathon focused on sustainability.', '2026-06-10 10:00:00', 'Library Block B', 100, 'Technical'),
('AI & Machine Learning Workshop', 'Hands-on session using Python for predictive modeling.', '2026-04-20 14:00:00', 'Lab 401', 50, 'Technical'),
('Cybersecurity Seminar', 'Guest lecture from industry experts on zero-trust networks.', '2026-04-25 11:00:00', 'Hall C', 80, 'Technical'),
('Web3 & Blockchain Basics', 'Introduction to decentralized apps and smart contracts.', '2026-05-02 15:00:00', 'Room 203', 60, 'Technical'),
('Robotics Expo', 'Showcase of student built robotic systems and drones.', '2026-07-12 09:00:00', 'Campus Square', 300, 'Technical'),
('UI/UX Design Masterclass', 'Principles of modern Glassmorphism and tailored digital experiences.', '2026-05-20 14:00:00', 'Art Studio 2', 40, 'Other'),
('Cloud Computing Demystified', 'AWS vs Azure vs GCP architecture deep dive.', '2026-06-05 10:00:00', 'Virtual/Online', 500, 'Technical'),
('Career Fair 2026', 'Networking event with over 50 top tech recruiters.', '2026-08-01 09:00:00', 'Indoor Stadium', 1000, 'Other'),
('Alumni Tech Panel', 'Recent graduates share their journey to Big N companies.', '2026-04-30 16:00:00', 'Main Auditorium', 200, 'Other');

-- 3. Insert Registrations
INSERT INTO Registrations (student_id, event_id, status) VALUES
(1, 1, 'Registered'),
(2, 1, 'Registered'),
(3, 1, 'Registered'),
(4, 2, 'Registered'),
(5, 2, 'Registered'),
(6, 3, 'Registered'),
(7, 3, 'Registered'),
(8, 4, 'Registered'),
(9, 4, 'Registered'),
(10, 5, 'Registered'),
(11, 5, 'Registered'),
(12, 6, 'Registered'),
(13, 6, 'Registered'),
(14, 7, 'Registered'),
(15, 7, 'Registered'),
(16, 8, 'Registered'),
(17, 8, 'Registered'),
(18, 9, 'Registered'),
(19, 9, 'Registered'),
(20, 10, 'Registered'),
(1, 2, 'Registered'),
(2, 3, 'Registered'),
(3, 4, 'Registered'),
(4, 5, 'Registered'),
(5, 6, 'Registered'),
(6, 7, 'Registered'),
(7, 8, 'Registered');

-- 4. Automatically trigger Certificates by toggling attendance to 'Present' for a subset
UPDATE Registrations 
SET status = 'Present' 
WHERE reg_id IN (1, 2, 5, 7, 9, 11, 15, 20, 22, 25);

-- Set some to absent to have complete dataset types
UPDATE Registrations 
SET status = 'Absent' 
WHERE reg_id IN (3, 6, 12, 17, 24);
