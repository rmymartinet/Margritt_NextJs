"use client";

import { LARGE_SCREEN_SIZE } from "@/app/constants/constants";
import useWindowWidth from "@/app/hooks/useWindowWidth";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AboutInfos = () => {
  const rightContentRef = useRef(null);
  const leftContainerRef = useRef(null);
  const leftContentRef = useRef(null);
  const leftImgRef = useRef(null);
  const rightImgRef = useRef(null);
  const width = useWindowWidth();
  const isDesktop = width < LARGE_SCREEN_SIZE;

  useGSAP(() => {
    gsap.set(leftImgRef.current, {
      clipPath: "inset(100% 0 0 0)",
    });

    // Animation de l'image avec clip-path
    gsap.to(leftImgRef.current, {
      clipPath: "inset(0% 0 0 0)",
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: leftContentRef.current,
        start: "top bottom",
        end: "bottom center",
        scrub: 3,
      },
    });
    gsap.to(rightImgRef.current, {
      scale: 1.15,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: rightContentRef.current,
        start: "top 70%",
        end: "bottom top",
        scrub: 3,
      },
    });

    // Animation du contenu à gauche au défilement
    gsap.fromTo(
      leftContainerRef.current,
      {
        y: "10%",
      },
      {
        y: "-5%",
        duration: 40,
        scrollTrigger: {
          trigger: rightContentRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 3,
        },
      }
    );
  }, []);

  return (
    <div className="flex flex-col gap-40">
      <p className="text-2xl text-center md:text-start lg:text-5xl text-pretty">
        <span className="font-semibold">Margritt Martinet</span> is a visual
        artist from Charente, dedicated to her creations, providing a space for
        her creativity to flourish
      </p>
      <div className="lg:grid lg:grid-cols-2 gap-20">
        <div
          ref={leftContainerRef}
          className="flex flex-col items-center justify-center gap-20 lg:px-40"
        >
          <div className="text-lg text-center md:text-2xl md:text-start lg:text-xl text-pretty flex flex-col gap-6">
            <p>
              Trained in cabinetmaking at the École Boulle, she obtained a
              bachelor’s degree in Fine Arts from the European School of Art in
              Brittany and a diploma in art therapy from the Faculty of Medicine
              in Poitiers.
            </p>
            <p>
              Passionate about fine arts, drawing, and painting, her artistic
              universe, inspired by her travels and maritime family culture, is
              characterized by an imaginary world in constant reconstruction,
              emphasizing movement and visual effects
            </p>
            <p>
              Her artistic work transforms reality through the manipulation of
              materials, blending instinct, creative impulse, and constant
              exploration
            </p>
          </div>
          <div
            ref={leftContentRef}
            className="h-72 w-72 md:w-full md:h-[80vh] md:overflow-hidden lg:w-[30vw] lg:h-[50vh]"
          >
            <Image
              width={200}
              height={200}
              layout="responsive"
              objectFit="cover"
              ref={leftImgRef}
              src="/assets/about2.webp"
              alt=""
            />
          </div>
        </div>
        {!isDesktop && (
          <div ref={rightContentRef} className="right-img overflow-hidden">
            <Image
              width={700}
              height={700}
              layout="responsive"
              objectFit="cover"
              ref={rightImgRef}
              src="/assets/about1.webp"
              alt=""
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutInfos;
