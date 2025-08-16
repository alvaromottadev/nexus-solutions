import design from "@/assets/design.svg";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { ArrowRight, CheckCircle, Zap, Shield, TrendingUp } from "lucide-react";

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
      <div className="pt-16 sm:pt-20 lg:pt-24 min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-8 lg:gap-12 py-8 sm:py-12 lg:py-16">
            <div className="flex-1 text-center lg:text-left order-2 lg:order-1 w-full max-w-full">
              <div className="mb-6 sm:mb-8">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="whitespace-nowrap">
                    Revolucione sua gestão
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight break-words">
                  Seja um cliente da{" "}
                  <span className="text-[var(--primary-color)] break-words">
                    Nexus Solutions
                  </span>
                </h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12 px-2 sm:px-0">
                <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 text-gray-700">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                    Controle Total
                  </span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 text-gray-700">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                    Segurança Garantida
                  </span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 text-gray-700">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                    Eficiência Máxima
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12">
                <Button
                  onClick={handleRegister}
                  className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group w-full sm:w-auto"
                >
                  <span className="whitespace-nowrap">Seja Nexus</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0" />
                </Button>
                <Button
                  onClick={handleLogin}
                  variant="outline"
                  className="border-2 border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold rounded-xl transition-all duration-200 w-full sm:w-auto"
                >
                  <span className="whitespace-nowrap">Fazer Login</span>
                </Button>
              </div>

              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
                <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                  Confiam em nós:
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 lg:gap-6 flex-wrap">
                  <div className="text-base sm:text-lg lg:text-2xl font-bold text-gray-400">
                    500+
                  </div>
                  <div className="text-base sm:text-lg lg:text-2xl font-bold text-gray-400">
                    Empresas
                  </div>
                  <div className="text-base sm:text-lg lg:text-2xl font-bold text-gray-400">
                    •
                  </div>
                  <div className="text-base sm:text-lg lg:text-2xl font-bold text-gray-400">
                    99.9%
                  </div>
                  <div className="text-base sm:text-lg lg:text-2xl font-bold text-gray-400">
                    Uptime
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 flex justify-center lg:justify-end order-1 lg:order-2 mb-8 lg:mb-0 w-full max-w-full">
              <div className="relative w-full max-w-sm lg:max-w-md xl:max-w-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-color)]/20 to-blue-500/20 rounded-2xl sm:rounded-3xl blur-2xl sm:blur-3xl"></div>
                <div className="relative bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-6 xl:p-8 shadow-xl sm:shadow-2xl border border-gray-100">
                  <img
                    src={design}
                    alt="Nexus Solutions Platform"
                    className="h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 w-full max-w-full object-contain"
                  />

                  <div className="absolute -bottom-3 sm:-bottom-4 lg:-bottom-6 -left-3 sm:-left-4 lg:-left-6 bg-white rounded-lg sm:rounded-xl lg:rounded-2xl p-2 sm:p-3 lg:p-4 shadow-lg sm:shadow-xl border border-gray-100 w-24 sm:w-28 lg:w-32">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                          +45%
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          Eficiência
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
