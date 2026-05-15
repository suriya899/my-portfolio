// About.jsx
// แสดง Section แนะนำตัว Jack ดึงข้อมูลจาก personalInfo.about[]
import { motion } from "framer-motion";
import { personalInfo } from "../../data/portfolioData";
// ✅ ใช้ Named Import เสมอ — portfolioData.js ไม่มี default export

export default function About() {
  return (
    // section id="about" เพื่อให้ Navbar scroll มาหาได้
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-6 py-20"
    >
      {/* กล่องเนื้อหากลางหน้า จำกัดความกว้างสูงสุดที่ 2xl */}
      <div className="max-w-2xl w-full">
        {/* --- Title --- */}
        <motion.h2
          className="text-4xl font-bold text-jake mb-10"
          // fade + เลื่อนขึ้นมาจากด้านล่าง
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          // whileInView = animate เมื่อ element เข้ามาใน viewport
          viewport={{ once: true }}
          // once: true = animate แค่ครั้งเดียว ไม่ repeat
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>

        {/* --- Paragraphs --- */}
        {/* personalInfo.about คือ array of strings */}
        {/* .map() วนสร้าง <p> ทีละ paragraph */}
        {personalInfo.about.map((paragraph, index) => (
          <motion.p
            key={index}
            // key ต้องไม่ซ้ำกัน ใช้ index เพราะ paragraph ไม่มี id
            className="text-lg leading-relaxed mb-6 text-dark dark:text-white opacity-80"
            // leading-relaxed = ระยะห่างบรรทัดสบายตา
            // opacity-80 = ลดความเข้มนิดหน่อยให้ดูนุ่มขึ้น
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            // delay แต่ละ paragraph ตามลำดับ เพื่อให้ไหลทีละอัน
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            {paragraph}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
