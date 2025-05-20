import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SpotlightCard } from "./ui/spotlight-card";
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
  }, [isTouch, p.video]);

  const handleEnter = useCallback(() => {
    if (!isTouch) setIsHovered(true);
  }, [isTouch]);

  const handleLeave = useCallback(() => {
    if (!isTouch) {
      setIsHovered(false);
      setVideoLoaded(false);
    }
  }, [isTouch]);

  const handleMobilePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setHasPlayed(true);
    }
  };

  const shouldShowPlayButton = !!p.video && isTouch && isVisible && !hasPlayed;
  const shouldPlayVideo = !!p.video && ((isTouch && hasPlayed) || (!isTouch && isHovered));

  return (
    <AnimateOnScroll delay={idx === 0 ? 0 : idx * 0.12}>
      <SpotlightCard
        ref={cardRef}
        className="overflow-visible group shadow-2xl transition-shadow duration-300 rounded-2xl min-h-[60px] h-[80px] max-h-[90px] text-xs p-1 sm:min-h-[180px] sm:h-[320px] sm:max-h-[320px] sm:text-base sm:p-4"
        spotlightColor="rgba(var(--accent-rgb), 0.12)"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <div className="relative w-full aspect-video mb-4 overflow-hidden rounded-2xl transition-transform duration-300">
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-accent/10 to-transparent z-20 pointer-events-none rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0.3 }}
            transition={{ duration: 0.4 }}
          />

          <motion.img
            src={p.img}
            className="w-full h-full object-cover absolute inset-0 z-0 group-hover:scale-105 transition-transform duration-500 rounded-2xl"
            alt={p.title}
            style={{
              opacity: shouldPlayVideo && videoLoaded ? 0 : 1,
              transition: "opacity 0.2s"
            }}
            initial={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            draggable={false}
          />

          <AnimatePresence>
            {shouldPlayVideo && (
              <motion.video
                ref={videoRef}
                className="w-full h-full object-cover absolute inset-0 z-10 rounded-2xl"
                src={p.video}
                muted
                loop
                preload="metadata"
                autoPlay={!isTouch}
                playsInline
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: videoLoaded ? 1 : 0, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                onCanPlayThrough={() => setVideoLoaded(true)}
                onLoadedData={() => setVideoLoaded(true)}
              />
            )}
          </AnimatePresence>

          {shouldShowPlayButton && (
            <motion.button
              className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-colors"
              onClick={handleMobilePlay}
              aria-label="Lire la vidéo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="white"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <circle cx="32" cy="32" r="30" fill="rgba(0,0,0,0.5)"/>
                <polygon points="26,20 26,44 48,32" fill="white"/>
              </motion.svg>
            </motion.button>
          )}

          <motion.div
            className="absolute top-3 right-3 z-30 flex gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
            transition={{ duration: 0.3 }}
          >
            {p.link && (
              <motion.a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 shadow-lg transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fab fa-github text-white text-2xl" />
              </motion.a>
            )}
          </motion.div>
        </div>

        <div className="project-info px-2 pb-4">
          <motion.h3
            className="project-title font-bold text-xl mb-2 bg-gradient-to-r from-white via-orange-100/60 to-orange-300/40 bg-clip-text text-transparent drop-shadow-[0_2px_16px_rgba(255,136,0,0.12)]"
            initial={{ opacity: 0.8 }}
            whileHover={{ color: "var(--accent)" }}
            transition={{ duration: 0.2 }}
          >
            {p.title}
          </motion.h3>

          <motion.p
            className="project-description text-sm text-neutral-300 mb-4"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0.8 }}
          >
            {p.desc}
          </motion.p>

          <motion.div
            className="project-tags flex gap-2 flex-wrap mb-4"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
          >
            {p.tags.map((tag, index) => (
              <motion.span
                key={tag}
                className="tag px-3 py-1 bg-orange-400/10 rounded-full text-xs font-medium shadow hover:shadow-[0_2px_8px_rgba(255,136,0,0.12)] transition-all duration-200"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.1
                }}
                whileHover={{
                  scale: 1.08,
                  backgroundColor: "rgba(255,136,0,0.08)",
                  color: "#fff"
                }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </SpotlightCard>
    </AnimateOnScroll>
  );
};

export default ProjectCard;
