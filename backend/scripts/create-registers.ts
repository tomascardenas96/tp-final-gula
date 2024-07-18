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

  const registerDatabase = readFileSync(join(__dirname, '..' , 'create-registers.sql'), 'utf8');


  try {
    await connection.query(registerDatabase);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await connection.end();
  }
}

initializeDatabase();