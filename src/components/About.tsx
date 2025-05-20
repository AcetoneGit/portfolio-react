import React, { useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { FaBolt, FaProjectDiagram, FaClock, FaLightbulb } from "react-icons/fa";

const stats = [
  { icon: <FaBolt />, label: "Réactivité", value: "Efficace" },
  { icon: <FaProjectDiagram />, label: "Projets", value: "+12" },
  { icon: <FaClock />, label: "dès maintenant", value: "Dispo" },
  { icon: <FaLightbulb />, label: "Créativité", value: 100, suffix: "%" }
];

const About: React.FC = () => {
  const [displayedStats, setDisplayedStats] = useState<(string | number)[]>(stats.map((stat) => typeof stat.value === "number" ? 0 : stat.value));
  useEffect(() => {
    const intervals: ReturnType<typeof setInterval>[] = [];
    stats.forEach((stat, i) => {
      if (typeof stat.value === "number") {
        let current = 0;
        const increment = Math.max(1, Math.floor((stat.value as number) / 40));
        const intervalMs = i === stats.length - 1 ? 10 : 30 + i * 20;
        intervals[i] = setInterval(() => {
          current += increment;
          if (current >= (stat.value as number)) {
            current = stat.value as number;
            clearInterval(intervals[i]);
          }
          setDisplayedStats((prev) => {
            const copy = [...prev];
            copy[i] = current;
            return copy;
          });
        }, intervalMs);
      }
    });
    return () => intervals.forEach(clearInterval);
  }, []);

  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.18, delayChildren: 0.2 }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.section
      ref={ref}
      id="about"
      className="about-section py-24 px-4 relative overflow-hidden"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[80vw] h-[40vw] bg-gradient-to-br from-orange-100 via-orange-400 to-orange-600 rounded-full blur-3xl opacity-70 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="glass-effect rounded-2xl p-10 md:p-16 shadow-2xl border border-white/10 relative overflow-hidden shiny-line-effect"
          variants={itemVariants}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-orange-100 via-orange-400 to-orange-600 bg-clip-text text-transparent drop-shadow-[0_2px_32px_rgba(255,136,0,0.5)]"
            variants={itemVariants}
          >
            À Propos
          </motion.h2>

          <motion.div
            className="space-y-5 text-neutral-300 text-lg"
            variants={itemVariants}
          >
            <p className="leading-relaxed">
           Curieux du monde du numérique depuis 8 ans, j'apprécie être polyvalent tout en approfondissant chaque sujet. Développeur React / Rails spécialisé en sécurité, je me ferais un plaisir de travailler sur vos projets, même ceux les plus complexes.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-5 rounded-xl bg-accent/10 hover:bg-gradient-to-br hover:from-white/10 hover:via-orange-100/10 hover:to-orange-400/10 transition-colors shadow-md"
                  variants={itemVariants}
                  whileHover={{ scale: 1.08 }}
                >
                  <div className="flex justify-center mb-2 text-2xl text-white">{stat.icon}</div>
                  <motion.div
                    className="text-3xl font-bold mb-1 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {typeof stats[i].value === "number"
                      ? <>{displayedStats[i]}{stat.suffix}</>
                      : <>{stats[i].value}</>
                    }
                  </motion.div>
                  <div className="text-sm font-medium bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap gap-5"
            variants={itemVariants}
          >
            <motion.a
              href="mailto:antoine.c@etik.com"
              className="px-7 py-3 rounded-full bg-neutral-900/60 backdrop-blur-md border border-white/10 text-white font-semibold text-base shadow-[0_2px_16px_rgba(0,0,0,0.32)] hover:shadow-[0_2px_24px_rgba(0,0,0,0.45)] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-neutral-900/50"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.97 }}
            >
              Me Contacter
            </motion.a>
            <motion.a
              href="#projects"
              className="px-7 py-3 rounded-full border border-accent/50 hover:border-accent bg-white/5 hover:bg-accent/10 transition-all font-semibold text-base shadow-[0_2px_16px_rgba(180,180,200,0.13)] hover:shadow-[0_2px_24px_rgba(200,200,220,0.18)] bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.97 }}
            >
              Voir mes Projets
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
