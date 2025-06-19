import { forwardRef } from "react";
import CustomText from "../CustomText";
import aboutDesign from "@/assets/about-design.svg";

const AboutSection = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <>
      <div
        ref={ref}
        className="bg-[var(--background-color)] min-h-screen flex items-center justify-around p-5"
      >
        <div className="w-[30rem] flex flex-col items-center justify-center h-full gap-y-2">
          <CustomText className="text-[var(--primary-color)] font-bold text-[1.5rem] md:text-[1.7rem]">
            Quem somos?
          </CustomText>
          <CustomText className="text-[1.2rem] text-center md:text-[1.5rem]">
            A Nexus Solutions é uma empresa especializada em otimizar a gestão
            de almoxarifado, oferecendo soluções inteligentes que aumentam a
            eficiência, reduzem custos e garantem total controle de estoque para
            seus clientes.
          </CustomText>
          <CustomText className="text-[var(--primary-color)] font-bold text-[1.5rem] md:text-[1.7rem]">
            Por que a nossa empresa?
          </CustomText>
          <CustomText className="text-[1.2rem] text-center md:text-[1.5rem]">
            A Nexus Solutions oferece um gerenciamento de almoxarifado
            inteligente, com Assistente Virtual, alertas de reposição e QR Code.
            Nossa tecnologia otimiza processos, prevê necessidades de reposição
            e facilita o rastreamento de itens, garantindo eficiência, precisão
            e controle total do seu estoque.
          </CustomText>
        </div>
        <div className="hidden lg:block">
          <img src={aboutDesign} />
        </div>
      </div>
    </>
  );
});

export default AboutSection;
