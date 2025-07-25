import { useAuth } from "@/hooks/useAuth";
import Contacts from "../Contacts";
import CustomText from "../CustomText";
import GraphicComponent from "../GraphicComponent";

export default function HomeBody() {
  const auth = useAuth();

  const companyName = auth?.user?.company.name;

  return (
    <>
      <div className=" flex-col flex flex-1">
        <div className="flex-1 flex justify-center items-center lg:justify-between px-28 lg:px-14  2xl:px-28 w-full">
          <div className="flex flex-col items-center lg:items-start w-[80%] md:w-auto gap-y-2">
            <CustomText className="w-[25rem] md:w-auto text-center text-[1.8rem] lg:text-[2.5rem] text-[var(--primary-color)] font-bold lg:text-left">
              Olá, {companyName}!
            </CustomText>
            <CustomText className="w-[20rem] text-[1.5rem] text-center lg:text-left lg:w-[30rem] lg:text-[2rem]">
              Obrigado por confiar em nossos serviços! Estamos aqui para
              oferecer as melhores soluções e apoiar seu sucesso.
            </CustomText>
            <Contacts />
          </div>
          <div className=" hidden lg:block flex-col items-center justify-center">
            <GraphicComponent />
          </div>
        </div>
      </div>
    </>
  );
}
