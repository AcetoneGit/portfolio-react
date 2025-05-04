import React from "react";

const Footer: React.FC = () => (
  <footer className="w-full py-6 text-center text-neutral-400 text-sm border-t border-neutral-800 mt-10">
    © 2025 Antoine CLEMENT.
    <a
      href="https://github.com/AcetoneGit"
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent underline mx-2 hover:text-white transition"
    >
      Github
    </a>
    •
    <a
      href="mailto:antoine.c@etik.com"
      className="text-accent underline mx-2 hover:text-white transition"
    >
      Contact
    </a>
  </footer>
);

export default Footer;
