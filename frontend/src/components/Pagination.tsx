import CustomText from "./CustomText";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  numberPage: number;
  totalPage: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
}

export default function Pagination({
  numberPage,
  totalPage,
  handleNextPage,
  handlePreviousPage,
}: PaginationProps) {
  const isLastPage = numberPage + 1 === totalPage || totalPage === 0;
  const isFirstPage = numberPage === 0;

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4">
        <div className="text-center sm:text-left">
          <CustomText className="text-sm text-gray-600">
            Mostrando página {numberPage + 1} de{" "}
            {totalPage === 0 ? 1 : totalPage}
          </CustomText>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={!isFirstPage ? handlePreviousPage : () => {}}
            disabled={isFirstPage}
            variant="outline"
            size="sm"
            className={`flex items-center gap-2 transition-all duration-200 ${
              isFirstPage
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[var(--primary-color)] hover:text-white hover:border-[var(--primary-color)]"
            }`}
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Anterior</span>
          </Button>

          <div className="hidden md:flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPage) }, (_, i) => {
              const pageNum = i + 1;
              const isActive = pageNum === numberPage + 1;

              return (
                <button
                  key={i}
                  className={`w-8 h-8 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--primary-color)] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <Button
            onClick={!isLastPage ? handleNextPage : () => {}}
            disabled={isLastPage}
            variant="outline"
            size="sm"
            className={`flex items-center gap-2 transition-all duration-200 ${
              isLastPage
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[var(--primary-color)] hover:text-white hover:border-[var(--primary-color)]"
            }`}
          >
            <span className="hidden sm:inline">Próxima</span>
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
