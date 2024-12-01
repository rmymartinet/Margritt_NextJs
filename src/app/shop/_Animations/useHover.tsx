import { useState, useEffect } from "react";

const useHover = () => {
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isHovering) {
      document.body.style.cursor = "none";
    } else {
      document.body.style.cursor = "auto";
    }
  }, [isHovering]);

  return { isHovering, setIsHovering };
};

export default useHover;
