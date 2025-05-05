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
  const [hasPlayed, setHasPlayed] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isTouch = isTouchDevice();

  // Observer d'entrée/sortie dans l'écran (pour mobile)
  useEffect(() => {
    if (!isTouch || !p.video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          setHasPlayed(false);
        } else {
          setIsVisible(false);
          setVideoLoaded(false);
          setHasPlayed(false);
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
  }, [isTouch, p.video]);

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

  // Lancement de la vidéo sur mobile au clic sur play
  const handleMobilePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setHasPlayed(true);
    }
  };

  // Affiche bouton "play" sur mobile, seulement si la carte est visible, une vidéo existe, et qu'on n'a pas cliqué "play" encore
  const shouldShowPlayButton = !!p.video && isTouch && isVisible && !hasPlayed;

  // Décide si la vidéo DOIT jouer (hover desktop ou play mobile)
  const shouldPlayVideo =
    !!p.video && ((isTouch && hasPlayed) || (!isTouch && isHovered));

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
              ref={videoRef}
              className="w-full h-full object-cover absolute inset-0 z-10"
              src={p.video}
              muted
              loop
              preload="metadata"
              autoPlay={!isTouch}
              playsInline
              style={{
                opacity: videoLoaded ? 1 : 0,
                transition: "opacity 0.2s"
              }}
              onCanPlayThrough={() => setVideoLoaded(true)}
              onLoadedData={() => setVideoLoaded(true)}
            />
          )}

          {shouldShowPlayButton && (
            <button
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/40"
              onClick={handleMobilePlay}
              aria-label="Lire la vidéo"
              type="button"
            >
              {/* Icône play SVG stylisé */}
              <svg width="64" height="64" viewBox="0 0 64 64" fill="white">
                <circle cx="32" cy="32" r="30" fill="rgba(0,0,0,0.5)"/>
                <polygon points="26,20 26,44 48,32" fill="white"/>
              </svg>
            </button>
          )}

          <div className="absolute top-2 right-2 z-30">
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
