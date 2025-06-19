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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 135"
        className="bg-[var(--background-color)] absolute"
      >
        <path
          fill="#322866"
          fill-opacity="1"
          d="M0,128L60,117.3C120,107,240,85,360,85.3C480,85,600,107,720,106.7C840,107,960,85,1080,74.7C1200,64,1320,64,1380,64L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>
    </>
  );
}
