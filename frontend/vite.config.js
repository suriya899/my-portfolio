import { defineConfig } from 'vite' // นำเข้าฟังก์ชัน defineConfig จาก vite
import react from '@vitejs/plugin-react' // นำเข้า plugin สำหรับ React
import tailwindcss from '@tailwindcss/vite' // นำเข้า plugin Tailwind สำหรับ Vite

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()] // ใช้ plugin React และ Tailwind CSS,
})
