// โหลดค่าจากไฟล์ .env เข้ามาใช้งาน (ต้องเรียกก่อนสุด)
import "dotenv/config";

import express from "express";
import cors from "cors";

// สร้าง Express app
const app = express();

// อ่านค่า PORT จาก .env ถ้าไม่มีก็ใช้ 3001
const PORT = process.env.PORT || 3001;

// ===== Middleware =====
// บอก Express ว่า request body เป็น JSON
app.use(express.json());

// อนุญาตให้ frontend (port 5173) คุยกับ backend ได้
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    })
);

// ===== Routes =====
// Health check — ใช้ทดสอบว่า server ทำงานอยู่
app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        message: "Portfolio API is running!",
        timestamp: new Date().toISOString(),
    });
});

// ===== Start Server =====
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
})