import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-[#0d0d0d] min-h-screen">
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <Footer />
    </main>
  );
}
