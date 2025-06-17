import CustomText from "./CustomText";

interface InfoBarProps {
  title: string;
  description: string;
}

export default function InfoBar({ title, description }: InfoBarProps) {
  return (
    <>
      <div className="flex flex-col gap-y-2 items-center justify-center h-[20rem] bg-[var(--primary-color)]">
        <CustomText className="text-white font-bold text-[1.5rem]">
          {title}
        </CustomText>
        <CustomText className="w-[80%] text-center text-white text-[1.2rem]">
          {description}
        </CustomText>
      </div>
    </>
  );
}
