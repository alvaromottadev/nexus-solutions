import { AlignJustify } from "lucide-react";
import CustomText from "../CustomText";
import { Button } from "../ui/button";

export default function LoginHeader() {
  return (
    <>
      <div className="h-[5rem]">
        <div className="h-full lg:hidden flex items-center">
          <div className="ml-3">
            <AlignJustify color="black" size={40} />
          </div>
          <div className="self-center flex justify-center items-center w-full">
            <label className="font-poppins text-[var(--color-gray)] text-[2.5rem]">
              Nexus Solutions
            </label>
          </div>
        </div>
        <div className="h-full hidden lg:flex items-center justify-around">
          <Button className="bg-transparent text-[var(--color-gray)] text-[1.5rem] hover:bg-transparent border-none shadow-none hover:underline hover:font-bold transition-all duration-100 cursor-pointer">
            Nexus Solutions
          </Button>
          <Button className="bg-transparent text-[var(--color-gray)] text-[1.2rem] hover:bg-transparent border-none shadow-none hover:underline hover:font-bold transition-all duration-100 cursor-pointer">
            Inicio
          </Button>
          <Button className="bg-transparent text-[var(--color-gray)] text-[1.2rem] hover:bg-transparent border-none shadow-none hover:underline hover:font-bold transition-all duration-100 cursor-pointer">
            Serviços
          </Button>
          <Button className="bg-transparent text-[var(--color-gray)] text-[1.2rem] hover:bg-transparent border-none shadow-none hover:underline hover:font-bold transition-all duration-100 cursor-pointer">
            Contato
          </Button>
          <Button className="bg-transparent text-[var(--color-gray)] text-[1.2rem] hover:bg-transparent border-none shadow-none hover:underline hover:font-bold transition-all duration-100 cursor-pointer">
            Sobre
          </Button>
          <Button className="text-[1.2rem] bg-[var(--primary-color)] rounded-[2.85rem] h-[3rem]">
            Não possui uma conta?
          </Button>
        </div>
      </div>
    </>
  );
}
