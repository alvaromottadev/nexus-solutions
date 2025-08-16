import { BrainCircuit, Gauge, Lock, Sparkles } from "lucide-react";
import AdvantagesCard from "../CardAdvantages";
import { forwardRef } from "react";

const AdvantagesSection = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <>
      <div ref={ref} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Por que escolher a Nexus?</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Quais as vantagens de usar{" "}
              <span className="text-[var(--primary-color)]">Nexus Solutions</span>?
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Veja como podemos transformar sua gestão de almoxarifado com 
              soluções inteligentes e inovadoras
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <AdvantagesCard
              title="Agilidade"
              description="Movimentações rápidas e precisas usando QR Code, eliminando processos manuais e reduzindo erros."
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
              description="Gerencie estoque e usuários com segurança, reduzindo erros e tomando decisões mais precisas."
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
