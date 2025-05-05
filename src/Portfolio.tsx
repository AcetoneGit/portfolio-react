import React from "react";
import SkillCard from "./components/SkillCard";
import CodewarsCounter from "./components/CodewarsCounter";
import ParallaxHeader from "./components/ParallaxHeader";
import AnimateOnScroll from "./components/AnimateOnScroll";
import ProjectCard from "./components/ProjectCard";

import traboulesdesempires from "./assets/traboulesdesempires.png";
import airbnbeat from "./assets/airbnbeat.png";
import idelplanner from "./assets/idelplanner.png";
import flappy from "./assets/flappy_bird_like.jpg";
import quizzy from "./assets/quizzy.jpg";
import krafte from "./assets/krafte.png";

import wagon from "./assets/wagon.svg";
import fortytwo from "./assets/42.svg";
import CS50 from "./assets/CS50.png";
import codewars from "./assets/codewars.svg";
import Footer from "./components/Footer";
import About from "./components/About";
import CalBtn from "./components/CalBtn";

const threejsSvg = (
  <svg width="38" height="43" viewBox="0 0 38 43" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.7346 0.971817L36.0112 18.4767C38.3367 19.8206 38.3368 23.1799 36.0115 24.5239L5.73423 42.0292C3.40538 43.3751 0.5 41.6914 0.5 39.0057V3.99513C0.5 1.31072 3.40451 -0.375901 5.7346 0.971817ZM4.23226 3.56854C3.90991 3.38205 3.5 3.61216 3.5 3.99513V39.0057C3.5 39.3874 3.90902 39.6188 4.23264 39.4321L34.5099 21.9268C34.8369 21.7378 34.8371 21.2631 34.5101 21.0742L4.23226 3.56854Z" fill="#f6f6f6"></path>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.772 9.44228L3.81036 15.2013C3.61917 15.3116 3.5 15.5166 3.5 15.7409V27.259C3.5 27.483 3.61986 27.6894 3.81109 27.7999L13.772 33.5593C13.9636 33.6701 14.2 33.6701 14.3916 33.5593L24.352 27.801C24.5445 27.6897 24.6636 27.4839 24.6636 27.2599V15.7418C24.6636 15.5177 24.5437 15.3114 24.3525 15.2009L14.3916 9.44228C14.2002 9.33183 13.9634 9.33183 13.772 9.44228ZM12.2711 6.8447C13.3914 6.19744 14.7722 6.19744 15.8925 6.8447L25.8534 12.6033C26.9738 13.2508 27.6636 14.4483 27.6636 15.7418V27.2599C27.6636 28.5535 26.9748 29.7497 25.8539 30.398L15.8928 36.1567C14.7726 36.804 13.3914 36.8042 12.2711 36.1569L2.31024 30.3975C1.18988 29.7499 0.5 28.5524 0.5 27.259V15.7409C0.5 14.4478 1.18843 13.2509 2.31048 12.6032L12.2711 6.8447Z" fill="#f6f6f6"></path>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 14.9575C0.5 13.6056 1.9625 12.7612 3.13325 13.4378L14.7031 20.1277C15.2562 20.4459 15.5814 21.0321 15.5814 21.6482V35.4708C15.5814 36.0069 15.2953 36.5022 14.831 36.7701C14.3666 37.038 13.7946 37.0377 13.3306 36.7694L1.38379 29.8619L1.37869 29.8589C0.825347 29.5407 0.5 28.9544 0.5 28.3382V14.9575ZM3.5 17.1153L12.5814 22.3663V32.8708L3.5 27.6201V17.1153Z" fill="#f6f6f6"></path>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M24.7545 13.5966C26.0542 12.8459 27.6596 13.7907 27.6633 15.2724L27.6633 15.2762L27.6633 28.2328C27.6633 28.9247 27.2945 29.5654 26.6943 29.9121L26.692 29.9134L15.4903 36.3896C14.1948 37.1379 12.5811 36.2001 12.5811 34.7103V21.7545C12.5811 21.0623 12.9502 20.4213 13.5509 20.0747L13.5523 20.0739L24.7545 13.5966ZM24.6633 17.1148L15.5811 22.3663V32.8718L24.6633 27.621V17.1148Z" fill="#f6f6f6"></path>
  </svg>
);

const username = "AcetoneGit";

const skills = [
  { icon: "devicon-rails-plain", name: "Ruby on Rails", level: "Avancé" },
  { icon: "devicon-react-original", name: "React / Native", level: "Débutant" },
  { icon: "devicon-typescript-plain", name: "TypeScript", level: "Débutant" },
  { icon: "devicon-tailwindcss-original", name: "TailwindCSS", level: "Avancé" },
  { icon: "devicon-postgresql-plain", name: "PostGreSQL", level: "Débutant" },
  { icon: "devicon-figma-plain", name: "Figma", level: "Avancé" },
  { icon: "devicon-git-plain", name: "Git", level: "Avancé" },
  { icon: "devicon-python-plain", name: "Python", level: "Débutant" },
];

const projects = [
  {
    img: traboulesdesempires, title: "TDE",
    video: "",
    link: "https://github.com/AcetoneGit/rails-watch-list",
    desc: "Crétion d'un watchlist de films. connexion API, minimaliste",
    tags: ["Ruby on Rails", "API", "CSS"],
  },
  {
    img: airbnbeat, title: "Airbnbeat",
    link: "https://github.com/Jeremy-Lgn/airbnbeat",
    desc: "Clone de AirBNB. Projet d'équipe (Le Wagon), cartes, logo, effet sonore, réservation, design.",
    tags: ["Ruby on Rails", "JavaScript", "PostGreSQL"],
  },
  {
    img: idelplanner, title: "IdelPlanner",
    link: "https://github.com/AcetoneGit/idel_planner",
    desc: `Collaborative project. IdelPlanner simplifies the day-to-day work of registered nurses (calendar, patient file, statement).`,
    tags: ["Ruby On Rails", "JavaScript"],
  },
  {
    img: flappy, title: "Flappy Bird Like",
    video: "/assets/flappy_bird_2_react_native.mov",
    link: "https://github.com/AcetoneGit/flappy-bird-like",
    desc: "Mini-projet d'une heure avec assistance de l'IA. Premier jeu, gestion de la gravité, hitboxes.",
    tags: ["React Native", "TypeScript"],
  },
  {
    img: quizzy, title: "Quizzy",
    video: "/assets/quizzy_linkedin.mov",
    link: "https://github.com/AcetoneGit/quizzy",
    desc: "Base de travail d'un projet (FindIt). Notation, retour haptique, calcul du temps de réponse.",
    tags: ["React Native", "JavaScript"],
  },
  {
    img: krafte, title: "Kräfte",
    video: "/assets/krafte_prototype.mov",
    link: "",
    desc: "WIP, générateur automatique de templates Ruby On Rails personnalisables.",
    tags: ["Ruby On Rails", "Services"],
  }
];

const educations = [
  {
    img: threejsSvg,
    title: "ThreeJS Journey",
    date: "2025",
    descriptions: [
      "Masterclass sur le développement 3D avec Three.js. Création d'expériences web 3D interactives, animations, shaders et optimisation des performances pour le web.",
      "**EN COURS**"
    ]
  },
  {
    img: CS50,
    title: "CS50 - Harvard",
    date: "2025",
    descriptions: [
      'Le CS50X de Harvard est un cours d’introduction à l’informatique qui enseigne les bases de la programmation et des algorithmes, tout en développant des compétences analytiques et techniques.',
      "**EN COURS**",
    ],
  },
  {
    img: wagon,
    title: "Le Wagon - Web Development Bootcamp",
    date: "2025",
    descriptions: [
      "Bootcamp de 9 semaines en fullstack dev. Ruby on Rails, JS, HTML/CSS, SQL, agile. Projets en équipe, application web complète de A à Z.",
    ]
  },
  {
    img: fortytwo,
    title: "Piscine 42",
    date: "2024",
    descriptions: [
      "Immersion intensive en C. Basé sur des projets, révision par les pairs, travail d'équipe. Algorithmes, programmation de systèmes.",
    ]
  },
];

const Portfolio: React.FC = () => (
  <div className="portfolio-container bg-neutral-900 text-white min-h-screen">
    <ParallaxHeader />
    <About />

    <AnimateOnScroll>
    <section className="skills-container max-w-6xl mx-auto my-12 px-5">
      <h2 className="section-title text-3xl font-bold mb-5">STACK</h2>
<div className="skills-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
  {skills.map((skill, idx) => (
    <AnimateOnScroll delay={0.12 * idx} key={skill.name}>
      <SkillCard
        icon={skill.icon}
        name={skill.name}
        level={skill.level}
      />
    </AnimateOnScroll>
  ))}
</div>

    </section>
    </AnimateOnScroll>
    <AnimateOnScroll delay={0.1}>
  <section className="projects-container max-w-6xl mx-auto my-12 px-5">
    <h2 className="section-title text-3xl font-bold mb-5">PROJETS</h2>
    <div className="projects-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((p, idx) => (
        <ProjectCard p={p} idx={idx} key={p.title} />
      ))}
    </div>
  </section>
</AnimateOnScroll>


    <AnimateOnScroll delay={0.2}>
    <section className="education-container max-w-5xl mx-auto my-12 px-5">
      <h2 className="section-title text-3xl font-bold mb-4">EDUCATION</h2>
      <div className="education-timeline flex flex-col gap-7">
  {educations.map((edu, idx) => (
    <AnimateOnScroll delay={idx * 0.13} key={edu.title}>
      <div className="education-item flex items-start gap-6">
        <div className="education-logo w-16 h-16 flex items-center justify-center">
          {typeof edu.img === "string"
            ? <img src={edu.img as string} alt={edu.title} className="w-14 h-14 object-contain" />
            : edu.img
          }
        </div>
        <div className="education-divider mx-2 text-3xl font-bold text-neutral-200">|</div>
        <div className="education-content flex-1">
          <div className="education-header flex items-center gap-4">
            <h3 className="education-title font-semibold text-lg">{edu.title}</h3>
            <span className="education-date badge badge-outline">{edu.date}</span>
          </div>
          <div>
            {edu.descriptions.map((txt, i) =>
              txt.startsWith("**")
                ? <p key={i} className="education-description font-bold uppercase text-accent">{txt.replace(/\*\*/g, "")}</p>
                : <p key={i} className="education-description">{txt}</p>
            )}
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  ))}
</div>
    </section>
  </AnimateOnScroll>

  <AnimateOnScroll delay={0.5}>
    <section className="codewars-container max-w-3xl mx-auto my-12 px-5">
      <h2 className="section-title text-3xl font-bold mb-4">CHALLENGES</h2>
      <div className="codewars-stats flex gap-4">
        <div className="codewars-card flex-1 bg-zinc-800/40 rounded-xl p-6 shadow border border-white/10 flex items-center gap-5">
          <div className="codewars-logo">
            <img src={codewars} alt="Codewars" className="w-10 h-10 object-contain" />
          </div>
          <div>
            <h3 className="font-bold text-md">CodeWars Challenges</h3>
            <p>
  Complétés: <span className="font-bold text-accent"><CodewarsCounter username={username} /></span>
</p>

          </div>
        </div>
      </div>
    </section>
  </AnimateOnScroll>

  <Footer />

    <div>
      <CalBtn />
    </div>
  </div>
);

export default Portfolio;
