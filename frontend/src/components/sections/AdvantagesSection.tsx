import { BrainCircuit, Gauge, Lock } from "lucide-react";
import CustomText from "../CustomText";
import AdvantagesCard from "../CardAdvantages";
import { forwardRef } from "react";

const AdvantagesSection = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <>
      <div ref={ref} className="p-[10rem] ">
        <div className="flex flex-col items-center justify-center h-full">
          <CustomText className="text-[1.5rem] text-center text-[var(--primary-color)] w-[20rem]">
            Quais as vantagens de usar Nexus Solutions?
          </CustomText>
          <CustomText className="text-[var(--gray-color)] text-[1rem] text-center w-[15rem]">
            Veja como podemos transformar sua gestão
          </CustomText>
          <div className="mt-[1rem] flex flex-col lg:flex-row gap-y-2 ">
            <AdvantagesCard
              title="Agilidade"
              description="Movimentações rápidas e precisas usando QR Code, eliminando processos
          manuais e reduzindo erros."
            >
              <Gauge size={64} />
            </AdvantagesCard>
            <AdvantagesCard
              title="Oráculo"
              description="Obtenha respostas rápidas através de comandos simples, sem precisar navegar por menus."
            >
              <BrainCircuit size={64} />
            </AdvantagesCard>
            <AdvantagesCard
              title="Segurança"
              description="Gerencie estoque, movimentações e usuários com segurança, evitando erros e tomando decisões mais assertivas."
            >
              <Lock size={64} />
            </AdvantagesCard>
          </div>
        </div>
      </div>
    </>
  );
});

export default AdvantagesSection;
