import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Process } from "@/components/Process";
import { Channels } from "@/components/Channels";
import { Services } from "@/components/Services";
import { Trust } from "@/components/Trust";
import { Human } from "@/components/Human";
import { Faq } from "@/components/Faq";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Process />
        <Channels />
        <Services />
        <Trust />
        <Human />
        <Faq />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
