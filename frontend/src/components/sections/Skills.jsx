// frontend/src/components/sections/Skills.jsx

import { useState, useRef, useEffect } from "react";
// useState → เก็บ input ที่ user พิมพ์ + history ของ terminal
// useRef  → อ้างถึง DOM element (input box, scroll area)
// useEffect → auto-scroll terminal ลงล่างทุกครั้งที่มี output ใหม่

import { motion } from "framer-motion";
// ใช้ทำ animation ตอน section เลื่อนเข้ามาในจอ

import {
  skillPhilosophy,
  bmoCommands,
  bmoUnknownCommand,
} from "../../data/portfolioData";
// ดึงข้อมูลจาก portfolioData แบบ named import (ห้ามใช้ default import!)

import { Terminal } from "lucide-react";
// ไอคอน Terminal สำหรับหัว BMO Terminal

export default function Skills() {
  // เก็บข้อความที่ user กำลังพิมพ์อยู่
  const [input, setInput] = useState("");

  // เก็บประวัติคำสั่ง + ผลลัพธ์ทั้งหมดใน terminal
  // แต่ละ item มี: { type: "input" | "output", text: string | string[] }
  const [history, setHistory] = useState([
    {
      type: "output",
      // ข้อความต้อนรับตอนเปิด terminal ครั้งแรก
      text: ["BMO Terminal v1.0 🤖", 'พิมพ์ "help" เพื่อดูคำสั่งทั้งหมด'],
    },
  ]);

  // ref ไว้ชี้ไปที่ input element → ใช้ focus() ได้
  const inputRef = useRef(null);

//   // ref ไว้ชี้ไปที่ส่วนล่างสุดของ terminal → ใช้ scroll ลงล่าง
//   const bottomRef = useRef(null);

// ✅ เพิ่มแทน — ชี้ไปที่กล่อง terminal
const terminalRef = useRef(null);

//   // ทุกครั้งที่ history เปลี่ยน → scroll ลงล่างอัตโนมัติ
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [history]);

// ✅ ใหม่ — เลื่อนแค่ใน terminal box
useEffect(() => {
  if (terminalRef.current) {
    terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    // scrollHeight = ความสูงทั้งหมดของเนื้อหาใน box
    // scrollTop = เลื่อนไปที่ล่างสุดของ box นั้น
  }
}, [history]);



  // ฟังก์ชันแปลงคำสั่งเป็น output
  function handleCommand(cmd) {
    // แปลงเป็นตัวพิมพ์เล็กและตัดช่องว่างหัวท้าย
    const trimmed = cmd.trim().toLowerCase();

    // ✅ กรณีพิเศษ: clear → ล้าง history แล้วจบเลย
    if (trimmed === "clear") {
        setHistory([
            {
                type: "output",
                text: ['BMO Terminal v1.0 🤖', 'พิมพ์ "help" เพื่อดูคำสั่งทั้งหมด'],
            },
        ]);
        setInput("");
        return; // ← หยุดที่นี่ ไม่ต้องทำต่อ
    }

    // หา output จาก bmoCommands ตาม key ที่ตรงกับที่พิมพ์
    // ถ้าไม่เจอ key → ใช้ bmoUnknownCommand แทน
    const response = bmoCommands[trimmed] ?? [bmoUnknownCommand];

    // อัพเดท history: เพิ่ม input ที่พิมพ์ + output ที่ได้
    setHistory((prev) => [
      ...prev,
      { type: "input", text: cmd }, //บรรทัดที่ user พิมพ์
      { type: "output", text: response }, //ผลลัพธ์จาก BMO
    ]);

    // ล้าง input box หลังกด Enter
    setInput("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && input.trim() !== "") {
      handleCommand(input);
    }
  }

  return (
    <section
      id="skills"
      className="min-h-screen bg-white dark:bg-dark py-24 px-6"
      // คลิกที่ section → focus input ของ terminal ทันที
      onClick={() => inputRef.current?.focus()}
    >
      <div className="max-w-3xl mx-auto">
        {/* === ส่วน 1: skillPhilosophy === */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          {/* หัวข้อ Section */}
          <h2 className="text-3xl font-bold text-dark dark:text-jake mb-6">
            {skillPhilosophy.title}
          </h2>

          {/* paragraph จาก portfolioData */}
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
            {skillPhilosophy.description}
          </p>
        </motion.div>

        {/* === ส่วน 2: BMO Terminal === */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* กล่อง Terminal ทั้งหมด */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xl">
            {/* --- แถบหัว Terminal --- */}
            <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 flex items-center gap-3">
              {/* จุดสีแบบ macOS */}
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </div>

              {/* ชื่อ Terminal + ไอคอน */}
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                <Terminal size={14} />
                <span>bmo-terminal</span>
              </div>
            </div>

            {/* --- พื้นที่แสดงผล Terminal --- */}
            <div
            ref={terminalRef}
              className="bg-dark text-grass font-mono text-sm p-4 h-72 overflow-y-auto"
              // h-72 → ความสูงคงที่ / overflow-y-auto → scroll ได้
            >
              {/* วน render ทุก item ใน history */}
              {history.map((item, index) => (
                <div key={index} className="mb-1">
                  {item.type === "input" ? (
                    // บรรทัดที่ user พิมพ์ → ขึ้นต้นด้วย "> "
                    <p className="text-jake">
                      <span className="text-finn">{">"} </span>
                      {item.text}
                    </p>
                  ) : (
                    // output → วน render ทุกบรรทัดใน array
                    item.text.map((line, i) => (
                      <p key={i} className="text-grass">
                        {line}
                      </p>
                    ))
                  )}
                </div>
              ))}

            </div>

            {/* --- Input bar ด้านล่าง --- */}
            <div className="bg-dark border-t border-gray-700 px-4 py-3 flex items-center gap-2">
              {/* prompt symbol */}
              <span className="text-finn font-mono text-sm">{">"}</span>

              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="พิมพ์คำสั่ง เช่น help, whoisjack, skills..."
                className="
                  flex-1 bg-transparent text-grass font-mono text-sm
                  outline-none placeholder-gray-600
                "
                // autoFocus → focus input ทันทีที่ section โหลด
                // autoFocus
              />
            </div>
          </div>

          {/* คำแนะนำเล็กๆ ใต้ terminal */}
          <p className="text-center text-gray-400 text-xs mt-3">
            💡 ลองพิมพ์: help · hello · whoisjack · skills · stack · contact
          </p>
        </motion.div>
      </div>
    </section>
  );
}
