import design from "@/assets/design.svg";
import CustomText from "@/components/CustomText";
import RegisterFormStepOne from "@/components/Dialog/Register/RegisterFormStep1";
import RegisterFormStepTwo from "@/components/Dialog/Register/RegisterFormStep2";
import type addressFormSchema from "@/schemas/addressFormSchema";
import type registerSchema from "@/schemas/registerSchema";
import { useState } from "react";
import type { z } from "zod";
import {
  Zap,
  Shield,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Users,
  Building2,
  Globe,
} from "lucide-react";

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
      <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
        <div className="hidden lg:flex lg:w-1/2 h-min-screen relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-color)]/20 to-blue-500/20"></div>

          <div className="relative z-10 flex flex-col justify-center items-center h-full px-12">
            <div className="relative mb-12">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-color)]/20 to-blue-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
                <img
                  src={design}
                  alt="Nexus Solutions Platform"
                  className="h-80 w-auto object-contain"
                />
              </div>
            </div>

            <div className="space-y-4 w-full max-w-md ml-50">
              <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Usuários</h3>
                  <p className="text-sm text-gray-600">
                    Gestão de equipe completa
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Localização</h3>
                  <p className="text-sm text-gray-600">Múltiplas filiais</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-8 bg-white rounded-2xl p-6 shadow-2xl border border-gray-100">
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--primary-color)] mb-2">
                  +45%
                </div>
                <div className="text-sm text-gray-600">
                  Aumento na eficiência
                </div>
                <div className="text-xs text-gray-500 mt-1">em 30 dias</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12">
          <div className="w-full max-w-md">
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-full text-sm font-medium mb-4">
                <Zap className="w-4 h-4" />
                <span>Junte-se a nós!</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Nexus Solutions
              </h2>
              <p className="text-gray-600">Crie sua conta gratuita</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              <div className="hidden lg:block text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-full text-sm font-medium mb-4">
                  <Zap className="w-4 h-4" />
                  <span>Junte-se a nós!</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Nexus Solutions
                </h2>
                <p className="text-gray-600">Crie sua conta gratuita</p>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= 1
                        ? "bg-[var(--primary-color)] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    1
                  </div>
                  <div
                    className={`w-16 h-1 rounded-full ${
                      step >= 2 ? "bg-[var(--primary-color)]" : "bg-gray-200"
                    }`}
                  ></div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step >= 2
                        ? "bg-[var(--primary-color)] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    2
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600">
                  {step === 1 ? "Dados da empresa" : "Endereço da empresa"}
                </p>
              </div>

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

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-4">
                    Já tem uma conta?
                  </p>
                  <a
                    href="/login"
                    className="inline-flex items-center gap-2 text-[var(--primary-color)] hover:text-[var(--primary-color)]/80 font-medium transition-colors duration-200"
                  >
                    Faça login
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-3">Confiam em nós:</p>
                  <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                    <span>500+ Empresas</span>
                    <span>•</span>
                    <span>99.9% Uptime</span>
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
