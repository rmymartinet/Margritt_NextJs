"use client";

import Footer from "../_components/Footer/Footer";
import Hero from "../_components/Hero";
import AboutInfos from "./_components/AboutInfos";
import Quote from "./_components/Quote";

export default function About() {
  return (
    <div>
      <Hero title="About" />
      <AboutInfos />
      <Quote />
      <Footer />
    </div>
  );
}
