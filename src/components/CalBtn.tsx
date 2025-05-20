import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

const CalBtn: React.FC = () => {
  useEffect(() => {
    let calInstance: any = null;
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      calInstance = cal;
      cal("floatingButton", {
        calLink: "antoine-clement/30min",
        config: { layout: "month_view" },
        buttonText: "Discutons de votre projet !"
      });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();
    // Ajout de l'écouteur pour ouvrir le bouton Cal
    const handler = () => {
      if (calInstance) calInstance("open");
    };
    window.addEventListener('open-calbtn', handler);
    return () => {
      window.removeEventListener('open-calbtn', handler);
    };
  }, []);

  return null;
};

export default CalBtn;
