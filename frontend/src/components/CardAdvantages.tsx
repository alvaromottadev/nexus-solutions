import CustomText from "./CustomText";

interface CustomTextProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export default function AdvantagesCard({
  children,
  title,
  description,
}: CustomTextProps) {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-[15rem] h-[15rem] md:w-[20rem] md:h-[15rem] xl:w-[25rem] xl:h-[18rem] gap-y-2 border-[1px] border-[var(--gray-color)] rounded-[1rem] lg:rounded-none hover:shadow hover:bg-[var(--primary-color)] hover:text-white hover:shadow-black hover:lg:w-[30rem] hover:lg:h-[20rem] hover:border-none transition-all duration-300 p-5">
        {children}
        <CustomText className="text-[var(--primary-color)] font-bold">
          {title}
        </CustomText>
        <CustomText className="self-center text-center">
          {description}
        </CustomText>
      </div>
    </>
  );
}
