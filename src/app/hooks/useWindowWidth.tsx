import { useEffect, useState } from "react";

export default function useWindowWidth() {
  const [width, setWidth] = useState(0);
  const [isMounted, setIsMounted] = useState(false); // Ajout d'un état pour le rendu

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWidth(window.innerWidth);

      handleResize(); // Met à jour la largeur initialement
      setIsMounted(true); // Indique que le composant est monté

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return { width, isMounted }; // Renvoie également isMounted
}
