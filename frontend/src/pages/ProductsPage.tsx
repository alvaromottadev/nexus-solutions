import api from "@/client/api-client";
import CustomText from "@/components/CustomText";
import CreateProductDialog from "@/components/Dialog/CreateProduct";
import TopBar from "@/components/TopBar";
import type { ProductType } from "@/types/ProductType";
import { ArchiveX } from "lucide-react";
import { useEffect, useState } from "react";
import type { ProductResponseType } from "@/types/ProductResponseType";
import ProductCard from "@/components/Card/ProductCard";
import Pagination from "@/components/Pagination";
import SearchComponent from "@/components/SearchComponent";
import DotLoader from "react-spinners/DotLoader";
export default function ProductsPage() {
  const token = localStorage.getItem("token");

  const [products, setProducts] = useState<ProductType[]>([]);
  const [name, setName] = useState<string>("");
  const [numberPage, setNumberPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getProducts() {
      await api
        .get(`/products?size=12`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const data: ProductResponseType = res.data;
          setProducts(data.content);
          setNumberPage(data.pageable.pageNumber);
          setTotalPage(data.totalPages);
          setIsLoading(false);
        });
    }
    getProducts();
  }, []);

  async function handleSearch() {
    await api
      .get(`/products?name=${name}&size=12`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data: ProductResponseType = res.data;
        setProducts(data.content);
        setNumberPage(data.pageable.pageNumber);
        setTotalPage(data.totalPages);
        setIsLoading(false);
      });
  }

  async function handleNextPage() {
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
        const data: ProductResponseType = res.data;
        setProducts(data.content);
        setNumberPage(data.pageable.pageNumber);
        setTotalPage(data.totalPages);
      });
  }

  async function handlePreviousPage() {
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
        const data: ProductResponseType = res.data;
        setProducts(data.content);
        setNumberPage(data.pageable.pageNumber);
        setTotalPage(data.totalPages);
      });
  }
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <CreateProductDialog products={products} setProducts={setProducts} />
        <div className="flex flex-col h-full items-center justify-center mt-[2rem]">
          <SearchComponent
            label="Produtos"
            placeholder="Ex.: Disjuntor 10A"
            handleSearch={handleSearch}
            setName={setName}
          />
        </div>

        {!isLoading ? (
          products.length > 0 ? (
            <div className="w-full flex items-center flex-col mx-auto lg:grid lg:grid-cols-3 lg:place-items-center lg:gap-x-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  products={products}
                  setProducts={setProducts}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-1 flex-col justify-center items-center">
              <ArchiveX color="purple" size={64} />
              <CustomText className="text-[1.5rem] text-[var(--primary-color)]">
                Nenhum produto cadastrado
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
