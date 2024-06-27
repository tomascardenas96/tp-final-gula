import { createConnection } from 'mysql2/promise';
import { readFileSync } from 'fs';
import { join } from 'path';

async function initializeDatabase() {
  const connection = await createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    multipleStatements: true, // Para ejecutar múltiples sentencias SQL
  });

  const initSql = readFileSync(join(__dirname, '..' , 'init.sql'), 'utf8');


  try {
    await connection.query(initSql);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await connection.end();
  }
}

initializeDatabase();
