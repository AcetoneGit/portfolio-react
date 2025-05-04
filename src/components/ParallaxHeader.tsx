import React, { useEffect, useRef } from "react";
import { useCardTilt } from "../hooks/useCardTilt";
import profilePic from "../assets/profile_pic_2.jpg";

const ParallaxHeader: React.FC = () => {
  const cardRef = useCardTilt();
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      const moveX = (e.clientX - window.innerWidth / 2) / 40;
      const moveY = (e.clientY - window.innerHeight / 2) / 40;
      if (photoRef.current) {
        photoRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <header className="header-container flex flex-col md:flex-row items-center justify-between px-5 py-14 max-w-6xl mx-auto min-h-[65vh] gap-12 md:gap-4">
      <div
        ref={cardRef}
        className="header-text flex flex-col items-start md:max-w-xl gap-4 bg-gradient-to-br from-zinc-600/30 to-zinc-900/50 backdrop-blur-lg border border-white/10 shadow-2xl p-8 rounded-2xl transition-transform duration-200"
      >
        <h1 className="name text-[clamp(54px,8vw,82px)] font-black leading-tight bg-gradient-to-r from-white via-neutral-300 to-accent bg-clip-text text-transparent mb-1">
          Antoine C
        </h1>
        <p className="name_2 text-xl font-semibold">
          Développeur React / Rails - orienté sécurité
        </p>
        <div className="header-links">
          <ul className="flex items-center gap-4 mt-2">
            <li>
              <a href="https://github.com/AcetoneGit" target="_blank" className="btn btn-circle btn-ghost text-xl">
                <i className="fa-brands fa-github"></i>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/antoine-clement-xperience/" target="_blank" className="btn btn-circle btn-ghost text-xl">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </li>
            <li>
              <p>antoine.c@etik.com</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="header-photo" ref={photoRef}>
        <img src={profilePic} alt="Antoine C" className="rounded-3xl border-4 border-white/10 w-[210px] h-[210px] object-cover shadow-xl" />
      </div>
    </header>
  );
};

export default ParallaxHeader;
