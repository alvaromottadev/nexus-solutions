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
          <div className="absolute self-center flex justify-center items-center w-full">
            <label className="font-poppins text-[var(--color-gray)] text-[2.5rem]">
              Nexus Solutions
            </label>
          </div>
        </div>
        <div className="h-full hidden lg:flex items-center justify-around">
          <CustomText className="text-[1.5rem]">Nexus Solutions</CustomText>
          <CustomText className="text-[1.2rem]">Inicio</CustomText>
          <CustomText className="text-[1.2rem]">Serviços</CustomText>
          <CustomText className="text-[1.2rem]">Contato</CustomText>
          <CustomText className="text-[1.2rem]">Sobre</CustomText>
          <Button className="text-[1.2rem] bg-[var(--primary-color)] rounded-[2.85rem] h-[3rem]">
            Não possui uma conta?
          </Button>
        </div>
      </div>
    </>
  );
}
