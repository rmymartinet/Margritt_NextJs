"use client";

import { CONTACT_INFO } from "@/data/user";
import { motion } from "framer-motion";
import Link from "next/link.js";
import Divider from "../components/Divider";
import InfoItem from "../components/InfosItem";
import SvgName from "../components/SvgName";
import UseLocalTime from "../hooks/useLocalTime";

export default function Contact() {
  const localTime = UseLocalTime();

  return (
    <motion.section className="-mx-[4vw] mt-40 flex h-screen flex-col justify-between px-5 py-10 lg:p-20">
      <h1 className="mb-32 text-6xl font-semibold uppercase lg:mb-[35vh] lg:text-8xl">
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
          Interested in a piece from my galleries? Let me know!
        </div>
      </div>

      {/* Divider */}
      <div className="relative my-20 w-full lg:mb-20 lg:mt-40">
        <Divider bgColor="black" />
      </div>
      {/* Information Section */}
      <div className="mb-40 grid grid-cols-2 grid-rows-2 justify-items-center gap-10 lg:flex lg:justify-around lg:space-y-0 lg:px-20 lg:text-center">
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
      <div className="mt-12 w-full">
        <SvgName textColor={"black"} />
      </div>
    </motion.section>
  );
}
