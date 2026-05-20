// Hero.jsx

// import motion สำหรับ animation
import { motion } from "framer-motion";

// import projectPhilosophy จาก portfolioData
// ⚠️ ใช้ Named Export เสมอ ห้ามใช้ import portfolioData from "..."
import { projectPhilosophy } from "../../data/portfolioData";

// --- Animation Variants ---

// container: ควบคุม stagger ของ children (ทยอยโผล่ทีละตัว)
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2, // แต่ละ child ห่างกัน 0.2 วินาที
        },
    },

};

// item: แต่ละ paragraph โผล่จากล่างขึ้นบน + fade in
const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

// --- Component ---
export default function Projects() {
    return (
        // section หลัก — id="projects" ให้ Navbar scroll มาหาได้
        <section
            id="projects"
            className="min-h-screen flex flex-col justify-center
                        px-6 py-24 bg-white dark:bg-dark"
        >
            {/* wrapper จำกัดความกว้าง + จัดกลาง */}
            <div className="max-w-3xl mx-auto w-full">

                {/* === หัวข้อ Section === */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    
                    {/* ชื่อ Section — ดึงจาก projectPhilosophy.title */}
                    <h2 className="text-4xl font-bold text-dark dark:text-jake mb-10">
                        {projectPhilosophy.title}
                    </h2>
                    </motion.div>

                    {/* === Paragraphs (Philosophy) === */}
                    {/* ใช้ motion.div เป็น container เพื่อทำ stagger */}

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="space-y-6" // ช่องว่างระหว่าง paragraph
                    >
                        {/* วน loop แต่ละ paragraph ใน projectPhilosophy.paragraphs[] */}
                        {projectPhilosophy.paragraphs.map((para, index) => (
                            <motion.p
                                key={index}
                                variants={itemVariants} // ใช้ itemVariants ที่กำหนดไว้ด้านบน
                                className="text-lg leading-relaxed text-gray-600 dark:text-gray-300"
                            >
                                {para}
                            </motion.p>
                        ) )}
                        </motion.div>

                        {/* === Divider เส้นตกแต่ง === */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale:1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            style={{ originX: 0 }} // เส้นขยายจากซ้ายไปขวา
                            className="mt-12 h-1 bg-gradient-to-r
                                        from-jake via-finn to-bubblegum
                                        rounded-full"
                        />

                        {/* === ข้อความท้าย Section === */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="mt-6 text-sm font-mono text-gray-400 dark:text-gray-500"
                            >
                                — more adventures loading...
                            </motion.p>
            </div>
        </section>
    );
}