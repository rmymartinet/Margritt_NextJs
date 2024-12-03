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

export const TitleTransitionFromCenter = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
        {
          children;
        }
      };
    }
  }, []);

  return (
    <div className="flex w-full items-end justify-center overflow-hidden">
      <h1
        ref={rightTitleRef}
        className="text-6xl font-medium uppercase leading-none md:text-9xl lg:text-[18.4vw]"
      >
        marg
      </h1>
      <h1
        ref={leftTitleRef}
        className="text-6xl font-medium uppercase leading-none md:text-9xl lg:text-[18.4vw]"
      >
        ritt
      </h1>
    </div>
  );
};
