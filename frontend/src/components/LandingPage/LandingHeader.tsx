import { AlignJustify } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import CustomText from "../CustomText";

interface LoginHeaderProps {
  scrollTo: (section: "about" | "advantages" | "contact") => void;
}

export default function LandingHeader({ scrollTo }: LoginHeaderProps) {
  const navigation = useNavigate();

  function handleLogin() {
    navigation("/login");
  }

  function handleHome() {
    navigation("/home");
  }

  return (
    <>
      <div className="h-[5rem]">
        <div className="h-full lg:hidden flex items-center">
          <div className="absolute self-center flex justify-center items-center w-full">
            <CustomText className="text-[2rem] md:text-[2.5rem] text-[var(--primary-color)]">
              Nexus Solutions
            </CustomText>
          </div>
        </div>
        <div className="h-full hidden lg:flex items-center justify-around">
          <CustomText className="text-[1.5rem] text-[var(--primary-color)]">
            Nexus Solutions
          </CustomText>
          <Button className="bg-transparent text-[var(--color-gray)] text-[1.2rem] hover:bg-transparent border-none shadow-none hover:text-[var(--primary-color)] hover:font-bold transition-all duration-100 cursor-pointer">
            Inicio
          </Button>
          <Button
            onClick={() => scrollTo("advantages")}
            className="bg-transparent text-[var(--color-gray)] text-[1.2rem] hover:bg-transparent border-none shadow-none hover:text-[var(--primary-color)] hover:font-bold transition-all duration-100 cursor-pointer"
          >
            Vantagens
          </Button>
          <Button
            onClick={() => scrollTo("contact")}
            className="bg-transparent text-[var(--color-gray)] text-[1.2rem] hover:bg-transparent border-none shadow-none hover:text-[var(--primary-color)] hover:font-bold transition-all duration-100 cursor-pointer"
          >
            Contato
          </Button>
          <Button
            onClick={() => scrollTo("about")}
            className="bg-transparent text-[var(--color-gray)] text-[1.2rem] hover:bg-transparent border-none shadow-none hover:text-[var(--primary-color)] hover:font-bold transition-all duration-100 cursor-pointer"
          >
            Sobre
          </Button>
          <Button
            onClick={handleHome}
            className="bg-transparent text-[var(--color-gray)] text-[1.2rem] hover:bg-transparent border-none shadow-none hover:text-[var(--primary-color)] hover:font-bold transition-all duration-100 cursor-pointer"
          >
            Home
          </Button>
          <Button
            onClick={handleLogin}
            className="cursor-pointer text-[1.2rem] bg-[var(--primary-color)] rounded-[2.85rem] h-[3rem]"
          >
            Entrar na conta
          </Button>
        </div>
      </div>
    </>
  );
}
