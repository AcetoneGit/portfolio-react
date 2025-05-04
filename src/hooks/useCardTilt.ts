import { useRef, useEffect } from "react";

export function useCardTilt(externalRef?: React.RefObject<HTMLDivElement>) {
  const internalRef = useRef<HTMLDivElement>(null);
  const cardRef = externalRef || internalRef;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let translate = '';

    const updateTransform = (tilt = '') => {
      card.style.transform = `${translate} ${tilt}`.trim();
    };

    (card as HTMLDivElement & { _setTranslate?: (tr: string) => void })._setTranslate = (tr: string) => {
      translate = tr;
      updateTransform(card.style.getPropertyValue('--tilt') || '');
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltX = (y - centerY) / 10;
      const tiltY = -(x - centerX) / 10;
      const tilt = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05,1.05,1.05)`;

      card.style.setProperty('--tilt', tilt);
      updateTransform(tilt);

      card.style.boxShadow = `
        ${-tiltY / 3}px ${-tiltX / 3}px 15px rgba(255,255,255,0.05),
        ${tiltY / 5}px ${tiltX / 5}px 20px rgba(0,0,0,0.3)
      `;
    };

    const handleMouseLeave = () => {
      card.style.setProperty('--tilt', '');
      updateTransform('');
      card.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
      card.style.transition = 'all 0.5s ease';
      setTimeout(() => {
        card.style.transition = 'none';
      }, 500);
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cardRef]);

  return cardRef;
}
