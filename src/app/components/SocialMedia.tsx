import { useRef } from "react";
import Iphone from "./Iphone";
import { InstagramButton, TiktokButton } from "./SocialButton";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SocialMedia = () => {
  const instaPoster = "/assets/insta_poster.png";
  const tiktokPoster = "/assets/tiktok_poster.png";
  const socialContainerRef = useRef<HTMLDivElement>(null);
  const socialTitleRef = useRef<HTMLDivElement>(null);
  const videoInsta = "/assets/videos/instagram_scroll.mov";
  const videoTiktok = "/assets/videos/tiktok_scroll.mp4";
  const iphoneContainerRef = useRef<HTMLDivElement>(null);
  const socialButtonRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const socialChild = socialTitleRef.current?.children;
    const iphoneContainer = iphoneContainerRef.current;
    const socialButton = socialButtonRef.current?.children;
    if (socialButton) {
      gsap.from(socialButton, {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: socialButtonRef.current,
          start: "top 30%",
        },
      });
    }

    if (iphoneContainer) {
      const firstChild = iphoneContainer.firstElementChild;
      const secondChild = iphoneContainer.children[1];

      if (firstChild) {
        gsap.from(firstChild, {
          opacity: 0,
          x: -100,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: iphoneContainer,
            start: "top 30%",
          },
        });
      }

      if (secondChild) {
        gsap.from(secondChild, {
          opacity: 0,
          x: 100,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: iphoneContainer,
            start: "top 30%",
          },
        });
      }
    }
    if (socialChild) {
      gsap.from(socialChild, {
        skewX: 30,
        y: 400,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: socialContainerRef.current,
          start: "top 30%",
        },
      });
    }
  }, []);

  return (
    <div
      ref={socialContainerRef}
      className="flex flex-col items-center justify-center gap-20"
    >
      <div
        ref={socialTitleRef}
        className="flex flex-col overflow-hidden md:w-[70%] lg:w-[60%]"
      >
        <h1 className="text-6xl font-medium md:text-7xl lg:text-9xl">
          Follow my artist&apos;s{" "}
        </h1>
        <h1 className="self-end text-6xl font-medium md:text-7xl lg:text-9xl">
          daily life
        </h1>
      </div>
      <div ref={socialButtonRef} className="flex gap-10 lg:gap-44">
        <InstagramButton />
        <TiktokButton />
      </div>
      <div
        ref={iphoneContainerRef}
        className="flex flex-col gap-10 md:flex-row"
      >
        <Iphone poster={instaPoster} videoUrl={videoInsta} />
        <Iphone poster={tiktokPoster} videoUrl={videoTiktok} />
      </div>
    </div>
  );
};

export default SocialMedia;
