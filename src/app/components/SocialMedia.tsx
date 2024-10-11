import Iphone from "./Iphone";
import { InstagramButton, TiktokButton } from "./SocialButton";

const SocialMedia = () => {
  const instaPoster = "/assets/insta_poster.png";
  const tiktokPoster = "/assets/tiktok_poster.png";

  const videoInsta = "/assets/videos/instagram_scroll.mp4";
  const videoTiktok = "/assets/videos/tiktok_scroll.mp4";
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h2 className="mb-5 text-center text-5xl">
        Follow my artist&apos;s daily life.
      </h2>
      <div className="mb-20 flex gap-10 lg:gap-44">
        <InstagramButton />
        <TiktokButton />
      </div>
      <div className="flex flex-col gap-10 md:flex-row">
        <Iphone poster={instaPoster} videoUrl={videoInsta} />
        <Iphone poster={tiktokPoster} videoUrl={videoTiktok} />
      </div>
    </div>
  );
};

export default SocialMedia;
