// นำเข้า icon ดวงอาทิตย์และดวงจันทร์จาก lucide-react
// import { button } from "framer-motion/client";
import { Sun, Moon } from "lucide-react";

// รับ props: theme (ค่าปัจจุบัน), toggleTheme (ฟังก์ชันสลับ)
function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      // aria-label บอก screen reader ว่าปุ่มนี้ทำอะไร
      aria-label="Togglr dark mode"
      className="
        p-2 rounded-lg
        text-gray-600 dark:text-gray-300
        hover:bg-gray-100 dark:hover-gray-800
        transition-colors durantion-200
        "
    >
      {/* ถ้า theme เป็น dark แสดงไอคอนดวงอาทิตย์ (กด = กลับไป light) */}
      {/* ถ้า theme เป็น light แสดงไอคอนดวงจันทร์ (กด = ไป dark) */}
      {theme === "dark" ? (
        <Sun size={20} className="text-jake" />
      ) : (
        <Moon size={20} className="text-finn" />
      )}
    </button>
  );
}

export default ThemeToggle;
