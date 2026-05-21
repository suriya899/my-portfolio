-- schema.sql — โครงสร้างตาราง contacts
-- ใช้สำหรับเก็บข้อความที่คนส่งมาจาก Contact Form

CREATE TABLE IF NOT EXISTS contacts (
  id          SERIAL PRIMARY KEY,         -- รหัสอัตโนมัติ 1, 2, 3...
  name        VARCHAR(100) NOT NULL,      -- ชื่อผู้ส่ง
  email       VARCHAR(150) NOT NULL,      -- อีเมลผู้ส่ง
  message     TEXT        NOT NULL,       -- ข้อความ
  created_at  TIMESTAMPTZ DEFAULT NOW()    -- วันเวลาที่ส่ง
);