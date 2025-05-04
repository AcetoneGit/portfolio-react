import { useEffect, useState } from "react";

export default function ScrollIndicator() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTotal ? window.scrollY / scrollTotal : 0;
      setWidth(Math.min(progress * 100, 100));
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div
        className="bg-accent transition-all duration-300 ease-out h-full"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
