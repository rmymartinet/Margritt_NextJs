import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import SplitType from "split-type";

gsap.registerPlugin(useGSAP);

interface TextTransitionProps {
  textClassName?: string;
  animationConfig?: {
    opacity: number;
    y: number;
    duration: number;
    delay: number;
    stagger: number;
    ease: string;
  };
  children: React.ReactNode;
}

interface TitleTransitionProps {
  yposition?: number;
  children: React.ReactNode;
}

export const TextTransition = ({
  textClassName = "",
  animationConfig = {
    opacity: 0,
    y: 100,
    duration: 1,
    delay: 0.3,
    stagger: 0.03,
    ease: "power2.out",
  },
  children,
}: TextTransitionProps) => {
  const textRef = useRef(null);

  useGSAP(() => {
    const element = textRef.current;
    if (!element) return;

    const split = new SplitType(element);

    gsap.from(split.lines, {
      ...animationConfig,
    });
  }, [animationConfig]);

  return (
    <div ref={textRef} className={textClassName}>
      {children}
    </div>
  );
};

export const TitleTransition = ({
  yposition = 500,
  children,
}: TitleTransitionProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (elementRef.current) {
      const split = new SplitType(elementRef.current, { types: "chars" });

      gsap.from(split.chars, {
        y: yposition,
        duration: 1,
        stagger: 0.03,
        ease: "power2.out",
      });

      return () => gsap.killTweensOf(split.chars);
    }
  }, [yposition]);

  return <div ref={elementRef}>{children}</div>;
};
