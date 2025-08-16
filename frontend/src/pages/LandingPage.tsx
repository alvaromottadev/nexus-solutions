import ContactSection from "@/components/sections/ContactSection";
import AdvantagesSection from "@/components/sections/AdvantagesSection";
import InitialSection from "@/components/sections/InitialSection";
import InfoBar from "@/components/InfoBar";
import AboutSection from "@/components/sections/AboutSection";
import OpinionsSection from "@/components/sections/OpinionsSection";
import PricingSection from "@/components/sections/PricingSection";
import { useRef } from "react";

export default function LandingPage() {
  const sectionRefs = {
    about: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
    advantages: useRef<HTMLDivElement>(null),
    pricing: useRef<HTMLDivElement>(null),
  };

  function scrollTo(section: keyof typeof sectionRefs) {
    sectionRefs[section].current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <InitialSection scrollTo={scrollTo} />
      <AdvantagesSection ref={sectionRefs.advantages} />
      <InfoBar
        title="Quem somos?"
        description="Acreditamos que você merece conhecer um pouco mais sobre
          quem está por trás das soluções que oferecemos. Veja quem somos, o que
          acreditamos e como podemos te ajudar."
      />
      <AboutSection ref={sectionRefs.about} />
      <OpinionsSection />
      <PricingSection ref={sectionRefs.pricing} />
      <ContactSection ref={sectionRefs.contact} />
    </>
  );
}
