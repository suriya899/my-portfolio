import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/ui/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";

function App() {

  // บอก browser ว่าเราจัดการ scroll เอง อย่า restore ให้
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // เลื่อนขึ้นบนสุดทุกครั้งที่โหลดหน้า
    window.scrollTo(0, 0);
  }, []);

return (
  <div className="min-h-screen bg-white dark:bg-dark transition-colors">
    <Toaster position="top-right" />
    <Navbar />

    {/* เพิ่ม id ให้แต่ละ section เพื่อให้ Navbar หาเจอ */}
    <section id="hero">
      <Hero />
    </section>

    <section id="about">
      <About />
    </section>

    <section id="skills">
      <Skills />
    </section>

    <section id="projects">
      <Projects />
    </section>

    <section id="contact">
      <Contact />
    </section>
  </div>
);
}
export default App;