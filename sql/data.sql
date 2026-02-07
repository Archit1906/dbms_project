USE college_event_db;

-- Insert Sample Students
INSERT INTO STUDENT (name, email, department, year) VALUES 
('Alice Johnson', 'alice@college.edu', 'Computer Science', 3),
('Bob Smith', 'bob@college.edu', 'Mechanical', 2),
('Charlie Brown', 'charlie@college.edu', 'Electrical', 4),
('David Lee', 'david@college.edu', 'Computer Science', 1),
('Eva Green', 'eva@college.edu', 'Civil', 3);

-- Insert Sample Events
INSERT INTO EVENT (title, date, organizer, venue) VALUES 
('Tech Symposium 2024', '2024-03-15', 'CS Department', 'Auditorium A'),
('Robotics Workshop', '2024-04-10', 'Robotics Club', 'Lab 2'),
('Cultural Fest', '2024-05-20', 'Student Council', 'Main Ground');

-- Insert Registrations
-- Alice registered for Tech Symposium
INSERT INTO REGISTRATION (student_id, event_id, participation_status) VALUES (1, 1, 'Present');
-- Bob registered for Tech Symposium
INSERT INTO REGISTRATION (student_id, event_id, participation_status) VALUES (2, 1, 'Absent');
-- Charlie registered for Robotics Workshop
INSERT INTO REGISTRATION (student_id, event_id, participation_status) VALUES (3, 2, 'Present');
-- David registered for Robotics Workshop
INSERT INTO REGISTRATION (student_id, event_id, participation_status) VALUES (4, 2, 'Registered');

-- Insert Certificates (Only for Present students)
-- Certificate for Alice
INSERT INTO CERTIFICATE (reg_id) VALUES (1);
-- Certificate for Charlie
INSERT INTO CERTIFICATE (reg_id) VALUES (3);
