DROP DATABASE IF EXISTS college_events_db;
CREATE DATABASE college_events_db;
USE college_events_db;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'Student') NOT NULL DEFAULT 'Student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE Students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE Events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATETIME NOT NULL,
    venue VARCHAR(255) NOT NULL,
    max_participants INT NOT NULL,
    category ENUM('Technical', 'Cultural', 'Sports', 'Other') NOT NULL DEFAULT 'Other',
    static_qr_data VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE Registrations (
    reg_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    event_id INT NOT NULL,
    status ENUM('Registered', 'Present', 'Absent', 'Cancelled') NOT NULL DEFAULT 'Registered',
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES Students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES Events(event_id) ON DELETE CASCADE,
    UNIQUE KEY idx_unique_registration (student_id, event_id)
) ENGINE=InnoDB;

CREATE TABLE Waitlist (
    waitlist_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    event_id INT NOT NULL,
    priority_number INT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES Students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES Events(event_id) ON DELETE CASCADE,
    UNIQUE KEY idx_unique_waitlist (student_id, event_id)
) ENGINE=InnoDB;

CREATE TABLE Certificates (
    cert_id INT AUTO_INCREMENT PRIMARY KEY,
    reg_id INT NOT NULL UNIQUE,
    issue_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unique_verification_hash VARCHAR(255) NOT NULL UNIQUE,
    FOREIGN KEY (reg_id) REFERENCES Registrations(reg_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Trigger to safely auto-generate certificates when marking "Present"
DELIMITER //

CREATE TRIGGER after_attendance_marked
AFTER UPDATE ON Registrations
FOR EACH ROW
BEGIN
    IF NEW.status = 'Present' AND OLD.status != 'Present' THEN
        INSERT INTO Certificates (reg_id, unique_verification_hash) 
        VALUES (NEW.reg_id, SHA2(CONCAT(NEW.reg_id, UUID(), NOW()), 256));
    END IF;
END;
//

DELIMITER ;

-- View for Admin aggregated dashboard mapping exactly as requested
CREATE OR REPLACE VIEW vw_department_stats AS
SELECT 
    s.department,
    COUNT(DISTINCT r.student_id) as total_participants,
    COUNT(CASE WHEN r.status = 'Present' THEN 1 END) as total_attendances
FROM Students s
LEFT JOIN Registrations r ON s.student_id = r.student_id
GROUP BY s.department;

CREATE OR REPLACE VIEW vw_event_capacity AS
SELECT 
    e.event_id,
    e.title,
    e.category,
    e.date,
    e.max_participants,
    COUNT(r.reg_id) as current_registered,
    (e.max_participants - COUNT(r.reg_id)) as available_spots
FROM Events e
LEFT JOIN Registrations r ON e.event_id = r.event_id AND r.status IN ('Registered', 'Present')
GROUP BY e.event_id;

-- Sample Data Insertions (All passwords are 'password123')
INSERT INTO Users (email, password_hash, role) VALUES 
('admin1@college.edu', '$2b$10$TKh8H1.PfQx37YgCzwi.PeO.h.4n1o3s.H1O2uA.rX6X6u3r9p5nK', 'Admin'),
('student1@college.edu', '$2b$10$TKh8H1.PfQx37YgCzwi.PeO.h.4n1o3s.H1O2uA.rX6X6u3r9p5nK', 'Student'),
('student2@college.edu', '$2b$10$TKh8H1.PfQx37YgCzwi.PeO.h.4n1o3s.H1O2uA.rX6X6u3r9p5nK', 'Student');

INSERT INTO Students (user_id, name, department, year) VALUES 
(2, 'Alice Smith', 'Computer Science', 3),
(3, 'Bob Johnson', 'Electrical Engineering', 2);

INSERT INTO Events (title, description, date, venue, max_participants, category) VALUES 
('Tech Symposium 2026', 'Annual CS gathering.', '2026-05-15 10:00:00', 'Main Hall', 100, 'Technical'),
('Cultural Fest', 'Music and dance events.', '2026-06-20 18:00:00', 'Open Grounds', 500, 'Cultural'),
('AI Workshop', 'Hands-on AI model training.', '2026-08-10 14:00:00', 'Lab 3', 2, 'Technical');
