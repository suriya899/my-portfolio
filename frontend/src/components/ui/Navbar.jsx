// นำเข้า useState สำหรับ toggle เมนู mobile
// นำเข้า useEffect สำหรับ detect section ที่กำลัง scroll อยู่
import { useState, useEffect } from "react";

// นำเข้า icon จาก lucide-react
// Menu = ไอคอน hamburger (≡), X = ไอคอนปิด
import { Menu, X } from "lucide-react";

// นำเข้า custom hook useTheme ที่เราสร้างไว้ใน Phase 3
import  useTheme  from "../../hooks/useTheme";

// นำเข้าข้อมูล navLinks จาก portfolioData
import { navLinks } from "../../data/portfolioData";

// นำเข้า ThemeToggle component (จะสร้างในขั้นต่อไป)
import ThemeToggle from "./ThemeToggle";

// ---- Component หลัก ----
function Navbar() {
  // isOpen ใช้สำหรับเก็บสถานะว่าเมนู mobile เปิดอยู่หรือไม่
  const [isOpen, setIsOpen] = useState(false); // เริ่มต้นเป็น false (เมนูปิด)

  // activeSection ใช้สำหรับเก็บชื่อ section ที่กำลัง scroll ผ่านอยู่
  // เริ่มต้นที่ hero เพราะโหลดหน้ามาแล้วจะอยู่ที่บนสุด
  const [activeSection, setActiveSection] = useState("hero");

  // ดึง theme และ toggoleTheme จาก custom hook useTheme
  const { theme, toggleTheme } = useTheme();

  // ---- useEffect: ตรวจจับ section ที่กำลัง scroll อยู่ ----
  useEffect(() => {
    // ฟังก์ชันนี้จะถูกเรียกเมื่อมีการ scroll
    const handleScroll = () => {
      // วนลูปผ่าน navLinks เพื่อเช็คแต่ละ section ไหนอยู่ใน viewport
      for (const link of navLinks) { // navLinks คือ array ที่เรานำเข้ามาจาก portfolioData ซึ่งมีข้อมูลของแต่ละ section
        // หา element ของ section นั้นๆ ด้วย id
        const section = document.getElementById(link.id);

        // ถ้าไม่เจอ section นั้นๆ ให้ข้ามไป
        if (!section) continue;

        // getBoundingClientReact() จะให้ข้อมูลเกี่ยวกับตำแหน่งของ element ใน viewport
        // top = ระยะห่างจากด้านบนของ viewport ถึงด้านบนของ element
        const { top } = section.getBoundingClientRect();

        // ถ้า section นั้นอยู่ใกล้ขอบบนของหน้าจอ (ระหว่าง -100 ถึง 300px)
        // แปลว่า section นี้กำลัง active อยู่
        if (top >= -100 && top <= 300) {
          setActiveSection(link.id); // อัพเดต activeSection เป็น id ของ section นั้น
          break; // หยุดเช็ค section อื่นๆ เพราะเจอแล้ว
        }
      }
    };

    // ผูก event listener ไว้กับ window เพื่อรับ scroll event
    window.addEventListener("scroll", handleScroll);

    // Cleanup: ลบ event listener ออกตอน component ถูก unmount
    // เพื่อป้องกัน memory leak
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // [] หมายความว่า effect นี้จะรันแค่ครั้งเดียวตอน component mount

  // ---- ฟังก์ชัน smooth scroll ----
  const scrollToSection = (id) => {
    // หา element ของ section ที่ต้องการ scroll ไป ด้วย id
    const section = document.getElementById(id);

    // ถ้าเจอ section นั้นๆ ให้ scroll ไปหาแบบ smooth
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      // scrollIntoView() เป็นฟังก์ชันที่ทำให้ element นั้นๆ เลื่อนเข้ามาใน viewport
    }
    // ปิด เมนู mobile หลังจากกดลิงก์ (สำหรับ mobile)
    setIsOpen(false);
  };

  // ---- Render ----
  return (
    // nav = semantic HTML element สำหรับ navigation bar
    // fixed top-0 = ติดอยู่บนสุดตลอด
    // z-50 = อยู่บนสุดของทุก element
    // backdrop-blur = frosted glass effect
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-dark/80 border-b border-gray-200 dark:border-gray-700">
      {/* Container จัดขนาดและ centering */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* แถวหลัก: Logo + Links + Toggle */}
        <div className="flex items-center justify-between h-16">
          {/* ---- Logo / Brand Name ---- */}
          <button
            onClick={() => scrollToSection("hero")}
            // ใช้สีเหลือง Jake Yellow เป็น brand color
            className="text-xl font-bold text-jake hover:opacity-80 transition-opacity"
          >
            Jack.dev
          </button>

          {/* ---- Desktop Navigation Links (ซ่อนบน mobile) ---- */}
          <div className="hidden md:flex items-center gap-6">
            {/* วนลูปผ่าน navLinks เพื่อสร้างลิงก์สำหรับแต่ละตัว */}
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-sm font-medium transition-colors duration-200 
                                    ${
                                      // ถ้า link นี้คือ active section ให้ใช้สีเหลือง
                                      // ถ้าไม่ใช่ ใช้สีปกติ
                                      activeSection === link.id
                                        ? "text-jake"
                                        : "text-gray-600 dark:text-gray-300"
                                    }
                                `}
              >
                {link.label}
              </button>
            ))}

            {/* Theme Toggle อยู่ขวาสุดของ Desktop nav 
                         ส่ง props theme และ toggleTheme ให้ ThemeToggle component*/}
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>

          {/* ---- Mobile: Theme Toggle + Hamburger Button ---- 
                    แสดงเฉพาะบน mobile (ซ่อนบน desktop) */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

            {/* ปุ่ม Hamburger — toggle เปิด/ปิด mobile menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              // aria-label ช่วย accessibility (screen reader)
              aria-label="Toggle menu"
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {/* ถ้า menu เปิดอยู่ แสดง X, ถ้าปิดอยู่ แสดง hamburger */}
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ---- Mobile Dropdown Menu ---- */}
        {/* แสดงเฉพาะเมื่อ isOpen = true */}
        {isOpen && (
          <div className="md:hidden py-3 border-t border-gray-200 dark:border-gray-700">
            {/* วนลูปผ่าน navLinks เพื่อสร้างลิงก์สำหรับแต่ละตัว */}
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                // block w-full = กว้างเต็มแถว ทำให้กดง่ายบน mobile
                className={`
                                    block w-full text-left px-4 py-3 text-sm font-medium
                                    transition-colors duration-200 rounded-lg
                                    ${
                                      activeSection === link.id
                                        ? "text-jake bg-yellow-50 dark:bg-yellow-900/20"
                                        : "text-gray-600 dark:text-gray-300 hover:text-jake hover:bg-gray-50 dark:hover:bg-gray-800"
                                    }
                                `}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
