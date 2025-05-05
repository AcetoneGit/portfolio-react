import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

const CalBtn: React.FC = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
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
  }, []);

  return null;
};

export default CalBtn;
