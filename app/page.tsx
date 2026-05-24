import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import PageLoader from "@/components/ui/PageLoader";

export default function Home() {
  return (
    <>
      <PageLoader />
      <Navbar />
      <main className="relative overflow-hidden">
        {/* Global ambient light orbs */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div
            className="orb absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full"
            style={{ background: "rgba(79, 142, 247, 0.06)" }}
          />
          <div
            className="orb-2 absolute top-1/3 -right-60 h-[500px] w-[500px] rounded-full"
            style={{ background: "rgba(155, 92, 246, 0.05)" }}
          />
          <div
            className="orb absolute bottom-1/4 left-1/4 h-[400px] w-[400px] rounded-full"
            style={{ background: "rgba(34, 211, 238, 0.04)" }}
          />
        </div>

        <div className="relative z-10">
          <Hero />
          <div className="section-divider mx-auto max-w-6xl" />
          <About />
          <div className="section-divider mx-auto max-w-6xl" />
          <TechStack />
          <div className="section-divider mx-auto max-w-6xl" />
          <Projects />
          <div className="section-divider mx-auto max-w-6xl" />
          <Experience />
          <div className="section-divider mx-auto max-w-6xl" />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
