import { useEffect, useState } from "react";

export default function UseLocalTime(timezone = "Europe/Paris") {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("fr-FR", {
      timeZone: timezone,
    })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString("fr-FR", { timeZone: timezone }));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timezone]);

  return time;
}
