// ParallaxBackground.jsx
// component นี้ทำหน้าที่: แสดงรูปต้นไม้เป็น background ทั้งหน้า
// และเลื่อนช้ากว่า content เมื่อ scroll (parallax effect)

// import { useEffect, useRef } from "react";
// import  useTheme  from "../../hooks/useTheme";

import { useEffect, useRef, useState } from "react";

import treeDayImg from "../../assets/tree-day.png";
import treeNightImg from "../../assets/tree-night.png";

const ParallaxBackground = () => {
 
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  // MutationObserver: คอยดูการเปลี่ยน class บน <html>
  // ทุกครั้งที่ Navbar toggle theme → class "dark" เพิ่ม/ลบ → เราอัปเดตตาม
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    // เริ่ม observe <html> tag โดยดูแค่การเปลี่ยน attribute "class"
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // cleanup เมื่อ component unmount
    return () => observer.disconnect();
  }, []);

  // ref สำหรับจับตัว img เพื่อ update transform ตอน scroll
  const imgRef = useRef(null);

  // parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return;
      // content เลื่อน 1px → รูปเลื่อนแค่ 0.3px (ช้ากว่า 3 เท่า)
      const offset = window.scrollY * 0.3;
      imgRef.current.style.transform = `translateY(-${offset}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // container: fixed คือปักอยู่กับที่ ไม่เลื่อนตาม scroll
    // inset-0 = top/right/bottom/left: 0 (ครอบทั้งหน้าจอ)
    // -z-10 = อยู่ข้างหลัง content ทั้งหมด
    // overflow-hidden = ซ่อนส่วนที่ล้นออกไป
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <img
        ref={imgRef}
        // src={theme === "dark" ? treeNightImg : treeDayImg}

        src={isDark ? treeNightImg : treeDayImg}
        // alt="" เพราะเป็นรูปตกแต่ง ไม่ใช่ข้อมูล
        alt=""
        // w-full: กว้างเต็มหน้าจอ
        // object-cover: ครอบคลุมพื้นที่ ไม่ให้มีช่องว่าง
        // object-top: ยึดจากด้านบนก่อน
        className="w-full object-cover object-top"
        style={{
          // สูงกว่า viewport เพื่อให้มีพื้นที่เลื่อน parallax
          // 150vh = 1.5 เท่าของหน้าจอ
          height: "300vh",
          // บอก browser ล่วงหน้าว่า transform จะเปลี่ยน
          // ทำให้ browser เตรียม GPU ไว้ scroll ลื่นขึ้น
          willChange: "transform",
        }}
      />
    </div>
  );
};

export default ParallaxBackground;
