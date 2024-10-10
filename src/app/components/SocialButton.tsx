import { CONTACT_INFO } from "@/data/user";
import gsap from "gsap";
import Link from "next/link";
import { useRef } from "react";

export const InstagramButton = () => {
  const hoverInstaRef = useRef(null);
  const TitleInstaRef = useRef(null);

  const handleEnterHoverInsta = () => {
    gsap.to(hoverInstaRef.current, {
      duration: 0.5,
      height: "100%",
      ease: "power3.inOut",
    });

    const tl = gsap.timeline();

    tl.to(TitleInstaRef.current, {
      y: -50,
      rotateX: 360,
      duration: 0.2,
      color: "#fff",
      ease: "power3.inOut",
    });

    tl.set(TitleInstaRef.current, {
      y: 50,
    });

    tl.to(TitleInstaRef.current, {
      y: 0,
      duration: 0.3,
      color: "#fff",
      ease: "power3.inOut",
    });
  };

  const handleLeaveHoverInsta = () => {
    gsap.to(hoverInstaRef.current, {
      duration: 0.5,
      height: "0%",
      ease: "power3.inOut",
    });

    const tl = gsap.timeline();

    tl.to(TitleInstaRef.current, {
      y: 50,
      rotateX: 360,
      duration: 0.2,
      color: "#000",
      ease: "power3.inOut",
    });

    tl.set(TitleInstaRef.current, {
      y: -50,
    });

    tl.to(TitleInstaRef.current, {
      y: 0,
      duration: 0.3,
      color: "#000",
      ease: "power3.inOut",
    });
  };

  return (
    <Link
      className="relative inline-flex cursor-pointer items-center overflow-hidden rounded-full border border-black px-5 py-2"
      onMouseEnter={handleEnterHoverInsta}
      onMouseLeave={handleLeaveHoverInsta}
      href={CONTACT_INFO.instagram}
    >
      <span ref={TitleInstaRef} className="z-10">
        Instagram
      </span>
      <div
        ref={hoverInstaRef}
        className="absolute bottom-0 left-0 h-0 w-full bg-black"
      ></div>
    </Link>
  );
};

export const TiktokButton = () => {
  const hoverTiktokRef = useRef(null);
  const TitleTiktokRef = useRef(null);

  const handleEnterHoverTiktok = () => {
    gsap.to(hoverTiktokRef.current, {
      duration: 0.5,
      height: "100%",
      ease: "power3.inOut",
    });

    const tl = gsap.timeline();

    tl.to(TitleTiktokRef.current, {
      y: -50,
      rotateX: 360,
      duration: 0.2,
      color: "#fff",
      ease: "power3.inOut",
    });

    tl.set(TitleTiktokRef.current, {
      y: 50,
    });

    tl.to(TitleTiktokRef.current, {
      y: 0,
      duration: 0.3,
      color: "#fff",
      ease: "power3.inOut",
    });
  };

  const handleLeaveHoverTiktok = () => {
    gsap.to(hoverTiktokRef.current, {
      duration: 0.5,
      height: "0%",
      ease: "power3.inOut",
    });

    const tl = gsap.timeline();

    tl.to(TitleTiktokRef.current, {
      y: 50,
      rotateX: 360,
      duration: 0.2,
      color: "#000",
      ease: "power3.inOut",
    });

    tl.set(TitleTiktokRef.current, {
      y: -50,
    });

    tl.to(TitleTiktokRef.current, {
      y: 0,
      duration: 0.3,
      color: "#000",
      ease: "power3.inOut",
    });
  };
  return (
    <Link
      className="relative mr-2 inline-flex cursor-pointer items-center overflow-hidden rounded-full border border-black px-5 py-2"
      onMouseEnter={handleEnterHoverTiktok}
      onMouseLeave={handleLeaveHoverTiktok}
      href={CONTACT_INFO.tiktok}
    >
      <span ref={TitleTiktokRef} className="relative z-10">
        TikTok
      </span>
      <div
        ref={hoverTiktokRef}
        className="absolute bottom-0 left-0 h-0 w-full bg-black"
      ></div>
    </Link>
  );
};
