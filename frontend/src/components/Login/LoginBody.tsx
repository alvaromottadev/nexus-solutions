import design from "@/assets/design.svg";
import CustomText from "../CustomText";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

export default function LoginBody() {
  const navigation = useNavigate();

  function handleLogin() {
    navigation(`/login`);
  }

  function handleRegister() {
    navigation(`/register`);
  }

  return (
    <>
      <div className="mt-[7rem] min-h-[20rem]">
        <div className="flex flex-col lg:flex-row items-center lg:justify-around lg:p-5 2xl:p-0">
          <div className="flex flex-col items-center lg:block">
            <div className="flex flex-col">
              <CustomText className="text-left text-[2.5rem] font-bold text-[var(--primary-color)]">
                Seja um cliente
              </CustomText>
              <CustomText className="text-[2rem] font-bold text-[var(--color-gray)]">
                da Nexus Solutions
              </CustomText>
            </div>
            <div className="mt-[1.8rem] w-[20rem] md:w-[25rem] flex ">
              <CustomText className="text-center lg:text-left text-[1.2rem] md:text-[1.5rem] font-poppins">
                Transformamos a gestão do seu almoxarifado com soluções
                inteligentes, aumentando a eficiência, reduzindo custos e
                garantindo controle total do seu estoque!
              </CustomText>
            </div>
            <div className="mt-[12.75rem] flex flex-col w-full gap-y-2">
              <Button
                onClick={handleRegister}
                className="cursor-pointer bg-[var(--primary-color)] h-[4rem]"
              >
                Seja Nexus
              </Button>
              <Button
                onClick={handleLogin}
                className="cursor-pointer bg-[var(--primary-color)] h-[4rem]"
              >
                Login
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <img src={design} className="h-[40rem]" />
          </div>
        </div>
      </div>
    </>
  );
}
