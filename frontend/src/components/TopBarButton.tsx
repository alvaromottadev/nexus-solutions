import { Button } from "./ui/button";

interface TopBarButtonProps {
  onClick: (value: string) => void;
  label: string;
  url: string;
  isOracle?: boolean;
  className?: string;
}

export default function TopBarButton({
  onClick,
  label,
  url,
  isOracle = false,
  className = "",
}: TopBarButtonProps) {
  return (
    <>
      <Button
        onClick={() => onClick(url)}
        className={`bg-transparent ${
          isOracle ? "text-white" : "text-[var(--color-gray)]"
        } text-[1.2rem] hover:bg-transparent border-none shadow-none hover:text-[var(--primary-color)] hover:font-bold transition-all duration-100 cursor-pointer ${className}`}
      >
        {label}
      </Button>
    </>
  );
}
