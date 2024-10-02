"use client";

import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero";
import Projects from "./components/Projects";

export default function Exhibitions() {
  return (
    <div className="exhibition-container">
      <Hero title="Exhibitions" />
      <Projects />
      <Footer />
    </div>
  );
}
