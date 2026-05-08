// src/App.jsx
// นี่คือ Component หลักของแอป ทุกอย่างจะถูกรวมมาที่นี่

// นำเข้าข้อมูลจากไฟล์ portfolioData.js เพื่อใช้ใน Component นี้
import { bmoCommands, projectPhilosophy } from './data/portfolioData' 
function App() {
  console.log(bmoCommands)
console.log(projectPhilosophy)
  return (
    // div นี้คือ container ครอบทุกอย่าง
    <div>
      <h1>🎮 Portfolio กำลังสร้าง...</h1>
    </div>
  )
}

// export default คือการส่งออก Component นี้
// เพื่อให้ไฟล์อื่น (main.jsx) นำไปใช้ได้
export default App