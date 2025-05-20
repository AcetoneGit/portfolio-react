import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { ReactNode, useState, forwardRef } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const SpotlightCard = forwardRef<HTMLDivElement, SpotlightCardProps>(({
  children,
  className,
  spotlightColor = "rgba(255,255,255,0.1)",
  onMouseEnter,
  onMouseLeave
}, ref) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref || typeof ref === 'function') return;

    const div = ref.current;
    if (!div) return;

    const rect = div.getBoundingClientRect();

    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
    onMouseEnter?.();
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    onMouseLeave?.();
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/10 bg-zinc-800 p-4 shadow-lg",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`
        }}
      />
      {children}
    </motion.div>
  );
}); 