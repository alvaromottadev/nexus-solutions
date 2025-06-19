import client from "@/client/http-client";
import CustomText from "@/components/CustomText";
import CreateProductDialog from "@/components/Dialog/CreateProduct";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ProductType } from "@/types/ProductType";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { ArchiveX, Edit, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProductsPage() {
  const token = localStorage.getItem("token");

  const [products, setProducts] = useState<ProductType[]>([]);
  const [numberPage, setNumberPage] = useState<number>(1);
  const [name, setName] = useState<string>("");

  async function handleSearch() {
    const response = await client.get(`/products?name=${name}`, {
      Authorization: `Bearer ${token}`,
    });
    const responseData = await response.json();
    if (!response.ok && response.status !== 201) {
      toast.error(responseData.error, {
        description: "Verifique os dados e tente novamente.",
        duration: 5000,
      });
      return;
    }
    setProducts(responseData);
  }

  useEffect(() => {
    async function getProducts() {
      const response = await client.get(`/products`, {
        Authorization: `Bearer ${token}`,
      });

      const data = await response.json();

      if (!response.ok && response.status !== 201) {
        toast.error(data.error, {
          description: "Verifique os dados e tente novamente.",
          duration: 5000,
        });
        return;
      }
      setProducts(data);
      console.log(data);
    }
    getProducts();
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <TopBar />
        <CreateProductDialog />
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
        {products.length > 0 ? (
          <>
            <div className="p-2 mt-[2rem] w-full flex flex-col items-center gap-y-5 lg:grid lg:grid-cols-2 lg:place-items-center">
              {products.map((product) => (
                <div className="flex items-center p-5 bg-[var(--color-gray)] h-[8rem] w-[80%] lg:w-[80%] rounded-[1rem]">
                  <div>
                    <img
                      src={product.image}
                      className="w-[4rem] h-[4rem] object-cover"
                    />
                  </div>
                  <div className="flex flex-col ml-[2rem]">
                    <CustomText className="text-white">
                      {product.name}
                    </CustomText>
                    <CustomText>{product.description}</CustomText>
                  </div>
                  <div className="ml-auto cursor-pointer">
                    <Edit size={48} color="white" />
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
        )}
      </div>
    </>
  );
}
