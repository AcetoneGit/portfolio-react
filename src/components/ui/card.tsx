import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

export const Card = ({ children, className, animate = true }: CardProps) => {
  const MotionDiv = animate ? motion.div : "div";

  return (
    <MotionDiv
      className={cn(
        "rounded-xl border border-white/10 bg-zinc-800/40 p-4 shadow-lg backdrop-blur-sm",
        className
      )}
      {...(animate && {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
      })}
    >
      {children}
    </MotionDiv>
  );
}; 