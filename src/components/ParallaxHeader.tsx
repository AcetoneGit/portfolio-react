import React, { useEffect, useState, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const typingTexts = [
  "Développeur Full Stack",
  "React / Rails",
  "Passionné par l'innovation"
];

const NB_PARTICLES = 36;

const ParallaxHeader: React.FC = () => {
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [reveal, setReveal] = useState(false);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const gradientRef = useRef<HTMLSpanElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const title = "Antoine Clement";
  type LetterAnim = 'idle' | 'up' | 'down';
  const [letterAnim, setLetterAnim] = useState<LetterAnim[]>(Array(title.length).fill('idle'));

  useEffect(() => {
    const current = typingTexts[typingIndex % typingTexts.length];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting && displayedText.length < current.length) {
      timeout = setTimeout(() => setDisplayedText(current.slice(0, displayedText.length + 1)), 80);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => setDisplayedText(current.slice(0, displayedText.length - 1)), 40);
    } else if (!isDeleting && displayedText.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1200);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setTypingIndex((prev) => (prev + 1) % typingTexts.length);
    }
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, typingIndex]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const blur = useTransform(scrollY, [0, 300], [0, 8]);

  const animatedParticles = useMemo(() => (
    Array.from({ length: NB_PARTICLES }).map((_, i) => {
      const cx = Math.random() * 100;
      const cy = Math.random() * 100;
      const r = Math.random() * 2.2 + 0.7;
      const opacity = Math.random() * 0.45 + 0.15;
      const dx = (Math.random() - 0.5) * 40;
      const dy = (Math.random() - 0.5) * 40;
      const duration = Math.random() * 3 + 3;
      return (
        <motion.circle
          key={i}
          cx={cx + '%'}
          cy={cy + '%'}
          r={r}
          fill="white"
          opacity={opacity}
          animate={{
            x: [0, dx, 0, -dx, 0],
            y: [0, dy, 0, -dy, 0],
          }}
          transition={{
            duration,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
            delay: Math.random() * 2
          }}
          style={{ willChange: 'transform' }}
        />
      );
    })
  ), []);

  const updateClipPath = () => {
    if (gradientRef.current) {
      gradientRef.current.style.clipPath = reveal
        ? `circle(80px at ${mousePos.current.x}px ${mousePos.current.y}px)`
        : 'circle(0px at 50% 50%)';
    }
  };

  const animateClipPath = () => {
    updateClipPath();
    rafRef.current = requestAnimationFrame(animateClipPath);
  };

  useEffect(() => {
    if (reveal) {
      rafRef.current = requestAnimationFrame(animateClipPath);
    } else {
      updateClipPath();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reveal]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (h1Ref.current) {
      const rect = h1Ref.current.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const handleMouseEnter = () => setReveal(true);
  const handleMouseLeave = () => setReveal(false);

  const handleLetterEnter = (i: number) => {
    setLetterAnim(anim => anim.map((v, idx) => idx === i ? 'up' : v));
  };
  const handleLetterLeave = (i: number) => {
    setLetterAnim(anim => anim.map((v, idx) => idx === i ? 'down' : v));
    setTimeout(() => {
      setLetterAnim(anim => anim.map((v, idx) => idx === i ? 'idle' : v));
    }, 500);
  };

  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 animate-gradient-xy bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-orange-100/20 via-orange-200/30 to-transparent" />

      <div className="absolute inset-0 pointer-events-none z-10" style={{
        backgroundImage: `url('data:image/svg+xml;utf8,<svg width=\'100%\' height=\'100%\' xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'noise\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.08\' numOctaves=\'4\' stitchTiles=\'stitch\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23noise)\' opacity=\'0.7\'/></svg>')`,
        opacity: 0.7,
        mixBlendMode: 'overlay',
      }} />

      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" style={{ opacity: 0.38 }}>
        {animatedParticles}
      </svg>

      <motion.div 
        className="relative z-10 text-center px-4 md:px-8"
        style={{ 
          y: isMobile ? 0 : y,
          opacity,
          scale,
          filter: `blur(${isMobile ? 0 : blur.get()}px)`
        }}
      >
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -top-8 w-72 h-24 blur-3xl bg-orange-400/30 rounded-full opacity-60 pointer-events-none"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <h1
          ref={h1Ref}
          className="relative text-5xl md:text-7xl font-bold mb-4 drop-shadow-[0_2px_32px_rgba(255,136,0,0.12)] select-none flex justify-center gap-0"
          style={{ color: '#fff' }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {title.split("").map((char, i) => (
            <span
              key={i}
              className="inline-block relative"
              style={{ width: char === ' ' ? '0.5em' : 'auto' }}
            >
              <span
                className="block overflow-hidden"
                style={{ height: '1em' }}
                onMouseEnter={() => handleLetterEnter(i)}
                onMouseLeave={() => handleLetterLeave(i)}
              >
                {letterAnim[i] === 'up' ? (
                  <>
                    <motion.span
                      initial={{ y: 0, opacity: 1 }}
                      animate={{ y: -32, opacity: 0 }}
                      transition={{ duration: 0.22, ease: 'easeInOut' }}
                      className="absolute left-0 top-0 w-full"
                      style={{ color: '#fff' }}
                    >
                      {char}
                    </motion.span>
                    <motion.span
                      initial={{ y: 32, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.22, ease: 'easeInOut' }}
                      className="inline-block w-full"
                      style={{ color: '#fff' }}
                    >
                      {char}
                    </motion.span>
                  </>
                ) : letterAnim[i] === 'down' ? (
                  <>
                    <motion.span
                      initial={{ y: 0, opacity: 1 }}
                      animate={{ y: 32, opacity: 0 }}
                      transition={{ duration: 0.22, ease: 'easeInOut' }}
                      className="absolute left-0 top-0 w-full"
                      style={{ color: '#fff' }}
                    >
                      {char}
                    </motion.span>
                    <motion.span
                      initial={{ y: -48, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.22, ease: 'easeInOut' }}
                      className="inline-block w-full"
                      style={{ color: '#fff' }}
                    >
                      {char}
                    </motion.span>
                  </>
                ) : (
                  <span className="inline-block w-full" style={{ color: '#fff' }}>{char}</span>
                )}
              </span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-neutral-200 mb-8 min-h-[2.5rem]"
        >
          <span className="typing-text">{displayedText}</span>
        </motion.div>

        <motion.a
          href="#projects"
          className="inline-block px-8 py-4 rounded-full bg-[var(--accent)] hover:bg-[var(--accent)] text-white font-semibold text-lg shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--accent)/50]"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
        >
          Découvrir mon travail
        </motion.a>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex gap-4 justify-center mt-8"
        >
          <a
            href="https://github.com/AcetoneGit"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <i className="fab fa-github text-2xl hover:text-[--accent] transition-colors" />
          </a>
          <a
            href="https://www.linkedin.com/in/your-linkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <i className="fab fa-linkedin text-2xl hover:text-[--accent] transition-colors" />
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <i className="fas fa-chevron-down text-2xl text-[--accent]/80" />
      </motion.div>
    </header>
  );
};

export default ParallaxHeader;
