import { useEffect, useState, useRef } from "react";

type CodewarsCounterProps = {
  username: string;
};

export function CodewarsCounter({ username }: CodewarsCounterProps) {
  const [completed, setCompleted] = useState(0);
  const animating = useRef(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          fetchData();
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [username]);

  async function fetchData() {
    try {
      const response = await fetch(`https://www.codewars.com/api/v1/users/${username}`);
      if (!response.ok) throw new Error("Erreur lors de la récupération des données CodeWars");
      const data = await response.json();
      animateCounter(data.codeChallenges.totalCompleted);
    } catch (e) {
      console.error(e);
    }
  }

  function animateCounter(finalValue: number) {
    if (animating.current) return;
    animating.current = true;
    const duration = 1500;
    const startValue = completed;
    const startTime = performance.now();

    function updateCounter(currentTime: number) {
      const elapsedTime = currentTime - startTime;
      if (elapsedTime < duration) {
        const progress = elapsedTime / duration;
        setCompleted(Math.floor(startValue + progress * (finalValue - startValue)));
        requestAnimationFrame(updateCounter);
      } else {
        setCompleted(finalValue);
        animating.current = false;
      }
    }
    requestAnimationFrame(updateCounter);
  }

  return <span ref={counterRef} className="font-bold text-[var(--accent)]">{completed}</span>;
}

export default CodewarsCounter;
