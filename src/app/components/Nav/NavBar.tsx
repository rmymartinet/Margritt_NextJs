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
  const [isClicked, setIsClicked] = useState<number | null>(null); // Null si aucun élément n'est actif
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const linksRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const Links = [
    { href: "/", name: "Home" },
    { href: "/about", name: "About" },
    { href: "/artworks", name: "Artworks" },
    { href: "/shop", name: "Shop" },
    { href: "/exhibitions", name: "Exhibitions" },
    { href: "/contact", name: "Contact" },
  ];

  // Gestion des animations GSAP
  const updateStyles = () => {
    linksRefs.current.forEach((link, index) => {
      if (link) {
        if (isClicked === index) {
          // Active (cliquer)
          gsap.to(link, {
            backgroundColor: "#4A628A",
            color: "white",
            duration: 0.5,
            ease: "power2.out",
          });
        } else if (hoveredIndex === index) {
          gsap.to(link, {
            backgroundColor: "#B9E5E8",
            color: "#4A628A",
            duration: 0.5,
            ease: "power2.out",
          });
        } else {
          // Par défaut
          gsap.to(link, {
            backgroundColor: "transparent",
            color: "black",
            duration: 0.5,
            ease: "power2.out",
          });
        }
      }
    });
  };

  useGSAP(updateStyles, [isClicked, hoveredIndex]);

  return (
    <nav
      className={`relative left-0 top-0 z-50 mb-[20vh] flex w-full items-center justify-center ${
        isZoom && "blur-lg"
      } p-2 pt-4`}
    >
      <div className="flex gap-20 p-4 text-lg font-medium">
        {Links.map((link, index) => (
          <Link
            ref={(el) => {
              linksRefs.current[index] = el;
            }}
            onClick={() => setIsClicked(index)} // Activer l'élément cliqué
            onMouseEnter={() => setHoveredIndex(index)} // Activer temporairement au survol
            onMouseLeave={() => setHoveredIndex(null)} // Désactiver au sortir
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
