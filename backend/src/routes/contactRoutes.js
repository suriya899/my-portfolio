// backend/src/routes/contactRoutes.js

import express from "express";
import pool from "../db.js"; // ดึง Pool connection ที่เตรียมไว้แล้ว

const router = express.Router(); // สร้าง mini-router แยกจาก server หลัก

// POST /api/contact
// รับข้อมูล: name, email, message แล้วบันทึกลงตาราง contacts
router.post("/", async (req, res) => {
    // ดึงข้อมูลออกจาก request body
    const { name, email, message } = req.body;

    // --- Validation ---
    // ตรวจว่าครบทุก field ไหม
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            error: "Please fill in all the fields",
        });
    }

    // ตรวจรูปแบบ email เบื้องต้น (ต้องมี @ และ .)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            error: "The email format is incorrect"
        });
    }

    // ตรวจความยาว message (ไม่น้อยกว่า 10 ตัวอักษร)
    if (message.trim().length < 10) {
        return res.status(400).json({
            success: false,
            error: "The message must be at least 10 characters long",
        });
    }

    // --- บันทึกลง Database ---
    try {
        // $1, $2, $3 คือ Parameterized Query — ป้องกัน SQL Injection
        const result = await pool.query(
            `INSERT INTO contacts (name, email, message)
            VALUES ($1, $2, $3)
            RETURNING id, name, email, created_at` ,
            [name.trim(), email.trim(), message.trim()]
        );

        // ดึงแถวที่เพิ่งบันทึกออกมา (RETURNING ส่งกลับมาให้)
        const newContact = result.rows[0];

        // ตอบกลับ 201 Created พร้อมข้อมูลที่บันทึก
        return res.status(201).json({
            success: true,
            message: "Message sent successfully!",
            data: newContact,
        });
    } catch (err) {
    // ถ้า DB error — log ใน server แต่ส่ง message กลับแบบกว้างๆ
    console.error("❌ Database error:", err.message);
    return res.status(500).json({
        success: false,
        error: "An error occurred on the server. Please try again"
        });
    }
    });

    export default router; // export แบบ default เพราะ router มีตัวเดียว

