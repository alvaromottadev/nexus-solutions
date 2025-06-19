import { AlignJustify } from "lucide-react";
import { Button } from "./ui/button";
import CustomText from "./CustomText";

export default function TopBar() {
  return (
    <>
      <div className="h-[5rem]">
        <div className="h-full lg:hidden flex items-center">
          <div className="ml-3">
            <AlignJustify color="black" size={40} />
          </div>
          <div className="absolute self-center flex justify-center items-center w-full">
            <label className="font-poppins text-[var(--color-gray)] text-[2.5rem]">
              Nexus Solutions
            </label>
          </div>
        </div>
        <div className=" h-full hidden lg:flex items-center justify-around">
          <CustomText className="text-[1.5rem] text-[var(--primary-color)]">
            Nexus Solutions
          </CustomText>
          <Button className="bg-transparent text-[var(--color-gray)] text-[1.4rem] hover:bg-transparent border-none shadow-none hover:text-[var(--primary-color)] hover:font-bold transition-all duration-100 cursor-pointer">
            Produtos
          </Button>
          <Button className="bg-transparent text-[var(--color-gray)] text-[1.4rem] hover:bg-transparent border-none shadow-none hover:text-[var(--primary-color)] hover:font-bold transition-all duration-100 cursor-pointer">
            Fornecedores
          </Button>
          <Button className="bg-transparent text-[var(--color-gray)] text-[1.4rem] hover:bg-transparent border-none shadow-none hover:text-[var(--primary-color)] hover:font-bold transition-all duration-100 cursor-pointer">
            Estoque
          </Button>
          <Button className="bg-transparent text-[var(--color-gray)] text-[1.4rem] hover:bg-transparent border-none shadow-none hover:text-[var(--primary-color)] hover:font-bold transition-all duration-100 cursor-pointer">
            Relatórios
          </Button>
          <Button className="bg-transparent text-[var(--color-gray)] text-[1.4rem] hover:bg-transparent border-none shadow-none hover:text-[var(--primary-color)] hover:font-bold transition-all duration-100 cursor-pointer">
            Oraculo
          </Button>
          <Button className="bg-transparent text-[var(--color-gray)] text-[1.4rem] hover:bg-transparent border-none shadow-none hover:text-[var(--primary-color)] hover:font-bold transition-all duration-100 cursor-pointer">
            Perfil
          </Button>
        </div>
      </div>
    </>
  );
}
