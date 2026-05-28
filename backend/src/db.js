// db.js — ตั้งค่า connection pool สำหรับ PostgreSQL
// Pool คือการเปิด connection ไว้ล่วงหน้าหลายๆ อัน
// แทนที่จะเปิด-ปิดทุกครั้งที่ query (ช้ากว่ามาก)

import pg from "pg";

const { Pool } = pg;

// ดึงค่า config จาก .env ที่ตั้งไว้
// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });

//เชื่อม neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // ← Neon ต้องการบรรทัดนี้!
});

export default pool;
