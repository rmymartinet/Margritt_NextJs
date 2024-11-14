import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParagraphProps {
  paragraph: string;
}

interface WordProps {
  children: React.ReactNode;
  progress: MotionValue;
  range: number[];
}

export default function Paragraph({ paragraph }: ParagraphProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = paragraph.split(" ");
  return (
    <p
      ref={container}
      className="text-md flex flex-wrap justify-center text-pretty lg:justify-start lg:text-2xl"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

const Word = ({ children, progress, range }: WordProps) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mr-2 w-max leading-6 lg:leading-10">
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity: opacity }}>{children}</motion.span>
    </span>
  );
};
