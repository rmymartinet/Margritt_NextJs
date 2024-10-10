import { useEffect, useState } from "react";

export default function UseLocalTime(timezone = "Europe/Paris") {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    // Fonction pour mettre à jour l'heure
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString("fr-FR", { timeZone: timezone }));
    };

    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timezone]);

  return <p>{time ?? "Loading time..."}</p>;
}
