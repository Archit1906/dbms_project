require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function runSeed() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '051906',
    database: process.env.DB_NAME || 'college_events_db',
    multipleStatements: true
  });

  try {
    const seedSqlPath = path.join(__dirname, '..', 'database', 'seed.sql');
    const sql = fs.readFileSync(seedSqlPath, 'utf8');
    
    console.log('Running seed.sql...');
    await connection.query(sql);
    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Error running seed:', error);
  } finally {
    await connection.end();
  }
}

runSeed();
