// Contact.jsx
// Phase 9: Contact Section — Prismo + Form + Toast

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Send } from "lucide-react";
import { personalInfo } from "../../data/portfolioData";
import prismoImg from "../../assets/prismo.png";

// --- Animation variants ---
// fadeUp: ใช้กับทุก element ที่ควร slide ขึ้นมาตอน scroll เข้ามา
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition:{ duration: 0.6, ease: "easeOut"},
    },
};

export default function Contact() {
    // --- State สำหรับเก็บค่าใน Form ---
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    // isLoading: ป้องกันกด Submit ซ้ำตอนกำลังส่ง
    const [isLoading, setIsLoading] = useState(false);

    // --- handleChange: อัปเดต state ทุกครั้งที่พิมพ์ ---
    // ใช้ [e.target.name] เพื่อให้ทำงานกับทุก field ในครั้งเดียว
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // --- handleSubmit: ส่งข้อมูล Form ---
    const handleSubmit = async (e) => {
        e.preventDefault(); // ป้องกัน browser reload หน้า

        // Validation เบื้องต้น
        if (!formData.name || !formData.email || !formData.message) {
            toast.error("Please fill in all fields!")
            return;
        }

        setIsLoading(true);
        // try{
        //     // 🔜 Phase 11: จะเปลี่ยน URL นี้เป็น Backend จริง
        //     // ตอนนี้ simulate ส่งสำเร็จก่อน
        //     await new Promise((resolve) => setTimeout(resolve, 1000));

        //     toast.success("Message sent! I'll get back to you soon 🌟");

        //     // Reset form หลังส่งสำเร็จ
        //     setFormData({ name: "", email: "", message: "" });
        // } catch (error) {
        //     toast.error("Something went wrong. Please try again!");
        // } finally {
        //     // ไม่ว่าจะ success หรือ error ก็ปิด loading
        //     setIsLoading(false);
        // }

        try{
            // ส่ง POST request ไปที่ Backend จริง
            const response = await fetch("http://localhost:3001/api/contact", {
                method: "POST",
                // บอก Backend ว่าเราส่งข้อมูลแบบ JSON
                headers: { "Content-Type": "application/json" },
                // แปลง object → JSON string ก่อนส่ง
                body: JSON.stringify(formData),

            });
            // แปลง response กลับมาเป็น object เพื่ออ่านข้อมูล
            const data = await response.json();

            // response.ok = true เมื่อ status 200-299 (เช่น 201 Created)
            if (response.ok) {
                toast.success("Message sent! I'll get back to you soon 🌟");
                // Reset form หลังส่งเสร็จ
                setFormData({ name: "", email: "", message: "" });
            } else {
                // Backend ตอบ error กลับมา เช่น 400 validation fail
                toast.error(data.error || "Something went wrong. Please try again!");
                }

            } catch (error) {
                // Network error เช่น Backend ไม่ได้รัน
                toast.error("Cannot connect to server. Please try again!");

            } finally {
                // ไม่ว่าจะ success หรือ error ก็ปิด loading
                setIsLoading(false);
            }
    };
        
        return (
            <section
                id="contact"
                className="min-h-screen bg-white dark:bg-dark py-20 px-6"
            >
                <div className="max-w-5xl mx-auto">

                    {/* --- Section Title --- */}
                    <motion.h2
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-center text-dark dark:text-jake mb-4"
                    >
                        contact
                    </motion.h2>

                    {/* --- Subtitle --- */}
                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center text-gray-500 dark:text-gray-400 mb-14"
                    >
                        Want to know more? Let's talk ✨
                    </motion.p>

                    {/* --- Main Content: Prismo + Form --- */}
                    {/* flex-col บน mobile, flex-row บน desktop */}
                    <div className="flex flex-col md:flex-row items-center gap-12">

                        {/* --- Prismo Image (ซ้าย) --- */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="flex-1 flex justify-center"
                        >
                          {/* relative + z-10 เพื่อให้ glow อยู่ข้างหลัง */}
                          <div className="relative">
                            {/* Glow effect: absolute วางทับข้างหลังรูป */}
                            <div className="absolute inset-0 rounded-full blur-3xl opacity-40 bg-bubblegum scale-75" />

                            {/* รูป Prismo จริง */}
                            <img
                                src={prismoImg}
                                alt="Prismo mascot"
                                className="relative z-10 w-64 md:w-[32rem] drop-shadow-2xl"
                            />
                            </div>
                        </motion.div>

                        {/* --- Contact Form (ขวา) --- */}
                        <motion.form
                            onSubmit={handleSubmit}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="flex-1 w-full flex flex-col gap-4"
                        >
                            {/* Name Input */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name" // ต้องตรงกับ key ใน formData
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    className="
                                    px-4 py-3 rounded-xl border border-gray-200
                                    dark:border-gray-700 dark:bg-gray-900
                                    dark:text-white focus:outline-none
                                    focus:ring-2 focus:ring-finn
                                    transition-all duration-200
                                    "
                                />
                            </div>

                            {/* Email Input */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    className="
                                    px-4 py-3 rounded-xl border border-gray-200
                                    dark:border-gray-700 dark:bg-gray-900
                                    dark:text-white focus:outline-none
                                    focus:ring-2 focus:ring-finn
                                    transition-all duration-200
                                    "
                                />
                            </div>

                            {/* Message Textarea */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Message
                                </label>
                                <textarea   
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="feel free to contact me 😊"
                                    rows={5}
                                    className="px-4 py-3 rounded-xl border border-gray-200
                                    dark:border-gray-700 dark:bg-gray-900
                                    dark:text-white focus:outline-none
                                    focus:ring-2 focus:ring-finn
                                    transition-all duration-200 resize-none
                                    "
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="
                                flex items-center justify-center gap-2
                                bg-finn text-white font-semibold
                                py-3 px-6 rounded-xl
                                hover:opacity-90 active:scale-95
                                transition-all duration-200
                                disabled:opacity-50 disabled:cursor-not-allowed
                                "
                            >
                                {/* แสดง Loading หรือ Icon ตาม state */}
                                {isLoading ? (
                                    "Sending..."
                                ) : (
                                    <>
                                    <Send size={18} />
                                    Send Message
                                    </>
                                )}
                            </button>

                        </motion.form>
                </div>

                {/* --- Footer เล็กๆ ด้านล่าง --- */}
                <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center text-gray-400 text-sm mt-16"
                >
                    Or reach me directly at{" "}

                    <a
                        href={`mailto:${personalInfo.email}`}
                        className="text-finn hover:underline"
                    >
                        {personalInfo.email}
                    </a>
                    </motion.p>
                    </div>
            </section>
        );

        }