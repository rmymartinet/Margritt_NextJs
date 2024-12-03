"use client";

import { CONTACT_INFO } from "@/data/user";
import { motion } from "framer-motion";
import Link from "next/link.js";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import UseLocalTime from "@/app/hooks/useLocalTime";
import Divider from "../Divider";
import InfosItem from "../InfosItem";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Footer = () => {
  const localTime = UseLocalTime();
  const rightTitleRef = useRef<HTMLHeadingElement>(null);
  const leftTitleRef = useRef<HTMLHeadingElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const rightText = new SplitType(rightTitleRef.current || "", {
      types: "chars",
    });
    const leftText = new SplitType(leftTitleRef.current || "", {
      types: "chars",
    });

    // Animation pour inverser l'ordre des lettres
    gsap.from(rightText.chars, {
      delay: 0.5,
      y: 400,
      duration: 1,
      ease: "power2.out",
      stagger: { amount: 0.4, from: "end" }, // Inverse l'ordre de l'animation
      scrollTrigger: {
        trigger: titleContainerRef.current,
        start: "top 50%",
      },
    });

    gsap.from(leftText.chars, {
      delay: 0.5,
      y: 400,
      duration: 1,
      ease: "power2.out",
      stagger: { amount: 0.4 },
      scrollTrigger: {
        trigger: titleContainerRef.current,
        start: "top 50%",
      },
    });
  }, []);

  return (
    <motion.section className="relative mb-4 mt-40 flex min-h-screen w-full flex-col justify-between overflow-hidden rounded-3xl bg-blue-200 px-5 py-10 lg:p-20">
      <h1 className="mb-32 text-5xl font-semibold uppercase text-white md:text-6xl lg:mb-[20vh] lg:text-9xl">
        reach me
      </h1>
      <div className="flex flex-col-reverse items-center gap-6 text-center lg:flex-row lg:justify-between">
        <div>
          <div className="mt-4 lg:mt-0">
            <Link
              href={`mailto:${CONTACT_INFO.email}`}
              className="mail mail-black text-2xl font-semibold md:font-normal lg:text-6xl"
            >
              {CONTACT_INFO.email}
            </Link>
          </div>
        </div>
        <div className="text-2xl lg:w-[30vw] lg:text-4xl">
          Interested in a piece from my artworks? Let me know!
        </div>
      </div>
      {/* Divider */}
      <div className="relative my-20 w-full lg:mb-20 lg:mt-40">
        <Divider bgColor="black" />
      </div>
      {/* Information Section */}
      <div className="mb-[40vh] grid grid-rows-4 md:grid-cols-2 md:justify-items-center lg:flex lg:justify-around lg:space-y-0 lg:text-center">
        <InfosItem
          className="flex-col"
          label="Local Time"
          value={localTime}
          textColor="text-white"
        />
        <InfosItem
          className="flex-col"
          label="Number"
          value={CONTACT_INFO.number}
          textColor="text-white"
        />
        <InfosItem
          className="flex-col"
          label="Instagram"
          value={
            <Link
              href={CONTACT_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              @maargriitt
            </Link>
          }
          textColor="text-white"
        />
        <InfosItem
          className="flex-col"
          label="TikTok"
          value={
            <Link
              href={CONTACT_INFO.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              @margriitt
            </Link>
          }
          textColor="text-white"
        />
      </div>
      <div
        ref={titleContainerRef}
        className="absolute -bottom-[3%] left-0 flex w-full items-end justify-center overflow-hidden"
      >
        <h1
          ref={rightTitleRef}
          className="text-4xl font-medium uppercase leading-none lg:text-[18vw]"
        >
          marg
        </h1>
        <h1
          ref={leftTitleRef}
          className="text-4xl font-medium uppercase leading-none lg:text-[18vw]"
        >
          ritt
        </h1>
      </div>
    </motion.section>
  );
};

export default Footer;
