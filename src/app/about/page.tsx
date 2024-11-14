"use client";

import Hero from "../components/Hero";
import AboutInfos from "./_components/AboutInfos";
import Quote from "./_components/Quote";

export default function About() {
  return (
    <div>
      <Hero title="About" />
      <AboutInfos />
      <Quote />
    </div>
  );
}
