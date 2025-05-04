import React from "react";
import { useCardTilt } from "../hooks/useCardTilt";

type SkillCardProps = {
  icon: string;
  name: string;
  level: string;
};

const SkillCard: React.FC<SkillCardProps> = ({ icon, name, level }) => {
  const cardRef = useCardTilt();

  return (
    <div
      ref={cardRef}
      className="skill-card card p-8 flex flex-col items-center gap-3 rounded-2xl border border-white/10 shadow-xl transition-all duration-300 hover:scale-105 bg-white/10 backdrop-blur-md"
    >
      <i className={`${icon} text-4xl`} />
      <h3 className="skill-name font-bold text-lg">{name}</h3>
      <p className="skill-level text-sm text-neutral-200">{level}</p>
    </div>
  );
};

export default SkillCard;
