import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.footer
      className="relative py-12 px-4 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white via-accent to-accent-dark bg-clip-text text-transparent">
              Antoine C.
            </h3>
            <p className="text-neutral-400">
              Développeur Full Stack passionné par la création d'expériences web modernes et interactives.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white via-accent to-accent-dark bg-clip-text text-transparent">
              Liens Rapides
            </h3>
            <ul className="space-y-2">
              <li>
                <button type="button" className="text-neutral-400 hover:text-[--accent] transition-colors cursor-pointer bg-transparent border-none p-0" onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})}>
                  À Propos
                </button>
              </li>
              <li>
                <button type="button" className="text-neutral-400 hover:text-[--accent] transition-colors cursor-pointer bg-transparent border-none p-0" onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})}>
                  Projets
                </button>
              </li>
              <li>
                <button type="button" className="text-neutral-400 hover:text-[--accent] transition-colors cursor-pointer bg-transparent border-none p-0" onClick={() => {
                  const element = document.getElementById('skills');
                  if (element) {
                    const offset = 100;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}>
                  Compétences
                </button>
              </li>
              <li>
                <a href="mailto:antoine.c@etik.com" className="text-neutral-400 hover:text-[--accent] transition-colors cursor-pointer bg-transparent border-none p-0">
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white via-accent to-accent-dark bg-clip-text text-transparent">
              Contact
            </h3>
            <ul className="space-y-2">
              <motion.li
                whileHover={{ x: 5 }}
                className="text-neutral-400 hover:text-[--accent] transition-colors"
              >
                <i className="fas fa-envelope mr-2" />
                antoine.c@etik.com
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                className="text-neutral-400 hover:text-[--accent] transition-colors"
              >
                <i className="fas fa-map-marker-alt mr-2" />
                Lyon, France
              </motion.li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="h-px bg-orange-400 my-8"
          variants={itemVariants}
        />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p
            className="text-neutral-400 text-sm"
            variants={itemVariants}
          >
            © {currentYear} Antoine Clement. Tous droits réservés.
          </motion.p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
