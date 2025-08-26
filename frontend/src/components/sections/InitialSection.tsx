import LoginBody from "../../components/Login/LoginBody";
import LandingHeader from "../LandingPage/LandingHeader";

interface LoginSectionProps {
  scrollTo: (section: "about" | "advantages" | "contact") => void;
}

export default function InitialSection({ scrollTo }: LoginSectionProps) {
  return (
    <div className="min-h-screen">
      <LandingHeader scrollTo={scrollTo} />
      <LoginBody />
    </div>
  );
  
}
