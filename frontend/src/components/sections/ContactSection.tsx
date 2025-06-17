import CustomText from "@/components/CustomText";
import SocialContact from "@/components/SocialContact";
import { FaGoogle, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import contactDesign from "@/assets/contact-design.svg";

export default function ContactSection() {
  return (
    <>
      <div className="bg-[var(--background-color)] h-screen">
        <div className="flex flex-col lg:flex-row lg:items-center justify-center h-full">
          <div className="flex flex-col items-center lg:p-5">
            <CustomText className="text-[var(--primary-color)] text-[2.25rem] lg:text-[2.5rem] lg:self-start">
              Contato
            </CustomText>
            <div className="text-[1.2rem] lg:text-[1.5rem] mt-[1.12rem] w-[31.7rem] text-center lg:text-left">
              <CustomText>
                Entre em contato conosco através dos nossos canais de
                atendimento abaixo. Estamos à disposição para esclarecer
                dúvidas, fornecer mais informações ou ajudar com suas
                necessidades de gerenciamento de almoxarifado.
              </CustomText>
            </div>
            <div className="flex flex-col gap-y-2 mt-[2.5rem] lg:mt-[3rem] lg:self-start">
              <SocialContact
                socialName="Instagram"
                socialHandle="@nexussolutions"
              >
                <FaInstagram size={"32"} />
              </SocialContact>
              <SocialContact
                socialName="Whatsapp"
                socialHandle="+55 31 99999-9999"
              >
                <FaWhatsapp size={32} />
              </SocialContact>
              <SocialContact
                socialName="Linkedin"
                socialHandle="/in/nexussolutions"
              >
                <FaLinkedin size={32} />
              </SocialContact>
              <SocialContact
                socialName="Email"
                socialHandle="nexus@solutions.com"
              >
                <FaGoogle size={32} />
              </SocialContact>
            </div>
          </div>
          <div className="hidden lg:block">
            <img src={contactDesign} />
          </div>
        </div>
      </div>
    </>
  );
}
