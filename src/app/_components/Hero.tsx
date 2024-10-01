import { TitleTransition } from "./Animations/TitleTransition";
import Divider from "./TitleUnderline";

interface HeroProps {
  title: string;
}

const Hero = ({ title }: HeroProps) => {
  return (
    <div className="relative my-[10vh] flex w-full items-center justify-start">
      <div className="overflow-hidden text-4xl font-semibold uppercase md:text-5xl lg:text-8xl">
        <TitleTransition yposition={500}>
          <p>{title}</p>
        </TitleTransition>
      </div>
      <Divider />
    </div>
  );
};

export default Hero;
