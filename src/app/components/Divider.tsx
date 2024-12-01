import { useInView } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const Divider = ({
  bgColor = "white",
  className,
}: {
  bgColor?: string;
  className?: string;
}) => {
  const dividerRef = useRef(null);
  const isInView = useInView(dividerRef);

  useEffect(() => {
    if (isInView) {
      gsap.to(dividerRef.current, {
        scaleX: 1,
        duration: 1.2,
        delay: 0,
        ease: "power3.inOut",
      });
    }
  }, [isInView]);

  return (
    <div
      ref={dividerRef}
      className={`h-[1px] bg-${bgColor} w-full scale-x-0 ${className}`}
    ></div>
  );
};

export default Divider;
