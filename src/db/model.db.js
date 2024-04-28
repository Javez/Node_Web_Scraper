const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config();

const env = process.env.NODE_ENV || "development";

const pool = new Pool({
  user: process.env[`${env.toUpperCase()}_DB_USER`],
  host: process.env[`${env.toUpperCase()}_DB_HOST`],
  database: process.env[`${env.toUpperCase()}_DB_NAME`],
  password: process.env[`${env.toUpperCase()}_DB_PASSWORD`],
  port: process.env[`${env.toUpperCase()}_DB_PORT`],
});

async function createTables() {
  const client = await pool.connect();
  try {
    await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL
            );
        `);
    await client.query(`
            CREATE TABLE IF NOT EXISTS parse_requests (
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(id),
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
    console.log("Tables created successfully");
  } catch (err) {
    console.error("Error creating tables", err);
  } finally {
    client.release();
  }
}

createTables();
