import api from "@/client/api-client";
import EmployeeCard from "@/components/Card/EmployeeCard";
import CustomText from "@/components/CustomText";
import EmployeeDialog from "@/components/Dialog/Employee/EmployeeDialog";
import NoHasPermission from "@/components/NoHasPermission";
import Pagination from "@/components/Pagination";
import SearchComponent from "@/components/SearchComponent";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import usePermission from "@/hooks/usePermission";
import type EmployeeType from "@/types/EmployeeType";
import { ArchiveX, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import DotLoader from "react-spinners/DotLoader";

export default function EmployeePage() {
  const [name, setName] = useState<string>("");
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [numberPage, setNumberPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);

  const hasPermission = usePermission();

  async function handleSearch() {
    api
      .get(`/employees?size=12&name=${name}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setEmployees(res.data.content);
        setNumberPage(res.data.pageable.pageNumber);
        setTotalPage(res.data.totalPages);
      });
  }

  async function handleNextPage() {
    api
      .get(
        `/employees?size=12&page=${numberPage + 1}${
          name ? `&name=${name}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setEmployees(res.data.content);
        setNumberPage(res.data.pageable.pageNumber);
        setTotalPage(res.data.totalPages);
        setIsLoading(false);
      });
  }

  async function handlePreviousPage() {
    api
      .get(
        `/employees?size=12&page=${numberPage - 1}${
          name ? `&name=${name}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setEmployees(res.data.content);
        setNumberPage(res.data.pageable.pageNumber);
        setTotalPage(res.data.totalPages);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    api
      .get(`/employees?size=12`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setEmployees(res.data.content);
        setNumberPage(res.data.pageable.pageNumber);
        setTotalPage(res.data.totalPages);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <TopBar />
        {hasPermission ? (
          <>
            <EmployeeDialog employees={employees} setEmployees={setEmployees}>
              <div className="fixed right-5 bottom-5 flex items-center justify-center bg-[var(--primary-color)] rounded-full">
                <Button className="w-[4rem] h-[4rem] bg-var(--primary-color) rounded-full cursor-pointer">
                  <Plus color="white" />
                </Button>
              </div>
            </EmployeeDialog>
            <div className="flex flex-col h-full items-center justify-center mt-[2rem]">
              <SearchComponent
                label="Funcionários"
                placeholder="Ex.: Mariana"
                handleSearch={handleSearch}
                setName={setName}
              />
            </div>
            {!isLoading ? (
              employees.length > 0 ? (
                <div className="w-full flex items-center flex-col mx-auto lg:grid lg:grid-cols-3 lg:place-items-center lg:gap-x-3">
                  {employees.map(
                    (employee, index) =>
                      index < 12 && (
                        <EmployeeCard
                          employee={employee}
                          employees={employees}
                          setEmployees={setEmployees}
                          key={employee.id}
                        />
                      )
                  )}
                </div>
              ) : (
                <div className="flex flex-1 flex-col justify-center items-center">
                  <ArchiveX color="purple" size={64} />
                  <CustomText className="text-[1.5rem] text-[var(--primary-color)]">
                    Nenhum funcionário cadastrado
                  </CustomText>
                </div>
              )
            ) : (
              <div className="h-full flex flex-1 justify-center items-center">
                <DotLoader color="purple" size={96} />
              </div>
            )}
            <Pagination
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              numberPage={numberPage}
              totalPage={totalPage}
            />
          </>
        ) : (
          <NoHasPermission />
        )}
      </div>
    </>
  );
}
