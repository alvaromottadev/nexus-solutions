import api from "@/client/api-client";
import CreateProductDialog from "@/components/Dialog/Product/CreateProduct";
import TopBar from "@/components/TopBar";
import type { ProductType } from "@/types/ProductType";
import { useEffect, useState } from "react";
import ProductCard from "@/components/Card/ProductCard";
import Pagination from "@/components/Pagination";
import SearchComponent from "@/components/SearchComponent";
import DotLoader from "react-spinners/DotLoader";
import usePermission from "@/hooks/usePermission";
import NoHasPermission from "@/components/NoHasPermission";
import type { PageableResponseType } from "@/types/PageableResponseType";
import { Package, Search, BarChart3, QrCode, TrendingUp } from "lucide-react";

export default function ProductsPage() {
  const token = localStorage.getItem("token");

  const [products, setProducts] = useState<ProductType[]>([]);
  const [name, setName] = useState<string>("");
  const [numberPage, setNumberPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const hasPermission = usePermission();

  const getProductStats = () => {
    const total = products.length;
    const withImages = products.filter((product) => product.image).length;
    const withQrCode = products.filter((product) => product.qrCode).length;
    const recentProducts = products.filter((product) => {
      const createdAt = new Date(product.createdAt);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return createdAt > thirtyDaysAgo;
    }).length;

    return { total, withImages, withQrCode, recentProducts };
  };

  useEffect(() => {
    async function getProducts() {
      setIsLoading(true);
      await api
        .get(`/products?size=12`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const data: PageableResponseType<ProductType> = res.data;
          setProducts(data.content);
          setNumberPage(data.page.number);
          setTotalPage(data.page.totalPages);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
    getProducts();
  }, []);

  async function handleSearch() {
    setIsLoading(true);
    await api
      .get(`/products?name=${name}&size=12`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data: PageableResponseType<ProductType> = res.data;
        setProducts(data.content);
        setNumberPage(data.page.number);
        setTotalPage(data.page.totalPages);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  async function handleNextPage() {
    setIsLoading(true);
    await api
      .get(
        `/products?page=${numberPage + 1}&size=12${
          name ? `&name=${name}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        const data: PageableResponseType<ProductType> = res.data;
        setProducts(data.content);
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
      .get(
        `/products?page=${numberPage - 1}&size=12${
          name ? `&name=${name}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        const data: PageableResponseType<ProductType> = res.data;
        setProducts(data.content);
        setNumberPage(data.page.number);
        setTotalPage(data.page.totalPages);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  const stats = getProductStats();

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
                      Gestão de Produtos
                    </h1>
                    <p className="text-lg text-gray-600">
                      Gerencie seu catálogo de produtos de forma organizada e
                      eficiente
                    </p>
                  </div>
                  <CreateProductDialog
                    products={products}
                    setProducts={setProducts}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Package className="text-blue-600" size={24} />
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
                        <BarChart3 className="text-green-600" size={24} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">
                          Com Imagem
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {stats.withImages}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <QrCode className="text-purple-600" size={24} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">
                          Com QR Code
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {stats.withQrCode}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center">
                      <div className="p-3 bg-orange-100 rounded-lg">
                        <TrendingUp className="text-orange-600" size={24} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">
                          Recentes
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {stats.recentProducts}
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
                        Buscar Produtos
                      </h2>
                      <p className="text-gray-600">
                        Encontre produtos específicos por nome ou código
                      </p>
                    </div>
                    <div className="flex-1 lg:ml-8">
                      <SearchComponent
                        label=""
                        placeholder="Digite o nome ou código do produto..."
                        handleSearch={handleSearch}
                        setName={setName}
                      />
                    </div>
                  </div>
                </div>

                {!isLoading ? (
                  products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                      {products.map(
                        (product, index) =>
                          index < 12 && (
                            <div
                              key={product.id}
                              className="transform hover:scale-105 transition-all duration-300"
                            >
                              <ProductCard
                                product={product}
                                products={products}
                                setProducts={setProducts}
                              />
                            </div>
                          )
                      )}
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl p-12 text-center shadow-lg border border-gray-100">
                      <Package
                        className="mx-auto text-gray-400 mb-4"
                        size={64}
                      />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Nenhum produto encontrado
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {name
                          ? `Não encontramos produtos com o nome "${name}"`
                          : "Comece adicionando seu primeiro produto"}
                      </p>
                    </div>
                  )
                ) : (
                  <div className="bg-white rounded-xl p-12 text-center shadow-lg border border-gray-100">
                    <DotLoader
                      color="var(--primary-color)"
                      size={96}
                      className="mx-auto"
                    />
                    <p className="text-gray-600 mt-4">Carregando produtos...</p>
                  </div>
                )}

                {products.length > 0 && (
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
