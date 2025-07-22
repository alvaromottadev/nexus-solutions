import CustomText from "./CustomText";
import { Button } from "./ui/button";

interface TopBarButtonProps {
  onClick: () => void;
  label: string;
  isOracle?: boolean;
  className?: string;
}

export default function TopBarButton({
  onClick,
  label,
  isOracle = false,
  className = "",
}: TopBarButtonProps) {
  return (
    <>
      <Button
        onClick={onClick}
        className={`bg-transparent  ${
          isOracle ? "text-white" : "text-[var(--color-gray)]"
        } text-[0.9rem] xl:text-[1.2rem] hover:bg-transparent border-none shadow-none hover:text-[var(--primary-color)] hover:font-bold transition-all duration-100 cursor-pointer ${className}`}
      >
        <CustomText className="cursor-pointer">{label}</CustomText>
      </Button>
    </>
  );
}
