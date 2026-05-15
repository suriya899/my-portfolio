// // src/App.jsx
// // นี่คือ Component หลักของแอป ทุกอย่างจะถูกรวมมาที่นี่

// // นำเข้าข้อมูลจากไฟล์ portfolioData.js เพื่อใช้ใน Component นี้
// // import { bmoCommands, projectPhilosophy } from './data/portfolioData'

// // นำเข้า custom hook สำหรับจัดการ Dark/Light Mode
// import useTheme from "./hooks/useTheme";
// function App() {
//   // เรียกใช้ custom hook เพื่อได้ theme ปัจจุบันและฟังก์ชัน toggle
//   const { theme, toggleTheme } = useTheme();

//   return (
//     // เราจะใช้ theme และ toggleTheme ในส่วนต่างๆของแอป เช่น ปุ่มสลับโหมด หรือการตั้งค่า class สำหรับ Tailwind
//     <div className="min-h-screen bg-white dark:bg-gray-900">
//       {/* Section ต่างๆ จะมาอยู่ตรงนี้ใน Phase 10 */}
//     </div>
//   );
// }

// // export default คือการส่งออก Component นี้
// // เพื่อให้ไฟล์อื่น (main.jsx) นำไปใช้ได้
// export default App;

// frontend/src/App.jsx (ชั่วคราวสำหรับทดสอบ Phase 4)

// import Navbar from "./components/ui/Navbar";

// function App() {
//   return (
//     // min-h-screen ให้หน้าสูงพอที่จะ scroll ทดสอบ
//     <div className="min-h-screen bg-white dark:bg-dark transition-colors">
//       <Navbar />

//       {/* Section จำลองเพื่อทดสอบ smooth scroll และ active highlight */}
//       <section id="hero" className="min-h-screen flex items-center justify-center">
//         <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Hero Section</h1>
//       </section>

//       <section id="about" className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
//         <h1 className="text-4xl font-bold text-gray-800 dark:text-white">About Section</h1>
//       </section>

//       <section id="skills" className="min-h-screen flex items-center justify-center">
//         <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Skills Section</h1>
//       </section>

//       <section id="projects" className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
//         <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Projects Section</h1>
//       </section>

//       <section id="contact" className="min-h-screen flex items-center justify-center">
//         <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Contact Section</h1>
//       </section>
//     </div>
//   );
// }

// export default App;

import Navbar from "./components/ui/Navbar";
import Hero from "./components/sections/Hero"; // ← เพิ่มบรรทัดนี้

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark transition-colors">
      <Navbar />

      {/* ✅ เปลี่ยน placeholder เป็น Hero จริงๆ */}
      <Hero />

      {/* Section จำลองที่เหลือ — ยังคงไว้ทดสอบ Navbar scroll */}
      <section id="about" className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">About Section</h1>
      </section>

      <section id="skills" className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Skills Section</h1>
      </section>

      <section id="projects" className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Projects Section</h1>
      </section>

      <section id="contact" className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Contact Section</h1>
      </section>
    </div>
  );
}

export default App;