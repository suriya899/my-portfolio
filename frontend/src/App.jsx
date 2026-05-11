// src/App.jsx
// นี่คือ Component หลักของแอป ทุกอย่างจะถูกรวมมาที่นี่

// นำเข้าข้อมูลจากไฟล์ portfolioData.js เพื่อใช้ใน Component นี้
// import { bmoCommands, projectPhilosophy } from './data/portfolioData' 

// นำเข้า custom hook สำหรับจัดการ Dark/Light Mode
import useTheme from "./hooks/useTheme"; 
function App() {

// เรียกใช้ custom hook เพื่อได้ theme ปัจจุบันและฟังก์ชัน toggle
const { theme, toggleTheme } = useTheme(); 

  return (
    // เราจะใช้ theme และ toggleTheme ในส่วนต่างๆของแอป เช่น ปุ่มสลับโหมด หรือการตั้งค่า class สำหรับ Tailwind
    <div className="min-h-screen bg-white dark:bg-gray-900"> 
      {/* Section ต่างๆ จะมาอยู่ตรงนี้ใน Phase 10 */}
    </div>
  )
}

// export default คือการส่งออก Component นี้
// เพื่อให้ไฟล์อื่น (main.jsx) นำไปใช้ได้
export default App