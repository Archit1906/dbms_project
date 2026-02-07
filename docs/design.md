# Database Design Document
## College Event Participation & Certificate System

### 1. ER Diagram Description

The system consists of four main entities:

1.  **STUDENT**
    *   **Attributes**: `student_id` (Primary Key), `name`, `email`, `department`, `year`.
    *   **Description**: Represents a student in the college.

2.  **EVENT**
    *   **Attributes**: `event_id` (Primary Key), `title`, `date`, `organizer`, `venue`.
    *   **Description**: Represents an event organized by a department or club.

3.  **REGISTRATION**
    *   **Attributes**: `reg_id` (Primary Key), `registration_date`, `participation_status`.
    *   **Foreign Keys**: `student_id` (references STUDENT), `event_id` (references EVENT).
    *   **Description**: An associative entity representing the Many-to-Many relationship between STUDENT and EVENT. A student can register for multiple events, and an event has multiple students.

4.  **CERTIFICATE**
    *   **Attributes**: `cert_id` (Primary Key), `issue_date`.
    *   **Foreign Keys**: `reg_id` (references REGISTRATION).
    *   **Description**: Represents a certificate issued to a student for a specific event participation. It has a One-to-One relationship with REGISTRATION (subset constraint: only if status is 'Present').

### 2. Relational Schema

*   **STUDENT** (`student_id` PK, `name`, `email`, `department`, `year`)
*   **EVENT** (`event_id` PK, `title`, `date`, `organizer`, `venue`)
*   **REGISTRATION** (`reg_id` PK, `student_id` FK, `event_id` FK, `registration_date`, `participation_status`)
    *   FK `student_id` -> STUDENT(`student_id`)
    *   FK `event_id` -> EVENT(`event_id`)
*   **CERTIFICATE** (`cert_id` PK, `reg_id` FK, `issue_date`)
    *   FK `reg_id` -> REGISTRATION(`reg_id`)

### 3. Normalization Explanation

The database design adheres to **3NF (Third Normal Form)** to reduce redundancy and improve data integrity.

*   **First Normal Form (1NF)**: All columns contain atomic values. There are no repeating groups (e.g., multiple phone numbers are not stored in one cell).
*   **Second Normal Form (2NF)**: The database is in 1NF, and there are no partial dependencies. Since most primary keys are single integers (surrogate keys), non-key attributes depend on the full primary key. In the case of `REGISTRATION` (if composite key `student_id` + `event_id` were used), attributes like `registration_date` depend on the combination of both, satisfying 2NF. We used `reg_id` as a single PK for simplicity, which trivially satisfies 2NF.
*   **Third Normal Form (3NF)**: The database is in 2NF, and there are no transitive dependencies.
    *   In `STUDENT`, `department` is directly related to the student. If we had a separate DEPARTMENT table, we would link it, but for this simple project, storing department name is acceptable as it depends on `student_id`.
    *   No non-key attribute depends on another non-key attribute.
