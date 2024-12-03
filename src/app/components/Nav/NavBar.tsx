"use client";

import { useZoom } from "@/app/context/ZoomProvider";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export default function Nav() {
  const { isZoom } = useZoom();
  const [isClicked, setIsClicked] = useState(0);
  const linksRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const Links = [
    {
      href: "/",
      name: "Home",
      img: "/assets/about1.jpeg",
    },
    {
      href: "/about",
      name: "About",
      img: "/assets/about1.jpeg",
    },
    {
      href: "/artworks",
      name: "Artworks",
      img: "/assets/about1.jpeg",
    },
    {
      href: "/shop",
      name: "Shop",
      img: "/assets/about1.jpeg",
    },
    {
      href: "/exhibitions",
      name: "Exhibitions",
      img: "/assets/about1.jpeg",
    },
    {
      href: "/contact",
      name: "Contact",
      img: "/assets/about1.jpeg",
    },
  ];

  const handleCLicked = (index: number) => {
    setIsClicked(index);
  };

  useGSAP(() => {
    linksRefs.current.forEach((link, index) => {
      if (link) {
        if (isClicked === index && isClicked !== 3) {
          gsap.to(link, {
            duration: 0.5,
            backgroundColor: "#4A628A",
            color: "white",
            ease: "power2.out",
          });
        } else if (isClicked === 3 && index === 3) {
          gsap.to(link, {
            duration: 0.5,
            backgroundColor: "#4A628A",
            color: "white",
            ease: "power2.out",
          });
        } else {
          gsap.to(link, {
            duration: 0.5,
            backgroundColor: "transparent",
            color: "black",
            ease: "power2.out",
          });
        }
      }
    });
  }, [isClicked]);

  return (
    <nav
      className={`relative left-0 top-0 z-50 mb-[20vh] flex w-full items-center justify-center ${isZoom && "blur-lg"} p-2 pt-4`}
    >
      <div className="flex gap-20 p-4 text-lg font-medium">
        {Links.map((link, index) => (
          <Link
            ref={(el) => {
              linksRefs.current[index] = el;
            }}
            onClick={() => handleCLicked(index)}
            onMouseEnter={() => handleCLicked(index)}
            onMouseLeave={() => handleCLicked(-1)}
            className="relative overflow-hidden rounded-full p-2"
            key={link.name}
            href={link.href}
          >
            <p className="relative z-10">{link.name}</p>
          </Link>
        ))}
      </div>
      <div className="absolute right-4 flex items-center gap-10 rounded-full bg-[#4A628A] px-4 py-2 text-white">
        <Link href="/checkout">
          <FaShoppingCart size={20} />
        </Link>
      </div>
    </nav>
  );
}
