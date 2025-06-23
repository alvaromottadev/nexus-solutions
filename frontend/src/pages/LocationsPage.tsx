import api from "@/client/api-client";
import LocationCard from "@/components/Card/LocationCard";
import CustomText from "@/components/CustomText";
import CreateLocationDialog from "@/components/Dialog/Location/CreateLocation";
import Pagination from "@/components/Pagination";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { LocationResponseType } from "@/types/LocationResponseType";
import type { LocationType } from "@/types/LocationType";
import { ArchiveX, Search } from "lucide-react";
import { useEffect, useState } from "react";
import DotLoader from "react-spinners/DotLoader";

export default function LocationsPage() {
  const [locations, setLocations] = useState<LocationType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [numberPage, setNumberPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    async function getLocations() {
      await api
        .get(`/locations`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          const data: LocationResponseType = res.data;
          setLocations(data.content);
          setNumberPage(data.pageable.pageNumber);
          setTotalPage(data.totalPages);
          setIsLoading(false);
        });
    }
    getLocations();
  }, []);

  async function handleNextPage() {
    await api
      .get(
        `/locations?page=${numberPage + 1}${
          name != null ? `&name=${name}` : null
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        const data: LocationResponseType = res.data;
        setLocations(data.content);
        setNumberPage(data.pageable.pageNumber);
        setTotalPage(data.totalPages);
        setIsLoading(false);
      });
  }

  async function handlePreviousPage() {
    await api
      .get(
        `/locations?page=${numberPage - 1}${
          name != null ? `&name=${name}` : null
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        const data: LocationResponseType = res.data;
        setLocations(data.content);
        setNumberPage(data.pageable.pageNumber);
        setTotalPage(data.totalPages);
        setIsLoading(false);
      });
  }

  async function handleSearch() {
    await api
      .get(`/locations?name=${name}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const data: LocationResponseType = res.data;
        setLocations(data.content);
        setNumberPage(data.pageable.pageNumber);
        setTotalPage(data.totalPages);
        setIsLoading(false);
      });
  }

  return (
    <>
      <div className="flex flex-col min-h-screen bg-white">
        <TopBar />
        <CreateLocationDialog
          locations={locations}
          setLocations={setLocations}
        />
        <div className="flex flex-col items-center justify-center mt-[2rem] ">
          <div className="flex items-center justify-between w-[80%] lg:w-[90%]">
            <div>
              <CustomText className="text-[var(--primary-color)] font-bold lg:text-[1.5rem]">
                Almoxarifados
              </CustomText>
            </div>
            <div className="flex items-center gap-x-3 w-[50%]">
              <Input
                className="bg-[#f9f9f9] font-poppins placeholder:font-poppins w-full lg:h-[3rem] border-black"
                placeholder="Ex.: Almoxarifado Central"
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <Button
                onClick={handleSearch}
                className="cursor-pointer bg-transparent shadow-none hover:bg-transparent"
              >
                <Search color="purple" />
              </Button>
            </div>
          </div>
        </div>
        {!isLoading ? (
          locations.length > 0 ? (
            <div className="flex flex-col items-center">
              <div className="flex items-center w-[90%] flex-col">
                {locations.map(
                  (location, index) =>
                    index < 5 && (
                      <LocationCard
                        locations={locations}
                        setLocations={setLocations}
                        key={location.id}
                        location={location}
                      />
                    )
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-1 flex-col justify-center items-center">
              <ArchiveX color="purple" size={64} />
              <CustomText className="text-[1.5rem] text-[var(--primary-color)]">
                Nenhum almoxarifado cadastrado
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
      </div>
    </>
  );
}
