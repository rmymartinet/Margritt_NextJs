import { CustomCursorProps } from "@/types/dataTypes";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

const CustomCursor = ({ isHovering }: CustomCursorProps) => {
  const cursorRef = useRef(null);

  // Suivre la position de la souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      gsap.to(cursorRef.current, {
        x: clientX,
        y: clientY,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div>
      {/* Curseur personnalisé */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? "active" : ""}`}
      >
        {isHovering ? "Zoom" : null}
      </div>
    </div>
  );
};

export default CustomCursor;
