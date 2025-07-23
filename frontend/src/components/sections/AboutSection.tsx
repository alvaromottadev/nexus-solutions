import { forwardRef } from "react";
import CustomText from "../CustomText";
import aboutDesign from "@/assets/about-design.svg";

const AboutSection = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <>
      <div
        ref={ref}
        className="min-h-screen flex items-center justify-around p-5"
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
            A Nexus Solutions revoluciona o gerenciamento de almoxarifado com
            tecnologia de ponta: Assistente Virtual com IA, alertas inteligentes
            de reposição e integração via QR Code. Nossas soluções otimizam
            processos, antecipam necessidades e simplificam o rastreamento de
            itens, proporcionando máxima eficiência, precisão e controle total
            do seu estoque.
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
