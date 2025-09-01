import api from "@/client/api-client";
import LocationCard from "@/components/Card/LocationCard";
import CreateLocationDialog from "@/components/Dialog/Location/CreateLocation";
import NoHasPermission from "@/components/NoHasPermission";
import Pagination from "@/components/Pagination";
import SearchComponent from "@/components/SearchComponent";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import usePermission from "@/hooks/usePermission";
import type { LocationType } from "@/types/LocationType";
import type { PageableResponseType } from "@/types/PageableResponseType";
import { MapPin, Building2, Globe, Calendar, Search, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import DotLoader from "react-spinners/DotLoader";

export default function LocationsPage() {
  const [locations, setLocations] = useState<LocationType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [numberPage, setNumberPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [name, setName] = useState<string>("");

  const hasPermission = usePermission();

  const getLocationStats = () => {
    const total = locations.length;
    const states = new Set(locations.map((loc) => loc.address.state)).size;
    const cities = new Set(locations.map((loc) => loc.address.city)).size;
    const countries = new Set(locations.map((loc) => loc.address.country)).size;

    return { total, states, cities, countries };
  };

  useEffect(() => {
    async function getLocations() {
      setIsLoading(true);
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
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
    getLocations();
  }, []);

  async function handleNextPage() {
    setIsLoading(true);
    await api
      .get(`/locations?page=${numberPage + 1}${name ? `&name=${name}` : ""}`, {
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
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  async function handlePreviousPage() {
    setIsLoading(true);
    await api
      .get(`/locations?page=${numberPage - 1}${name ? `&name=${name}` : ""}`, {
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
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  async function handleSearch() {
    setIsLoading(true);
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
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  const stats = getLocationStats();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <TopBar />
        {hasPermission ? (
          <>
            <div className="px-6 py-8">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      Gestão de Almoxarifados
                    </h1>
                    <p className="text-lg text-gray-600">
                      Gerencie suas localizações e almoxarifados de forma
                      organizada
                    </p>
                  </div>
                  <CreateLocationDialog
                    locations={locations}
                    setLocations={setLocations}
                  >
                    <Button className="bg-[var(--primary-color)] hover:bg-opacity-90 text-white px-6 py-3 rounded-lg font-semibold">
                      <Plus className="mr-2" size={20} />
                      Adicionar Almoxarifado
                    </Button>
                  </CreateLocationDialog>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Building2 className="text-blue-600" size={24} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">
                          Total
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {stats.total}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <MapPin className="text-green-600" size={24} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">
                          Estados
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {stats.states}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <Globe className="text-purple-600" size={24} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">
                          Cidades
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {stats.cities}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center">
                      <div className="p-3 bg-orange-100 rounded-lg">
                        <Calendar className="text-orange-600" size={24} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">
                          Países
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {stats.countries}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="mb-4 lg:mb-0">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                        <Search className="w-5 h-5 mr-2 text-[var(--primary-color)]" />
                        Buscar Almoxarifados
                      </h2>
                      <p className="text-gray-600">
                        Encontre almoxarifados específicos por nome
                      </p>
                    </div>
                    <div className="flex-1 lg:ml-8">
                      <SearchComponent
                        label=""
                        placeholder="Digite o nome do almoxarifado..."
                        handleSearch={handleSearch}
                        setName={setName}
                      />
                    </div>
                  </div>
                </div>

                {!isLoading ? (
                  locations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      {locations.map(
                        (location, index) =>
                          index < 5 && (
                            <div
                              key={location.id}
                              className="transform hover:scale-105 transition-all duration-300"
                            >
                              <LocationCard
                                locations={locations}
                                setLocations={setLocations}
                                location={location}
                              />
                            </div>
                          )
                      )}
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl p-12 text-center shadow-lg border border-gray-100">
                      <Building2
                        className="mx-auto text-gray-400 mb-4"
                        size={64}
                      />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Nenhum almoxarifado encontrado
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {name
                          ? `Não encontramos almoxarifados com o nome "${name}"`
                          : "Comece adicionando seu primeiro almoxarifado"}
                      </p>
                      {!name && (
                        <CreateLocationDialog
                          locations={locations}
                          setLocations={setLocations}
                        >
                          <Button className="bg-[var(--primary-color)] hover:bg-opacity-90 text-white px-6 py-3 rounded-lg font-semibold">
                            <Plus className="mr-2" size={20} />
                            Adicionar Produto
                          </Button>
                        </CreateLocationDialog>
                      )}
                    </div>
                  )
                ) : (
                  <div className="bg-white rounded-xl p-12 text-center shadow-lg border border-gray-100">
                    <DotLoader
                      color="var(--primary-color)"
                      size={96}
                      className="mx-auto"
                    />
                    <p className="text-gray-600 mt-4">
                      Carregando almoxarifados...
                    </p>
                  </div>
                )}

                {locations.length > 0 && (
                  <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                    <Pagination
                      handleNextPage={handleNextPage}
                      handlePreviousPage={handlePreviousPage}
                      numberPage={numberPage}
                      totalPage={totalPage}
                    />
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <NoHasPermission />
        )}
      </div>
    </>
  );
}
