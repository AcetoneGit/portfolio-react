import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard, { Project } from "./ProjectCard";

interface ProjectStackSectionProps {
  projects: Project[];
}

const getCardStyle = (idx: number) => {
  if (idx === 0) return { rotate: 0, x: 0 };
  const seed = idx * 12345;
  const angle = ((seed % 7) - 3) * 0.3;
  const x = ((seed % 9) - 4) * 6;
  return { rotate: angle, x };
};

const ProjectStackSection: React.FC<ProjectStackSectionProps> = ({ projects }) => {
  const [visibleCount, setVisibleCount] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full min-h-[320px] max-h-[480px] sm:min-h-[800px] sm:max-h-[1600px] flex flex-col items-center justify-start bg-transparent z-20 pt-12"
      style={{
        background: "inherit",
      }}
    >
      <h2 ref={titleRef} className="section-title text-3xl font-bold mb-5 z-30">PROJETS</h2>
      <div className="relative w-full max-w-[95vw] h-[110px] sm:max-w-3xl sm:h-[320px] flex flex-col items-center justify-center mt-8 px-1">
        <div className="flex-1 h-full flex items-center justify-center w-full">
          <AnimatePresence initial={false}>
            {[...projects].reverse().slice(0, visibleCount).map((p, idx) => {
              const { rotate, x } = getCardStyle(idx);
              return (
                <motion.div
                  key={p.title}
                  initial={{ y: 80, opacity: 0, scale: 0.95, rotate, x }}
                  animate={{ y: 0, opacity: 1, scale: 1, rotate, x }}
                  exit={{ y: -80, opacity: 0, scale: 0.95, rotate, x }}
                  transition={{ duration: 0.5, type: "spring", delay: idx * 0.08 }}
                  className={`w-full px-2 ${idx === visibleCount - 1 ? '' : 'hidden'} sm:absolute`}
                  style={window.innerWidth >= 640 ? { zIndex: idx + 1, top: idx * 8 } : {}}
                >
                  <ProjectCard p={p} idx={idx} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <div className="flex flex-row gap-2 mt-2 w-full justify-center sm:mt-0 sm:block">
          <button
            className="bg-zinc-800 text-white rounded-full p-1.5 sm:p-2 shadow-lg hover:bg-orange-500/80 transition disabled:opacity-40 disabled:cursor-not-allowed sm:absolute sm:-left-24 sm:top-1/2 sm:-translate-y-1/2 z-40"
            onClick={() => setVisibleCount((c) => Math.max(1, c - 1))}
            disabled={visibleCount === 1}
            aria-label="Carte précédente"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button
            className="bg-zinc-800 text-white rounded-full p-1.5 sm:p-2 shadow-lg hover:bg-orange-500/80 transition disabled:opacity-40 disabled:cursor-not-allowed sm:absolute sm:-right-24 sm:top-1/2 sm:-translate-y-1/2 z-40"
            onClick={() => setVisibleCount((c) => Math.min(projects.length, c + 1))}
            disabled={visibleCount === projects.length}
            aria-label="Carte suivante"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectStackSection; 