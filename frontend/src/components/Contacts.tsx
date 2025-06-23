import { FaGoogle, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import SocialContact from "@/components/SocialContact";
import CustomText from "./CustomText";
export default function Contacts() {
  return (
    <>
      <div className="flex flex-col gap-y-2 mt-[2rem] lg:mt-[2.5rem] lg:self-start">
        <CustomText className="text-[1.5rem] text-center lg:text-left">
          Precisa de suporte? Entre em contato:
        </CustomText>
        <SocialContact socialName="Instagram" socialHandle="@nexussolutions">
          <FaInstagram size={"32"} />
        </SocialContact>
        <SocialContact socialName="Whatsapp" socialHandle="+55 31 99999-9999">
          <FaWhatsapp size={32} />
        </SocialContact>
        <SocialContact socialName="Linkedin" socialHandle="/in/nexussolutions">
          <FaLinkedin size={32} />
        </SocialContact>
        <SocialContact socialName="Email" socialHandle="nexus@solutions.com">
          <FaGoogle size={32} />
        </SocialContact>
      </div>
    </>
  );
}
