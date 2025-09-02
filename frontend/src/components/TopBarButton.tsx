import { Button } from "./ui/button";
import type { ReactNode } from "react";

interface TopBarButtonProps {
  onClick: () => void;
  label: string;
  isOracle?: boolean;
  isActive?: boolean;
  icon?: ReactNode;
  className?: string;
}

export default function TopBarButton({
  onClick,
  label,
  isOracle = false,
  isActive = false,
  icon,
  className = "",
}: TopBarButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={`
        relative px-4 py-2 rounded-lg font-medium transition-all duration-200 
        ${
          isOracle
            ? isActive
              ? "bg-white/30 text-white shadow-lg"
              : "bg-transparent text-white/80 hover:bg-white/20 hover:text-white"
            : isActive
            ? "bg-[var(--primary-color)] text-white shadow-lg"
            : "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-[var(--primary-color)]"
        }
        ${className}
      `}
    >
      <div className="flex items-center gap-2">
        {icon && icon}
        <span className="text-sm md:text-[0.5rem] 2xl:text-sm">{label}</span>
      </div>

      {isActive && (
        <div
          className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
            isOracle ? "bg-white" : "bg-white"
          }`}
        ></div>
      )}
    </Button>
  );
}
