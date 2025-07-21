import { ArchiveX } from "lucide-react";
import CustomText from "./CustomText";

interface EmptyIndicatorProps {
  label: string;
}

export default function EmptyIndicator({ label }: EmptyIndicatorProps) {
  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <ArchiveX color="purple" size={64} />
      <CustomText className="text-[1.2rem] md:text-[1.5rem] text-[var(--primary-color)]">
        Nenhum(a) {label} cadastrado(a)
      </CustomText>
    </div>
  );
}
