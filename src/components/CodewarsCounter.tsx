import { useEffect, useState, useRef } from "react";

type CodewarsCounterProps = {
  username: string;
};

export function CodewarsCounter({ username }: CodewarsCounterProps) {
  const [completed, setCompleted] = useState(0);
  const animating = useRef(false); // ref au lieu de variable locale

  useEffect(() => {
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

    fetchData();
    const interval = setInterval(fetchData, 3600000);

    return () => clearInterval(interval);
  }, [username]);

  return <span className="font-bold text-accent">{completed}</span>;
}

export default CodewarsCounter;
