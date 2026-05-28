// portfolioData.js — ไฟล์เก็บข้อมูลทั้งหมดของ Portfolio
// เราแยกข้อมูลออกจาก UI เพื่อให้แก้ไขง่าย

// --- ข้อมูลส่วนตัว ---
// ใช้ใน Hero section และส About section
export const personalInfo = {
  name: "Jack Suriya",
  role: "Full Stack Developer",
  tagline: "Light up the dream for a beautiful world.",
  email: "suriya.rup@gmail.com",
  github: "https://github.com/suriya899",
  // about เป็น array เพื่อให้ .map() เป็นหลาย paragraph ใน About Section ได้
  about: [
    "Hello, I'm Jack Suriya,",
    "Junior Full-Stack Developer leveraging Marketing insights...",
    "Eager to learn and contribute to innovative tech teams",
    "I love Adventure Time and believe that good code should be as easy to read as a cartoon. 🗡️",
  ],
};

// --- ข้อความแทน Skills Section ---
// ไม่ได้แสดงเป็นการ์ดหรือ progress bar แล้ว
// แต่เล่าทัศนคติการเรียนรู้แทน เพราะมันสื่อตัวตนได้ดีกว่าตัวเลข

export const skillPhilosophy = {
  title: "My Tech Journey",
  // paragraph สั้นๆ ที่บอกว่ากำลังเรียนรู้อะไรอยู่
  description: `I'm currently focused on mastering the React and Node.js ecosystem.
    Rather than just listing skills, I prefer to demonstrate my progress
    through the interactive elements of this site — try talking to BMO below! 👇`,
};

// --- คำสั่งของ BMO Terminal ---
// BMO Terminal อยู่ใน Skills Section
// key คือคำที่ผู้ใช้พิมพ์ (ต้องเป็น lowercase ทั้งหมด เพื่อให้ match ง่าย)
// response คือข้อความที่ BMO จะตอบกลับ

export const bmoCommands = {
  help: [
    "📋 Available commands:",
    " hello         - say hi to BMO",
    " whoisjack     - learn about Jack",
    " skills        - what Jack is learning",
    " stack         - tech stack ที่ใช้",
    " contact       - how to reach Jack",
    " clear         - clear the terminal",
  ],

  hello: [
    "👾 BEEP BOOP! Hello friend!",
    "I'm BMO! Jack's trusty companion.",
    "Type 'help' to see what I can do!",
  ],

  whoisjack: [
    "🧑‍💻 Jack Suriya — Junior Full Stack Developer",
    "• Actively mastering React + Node.js",
    "• Believing that hands-on building matters more than theory",
    "• Big Adventure Time fan (as you can probably tell from this site! 😄)",
  ],

  skills: [
    "⚡ What Jack is currently learning:",
    "• Frontend: HTML, CSS, React, Tailwind CSS, Framer Motion",
    "• Backend:  Node.js, Express, REST API",
    "• Database: PostgreSQL, mongoDB",
    "• Tools:    Git, Vite, VS Code",
  ],

  stack: [
    "🛠️ This portfolio is built with:",
    "• React + Vite       — Frontend",
    "• Tailwind CSS       — Styling",
    "• Framer Motion      — Animation",
    "• Node.js + Express  — Backend",
    "• PostgreSQL         — Database",
  ],

  contact: [
    "📬 Want to reach Jack?",
    "• Scroll down to the Contact section",
    "• Or email: suriya.rup@gmail.com",
    "• GitHub:   github.com/suriya899",
    "Prismo is waiting for your message... 🌀",
  ],
};

// คำสั่งที่ไม่รู้จัก — BMO จะตอบแบบนี้
// แยกออกมาต่างหากเพื่อให้แก้ข้อความได้ง่าย ไม่ต้องไปแก้ใน Component

export const bmoUnknownCommand =
  "❓ BMO doesn't understand that command. Type 'help' to see available commands!";

export const projectPhilosophy = {
  title: "My Work",
  paragraphs: [
    `I am currently developing this portfolio as my primary project, 
    utilizing a full-stack approach with React, Node.js, and PostgreSQL. 
    Every feature on this site is a reflection of the skills I am actively honing.`,

    `I believe that completing small, tangible tasks is far better than 
    planning something grand but never starting—and I am proving that right here. 🚀`,
  ],
};

// --- ข้อมูล Navigation ---
// ใช้ใน Navbar.jsx โดย .map() สร้างลิงก์จาหกอาร์เรย์นี้
// href ต้องตรงกับ id ของแต่ละ section เสมอ

export const navLinks = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Work" },
  { id: "contact", label: "Contact" },
];
