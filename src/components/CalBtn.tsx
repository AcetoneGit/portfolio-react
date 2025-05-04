import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";


interface CalOptions {
  namespace: string;
}

interface ButtonOptions {
  calLink: string;
  config: {
    layout: string;
  };
  buttonText: string;
}

interface UIOptions {
  hideEventTypeDetails: boolean;
  layout: string;
}

const CalBtn: React.FC = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });

      const buttonOptions: ButtonOptions = {
        calLink: "antoine-clement/30min",
        config: { layout: "MONTH_VIEW" },
        buttonText: "Discutons de votre projet !"
      };

      const uiOptions: UIOptions = {
        hideEventTypeDetails: false,
        layout: "month_view"
      };

      cal("floatingButton", buttonOptions);
      cal("ui", uiOptions);
    })();
  }, []);

  return null;
};

export default CalBtn;
