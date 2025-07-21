import CustomText from "./CustomText";
import { Button } from "./ui/button";

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
    <>
      <div className="px-10 md:px-0 flex items-end justify-center mb-10 mt-auto">
        <div className="flex items-center gap-x-5">
          <Button
            onClick={!isFirstPage ? handlePreviousPage : () => {}}
            disabled={isFirstPage}
            className={`bg-[var(--primary-color)] font-poppins cursor-pointer `}
          >
            Página Anterior
          </Button>

          <CustomText>
            Página {numberPage + 1} de {totalPage === 0 ? 1 : totalPage}
          </CustomText>
          <Button
            onClick={!isLastPage ? handleNextPage : () => {}}
            disabled={isLastPage}
            className={`bg-[var(--primary-color)] font-poppins cursor-pointer `}
          >
            Próxima Página
          </Button>
        </div>
      </div>
    </>
  );
}
