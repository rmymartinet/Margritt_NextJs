"use client";

import Footer from "../_components/Footer/Footer";
import Hero from "../_components/Hero";
import Projects from "./_components/Projects";

export default function Exhibitions() {
  return (
    <div className="exhibition-container">
      <Hero title="Exhibitions" />
      <Projects />
      <Footer />
    </div>
  );
}
