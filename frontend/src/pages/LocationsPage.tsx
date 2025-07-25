import api from "@/client/api-client";
import LocationCard from "@/components/Card/LocationCard";
import CreateLocationDialog from "@/components/Dialog/Location/CreateLocation";
import EmptyIndicator from "@/components/EmptyIndicator";
import NoHasPermission from "@/components/NoHasPermission";
import Pagination from "@/components/Pagination";
import SearchComponent from "@/components/SearchComponent";
import TopBar from "@/components/TopBar";
import usePermission from "@/hooks/usePermission";
import type { LocationType } from "@/types/LocationType";
import type { PageableResponseType } from "@/types/PageableResponseType";
import { useEffect, useState } from "react";
import DotLoader from "react-spinners/DotLoader";

export default function LocationsPage() {
  const [locations, setLocations] = useState<LocationType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [numberPage, setNumberPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [name, setName] = useState<string>("");

  const hasPermission = usePermission();

  useEffect(() => {
    async function getLocations() {
      await api
        .get(`/locations`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          const data: PageableResponseType<LocationType> = res.data;
          setLocations(data.content);
          setNumberPage(data.page.number);
          setTotalPage(data.page.totalPages);
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
        const data: PageableResponseType<LocationType> = res.data;
        setLocations(data.content);
        setNumberPage(data.page.number);
        setTotalPage(data.page.totalPages);
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
        const data: PageableResponseType<LocationType> = res.data;
        setLocations(data.content);
        setNumberPage(data.page.number);
        setTotalPage(data.page.totalPages);
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
        const data: PageableResponseType<LocationType> = res.data;
        setLocations(data.content);
        setNumberPage(data.page.number);
        setTotalPage(data.page.totalPages);
        setIsLoading(false);
      });
  }

  return (
    <>
      <div className="flex flex-col min-h-screen bg-white">
        <TopBar />
        {hasPermission ? (
          <div className="flex-1 flex flex-col relative">
            <CreateLocationDialog
              locations={locations}
              setLocations={setLocations}
            />
            <div className="flex flex-col items-center justify-center mt-[2rem]">
              <SearchComponent
                label="Almoxarifados"
                placeholder="Ex.: Almoxarifado Central"
                handleSearch={handleSearch}
                setName={setName}
              />
            </div>
            {!isLoading ? (
              locations.length > 0 ? (
                <div className="flex-1 flex flex-col items-center overflow-y-auto px-4">
                  <div className="w-full max-w-[90%] flex flex-col gap-4">
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
                <EmptyIndicator label="almoxarifado" />
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
        ) : (
          <NoHasPermission />
        )}
      </div>
    </>
  );
}
