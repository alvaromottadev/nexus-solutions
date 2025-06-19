import CustomText from "./CustomText";

interface OpinionCardProps {
  text: string;
  author: string;
}

export default function OpinionCard({ text, author }: OpinionCardProps) {
  return (
    <>
      <div className="flex flex-col gap-y-2 justify-center items-center h-[10rem] bg-[var(--background-color)] w-[30rem] rounded-[1rem] shadow-black">
        <CustomText className="italic w-[80%]">“{text}”</CustomText>
        <CustomText>— {author}</CustomText>
      </div>
    </>
  );
}
