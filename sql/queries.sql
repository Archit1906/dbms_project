USE college_event_db;

-- 1. LIST ALL STUDENTS WHO ATTENDED 'Tech Symposium 2024' (JOIN)
SELECT S.name, S.department 
FROM STUDENT S
JOIN REGISTRATION R ON S.student_id = R.student_id
JOIN EVENT E ON R.event_id = E.event_id
WHERE E.title = 'Tech Symposium 2024' AND R.participation_status = 'Present';

-- 2. COUNT NUMBER OF REGISTRATIONS PER EVENT (GROUP BY, AGGREGATE)
SELECT E.title, COUNT(R.reg_id) AS total_registrations
FROM EVENT E
LEFT JOIN REGISTRATION R ON E.event_id = R.event_id
GROUP BY E.event_id, E.title;

-- 3. FIND STUDENTS WHO HAVE NOT REGISTERED FOR ANY EVENT (SUBQUERY)
SELECT name FROM STUDENT
WHERE student_id NOT IN (SELECT DISTINCT student_id FROM REGISTRATION);

-- 4. DETAILS OF STUDENTS WHO HAVE RECEIVED A CERTIFICATE (JOIN, 3 TABLES)
SELECT S.name, E.title, C.issue_date
FROM CERTIFICATE C
JOIN REGISTRATION R ON C.reg_id = R.reg_id
JOIN STUDENT S ON R.student_id = S.student_id
JOIN EVENT E ON R.event_id = E.event_id;

-- 5. FIND THE EVENT WITH THE HIGHEST NUMBER OF PARTICIPANTS (ORDER BY, LIMIT)
SELECT E.title, COUNT(R.reg_id) as participant_count
FROM EVENT E
JOIN REGISTRATION R ON E.event_id = R.event_id
WHERE R.participation_status = 'Present'
GROUP BY E.event_id
ORDER BY participant_count DESC
LIMIT 1;

-- 6. LIST DEPARTMENTS WITH MORE THAN 1 STUDENT REGISTERED FOR EVENTS (HAVING)
SELECT S.department, COUNT(DISTINCT S.student_id) as student_count
FROM STUDENT S
JOIN REGISTRATION R ON S.student_id = R.student_id
GROUP BY S.department
HAVING student_count > 1;

-- 7. AVERAGE YEAR OF STUDENTS ATTENDING 'Robotics Workshop' (AGGREGATE)
SELECT AVG(S.year) as avg_year
FROM STUDENT S
JOIN REGISTRATION R ON S.student_id = R.student_id
JOIN EVENT E ON R.event_id = E.event_id
WHERE E.title = 'Robotics Workshop';

-- 8. LIST EVENTS HAPPENING AFTER '2024-04-01'
SELECT title, date, venue FROM EVENT WHERE date > '2024-04-01';
