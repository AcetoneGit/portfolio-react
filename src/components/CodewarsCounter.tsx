import { useEffect, useState } from "react";

export function CodewarsCounter() {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    let animating = false;

    async function fetchData(){
      try {
        const response = await fetch("https://www.codewars.com/api/v1/users/AcetoneGit");
        if (!response.ok) throw new Error("Erreur lors de la récupération des données CodeWars");
        const data = await response.json();
        animateCounter(data.codeChallenges.totalCompleted);
      } catch (e) {
        console.error(e);
      }
    }

    function animateCounter(finalValue: number) {
      if (animating) return;
      animating = true;
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
          animating = false;
        }
      }
      requestAnimationFrame(updateCounter);
    }

    fetchData();
    const interval = setInterval(fetchData, 3600000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <span className="font-bold text-accent">{completed}</span>;
};

export default CodewarsCounter;
