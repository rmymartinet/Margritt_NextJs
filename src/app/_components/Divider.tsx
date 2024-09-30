import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const Divider = () => {
  const dividerRef = useRef(null);

  useGSAP(() => {
    gsap.to(dividerRef.current, {
      width: "100%",
      duration: 1.2,
      delay: 0,
      ease: "power3.inOut",
    });
  }, []);

  return (
    <div
      ref={dividerRef}
      className="absolute bottom-0 h-[2px] bg-black w-0"
    ></div>
  );
};

export default Divider;
