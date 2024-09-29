import { useEffect, useState } from "react";

export default function useWindowWidth() {
  const [width, setWidth] = useState(0); // Initialisez à 0 au lieu de window.innerWidth

  useEffect(() => {
    // Vérifiez si window est défini avant de l'utiliser
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);

      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return width;
}
