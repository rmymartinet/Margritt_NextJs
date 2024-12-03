import { useGSAP } from "@gsap/react";
import { TitleTransition } from "./Animations/TitleTransition";
import Divider from "./TitleUnderline";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

interface HeroProps {
  title1: string;

  title2?: string;
}

const Hero = ({ title1, title2 }: HeroProps) => {
  const heroContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (heroContainerRef.current) {
      const children = heroContainerRef.current?.children;
      gsap.from(children, {
        skewX: 30,
        y: 400,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
      });
    }
  }, []);

  return (
    <div className="relative mb-[20vh] flex w-full items-center justify-center">
      <div
        ref={heroContainerRef}
        className="flex flex-col overflow-hidden md:w-[50%] lg:w-max"
      >
        <h1 className="mr-20 text-8xl font-medium lg:text-9xl">{title1}</h1>
        <h1 className="self-end text-7xl font-medium lg:text-8xl">{title2}</h1>
      </div>
    </div>
  );
};

export default Hero;
