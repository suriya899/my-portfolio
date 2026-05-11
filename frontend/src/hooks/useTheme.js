// useTheme.js
// Custom Hook สำหรับจัดการ Dark/Light Mode
// แยก logic ออกมาจาก Component เพื่อให้ reuse ได้ทุกที่

import { useState, useEffect } from 'react';

function useTheme() {
      // --- ขั้นที่ 1: ตั้งค่า initial state ---
  // useState รับ "initializer function" (ฟังก์ชันที่คืนค่าเริ่มต้น)
  // React จะเรียก function นี้ครั้งเดียวตอน component mount เท่านั้น
  // ทำให้ไม่อ่าน localStorage ซ้ำทุก render (efficient กว่า)

    const [theme, setTheme] = useState(() => {
        // อ่านค่า theme ที่เคยบันทึกไว้จาก localStorage
        const savedTheme = localStorage.getItem('theme');

        // ถ้าเคยบันทึกไว้ → ใช้ค่านั้น
        // ถ้ายังไม่เคย → ดูว่า OS ของผู้ใช้ชอบ dark mode มั้ย
        // window.matchMedia คือ API ที่ดู CSS media query จาก JS ได้

        if (savedTheme) {
            return savedTheme; // ใช้ค่าที่บันทึกไว้

        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return 'dark'; // OS ชอบ dark mode

        } else {
            return 'light'; // เป็น light mode
        }
    });

      // --- ขั้นที่ 2: ใช้ useEffect เพื่อซิงค์ theme กับ localStorage ---
  // ทุกครั้งที่ theme เปลี่ยน เราจะบันทึกค่าใหม่ลง localStorage

    useEffect(() => {
        const root = document.documentElement; // คือ <html> tag

        if (theme === "dark") {
            root.classList.add("dark"); // เพิ่ม class "dark" ให้ <html>
            root.classList.remove("light"); // ลบ class "light" ออก
        } else {
            root.classList.add("light"); // เพิ่ม class "light" ให้ <html>
            root.classList.remove("dark"); // ลบ class "dark" ออก
        }

        // บันทึก theme ลง localStorage เพื่อจำไว้ตอน reload
        
        localStorage.setItem("theme", theme);
    }, [theme]); // dependency array: รัน effect นี้ทุกครั้งที่ theme เปลี่ยน

    // --- ขั้นที่ 3: ฟังก์ชัน toggle ---
    // สลับระหว่าง dark ↔ light
    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
        // prev คือค่าปัจจุบัน → ถ้าเป็น dark ให้เปลี่ยนเป็น light และกลับกัน
       
    };

    // --- ขั้นที่ 4: คืนค่า theme และ toggleTheme ---
    return { theme, toggleTheme };
    // Component จะได้: theme (string) และ toggleTheme (function)
}

export default useTheme;