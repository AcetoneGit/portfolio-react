import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

export default function AnimateOnScroll({ children, delay = 0, ...props }: HTMLMotionProps<"div"> & { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
