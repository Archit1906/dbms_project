# College Event Participation & Certificate System

A robust, database-driven web application to automate the college event lifecycle from student discovery and registration to attendance tracking and digital certificate issuance.

## Features Built
- **React 18 Frontend** with dynamic routing and Glassmorphism styling.
- **Node/Express Backend** mapping secure endpoints via JWT authentication.
- **MySQL DB Schema** implementing Views, Triggers, and Constraints strictly natively!

## Tech Stack
- Frontend: Vite, React, Zustand, React-Hook-Form, TailwindCSS, jsPDF
- Backend: Express, Node, Joi, bcrypt, jsonwebtoken, mysql2
- Database: MySQL 8.x

## Setup Instructions

### Database Preparation
1. Ensure your local MySQL server is running. 
2. Use a client (or bash) to run the schema script: \`mysql -u root -p < database/schema.sql\`
3. (Optional) Feed the database mock data using the seed script: \`mysql -u root -p college_events_db < database/seed.sql\`

### Backend Initialization
1. Navigate to `/backend` directory.
2. Provide your backend Environment configs. Copy \`.env.example\` to \`.env\` and input your MySQL credentials (`DB_PASSWORD`) and \`JWT_SECRET\`.
3. Install dependencies: \`npm install\`
4. Run server: \`npm run start\` or \`npm run dev\` for nodemon.

### Frontend Initialization
1. Navigate to `/frontend` directory.
2. Verify \`VITE_API_BASE_URL\` inside your \`.env\` if testing on different network.
3. Install dependencies: \`npm install\`
4. Run via Vite build: \`npm run dev\`

## Authentication Testing
If you seeded the database:
- **Admin Root Account**: \`admin@college.edu\` | Pass: \`password123\`
- **Student Default Accounts**: \`alice.smith@college.edu\` ... etc | Pass: \`password123\`

Enjoy managing events with absolute relational DB integrity!
