import { forwardRef } from "react";
import aboutDesign from "@/assets/about-design.svg";
import { Users, Target, Award, Rocket, CheckCircle } from "lucide-react";

const AboutSection = forwardRef<HTMLDivElement>((_, ref) => {
  const values = [
    {
      icon: Target,
      title: "Missão",
      description:
        "Transformar a gestão de almoxarifados através de tecnologia inovadora e soluções inteligentes.",
    },
    {
      icon: Award,
      title: "Visão",
      description:
        "Ser a referência em gestão inteligente de estoque, liderando a transformação digital do setor.",
    },
    {
      icon: Users,
      title: "Valores",
      description:
        "Inovação, excelência, confiança e compromisso com o sucesso dos nossos clientes.",
    },
  ];

  const features = [
    "Assistente Virtual com IA (Oráculo)",
    "Alertas inteligentes de reposição",
    "Integração via QR Code",
    "Integração com Código de Barras",
    "Suporte técnico especializado",
    "Plataforma 100% em nuvem",
  ];

  return (
    <>
      <div ref={ref} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-full text-sm font-medium mb-6">
                  <Rocket className="w-4 h-4" />
                  <span>Sobre a Nexus Solutions</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Quem{" "}
                  <span className="text-[var(--primary-color)]">somos</span>?
                </h2>

                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  A Nexus Solutions é uma empresa especializada em otimizar a
                  gestão de almoxarifado, oferecendo soluções inteligentes que
                  aumentam a eficiência, reduzem custos e garantem total
                  controle de estoque para seus clientes.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {values.map((value, index) => {
                  const IconComponent = value.icon;

                  return (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-color)]/10 to-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-6 h-6 text-[var(--primary-color)]" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {value.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Por que escolher a{" "}
                  <span className="text-[var(--primary-color)]">Nexus</span>?
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-color)]/20 to-blue-500/20 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                  <img
                    src={aboutDesign}
                    alt="Nexus Solutions About"
                    className="h-96 w-auto object-contain"
                  />

                  <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[var(--primary-color)]/10 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-[var(--primary-color)]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          500+
                        </p>
                        <p className="text-xs text-gray-500">Clientes</p>
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

export default AboutSection;
