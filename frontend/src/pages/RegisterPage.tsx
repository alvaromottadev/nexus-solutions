import design from "@/assets/design.svg";
import CustomText from "@/components/CustomText";
import RegisterFormStepOne from "@/components/Dialog/Register/RegisterFormStep1";
import RegisterFormStepTwo from "@/components/Dialog/Register/RegisterFormStep2";
import type addressFormSchema from "@/schemas/addressFormSchema";
import type registerSchema from "@/schemas/registerSchema";
import { useState } from "react";
import type { z } from "zod";

export default function RegisterPage() {
  const [step, setStep] = useState<number>(1);
  const [formStepOne, setFormStepOne] = useState<z.infer<
    typeof registerSchema
  > | null>(null);
  const [formStepTwo, setFormStepTwo] = useState<z.infer<
    typeof addressFormSchema
  > | null>(null);
  return (
    <>
      <div className="h-screen flex items-center w-full justify-center lg:">
        <div className="hidden lg:block w-full h-full">
          <div className="w-full h-full flex items-center justify-center">
            <img src={design} className="hidden lg:block h-[55rem]" />
          </div>
        </div>
        <div className="h-full flex items-center justify-center lg:justify-end">
          <div className="text-white flex flex-col items-center justify-center m rounded-[1rem] lg:rounded-none h-min-[45rem] w-[23rem] md:w-[30rem] bg-[var(--primary-color)] mt-[4rem] md:mt-[0rem] lg:h-full 2xl:w-[40rem]">
            <CustomText className="text-[1.5rem]">Nexus Solutions</CustomText>
            <CustomText>Seja bem-vindo a Nexus! 👋</CustomText>
            <CustomText>
              {step === 1
                ? "Vamos precisar de alguns dados"
                : "Vamos precisar do seu endereço agora"}
            </CustomText>
            {step === 1 ? (
              <RegisterFormStepOne
                setStep={setStep}
                setDataFormOne={setFormStepOne}
                dataForm={formStepOne}
              />
            ) : (
              <RegisterFormStepTwo
                dataFormOne={formStepOne!}
                dataFormTwo={formStepTwo!}
                setStep={setStep}
                setDataFormTwo={setFormStepTwo}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
