import { ReactNode } from "react";

const HeroSubContent = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mb-40 flex flex-col items-center gap-10">{children}</div>
  );
};

export default HeroSubContent;
