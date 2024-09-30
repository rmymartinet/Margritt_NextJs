"use client";

import Hero from "../_components/Hero";
import AboutInfos from "./_components/aboutInfos";
import Quote from "./_components/quote";

export default function About() {
  return (
    <div>
      <Hero title="About" />
      <AboutInfos />
      <Quote />
    </div>
  );
}
