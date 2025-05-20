import React, { useState } from "react";
import { SpotlightCard } from "./ui/spotlight-card";
import { motion } from "framer-motion";

interface SkillCardProps {
  icon: string;
  name: string;
  level: string;
}

const getBadgeColor = (level: string) => {
  switch (level.toLowerCase()) {
    case "débutant":
      return "bg-orange-400/20 text-orange-400 border-orange-400";
    case "intermédiaire":
      return "bg-orange-500/20 text-orange-500 border-orange-500";
    case "avancé":
      return "bg-orange-600/20 text-orange-600 border-orange-600";
    default:
      return "bg-orange-300/20 text-orange-300 border-orange-300";
  }
};

const SkillCard: React.FC<SkillCardProps> = ({ icon, name, level }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", delay: 0.1 }}
    >
      <SpotlightCard
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="p-5 relative group shadow-xl hover:shadow-orange-500/30 transition-shadow duration-300 h-32 flex flex-col justify-center"
        spotlightColor="rgba(255, 165, 0, 0.08)"
      >
        <div className="relative z-10">
          <motion.div
            className="flex items-center gap-3"
            initial={false}
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.i
              className={`${icon} text-3xl drop-shadow-lg`}
              animate={{
                rotate: isHovered ? [0, -10, 10, -10, 10, 0] : 0,
                scale: isHovered ? 1.2 : 1,
                filter: isHovered ? "drop-shadow(0_0_12px_rgba(255,136,0,0.5))" : "none"
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            />
            <div className="flex flex-col flex-1">
              <motion.h3
                className="font-semibold text-lg bg-gradient-to-r from-orange-100 via-orange-400 to-orange-600 bg-clip-text text-transparent"
                animate={{ color: "white" }}
                transition={{ duration: 0.2 }}
              >
                {name}
              </motion.h3>
              <span className={`px-4 py-1 rounded-full border text-[11px] font-bold uppercase transition-colors duration-300 ${getBadgeColor(level)} whitespace-nowrap text-white self-start mt-2`}>
                {level}
              </span>
            </div>
          </motion.div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

export default SkillCard;
