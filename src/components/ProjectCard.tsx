import React, { useState, useCallback, useRef, useEffect } from "react";
import AnimateOnScroll from "./AnimateOnScroll";

export interface Project {
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
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const isTouch = isTouchDevice();

  useEffect(() => {
    if (!isTouch || !p.video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          setVideoLoaded(false);
        }
      },
      { threshold: 0.4 }
    );

    const currentCardRef = cardRef.current;
    if (currentCardRef) observer.observe(currentCardRef);

    return () => {
      if (currentCardRef) observer.unobserve(currentCardRef);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTouch]);

  const handleEnter = useCallback(() => {
    if (!isTouch) {
      setIsHovered(true);
    }
  }, [isTouch]);
  const handleLeave = useCallback(() => {
    if (!isTouch) {
      setIsHovered(false);
      setVideoLoaded(false);
    }
  }, [isTouch]);

  const shouldPlayVideo =
    !!p.video && ((isTouch && isVisible) || (!isTouch && isHovered));

  return (
    <AnimateOnScroll delay={idx * 0.12} key={p.title}>
      <div
        ref={cardRef}
        className="project-card bg-zinc-800/40 rounded-2xl shadow-lg border border-white/10 overflow-hidden flex flex-col"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={{ cursor: p.video && !isTouch ? "pointer" : undefined }}
        tabIndex={0}
      >
        <div className="relative w-full aspect-video mb-2">
          <img
            src={p.img}
            className="w-full h-full object-cover absolute inset-0 z-0"
            alt={p.title}
            style={{
              opacity: shouldPlayVideo && videoLoaded ? 0 : 1,
              transition: "opacity 0.2s"
            }}
            draggable={false}
          />
          {shouldPlayVideo && (
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
