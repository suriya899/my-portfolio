// Hero.jsx
// ใช้ framer-motion สำหรับ animation เข้าหน้า

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react"; // ไอคอน scroll ลง
import { personalInfo } from "../../data/portfolioData";

const Hero = () => {
  // ดึงข้อมูลจาก portfolioData
  const { name, role, tagline } = personalInfo; // ✅ ใช้ตรงๆ ไม่ต้องผ่าน .personalInfo

  // ฟังก์ชัน smooth scroll ไปยัง section ที่ต้องการ
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      /* เต็มความสูงหน้าจอ */
      /* จัดกึ่งกลางแนวตั้ง */
      /* จัดกึ่งกลางแนวนอน */
      /* เพื่อให้ scroll indicator position absolute ได้ */
      /* สีพื้นหลัง light/dark */
      /* padding ซ้ายขวา */
      /* เว้นพื้นที่ Navbar */
      // className="
      //           min-h-screen
      //           flex items-center
      //           justify-center
      //           relative
      //           bg-white dark:bg-dark
      //           px-6
      //           pt-20
      //       "

      //ทำพืนหลังต้นไม้ เลยลบ bg-white dark:bg-dark ออก
      className="
                  min-h-screen          
                  flex items-center     
                  justify-center        
                  relative              
                  px-6                  
                  pt-20                 
                "
    >
      {/* กล่องหลัก — จัดเนื้อหาให้อยู่กึ่งกลาง */}
      {/* <div className="max-w-3xl w-full text-center"> */}

      {/* กล่องหลัก — จัดเนื้อหาให้อยู่กึ่งกลาง และ  ใส่ Glassmorphism ให้กล่องเนื้อหา*/}
      <div
        className="
        max-w-5xl w-full text-center
        backdrop-blur-md
       bg-white/30 dark:bg-dark/40
        rounded-3xl
        p-10
        border border-white/30 dark:border-white/10
        "
      >
        {/* 👋 บรรทัดทักทาย — เด้งเข้ามาก่อน */}
        <motion.p
          className="text-finn font-mono text-3xl mb-3" /* font-mono ให้ดูเหมือนโค้ด */
          style={{
            textShadow: "var(--content-shadow)",
          }}
          initial={{ opacity: 0, y: -20 }} /* เริ่มจากด้านบน โปร่งใส */
          animate={{ opacity: 1, y: 0 }} /* เลื่อนลงมา + ปรากฏ */
          transition={{ duration: 0.5 }}
        >
          Hi, I'm
        </motion.p>

        {/* 🌟 ชื่อใหญ่ — element ที่สำคัญที่สุด */}
        <motion.h1
          className="
            text-5xl md:text-8xl   /* ใหญ่มาก — responsive */
            font-black             /* หนาสุด */
            text-dark dark:text-white
            mb-4 tracking-widest
          "
          style={{
            textShadow: "var(--hero-shadow)",
          }}
          initial={{ opacity: 0, scale: 0.8 }} /* เริ่มเล็กกว่าปกติ */
          animate={{ opacity: 1, scale: 1 }} /* ขยายมาขนาดจริง */
          transition={{
            duration: 0.6,
            delay: 0.2,
          }} /* delay เล็กน้อยหลัง "Hi" */
        >
          {/* ชื่อ "Jack" สีปกติ, "Suriya" สี Jake Yellow */}
          {name.split(" ")[0]}{" "}
          <span className="text-jake">{name.split(" ")[1]}</span>
        </motion.h1>

        {/* 💼 Role/ตำแหน่ง */}
        <motion.p
          className="
            text-xl md:text-2xl
            text-bubblegum         
            font-semibold
            mb-6
            tracking-wider
          "
          style={{
            textShadow: "var(--content-shadow)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {role}
        </motion.p>

        {/* 📝 Tagline — ประโยคอธิบายตัวเอง */}
        <motion.p
          /* max-w-xl mx-auto  จำกัดความกว้าง + จัดกึ่งกลาง */
          /* leading-relaxed ระยะห่างบรรทัด */
          className="
            text-base md:text-lg
            text-gray-500 dark:text-gray-400
            max-w-xl mx-auto       
            mb-10
            leading-relaxed
            tracking-widest        
          "
          style={{
            textShadow: "var(--content-shadow)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {tagline}
        </motion.p>

        {/* 🔘 ปุ่ม 2 ปุ่ม */}
        <motion.div
          className="flex gap-4 justify-center flex-wrap" /* flex-wrap รองรับหน้าจอเล็ก */
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* ปุ่มหลัก — ไปที่ Projects */}
          <button
            onClick={() => scrollTo("projects")}
            /* พื้นเหลือง ตัวอักษรดำ */
            /* rounded-full มนๆ แบบ cartoon */
            /* hover:scale-105  ขยายเล็กน้อยเมื่อ hover */
            className="
              bg-jake text-dark      
              font-bold
              px-8 py-3
              rounded-full           /* มนๆ แบบ cartoon */
              hover:scale-105        /* ขยายเล็กน้อยเมื่อ hover */
              transition-transform duration-200
              cursor-pointer
              tracking-wider
            "
            style={{
              textShadow:
                "1px 1px 0px white, -1px -1px 0px white, 1px -1px 0px white, -1px 1px 0px white",
            }}
          >
            View My Work
          </button>

          {/* ปุ่มรอง — ไปที่ Contact */}
          <button
            onClick={() => scrollTo("contact")}
            /* hover แล้วเติมสี */
            className="
              border-2 border-finn   
              text-finn
              font-bold
              px-8 py-3
              rounded-full
              hover:bg-finn          
              hover:text-white
              transition-all duration-200
              cursor-pointer
              tracking-wider
            "
            style={{
              textShadow: "var(--content-shadow)",
            }}
          >
            Contact Me
          </button>
        </motion.div>
      </div>

      {/* ⬇️ Scroll Indicator — บอกให้ผู้ใช้รู้ว่าเลื่อนลงได้ */}
      <motion.div
        /* absolute bottom-8  ติดขอบล่าง */
        /* left-1/2 -translate-x-1/2 จัดกึ่งกลางแนวนอน */
        className="
          absolute bottom-8         
          left-1/2 -translate-x-1/2 /* จัดกึ่งกลางแนวนอน */
          flex flex-col items-center
          text-gray-400
          cursor-pointer
        "
        onClick={() => scrollTo("about")} /* คลิกแล้วเลื่อนไป About */
        animate={{ y: [0, 8, 0] }} /* animation กระเด้งขึ้นลง */
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <span className="text-xs mb-1 font-mono">scroll</span>
        <ArrowDown size={16} />
      </motion.div>
    </section>
  );
};

export default Hero;
