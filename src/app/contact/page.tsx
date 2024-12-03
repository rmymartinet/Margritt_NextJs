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
import Divider from "../components/Divider";
import InfosItem from "../components/InfosItem";
import Hero from "../components/Hero";

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
    <motion.section className="relative mb-4 flex min-h-screen w-full flex-col justify-between overflow-hidden rounded-3xl px-5">
      <Hero title1="Contact" />
      <div className="flex flex-col-reverse items-center justify-between gap-20 text-center md:flex-row">
        <div className="mt-4 lg:mt-0">
          <Link
            href={`mailto:${CONTACT_INFO.email}`}
            className="mail mail-black text-2xl font-semibold md:font-normal lg:text-4xl"
          >
            {CONTACT_INFO.email}
          </Link>
        </div>
        <div className="self-end text-2xl lg:w-[30vw] lg:text-4xl">
          Interested in a piece from my artworks? Let me know!
        </div>
      </div>
      {/* Divider */}
      <div className="relative my-20 w-full lg:mb-20 lg:mt-40">
        <Divider bgColor="black" />
      </div>
      {/* Information Section */}
      <div className="mb-[40vh] grid grid-rows-4 place-content-center gap-10 md:grid-cols-2 md:justify-items-center md:gap-0 lg:flex lg:justify-around lg:space-y-0 lg:text-center">
        <InfosItem
          label="Local Time"
          value={localTime}
          textColor="text-slate-400"
        />
        <InfosItem
          label="Number"
          value={CONTACT_INFO.number}
          textColor="text-slate-400"
        />
        <InfosItem
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
          textColor="text-slate-400"
        />
        <InfosItem
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
          textColor="text-slate-400"
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
