import { useInView } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const Divider = () => {
  const dividerRef = useRef(null);
  const isInView = useInView(dividerRef);

  useEffect(() => {
    if (isInView) {
      gsap.to(dividerRef.current, {
        scaleX: 1,
        duration: 1.2,
        transformOrigin: "center",
        delay: 0,
        ease: "power3.inOut",
      });
    }
  }, [isInView]);

  return (
    <div
      ref={dividerRef}
      className="absolute bottom-0 h-[1px] bg-white w-full origin-center scale-x-0"
    ></div>
  );
};

export default Divider;
