import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const db = mysql.createPool({
  host: process.env.HOST,
  database: process.env.DB,
  port: process.env.sqlPort,
  password: process.env.PASSWORD,
  user: process.env.USER,
  ssl: {
    rejectUnauthorized: false
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// export default db;