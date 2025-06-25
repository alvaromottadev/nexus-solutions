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
      <br />
      <div className="flex items-end justify-center mb-10 mt-auto">
        <div className="flex items-center gap-x-5">
          {!isFirstPage ? (
            <Button
              onClick={handlePreviousPage}
              className="bg-[var(--primary-color)] font-poppins cursor-pointer"
            >
              Página Anterior
            </Button>
          ) : (
            <Button
              disabled
              className="bg-[var(--primary-color)] font-poppins cursor-not-allowed"
            >
              Página Anterior
            </Button>
          )}

          <CustomText>
            Página {numberPage + 1} de {totalPage}
          </CustomText>
          {!isLastPage ? (
            <Button
              onClick={handleNextPage}
              className="bg-[var(--primary-color)] font-poppins cursor-pointer"
            >
              Próxima Página
            </Button>
          ) : (
            <Button
              disabled
              className="bg-[var(--primary-color)] font-poppins cursor-not-allowed"
            >
              Próxima Página
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
