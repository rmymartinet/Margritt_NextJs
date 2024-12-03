"use client";

import { useEffect, useRef } from "react";
import {
  TitleTransition,
  TitleTransitionFromCenter,
} from "./components/Animations/TitleTransition";
import { useFilteredData } from "./hooks/useFilteredData";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { InstagramButton, TiktokButton } from "./components/SocialButton";
import Iphone from "./components/Iphone";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const discoverTitleRef = useRef<HTMLDivElement>(null);
  const bicTitleRef = useRef<HTMLDivElement>(null);
  const socialTitleRef = useRef<HTMLDivElement>(null);
  const discoverContainerRef = useRef<HTMLDivElement>(null);
  const bicContainerRef = useRef<HTMLDivElement>(null);
  const socialContainerRef = useRef<HTMLDivElement>(null);

  const instaPoster = "/assets/insta_poster.png";
  const tiktokPoster = "/assets/tiktok_poster.png";

  const videoInsta = "/assets/videos/instagram_scroll.mp4";
  const videoTiktok = "/assets/videos/tiktok_scroll.mp4";

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const { data } = useFilteredData();

  useGSAP(() => {
    const discoverChild = discoverTitleRef.current?.children;
    const bicChild = bicTitleRef.current?.children;
    const socialChild = socialTitleRef.current?.children;

    if (discoverChild) {
      gsap.from(discoverChild, {
        skewX: 30,
        y: 400,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: discoverContainerRef.current,
          start: "top 30%",
        },
      });
    }
    if (bicChild) {
      gsap.from(bicChild, {
        skewX: 30,
        y: 400,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: bicContainerRef.current,
          start: "top 30%",
        },
      });
    }

    if (socialChild) {
      gsap.from(socialChild, {
        delay: 1,
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
    <section>
      <div className="mt-60 min-h-screen lg:mt-0">
        <div className="mb-[40vh] flex flex-col items-center">
          <div className="overflow-hidden pt-20 font-semibold uppercase">
            <TitleTransitionFromCenter>
              <h1 className="text-center text-6xl md:text-9xl xl:text-[15rem]">
                Margritt
              </h1>
            </TitleTransitionFromCenter>
          </div>
        </div>
        <div ref={discoverContainerRef} className="flex flex-col gap-20">
          <div
            ref={discoverTitleRef}
            className="flex flex-col overflow-hidden md:w-[70%] lg:w-[50%]"
          >
            <h1 className="text-6xl font-medium md:text-7xl lg:text-9xl">
              Discover
            </h1>
            <h1 className="self-end text-6xl font-medium md:text-7xl lg:text-9xl">
              my works
            </h1>
          </div>

          <div className="grid grid-flow-row gap-4 md:grid-cols-2 lg:grid-cols-4">
            {data.map((item) => (
              <div key={item.id} className="h-[30vh]">
                <Image
                  alt=""
                  width={2000}
                  height={2000}
                  src={item.imageUrls[0]}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
            <div className="h-[30vh]">
              <Image
                alt=""
                width={2000}
                height={2000}
                src="/assets/homeGrid/1.jpg"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="h-[30vh]">
              <Image
                alt=""
                width={2000}
                height={2000}
                src="/assets/homeGrid/2.jpg"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
        <div
          ref={bicContainerRef}
          className="mb-[10vh] mt-[10vh] flex w-full flex-col gap-20"
        >
          <div
            ref={bicTitleRef}
            className="flex flex-col overflow-hidden md:w-[70%] lg:w-[50%]"
          >
            <h1 className="text-6xl font-medium md:text-7xl lg:text-9xl">
              Encounter
            </h1>
            <h1 className="self-end text-6xl font-medium md:text-7xl lg:text-9xl">
              with Bic
            </h1>
          </div>
          <div className="self-end overflow-hidden md:w-[70%] lg:w-[50%]">
            <TitleTransition>
              <h1 className="text-xl font-medium md:text-2xl lg:text-5xl">
                Encounter with Bic “I had the honor of being one of the 7
                artists chosen worldwide to share my story in this exclusive
                interview.”
              </h1>
            </TitleTransition>
          </div>
          <video
            className="self-center rounded-3xl"
            autoPlay
            muted
            loop
            preload="auto"
            playsInline
            controls
            src="/assets/videos/bicVideo.mp4"
            poster="/assets/bic_poster.png"
          ></video>
        </div>
        <div
          ref={socialContainerRef}
          className="flex flex-col items-center justify-center gap-20"
        >
          <div
            ref={socialTitleRef}
            className="flex flex-col overflow-hidden md:w-[70%] lg:w-[50%]"
          >
            <h1 className="text-6xl font-medium md:text-7xl lg:text-9xl">
              Follow my artist&apos;s{" "}
            </h1>
            <h1 className="self-end text-6xl font-medium md:text-7xl lg:text-9xl">
              daily life
            </h1>
          </div>
          <div className="flex gap-10 lg:gap-44">
            <InstagramButton />
            <TiktokButton />
          </div>
          <div className="flex flex-col gap-10 md:flex-row">
            <Iphone poster={instaPoster} videoUrl={videoInsta} />
            <Iphone poster={tiktokPoster} videoUrl={videoTiktok} />
          </div>
        </div>{" "}
      </div>
    </section>
  );
}
