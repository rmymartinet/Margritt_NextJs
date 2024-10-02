"use client";

import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero";
import AboutInfos from "./components/AboutInfos";
import Quote from "./components/Quote";

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
