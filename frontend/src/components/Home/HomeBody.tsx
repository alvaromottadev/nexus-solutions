import { FaGoogle, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import CustomText from "../CustomText";
import SocialContact from "../SocialContact";
import Contacts from "../Contacts";

export default function HomeBody() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-[50rem]">
        <CustomText className="text-[var(--primary-color)] font-bold text-[2.5rem]">
          Olá, Meliy!
        </CustomText>
        <CustomText className="text-center text-[1.5rem] w-[70%]">
          Obrigado por confiar em nossa empresa! Estamos aqui para oferecer as
          melhores soluções e apoiar seu sucesso.
        </CustomText>
        <Contacts />
      </div>
    </div>
  );
}
