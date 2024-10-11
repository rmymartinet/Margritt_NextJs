"use client";

import { useEffect, useRef } from "react";
import { TitleTransition } from "./components/Animations/TitleTransition";
import Footer from "./components/Footer/Footer";
import SocialMedia from "./components/SocialMedia";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section>
      <div className="mt-60 min-h-screen lg:mt-0">
        <div className="mb-[40vh] flex flex-col items-center">
          <div className="overflow-hidden font-semibold uppercase">
            <TitleTransition yposition={500}>
              <h1 className="text-center text-6xl md:text-9xl xl:text-[15rem]">
                Margritt
              </h1>
            </TitleTransition>
          </div>
          <p className="self-end italic">No limits, just art.</p>
        </div>
        <div className="mb-[10vh] flex flex-col">
          <div className="mb-20 border-b border-black">
            <h2 className="text-lg font-normal">Collaboration with Bic</h2>
          </div>
          <video
            className="self-center"
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
        <SocialMedia />
      </div>
      <Footer />
    </section>
  );
}
