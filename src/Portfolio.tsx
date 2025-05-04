import React from "react";
import CalButton from './CalButton';
import SkillCard from "./components/SkillCard";
import CodewarsCounter from "./components/CodewarsCounter";
import ParallaxHeader from "./components/ParallaxHeader";
import AnimateOnScroll from "./components/AnimateOnScroll";

import traboulesdesempires from "./assets/traboulesdesempires.png";
import airbnbeat from "./assets/airbnbeat.png";
import idelplanner from "./assets/idelplanner.png";
import flappy from "./assets/flappy_bird_like.jpg";
import quizzy from "./assets/quizzy.jpg";
import krafte from "./assets/krafte.png";

import wagon from "./assets/wagon.svg";
import fortytwo from "./assets/42.svg";
import codelynx from "./assets/codelynx.svg";
import codewars from "./assets/codewars.svg";
import Footer from "./components/Footer";
import About from "./components/About";

const threejsSvg = (
  <svg width="38" height="43" viewBox="0 0 38 43" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.7346 0.971817L36.0112 18.4767C38.3367 19.8206 38.3368 23.1799 36.0115 24.5239L5.73423 42.0292C3.40538 43.3751 0.5 41.6914 0.5 39.0057V3.99513C0.5 1.31072 3.40451 -0.375901 5.7346 0.971817ZM4.23226 3.56854C3.90991 3.38205 3.5 3.61216 3.5 3.99513V39.0057C3.5 39.3874 3.90902 39.6188 4.23264 39.4321L34.5099 21.9268C34.8369 21.7378 34.8371 21.2631 34.5101 21.0742L4.23226 3.56854Z" fill="#f6f6f6"></path>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.772 9.44228L3.81036 15.2013C3.61917 15.3116 3.5 15.5166 3.5 15.7409V27.259C3.5 27.483 3.61986 27.6894 3.81109 27.7999L13.772 33.5593C13.9636 33.6701 14.2 33.6701 14.3916 33.5593L24.352 27.801C24.5445 27.6897 24.6636 27.4839 24.6636 27.2599V15.7418C24.6636 15.5177 24.5437 15.3114 24.3525 15.2009L14.3916 9.44228C14.2002 9.33183 13.9634 9.33183 13.772 9.44228ZM12.2711 6.8447C13.3914 6.19744 14.7722 6.19744 15.8925 6.8447L25.8534 12.6033C26.9738 13.2508 27.6636 14.4483 27.6636 15.7418V27.2599C27.6636 28.5535 26.9748 29.7497 25.8539 30.398L15.8928 36.1567C14.7726 36.804 13.3914 36.8042 12.2711 36.1569L2.31024 30.3975C1.18988 29.7499 0.5 28.5524 0.5 27.259V15.7409C0.5 14.4478 1.18843 13.2509 2.31048 12.6032L12.2711 6.8447Z" fill="#f6f6f6"></path>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 14.9575C0.5 13.6056 1.9625 12.7612 3.13325 13.4378L14.7031 20.1277C15.2562 20.4459 15.5814 21.0321 15.5814 21.6482V35.4708C15.5814 36.0069 15.2953 36.5022 14.831 36.7701C14.3666 37.038 13.7946 37.0377 13.3306 36.7694L1.38379 29.8619L1.37869 29.8589C0.825347 29.5407 0.5 28.9544 0.5 28.3382V14.9575ZM3.5 17.1153L12.5814 22.3663V32.8708L3.5 27.6201V17.1153Z" fill="#f6f6f6"></path>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M24.7545 13.5966C26.0542 12.8459 27.6596 13.7907 27.6633 15.2724L27.6633 15.2762L27.6633 28.2328C27.6633 28.9247 27.2945 29.5654 26.6943 29.9121L26.692 29.9134L15.4903 36.3896C14.1948 37.1379 12.5811 36.2001 12.5811 34.7103V21.7545C12.5811 21.0623 12.9502 20.4213 13.5509 20.0747L13.5523 20.0739L24.7545 13.5966ZM24.6633 17.1148L15.5811 22.3663V32.8718L24.6633 27.621V17.1148Z" fill="#f6f6f6"></path>
  </svg>
);

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
    link: "https://github.com/AcetoneGit/rails-watch-list",
    desc: "Create a watchlist for movies, connect with an API for the data. Minimalist.",
    tags: ["Ruby on Rails", "API", "CSS"],
  },
  {
    img: airbnbeat, title: "Airbnbeat",
    link: "https://github.com/Jeremy-Lgn/airbnbeat",
    desc: "Clone of AirBNB. Team project (Le Wagon), cards, logo, sound effect, booking, design.",
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
    link: "https://github.com/AcetoneGit/flappy-bird-like",
    desc: "Mini project completed in one hour with AI assistance. First game, gravity management, hitboxes.",
    tags: ["React Native", "TypeScript"],
  },
  {
    img: quizzy, title: "Quizzy",
    link: "https://github.com/AcetoneGit/quizzy",
    desc: "Basis for a project (FindIt). Scoring, haptic feedback, response time calcs.",
    tags: ["React Native", "JavaScript"],
  },
  {
    img: krafte, title: "Kräfte",
    link: "",
    desc: "WIP, automatic customizable rails template generator.",
    tags: ["Ruby On Rails", "Services"],
  }
];

const educations = [
  {
    img: threejsSvg,
    title: "ThreeJS Journey",
    date: "2025",
    descriptions: [
      "Masterclass on 3D development with Three.js. Creation of interactive 3D web experiences, animations, shaders and performance optimization for the web.",
      "**IN PROGRESS**"
    ]
  },
  {
    img: codelynx,
    title: "BeginJavaScript",
    date: "2025",
    descriptions: [
      '"Begin JavaScript" is a masterclass for JavaScript beginners. It teaches fundamental concepts such as variables, functions, loops and objects, with practical examples. The emphasis is on practice for better assimilation.',
      "**IN PROGRESS**",
    ],
  },
  {
    img: wagon,
    title: "Le Wagon - Web Development Bootcamp",
    date: "2021",
    descriptions: [
      "Intensive 9-week fullstack dev. Ruby on Rails, JS, HTML/CSS, SQL, agile. Team projects, full web app from A to Z.",
    ]
  },
  {
    img: fortytwo,
    title: "Piscine 42",
    date: "2017-2019",
    descriptions: [
      "Intensive C immersion. Project-based, peer-to-peer review, teamwork. Algorithms, system programming.",
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
    {/* PROJECTS */}
    <section className="projects-container max-w-6xl mx-auto my-12 px-5">
      <h2 className="section-title text-3xl font-bold mb-5">PROJETS</h2>
      <div className="projects-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {projects.map((p, idx) => (
    <AnimateOnScroll delay={idx * 0.12} key={p.title}>
      <div className="project-card bg-zinc-800/40 rounded-2xl shadow-lg border border-white/10 overflow-hidden flex flex-col">
        <div className="project-image relative">
          <div className="project-overlay absolute inset-0 bg-black/40 z-10 pointer-events-none"></div>
          <img src={p.img} className="w-full aspect-video object-cover z-0" alt={p.title} />
          <div className="project-links absolute top-2 right-2 z-20">
            {p.link && (
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-circle btn-outline">
                <i className="fab fa-github"></i>
              </a>
            )}
          </div>
        </div>
        <div className="project-info p-4 flex-1 flex flex-col">
          <h3 className="project-title font-semibold text-lg">{p.title}</h3>
          <p className="project-description text-sm my-2">{p.desc}</p>
          <div className="project-tags mt-auto flex gap-2 flex-wrap">
            {p.tags.map((tag) => (
              <span className="tag px-2 py-1 bg-neutral-700 rounded text-xs" key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </AnimateOnScroll>
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
  Completed: <span className="font-bold text-accent"><CodewarsCounter username="TonPseudoCodewars" /></span>
</p>

          </div>
        </div>
      </div>
    </section>
  </AnimateOnScroll>

  <Footer />

    <div>
      <CalButton />
    </div>
  </div>
);

export default Portfolio;
