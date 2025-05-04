import React, { useEffect, useRef } from "react";

const isMobile = () => window.innerWidth <= 768;

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const followerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isMobile()) return;

    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
      setTimeout(() => {
        if (followerRef.current) {
          followerRef.current.style.left = `${e.clientX}px`;
          followerRef.current.style.top = `${e.clientY}px`;
        }
      }, 80);
    };

    document.addEventListener("mousemove", moveCursor);

    const interactiveElements = document.querySelectorAll(
      "a, button, .project-card, .skill-card, .education-item"
    );

    const enlargeCursor = () => followerRef.current?.classList.add("active");
    const resetCursor = () => followerRef.current?.classList.remove("active");

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", enlargeCursor);
      el.addEventListener("mouseleave", resetCursor);
    });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", enlargeCursor);
        el.removeEventListener("mouseleave", resetCursor);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor pointer-events-none fixed z-[9999] w-3 h-3 bg-white rounded-full transition-all duration-100"
        style={{ left: 0, top: 0, position: "fixed", transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={followerRef}
        className="custom-cursor-follower pointer-events-none fixed z-[9998] w-8 h-8 bg-accent opacity-50 rounded-full transition-all duration-200"
        style={{
          left: 0,
          top: 0,
          position: "fixed",
          transform: "translate(-50%, -50%)",
          transition: "box-shadow 0.18s, width 0.18s, height 0.18s",
        }}
      />
      <style>{`
        .custom-cursor-follower.active {
          width: 3rem !important;
          height: 3rem !important;
          background: var(--accent, #c026d3)!important;
          opacity: 0.4;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
