# 🌟 Jack Suriya — Portfolio Website

> *"Light up the dream for a beautiful world."*

A full-stack portfolio website built with React and Node.js, inspired by the **Adventure Time** cartoon universe. Features an interactive BMO Terminal, parallax background with day/night themes, glassmorphism UI, and a fully connected contact form backed by PostgreSQL.

---

## 🚀 Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19.2.5 | UI Framework |
| Vite | 8.0.10 | Build tool & dev server |
| Tailwind CSS | 4.2.4 | Utility-first styling |
| Framer Motion | 12.38.0 | Animations & transitions |
| react-hot-toast | 2.6.0 | Toast notifications |
| lucide-react | 1.14.0 | Icon library |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js + Express | 5.2.1 | REST API server |
| PostgreSQL + pg | 8.21.0 | Database & connection pool |
| dotenv | 17.4.2 | Environment variable management |
| cors | 2.8.6 | Cross-origin resource sharing |
| nodemon | 3.1.14 | Dev auto-restart |

---

## 🎨 Design System

### Adventure Time Color Palette
```css
--color-jake:       #FFD60A   /* Jake Yellow  — หัวข้อ, ปุ่มหลัก, active nav */
--color-finn:       #00B4D8   /* Finn Blue    — accent, border, link */
--color-bubblegum:  #FF85A1   /* Bubblegum    — role/subtitle text */
--color-grass:      #57CC99   /* Grass Green  — BMO terminal output */
--color-dark:       #0D1B2A   /* Night Dark   — dark mode background */
```

### Typography
- **Font:** Bangers (Google Fonts) — cartoon-style display font
- **Tracking:** `tracking-wider` ถึง `tracking-widest` ทั่วทั้งเว็บ

### CSS Variables — Text Shadow
```css
/* Light mode: ตัวอักษรสีเข้ม เงาสีขาวเพื่อให้อ่านออกบนพื้นหลังต้นไม้ */
--hero-shadow:    3px 3px 0px white, -3px -3px 0px white, ...;
--content-shadow: 1px 1px 0px white, -1px -1px 0px white, ...;

/* Dark mode: ตัวอักษรสีขาว เงาสีดำโปร่งแสง */
--hero-shadow:    3px 3px 0px rgba(0,0,0,0.8), ...;
--content-shadow: 1px 1px 0px rgba(0,0,0,0.8), ...;
```

---

## 📁 Project Structure

```
my-portfolio/
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── sections/
│       │   │   ├── Hero.jsx
│       │   │   ├── About.jsx
│       │   │   ├── Skills.jsx
│       │   │   ├── Projects.jsx
│       │   │   └── Contact.jsx
│       │   └── ui/
│       │       ├── Navbar.jsx
│       │       ├── ThemeToggle.jsx
│       │       └── ParallaxBackground.jsx
│       ├── data/
│       │   └── portfolioData.js    ← ข้อมูลทั้งหมดแยกออกจาก UI
│       ├── hooks/
│       │   └── useTheme.js
│       ├── assets/
│       │   ├── prismo.png
│       │   ├── tree-day.png
│       │   └── tree-night.png
│       ├── App.jsx
│       └── index.css
└── backend/
    ├── src/
    │   ├── db.js
    │   └── routes/
    │       └── contactRoutes.js
    ├── server.js
    └── schema.sql
```

---

## 🗂️ Data Architecture — `portfolioData.js`

ข้อมูลทั้งหมดถูกแยกออกจาก UI component ไว้ในไฟล์เดียว เพื่อให้แก้ไขได้ง่ายโดยไม่ต้องแตะ component

ทุก export เป็น **Named Export** (ไม่มี default export):

```js
export const personalInfo      // ชื่อ, role, tagline, email, github, about[]
export const skillPhilosophy   // title, description สำหรับ Skills section
export const bmoCommands       // คำสั่ง BMO Terminal (help, hello, whoisjack, ...)
export const bmoUnknownCommand // ข้อความเมื่อพิมพ์คำสั่งที่ไม่รู้จัก
export const projectPhilosophy // title, paragraphs[] สำหรับ Projects section
export const navLinks          // [{ id, label }] สำหรับ Navbar
```

---

## 🧩 Sections

### 🔝 Navbar
**ไฟล์:** `components/ui/Navbar.jsx`

**เทคนิคที่ใช้:**
- `navLinks.map()` — วนสร้าง nav button จาก array ใน portfolioData แทนการ hardcode
- `getBoundingClientRect()` — detect ว่า section ไหนอยู่ใน viewport เพื่อ highlight active nav
- `scroll event listener` — track ตำแหน่ง scroll แบบ real-time
- `useState` + `isOpen` — จัดการ hamburger menu บน mobile
- `Glassmorphism Navbar` — `backdrop-blur-md bg-white/80 dark:bg-dark/80`
- `useTheme` hook + `ThemeToggle` component — สลับ dark/light mode

```jsx
// ตัวอย่าง: สร้าง nav ทั้งหมดจากข้อมูล ไม่ hardcode
{navLinks.map((link) => (
  <button
    key={link.id}
    onClick={() => scrollToSection(link.id)}
    className={activeSection === link.id ? "text-jake" : "text-gray-600"}
  >
    {link.label}
  </button>
))}
```

---

### 🦸 Hero
**ไฟล์:** `components/sections/Hero.jsx`

**เทคนิคที่ใช้:**
- `personalInfo` จาก portfolioData — ดึงชื่อ, role, tagline มาแสดง
- `name.split(" ")` — แยกชื่อ "Jack Suriya" → แสดงสีต่างกัน (ขาว / เหลือง)
- `framer-motion animate` — animation เข้าหน้าครั้งแรก (ไม่ใช้ whileInView เพราะ section นี้โหลดมาแสดงเลย)
- `staggered delay` — แต่ละ element เด้งเข้ามาทีละอัน (delay 0.2, 0.4, 0.6, 0.8)
- `Glassmorphism card` — ห่อ content ด้วยกล่องแก้วโปร่งแสง
- `CSS Variable --hero-shadow` — text shadow เปลี่ยนตาม light/dark mode

```jsx
// แยกชื่อแล้วใส่สีต่างกัน
{name.split(" ")[0]}{" "}
<span className="text-jake">{name.split(" ")[1]}</span>
```

---

### 👤 About
**ไฟล์:** `components/sections/About.jsx`

**เทคนิคที่ใช้:**
- `personalInfo.about.map()` — วนสร้าง `<p>` จาก array of strings แทนการ hardcode ข้อความ
- `whileInView` — animate เมื่อ scroll มาถึง section (viewport: once)
- `staggered delay` — แต่ละ paragraph โผล่ทีละอัน (`delay: index * 0.15`)
- `Glassmorphism card` — `max-w-5xl backdrop-blur-md`

```jsx
// วนสร้าง paragraph จาก array
{personalInfo.about.map((paragraph, index) => (
  <motion.p
    key={index}
    transition={{ duration: 0.5, delay: index * 0.15 }}  // stagger
  >
    {paragraph}
  </motion.p>
))}
```

---

### ⚡ Skills — BMO Terminal
**ไฟล์:** `components/sections/Skills.jsx`

section นี้ไม่แสดง skill ด้วยการ์ดหรือ progress bar แต่ใช้ **interactive terminal** แทน ให้ผู้เยี่ยมชมพิมพ์คำสั่งเพื่อรู้จัก Jack

**เทคนิคที่ใช้:**
- `useState` — เก็บ input ที่พิมพ์ + history ของ terminal
- `useRef (terminalRef)` — อ้างถึง DOM ของ terminal box
- `useRef (inputRef)` — focus input เมื่อคลิกที่ section
- `useEffect + scrollTop` — auto-scroll terminal ลงล่างเมื่อมี output ใหม่ (ใช้ `scrollTop` ไม่ใช่ `scrollIntoView` เพื่อให้ scroll แค่ใน box ไม่เลื่อนทั้งหน้า)
- `bmoCommands[trimmed] ?? [bmoUnknownCommand]` — Nullish Coalescing หา response จาก key ที่พิมพ์
- คำสั่งที่รองรับ: `help`, `hello`, `whoisjack`, `skills`, `stack`, `contact`, `clear`

```jsx
// auto-scroll เฉพาะใน terminal box
useEffect(() => {
  if (terminalRef.current) {
    terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }
}, [history]);

// หา response จาก bmoCommands
const response = bmoCommands[trimmed] ?? [bmoUnknownCommand];
```

---

### 💼 Projects
**ไฟล์:** `components/sections/Projects.jsx`

**เทคนิคที่ใช้:**
- `projectPhilosophy.paragraphs.map()` — วน render paragraph จาก data (ไม่ใช้ project card)
- `containerVariants + itemVariants` — Framer Motion variant pattern สำหรับ stagger animation
- `staggerChildren: 0.2` — แต่ละ paragraph ทยอยโผล่ห่างกัน 0.2 วินาที
- `whileInView` + `viewport: { once: true, amount: 0.2 }` — animate เมื่อเห็น 20% ของ section
- `bg-gradient-to-r from-jake via-finn to-bubblegum` — เส้น divider สีไล่เฉดธีม Adventure Time

```jsx
// Stagger animation pattern
const containerVariants = {
  visible: {
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};
```

---

### 📬 Contact
**ไฟล์:** `components/sections/Contact.jsx`

**เทคนิคที่ใช้:**
- `useState` — จัดการ form state (`name`, `email`, `message`) และ `isLoading`
- `[e.target.name]` — Computed property name ทำให้ handleChange ทำงานกับทุก field ด้วย function เดียว
- `fetch POST /api/contact` — ส่งข้อมูลไปยัง Express backend จริง
- `react-hot-toast` — แสดง success/error notification
- `response.ok` — ตรวจสถานะ HTTP response ก่อน show toast
- **Prismo mascot** — รูปตัวละครจาก Adventure Time พร้อม glow effect (`bg-bubblegum blur-3xl`)
- `disabled={isLoading}` — ปิดปุ่มระหว่างส่งเพื่อป้องกัน submit ซ้ำ

```jsx
// Computed property name — handleChange ใช้ได้กับทุก input
const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};
```

---

### 🌳 Parallax Background
**ไฟล์:** `components/ui/ParallaxBackground.jsx`

background ของทั้งเว็บเป็นรูปต้นไม้สูงในสไตล์การ์ตูน สลับรูปตาม dark/light mode และเลื่อนช้ากว่า content เพื่อสร้าง parallax effect

**เทคนิคที่ใช้:**
- `MutationObserver` — watch การเปลี่ยน class บน `<html>` เพื่อรู้ว่า dark mode เปิดอยู่ (ใช้แทน `useTheme` เพราะแต่ละ component มี state แยกกัน ไม่ sync กัน)
- `scroll event + useRef` — อ่าน `window.scrollY` แล้ว `translateY` รูปขึ้น 0.3 เท่าของ scroll
- `height: 300vh` — รูปสูงกว่า viewport 3 เท่า เพื่อให้มีพื้นที่เลื่อน parallax จนถึง section สุดท้าย
- `position: fixed + -z-10` — รูปอยู่กับที่ข้างหลัง content ทั้งหมด
- `willChange: "transform"` — บอก browser ล่วงหน้าให้เตรียม GPU

```jsx
// parallax formula: content เลื่อน 1px → รูปเลื่อนแค่ 0.3px
const offset = window.scrollY * 0.3;
imgRef.current.style.transform = `translateY(-${offset}px)`;
```

| Mode | ไฟล์รูป |
|---|---|
| ☀️ Light mode | `tree-day.png` — ต้นไม้กลางวัน ท้องฟ้าสีฟ้า |
| 🌙 Dark mode | `tree-night.png` — ต้นไม้กลางคืน ดาวเต็มฟ้า |

---

### 🪟 Glassmorphism

ทุก section ใช้ glassmorphism card เพื่อให้อ่านเนื้อหาได้ชัดบนพื้นหลังต้นไม้:

```css
backdrop-blur-md                          /* เบลอพื้นหลัง */
bg-white/30 dark:bg-dark/40              /* สีขาว/เข้มโปร่งแสง 30-40% */
rounded-3xl                               /* มุมโค้งมน */
border border-white/30 dark:border-white/10  /* เส้นขอบบางๆ */
```

---

## ⚙️ Backend

### Server — `server.js`
- Framework: **Express 5**
- Port: `3001` (อ่านจาก `.env`)
- CORS: อนุญาตเฉพาะ `http://localhost:5173`
- Syntax: **ESM** (`import/export`) — `"type": "module"` ใน package.json

### API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/health` | Health check — ตรวจว่า server รันอยู่ |
| POST | `/api/contact` | รับข้อมูล contact form แล้วบันทึก DB |

### POST `/api/contact`

**Request body:**
```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```

**Validation:**
- ทุก field ต้องไม่ว่าง
- email ต้องมี format ถูกต้อง (regex)
- message ต้องยาวอย่างน้อย 10 ตัวอักษร

**Response (201):**
```json
{
  "success": true,
  "message": "Message sent successfully!",
  "data": { "id": 1, "name": "...", "email": "...", "created_at": "..." }
}
```

### Database — `schema.sql`

```sql
CREATE TABLE IF NOT EXISTS contacts (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100)  NOT NULL,
  email      VARCHAR(150)  NOT NULL,
  message    TEXT          NOT NULL,
  created_at TIMESTAMPTZ   DEFAULT NOW()   -- เก็บเป็น UTC, แปลง timezone ตอนแสดงผล
);
```

### Connection — `db.js`
- ใช้ `pg.Pool` — เปิด connection ไว้ล่วงหน้าหลายอัน ไม่ต้องเปิด-ปิดทุก query
- config อ่านจาก `.env` (DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT)
- ใช้ **Parameterized Query** (`$1, $2, $3`) ป้องกัน SQL Injection

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+

### 1. Clone & Install

```bash
git clone https://github.com/suriya899/my-portfolio.git
cd my-portfolio

# Frontend
cd frontend && npm install

# Backend
cd ../backend && npm install
```

### 2. Setup Database

```bash
# สร้าง database
createdb portfolio_db

# รัน schema
psql -d portfolio_db -f backend/schema.sql
```

### 3. Environment Variables

สร้างไฟล์ `backend/.env`:
```env
PORT=3001
NODE_ENV=development
DB_USER=your_username
DB_HOST=localhost
DB_NAME=portfolio_db
DB_PASSWORD=your_password
DB_PORT=5432
```

### 4. Run

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev
```

เปิด browser ที่ `http://localhost:5173`

---

## 📌 Key Technical Decisions

| Decision | เหตุผล |
|---|---|
| ข้อมูลอยู่ใน `portfolioData.js` | แก้ content ได้โดยไม่ต้องแตะ component |
| Named Export ทุกตัว | import เฉพาะที่ต้องการ, อ่านง่าย, ไม่สับสน |
| `MutationObserver` แทน `useTheme` ใน ParallaxBackground | `useTheme` ต่างกัน component = state แยกกัน ไม่ sync |
| `scrollTop` แทน `scrollIntoView` ใน terminal | `scrollIntoView` เลื่อนทั้งหน้า, `scrollTop` เลื่อนแค่ใน box |
| ESM syntax ทั้ง frontend + backend | โค้ดสมัยใหม่, consistent, ใช้ได้จริงในงาน |
| `TIMESTAMPTZ` แทน `TIMESTAMP` | เก็บเป็น UTC, รองรับ timezone ได้ถูกต้อง |
| Parallax `height: 300vh` | รูปสูงพอให้เลื่อนได้ตลอดทั้งหน้าโดยไม่มีช่องว่าง |

---

## 👤 Author

**Jack Suriya**
- Email: suriya.rup@gmail.com
- GitHub: [github.com/suriya899](https://github.com/suriya899)

---

*Built with ❤️ and a lot of Adventure Time energy* 🗡️
