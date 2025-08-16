import contactDesign from "@/assets/contact-design.svg";
import { forwardRef } from "react";
import Contacts from "../Contacts";
import { MessageCircle, Users } from "lucide-react";

const ContactSection = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <>
      <div
        ref={ref}
        className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-16 sm:py-20 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-full text-sm font-medium mb-6">
              <MessageCircle className="w-4 h-4" />
              <span>Entre em Contato</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Vamos Conversar sobre seu{" "}
              <span className="text-[var(--primary-color)]">Projeto</span>
            </h2>

            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Nossa equipe está sempre pronta para ajudar você a transformar a
              gestão do seu almoxarifado. Entre em contato conosco e descubra
              como podemos revolucionar seus processos!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[var(--primary-color)] rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Envie sua Mensagem
                  </h3>
                </div>

                <div className="mb-6">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Preencha o formulário abaixo e nossa equipe entrará em
                    contato em até 24 horas.
                  </p>
                </div>

                <Contacts />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-color)]/20 to-blue-500/20 rounded-3xl blur-3xl"></div>

                <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100">
                  <img
                    src={contactDesign}
                    alt="Contact Design"
                    className="w-full h-auto object-contain mb-8"
                  />

                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[var(--primary-color)] mb-2">
                        500+
                      </div>
                      <div className="text-sm text-gray-600">
                        Clientes Atendidos
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[var(--primary-color)] mb-2">
                        99.9%
                      </div>
                      <div className="text-sm text-gray-600">Satisfação</div>
                    </div>
                  </div>

                  <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 max-w-xs">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 font-semibold text-sm">
                          JS
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-900 font-medium mb-1">
                          João Silva
                        </p>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          "A Nexus transformou completamente nossa gestão de
                          estoque. Recomendo para todas as empresas!"
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
});

export default ContactSection;
