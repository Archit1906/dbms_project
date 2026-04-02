-- seed.sql
USE college_events_db;

-- 1. Insert Admin & Students (Passwords are all 'password123' hashed with bcrypt 12 rounds)
INSERT INTO Student (name, email, password_hash, department, year, role) VALUES
('System Administrator', 'admin@college.edu', '$2b$12$SRGN1F8oWwPa05SSFjRS5.z4D665lIUaGonFwXLX7mUgjwti6RrlG', 'Administration', 1, 'Admin'),

('Alice Smith', 'alice.smith@college.edu', '$2b$12$SRGN1F8oWwPa05SSFjRS5.z4D665lIUaGonFwXLX7mUgjwti6RrlG', 'Computer Science', 3, 'Student'),
('Bob Johnson', 'bob.johnson@college.edu', '$2b$12$SRGN1F8oWwPa05SSFjRS5.z4D665lIUaGonFwXLX7mUgjwti6RrlG', 'Electrical Engineering', 2, 'Student'),
('Charlie Brown', 'charlie.brown@college.edu', '$2b$12$SRGN1F8oWwPa05SSFjRS5.z4D665lIUaGonFwXLX7mUgjwti6RrlG', 'Mechanical Engineering', 1, 'Student'),
('Diana Prince', 'diana.prince@college.edu', '$2b$12$SRGN1F8oWwPa05SSFjRS5.z4D665lIUaGonFwXLX7mUgjwti6RrlG', 'Computer Science', 4, 'Student'),
('Evan Wright', 'evan.wright@college.edu', '$2b$12$SRGN1F8oWwPa05SSFjRS5.z4D665lIUaGonFwXLX7mUgjwti6RrlG', 'Information Technology', 2, 'Student'),
('Fiona Gallagher', 'fiona.g@college.edu', '$2b$12$SRGN1F8oWwPa05SSFjRS5.z4D665lIUaGonFwXLX7mUgjwti6RrlG', 'Data Science', 3, 'Student'),
('George Martin', 'george.m@college.edu', '$2b$12$SRGN1F8oWwPa05SSFjRS5.z4D665lIUaGonFwXLX7mUgjwti6RrlG', 'Cybersecurity', 4, 'Student'),
('Hannah Abbott', 'hannah.a@college.edu', '$2b$12$SRGN1F8oWwPa05SSFjRS5.z4D665lIUaGonFwXLX7mUgjwti6RrlG', 'Computer Science', 1, 'Student'),
('Ian Somerhalder', 'ian.s@college.edu', '$2b$12$SRGN1F8oWwPa05SSFjRS5.z4D665lIUaGonFwXLX7mUgjwti6RrlG', 'Electrical Engineering', 3, 'Student'),
('Jane Doe', 'jane.doe@college.edu', '$2b$12$SRGN1F8oWwPa05SSFjRS5.z4D665lIUaGonFwXLX7mUgjwti6RrlG', 'Mechanical Engineering', 2, 'Student'),
('Kevin Tran', 'kevin.t@college.edu', '$2b$12$SRGN1F8oWwPa05SSFjRS5.z4D665lIUaGonFwXLX7mUgjwti6RrlG', 'Data Science', 2, 'Student'),
('Laura Palmer', 'laura.p@college.edu', '$2b$12$SRGN1F8oWwPa05SSFjRS5.z4D665lIUaGonFwXLX7mUgjwti6RrlG', 'Information Technology', 4, 'Student'),
('Michael Scott', 'michael.s@college.edu', '$2b$12$SRGN1F8oWwPa05SSFjRS5.z4D665lIUaGonFwXLX7mUgjwti6RrlG', 'Business Tech', 3, 'Student'),
('Nancy Wheeler', 'nancy.w@college.edu', '$2b$12$SRGN1F8oWwPa05SSFjRS5.z4D665lIUaGonFwXLX7mUgjwti6RrlG', 'Computer Science', 2, 'Student'),
('Oliver Queen', 'oliver.q@college.edu', '$2b$12$SRGN1F8oWwPa05SSFjRS5.z4D665lIUaGonFwXLX7mUgjwti6RrlG', 'Cybersecurity', 1, 'Student'),
('Pam Beesly', 'pam.b@college.edu', '$2b$12$SRGN1F8oWwPa05SSFjRS5.z4D665lIUaGonFwXLX7mUgjwti6RrlG', 'Business Tech', 2, 'Student'),
('Quinn Fabray', 'quinn.f@college.edu', '$2b$12$SRGN1F8oWwPa05SSFjRS5.z4D665lIUaGonFwXLX7mUgjwti6RrlG', 'Data Science', 4, 'Student'),
('Rachel Green', 'rachel.g@college.edu', '$2b$12$SRGN1F8oWwPa05SSFjRS5.z4D665lIUaGonFwXLX7mUgjwti6RrlG', 'Information Technology', 3, 'Student'),
('Steve Harrington', 'steve.h@college.edu', '$2b$12$SRGN1F8oWwPa05SSFjRS5.z4D665lIUaGonFwXLX7mUgjwti6RrlG', 'Electrical Engineering', 4, 'Student'),
('Tony Stark', 'tony.s@college.edu', '$2b$12$SRGN1F8oWwPa05SSFjRS5.z4D665lIUaGonFwXLX7mUgjwti6RrlG', 'Mechanical Engineering', 5, 'Student');

-- 2. Insert 10 Events
INSERT INTO Event (title, description, date, organizer, venue, max_capacity) VALUES
('Tech Symposium 2026', 'Annual college technology symposium covering AI and web trends.', '2026-05-15', 'CS Department', 'Main Auditorium', 250),
('Hackathon: Code for Good', '24-hour hackathon focused on sustainability.', '2026-06-10', 'Tech Club', 'Library Block B', 100),
('AI & Machine Learning Workshop', 'Hands-on session using Python for predictive modeling.', '2026-04-20', 'Data Science Dept', 'Lab 401', 50),
('Cybersecurity Seminar', 'Guest lecture from industry experts on zero-trust networks.', '2026-04-25', 'Cybersecurity Dept', 'Hall C', 80),
('Web3 & Blockchain Basics', 'Introduction to decentralized apps and smart contracts.', '2026-05-02', 'Blockchain Society', 'Room 203', 60),
('Robotics Expo', 'Showcase of student built robotic systems and drones.', '2026-07-12', 'Mechanical Dept', 'Campus Square', 300),
('UI/UX Design Masterclass', 'Principles of modern Glassmorphism and tailored digital experiences.', '2026-05-20', 'Design Club', 'Art Studio 2', 40),
('Cloud Computing Demystified', 'AWS vs Azure vs GCP architecture deep dive.', '2026-06-05', 'IT Department', 'Virtual/Online', 500),
('Career Fair 2026', 'Networking event with over 50 top tech recruiters.', '2026-08-01', 'Placement Cell', 'Indoor Stadium', 1000),
('Alumni Tech Panel', 'Recent graduates share their journey to Big N companies.', '2026-04-30', 'Alumni Association', 'Main Auditorium', 200);

-- 3. Insert Registrations (Initially everyone is 'Registered')
-- Register random students (IDs 2 to 21) across the 10 events
INSERT INTO Registration (student_id, event_id, participation_status) VALUES
(2, 1, 'Registered'),
(3, 1, 'Registered'),
(4, 1, 'Registered'),
(5, 2, 'Registered'),
(6, 2, 'Registered'),
(7, 3, 'Registered'),
(8, 3, 'Registered'),
(9, 4, 'Registered'),
(10, 4, 'Registered'),
(11, 5, 'Registered'),
(12, 5, 'Registered'),
(13, 6, 'Registered'),
(14, 6, 'Registered'),
(15, 7, 'Registered'),
(16, 7, 'Registered'),
(17, 8, 'Registered'),
(18, 8, 'Registered'),
(19, 9, 'Registered'),
(20, 9, 'Registered'),
(21, 10, 'Registered'),

-- A few more cross registrations
(2, 2, 'Registered'),
(3, 3, 'Registered'),
(4, 4, 'Registered'),
(5, 5, 'Registered'),
(6, 6, 'Registered'),
(7, 7, 'Registered'),
(8, 8, 'Registered');

-- 4. Automatically trigger Certificates by toggling attendance to 'Present' for a subset
-- This will cause the trigger 'after_attendance_marked' to insert into the Certificate table!
UPDATE Registration 
SET participation_status = 'Present' 
WHERE reg_id IN (1, 2, 5, 7, 9, 11, 15, 20, 22, 25);

-- Set some to absent to have complete dataset types
UPDATE Registration 
SET participation_status = 'Absent' 
WHERE reg_id IN (3, 6, 12, 17, 24);
