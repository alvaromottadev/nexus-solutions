import CustomText from "@/components/CustomText";
import contactDesign from "@/assets/contact-design.svg";
import { forwardRef } from "react";
import Contacts from "../Contacts";

const ContactSection = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <>
      <div ref={ref} className="h-screen p-15">
        <div className="flex flex-col lg:flex-row lg:items-center justify-around h-full">
          <div className="flex flex-col items-center lg:p-5">
            <CustomText className="text-[var(--primary-color)] text-[2.25rem] lg:text-[2.5rem] lg:self-start">
              Contato
            </CustomText>
            <div className="text-[1.2rem] lg:text-[1.5rem] mt-[1.12rem] md:w-[31.7rem] text-center lg:text-left">
              <CustomText>
                Entre em contato conosco através dos nossos canais de
                atendimento abaixo. Estamos à disposição para esclarecer
                dúvidas, fornecer mais informações ou ajudar com suas
                necessidades de gerenciamento de almoxarifado.
              </CustomText>
            </div>
            <Contacts />
          </div>
          <div className="hidden lg:block">
            <img src={contactDesign} />
          </div>
        </div>
      </div>
    </>
  );
});

export default ContactSection;
