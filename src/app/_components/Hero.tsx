import { TitleTransition } from "./Animations/TitleTransition";
import Divider from "./Divider";

interface HeroProps {
  title: string;
}

const Hero = ({ title }: HeroProps) => {
  return (
    <div className="relative flex items-center justify-start w-full my-[10vh]">
      <div className="text-8xl font-semibold uppercase overflow-hidden">
        <TitleTransition yposition={500}>
          <p>{title}</p>
        </TitleTransition>
      </div>
      <Divider />
    </div>
  );
};

export default Hero;
