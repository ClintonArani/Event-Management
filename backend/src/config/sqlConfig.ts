import mssql from 'mssql';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const sqlConfig = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PWD as string,
  database: process.env.DB_NAME as string,
  server: process.env.MS_SERVER as string,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

async function testConnection() {
  try {
    // Establish a connection
    await mssql.connect(sqlConfig);
    console.log("Connection was made successfully.");
  } catch (error) {
    console.error("Connection error:", error);
  }
}

testConnection();
