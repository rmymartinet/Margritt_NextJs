import ShadowText from "./ShadowText";

const Quote = () => {
  return (
    <div className="mb-[30vh] mt-[30vh] flex flex-col items-center justify-items-center gap-10 uppercase lg:px-20">
      <div className="text-2xl font-semibold md:text-4xl lg:text-5xl">
        <p>Inspiration</p>
      </div>
      <ShadowText paragraph="Margritt creates works that pay tribute to her family culture deeply rooted in the maritime world, immersing viewers in an ever-evolving imaginary realm. Her creations explore instinct, creative impulse, and constant artistic inquiry, transforming reality through material work and challenging our visual perspective" />
    </div>
  );
};

export default Quote;
