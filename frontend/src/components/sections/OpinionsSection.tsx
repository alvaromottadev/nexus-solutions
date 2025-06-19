import CustomText from "../CustomText";
import OpinionCard from "../OpinionCard";

export default function OpinionsSection() {
  return (
    <>
      <div className="min-h-[40rem] bg-[var(--primary-color)] p-[1rem] flex flex-col lg:place-items-center lg:grid lg:grid-cols-2 gap-y-2 items-center justify-center">
        <OpinionCard
          text="O sistema facilitou muito nossa rotina! O controle de estoque ficou muito mais rápido e prático."
          author="Ana Beatriz Souza"
        />
        <OpinionCard
          text="A função de leitura por QR Code é simplesmente incrível. Reduzimos erros e ganhamos muito tempo."
          author="Lucas Ferreira"
        />
        <OpinionCard
          text="O Oráculo é sensacional! Faço perguntas rápidas e já tenho as informações que preciso, sem complicação."
          author="Marcos Lima"
        />
        <OpinionCard
          text="Relatórios fáceis, gestão eficiente e uma plataforma muito intuitiva. Recomendo sem dúvidas."
          author="Juliana Mendes"
        />
      </div>
    </>
  );
}
