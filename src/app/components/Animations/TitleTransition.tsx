import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import SplitType from "split-type";

gsap.registerPlugin(useGSAP);

interface TextTransitionProps {
  textClassName?: string;
  useScrollTrigger?: boolean;

  animationConfig?: {
    opacity: number;
    y: number;
    duration: number;
    delay: number;
    stagger: number;
    ease: string;
    scrollTrigger?: gsap.plugins.ScrollTriggerInstanceVars;
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
  useScrollTrigger = false,
  children,
}: TextTransitionProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useGSAP(() => {
    if (hasAnimated) return;

    const element = textRef.current;
    if (!element) return;

    const split = new SplitType(element);

    const animationOptions = {
      ...animationConfig,
      onComplete: () => setHasAnimated(true),
    };

    if (useScrollTrigger) {
      animationOptions.scrollTrigger = {
        trigger: element,
        start: "top 80%",
      };
    }

    gsap.from(split.lines, animationOptions);
  }, [animationConfig, hasAnimated, useScrollTrigger]);

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
      const split = new SplitType(elementRef.current, { types: "lines" });

      gsap.from(split.lines, {
        y: yposition,
        duration: 1,
        stagger: 0.03,
        ease: "power2.out",
      });

      return () => gsap.killTweensOf(split.lines);
    }
  }, [yposition]);

  return <div ref={elementRef}>{children}</div>;
};

// export const TitleTransition = ({ children }: TitleTransitionProps) => {
//   const elementRef = useRef<HTMLDivElement>(null);

//   const child = elementRef.current?.children;

//   useGSAP(() => {
//     if (child) {
//       gsap.from(child, {
//         delay: 1,
//         skewX: 30,
//         y: 400,
//         duration: 1,
//         ease: "power2.out",
//         stagger: 0.1,
//       });
//     }
//   }, []);

//   return (
//     <div
//       ref={elementRef}
//       className="flex w-full flex-col overflow-hidden md:w-[70%] lg:w-[30%]"
//     >
//       {children}
//     </div>
//   );
// };

export const TitleTransitionFromCenter = () => {
  const rightTitleRef = useRef<HTMLHeadingElement>(null);
  const leftTitleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (rightTitleRef.current && leftTitleRef.current) {
      const rightSplit = new SplitType(rightTitleRef.current, {
        types: "chars",
      });
      const leftSplit = new SplitType(leftTitleRef.current, { types: "chars" });

      gsap.from(rightSplit.chars, {
        delay: 0.5,
        y: 400,
        duration: 1.2,
        ease: "power2.out",
        stagger: { amount: 0.2, from: "end" },
      });

      gsap.from(leftSplit.chars, {
        delay: 0.5,
        y: 400,
        duration: 1.2,
        ease: "power2.out",
        stagger: { amount: 0.2 },
      });

      return () => {
        gsap.killTweensOf(rightSplit.chars);
        gsap.killTweensOf(leftSplit.chars);
      };
    }
  }, []);

  return (
    <div className="flex w-full items-end justify-center overflow-hidden">
      <h1
        ref={rightTitleRef}
        className="text-6xl font-medium uppercase leading-none md:text-9xl lg:text-[18vw]"
      >
        marg
      </h1>
      <h1
        ref={leftTitleRef}
        className="text-6xl font-medium uppercase leading-none md:text-9xl lg:text-[18vw]"
      >
        ritt
      </h1>
    </div>
  );
};
