import { Check, Star, Bot, Zap, Shield } from "lucide-react";
import { forwardRef } from "react";

const PricingSection = forwardRef<HTMLDivElement>((_, ref) => {
  const plans = [
    {
      name: "Básico",
      price: "R$ 99",
      period: "/mês",
      description: "Ideal para pequenas empresas que estão começando",
      icon: Shield,
      features: [
        "Gestão básica de estoque",
        "Até 100 produtos",
        "Relatórios básicos",
        "Suporte por email",
        "1 usuário",
        "Backup mensal",
      ],
      popular: false,
      highlight: null,
    },
    {
      name: "Profissional",
      price: "R$ 199",
      period: "/mês",
      description: "Perfeito para empresas em crescimento",
      icon: Zap,
      features: [
        "Todas as funcionalidades do Básico",
        "Até 1000 produtos",
        "Relatórios avançados",
        "Suporte prioritário",
        "Até 5 usuários",
        "Backup semanal",
        "Integração com sistemas",
        "QR Code personalizado",
        "IA - Oráculo (Assistente Virtual)",
      ],
      popular: true,
      highlight: "Mais Popular",
    },
    {
      name: "Enterprise",
      price: "R$ 399",
      period: "/mês",
      description: "Para grandes empresas com necessidades complexas",
      icon: Bot,
      features: [
        "Todas as funcionalidades do Profissional",
        "Produtos ilimitados",
        "Relatórios personalizados",
        "Suporte 24/7",
        "Usuários ilimitados",
        "Backup diário",
        "API completa",
        "Treinamento personalizado",
        "Consultoria especializada",
        "IA - Oráculo Avançado (Análise Preditiva)",
      ],
      popular: false,
      highlight: "Recomendado",
    },
  ];

  return (
    <div
      ref={ref}
      className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            <span>Planos e Preços</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Escolha o plano{" "}
            <span className="text-[var(--primary-color)]">ideal</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Todos os planos incluem atualizações gratuitas, suporte técnico e
            acesso à nossa plataforma de gestão inteligente.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;

            return (
              <div
                key={index}
                className={`relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                  plan.popular
                    ? "ring-2 ring-[var(--primary-color)] scale-105"
                    : ""
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div
                      className={`px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${
                        plan.popular
                          ? "bg-[var(--primary-color)] text-white"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      <Star size={16} />
                      {plan.highlight}
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-color)]/10 to-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-[var(--primary-color)]" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>

                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-[var(--primary-color)]">
                        {plan.price}
                      </span>
                      <span className="text-gray-500 ml-1 text-lg">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check
                          className="text-green-500 mt-1 mr-3 flex-shrink-0"
                          size={20}
                        />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
                      plan.popular
                        ? "bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white shadow-lg hover:shadow-xl"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-800 hover:shadow-md"
                    }`}
                  >
                    {plan.popular ? "Começar Agora" : "Escolher Plano"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Precisa de um plano personalizado?
            </h3>
            <p className="text-gray-600 mb-6">
              Entre em contato conosco para discutir suas necessidades
              específicas e criar uma solução sob medida para sua empresa.
            </p>
            <button className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
              Fale Conosco
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

PricingSection.displayName = "PricingSection";

export default PricingSection;
