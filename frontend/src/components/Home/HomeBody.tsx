import { useAuth } from "@/hooks/useAuth";
import Contacts from "../Contacts";
import CustomText from "../CustomText";
import GraphicComponent from "../GraphicComponent";
import { BarChart3, Users, Zap, Target, Award, Rocket } from "lucide-react";

export default function HomeBody() {
  const auth = useAuth();
  const companyName = auth?.user?.company.name;

  return (
    <div className="flex-1 flex flex-col">
      <div className="text-center py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 p-2 sm:p-3 bg-[var(--primary-color)]/10 rounded-full border border-[var(--primary-color)]/30 animate-float">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[var(--primary-color)] rounded-full animate-pulse"></div>
            <span className="text-[var(--primary-color)] text-xs sm:text-sm font-medium">
              Gestão com Inteligência
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 font-poppins mb-4 sm:mb-6 animate-fadeInUp">
            Olá,{" "}
            <span className="text-[var(--primary-color)]">{companyName}</span>!
          </h1>

          <p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 font-poppins max-w-3xl mx-auto leading-relaxed animate-fadeInUp px-2 sm:px-0"
            style={{ animationDelay: "0.2s" }}
          >
            Bem-vindo ao seu painel de controle inteligente. Monitore, gerencie
            e otimize seu almoxarifado com ferramentas avançadas.
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-6 mb-8 sm:mb-12">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-xl sm:text-2xl font-bold text-gray-800 font-poppins mb-4 sm:mb-6 text-center animate-fadeInUp"
            style={{ animationDelay: "0.4s" }}
          >
            Sua Gestão é de Sucesso
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div
              className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 group card-hover animate-scaleIn"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="text-center">
                <div className="p-2 sm:p-3 bg-[var(--primary-color)] rounded-xl mx-auto mb-3 sm:mb-4 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                  Eficiência Máxima
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Seu sistema está otimizado para máxima produtividade
                </p>
              </div>
            </div>

            <div
              className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 group card-hover animate-scaleIn"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="text-center">
                <div className="p-2 sm:p-3 bg-[var(--primary-color)] rounded-xl mx-auto mb-3 sm:mb-4 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                  Controle Total
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Acompanhe cada movimento em tempo real
                </p>
              </div>
            </div>

            <div
              className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 group card-hover animate-scaleIn"
              style={{ animationDelay: "0.7s" }}
            >
              <div className="text-center">
                <div className="p-2 sm:p-3 bg-[var(--primary-color)] rounded-xl mx-auto mb-3 sm:mb-4 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                  Qualidade Premium
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Padrões de excelência em gestão de estoque
                </p>
              </div>
            </div>

            <div
              className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 group card-hover animate-scaleIn"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="text-center">
                <div className="p-2 sm:p-3 bg-[var(--primary-color)] rounded-xl mx-auto mb-3 sm:mb-4 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                  Inovação Constante
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Sempre à frente com tecnologia de ponta
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            <div
              className="order-2 lg:order-1 animate-slideInLeft"
              style={{ animationDelay: "0.9s" }}
            >
              <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 card-hover shadow-sm">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="p-2 bg-[var(--primary-color)] rounded-lg">
                    <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 font-poppins">
                    Produtos Mais Movimentados
                  </h3>
                </div>
                <GraphicComponent />
              </div>
            </div>

            <div
              className="order-1 lg:order-2 animate-slideInRight"
              style={{ animationDelay: "1s" }}
            >
              <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 card-hover shadow-sm">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="p-2 bg-[var(--primary-color)] rounded-lg">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 font-poppins">
                    Suporte e Contato
                  </h3>
                </div>

                <div className="mb-4 sm:mb-6">
                  <p className="text-gray-600 font-poppins text-base sm:text-lg leading-relaxed">
                    Nossa equipe está sempre pronta para ajudar você a
                    aproveitar ao máximo todas as funcionalidades do sistema.
                    Entre em contato conosco!
                  </p>
                </div>

                <Contacts />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
