"use client";

import { CONTACT_INFO } from "@/data/user";
import { motion } from "framer-motion";
import Link from "next/link.js";
import Divider from "../components/Divider";
import InfoItem from "../components/InfosItem";
import UseLocalTime from "../hooks/useLocalTime";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Contact() {
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
    <motion.section className="relative mb-4 mt-40 flex min-h-screen w-full flex-col justify-between overflow-hidden rounded-3xl px-5 py-10 lg:p-20">
      <h1 className="mb-32 text-6xl font-semibold uppercase lg:mb-[25vh] lg:text-8xl">
        Contact
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
      <div className="mb-[40vh] grid grid-cols-2 grid-rows-2 justify-items-center gap-10 lg:flex lg:justify-around lg:space-y-0 lg:px-20 lg:text-center">
        <InfoItem className="flex-col" label="Local Time" value={localTime} />
        <InfoItem
          className="flex-col"
          label="Number"
          value={CONTACT_INFO.number}
        />
        <InfoItem
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
        />
        <InfoItem
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
        />
      </div>
      <div
        ref={titleContainerRef}
        className="absolute -bottom-[4.3%] left-0 flex w-full items-end justify-center overflow-hidden"
      >
        <h1
          ref={rightTitleRef}
          className="text-[18.4vw] font-medium uppercase leading-none"
        >
          marg
        </h1>
        <h1
          ref={leftTitleRef}
          className="text-[18.4vw] font-medium uppercase leading-none"
        >
          ritt
        </h1>
      </div>
    </motion.section>
  );
}
