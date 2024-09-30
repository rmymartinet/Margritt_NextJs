import ShadowText from "./shadowText";

const Quote = () => {
  return (
    <div className="mt-[30vh] mb-[30vh] flex flex-col gap-10 justify-items-center items-center uppercase lg:px-20">
      <div className="font-semibold text-2xl md:text-4xl lg:text-5xl">
        <p>Inspiration</p>
      </div>
      <ShadowText paragraph="Margritt creates works that pay tribute to her family culture deeply rooted in the maritime world, immersing viewers in an ever-evolving imaginary realm. Her creations explore instinct, creative impulse, and constant artistic inquiry, transforming reality through material work and challenging our visual perspective" />
    </div>
  );
};

export default Quote;
