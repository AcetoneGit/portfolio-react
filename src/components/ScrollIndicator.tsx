import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ScrollIndicator: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      let value = docHeight > 0 ? scrollTop / docHeight : 0;
      if (window.innerHeight + Math.ceil(window.scrollY) >= document.documentElement.scrollHeight) {
        value = 1;
      }
      setProgress(value);
    };
    window.addEventListener('scroll', updateProgress);
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        className="h-1 bg-orange-500 origin-left"
        style={{ scaleX: progress }}
      />
    </div>
  );
};

export default ScrollIndicator;
