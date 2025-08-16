import OpinionCard from "../OpinionCard";
import { Star } from "lucide-react";

export default function OpinionsSection() {
  return (
    <>
      <div className="py-24 bg-gradient-to-br from-[var(--primary-color)] via-purple-700 to-[var(--primary-color)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              <span>Depoimentos dos nossos clientes</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              O que nossos clientes{" "}
              <span className="text-yellow-300">dizem</span>
            </h2>

            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Descubra como a Nexus Solutions está transformando a gestão de
              almoxarifados em todo o Brasil
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            <OpinionCard
              text="O sistema facilitou muito nossa rotina! O controle de estoque ficou muito mais rápido e prático."
              author="Ana Beatriz Souza"
              role="Gerente de Operações"
              company="TechCorp Ltda"
              rating={5}
            />
            <OpinionCard
              text="A função de leitura por QR Code é simplesmente incrível. Reduzimos erros e ganhamos muito tempo."
              author="Lucas Ferreira"
              role="Supervisor de Estoque"
              company="Indústria Moderna"
              rating={5}
            />
            <OpinionCard
              text="O Oráculo é sensacional! Faço perguntas rápidas e já tenho as informações que preciso, sem complicação."
              author="Marcos Lima"
              role="Diretor de Logística"
              company="LogiTech Solutions"
              rating={5}
            />
            <OpinionCard
              text="Relatórios fáceis, gestão eficiente e uma plataforma muito intuitiva. Recomendo sem dúvidas."
              author="Juliana Mendes"
              role="Coordenadora de Supply Chain"
              company="SupplyChain Pro"
              rating={5}
            />
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-white/80">Clientes Satisfeitos</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-white/80">Uptime Garantido</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/80">Suporte Técnico</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
