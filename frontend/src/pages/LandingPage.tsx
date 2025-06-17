import ContactSection from "@/components/sections/ContactSection";
import AdvantagesSection from "@/components/sections/AdvantagesSection";
import LoginSection from "@/components/sections/LoginSection";
import InfoBar from "@/components/InfoBar";
import AboutSection from "@/components/sections/AboutSection";

export default function LandingPage() {
  return (
    <>
      <LoginSection />
      <AdvantagesSection />
      <InfoBar
        title="Quem somos?"
        description="Acreditamos que você merece conhecer um pouco mais sobre
          quem está por trás das soluções que oferecemos. Veja quem somos, o que
          acreditamos e como podemos te ajudar."
      />
      <AboutSection />
      <ContactSection />
    </>
  );
}
