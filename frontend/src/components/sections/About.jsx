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
      {/* <div className="max-w-2xl w-full"> */}

      {/* กล่องเนื้อหากลางหน้า ใส่ Glassmorphism ให้กล่องเนื้อหา*/}
      <div
        className="
        max-w-5xl w-full
        backdrop-blur-md
       bg-white/30 dark:bg-dark/40
        rounded-3xl
        p-10
        border border-white/30 dark:border-white/10
      "
      >
        {/* --- Title --- */}
        <motion.h2
          className="text-7xl font-bold text-jake mb-10 tracking-widest"
          //         style={{
          //   textShadow: "2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white"
          // }}
          style={{
            textShadow: "var(--hero-shadow)",
          }}
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
            className="text-2xl leading-relaxed mb-6 text-gray-600 dark:text-gray-300  tracking-wider"
            style={{
              textShadow: "var(--content-shadow)",
            }}
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
