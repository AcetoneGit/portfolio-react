import React, { useState, useCallback } from "react";
import AnimateOnScroll from "./AnimateOnScroll";

interface Project {
  title: string;
  desc: string;
  img: string;
  tags: string[];
  video?: string;
  link?: string;
}

type ProjectCardProps = {
  p: Project;
  idx: number;
};

function isTouchDevice(): boolean {
  return (
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0)
  );
}

const ProjectCard: React.FC<ProjectCardProps> = ({ p, idx }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const isTouch = isTouchDevice();

  const handleEnter = useCallback(() => setIsHovered(true), []);
  const handleLeave = useCallback(() => {
    setIsHovered(false);
    setVideoLoaded(false);
  }, []);
  const handleClick = useCallback(() => {
    setIsHovered((prev) => !prev);
    if (videoLoaded) setVideoLoaded(false);
  }, [videoLoaded]);

  return (
    <AnimateOnScroll delay={idx * 0.12} key={p.title}>
      <div
        className="project-card bg-zinc-800/40 rounded-2xl shadow-lg border border-white/10 overflow-hidden flex flex-col"
        onMouseEnter={!isTouch ? handleEnter : undefined}
        onMouseLeave={!isTouch ? handleLeave : undefined}
        onClick={isTouch ? handleClick : undefined}
        style={{ cursor: p.video && isTouch ? "pointer" : undefined }}
        tabIndex={0}
      >
        <div className="relative w-full aspect-video mb-2">
          <img
            src={p.img}
            className="w-full h-full object-cover absolute inset-0 z-0"
            alt={p.title}
            style={{
              opacity: videoLoaded && isHovered ? 0 : 1,
              transition: "opacity 0.2s"
            }}
            draggable={false}
          />
          {isHovered && p.video && (
            <video
              className="w-full h-full object-cover absolute inset-0 z-10"
              src={p.video}
              muted
              loop
              preload="metadata"
              autoPlay
              playsInline
              style={{
                opacity: videoLoaded ? 1 : 0,
                transition: "opacity 0.2s"
              }}
              onCanPlayThrough={() => setVideoLoaded(true)}
              onLoadedData={() => setVideoLoaded(true)}
            />
          )}
          <div className="absolute top-2 right-2 z-20">
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-circle btn-outline"
              >
                <i className="fab fa-github"></i>
              </a>
            )}
          </div>
        </div>
        {/* TEXTE TOUJOURS VISIBLE */}
        <div className="project-info p-4 flex-1 flex flex-col">
          <h3 className="project-title font-semibold text-lg">{p.title}</h3>
          <p className="project-description text-sm my-2">{p.desc}</p>
          <div className="project-tags mt-auto flex gap-2 flex-wrap">
            {p.tags.map((tag) => (
              <span
                className="tag px-2 py-1 bg-neutral-700 rounded text-xs"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  );
};

export default ProjectCard;
