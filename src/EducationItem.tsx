import React from "react";

export interface EducationItemProps {
  imgSrc: string;
  title: string;
  date: string;
  description: string;
}
export const EducationItem: React.FC<EducationItemProps> = ({ imgSrc, title, date, description }) => (
  <div className="flex items-start gap-8">
    <img src={imgSrc} className="w-16 h-16 object-contain" alt={title} />
    <div>
      <div className="flex items-center gap-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <span className="badge badge-outline">{date}</span>
      </div>
      <p className="text-neutral-300 mt-2">{description}</p>
    </div>
  </div>
);
