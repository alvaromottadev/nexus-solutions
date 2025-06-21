import api from "@/client/api-client";
import CustomText from "@/components/CustomText";
import CreateProductDialog from "@/components/Dialog/CreateProduct";
import EditProductDialog from "@/components/Dialog/EditProduct";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ProductType } from "@/types/ProductType";
import { ArchiveX, Image, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DotLoader from "react-spinners/DotLoader";
import type { ProductResponseType } from "@/types/ProductResponseType";
import Pagination from "@/components/Pagination";
export default function ProductsPage() {
  const token = localStorage.getItem("token");

  const [products, setProducts] = useState<ProductType[]>([]);
  const [name, setName] = useState<string>("");
  const [numberPage, setNumberPage] = useState<number>(0);
  const [sizePage, setSizePage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(0);

  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function handleSearch() {
    await api
      .get(`/products?name=${name}`, {
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

  useEffect(() => {
    async function getProducts() {
      await api
        .get(`/products`, {
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

  async function handleNextPage() {
    await api
      .get(`/products?page=${numberPage + 1}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const data: ProductResponseType = res.data;
        setProducts(data.content);
        setNumberPage(data.pageable.pageNumber);
        setTotalPage(data.totalPages);
      });
  }

  async function handlePreviousPage() {
    await api
      .get(`/products?page=${numberPage - 1}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const data: ProductResponseType = res.data;
        setProducts(data.content);
        setNumberPage(data.pageable.pageNumber);
        setTotalPage(data.totalPages);
      });
  }
  return (
    <>
      <div className="flex flex-col min-h-screen bg-[var(--background-color)]">
        <TopBar />
        <CreateProductDialog setProducts={setProducts} products={products} />
        <div className="flex flex-col gap-y-2 items-center justify-center mt-[2rem]">
          <div className="flex items-center justify-between w-[80%] lg:w-[90%]">
            <div>
              <CustomText className="lg:text-[1.5rem]">
                Lista de Produtos
              </CustomText>
            </div>
            <div className="flex items-center gap-x-3 w-[50%]">
              <Input
                onChange={(e) => setName(e.target.value)}
                className="font-poppins placeholder:font-poppins w-full lg:h-[3rem] border-black"
                placeholder="Ex.: Disjuntor 10A"
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
        {/* transform into a list later */}
        {!isLoading ? (
          products.length > 0 ? (
            <>
              <div className="p-2 mt-[2rem] w-full flex flex-col items-center gap-y-5 lg:grid lg:grid-cols-2 lg:place-items-center max-w-5xl mx-auto">
                {products.map((product) => (
                  <div className="flex items-center p-5 bg-[var(--color-gray)] h-[8rem] w-[80%] lg:w-[80%] rounded-[1rem] mx-auto">
                    <div>
                      {product.image ? (
                        <img
                          src={product.image}
                          className="w-[4rem] h-[4rem] object-cover border-[1px] border-[var(--primary-color)] rounded-[0.5rem] lg:w-[6rem] lg:h-[6rem]"
                        />
                      ) : (
                        <Image
                          className="w-[4rem] h-[4rem] lg:w-[6rem] lg:h-[4rem]"
                          color="white"
                        />
                      )}
                    </div>
                    <div className="flex flex-col ml-[2rem]">
                      <CustomText className="text-white">
                        {product.name}
                      </CustomText>
                      <CustomText>{product.description}</CustomText>
                    </div>
                    <div className="ml-auto cursor-pointer">
                      <EditProductDialog
                        product={product}
                        products={products}
                        setProducts={setProducts}
                        setOpen={setEditDialogOpen}
                        isOpen={editDialogOpen}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col justify-center items-center">
              <ArchiveX color="purple" size={64} />
              <CustomText className="text-[1.5rem] text-[var(--primary-color)]">
                Nenhum produto encontrado
              </CustomText>
            </div>
          )
        ) : (
          <div className="flex flex-1 justify-center items-center">
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
