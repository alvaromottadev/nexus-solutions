import api from "@/client/api-client";
import CustomText from "@/components/CustomText";
import Required from "@/components/Required";
import SelectComponent from "@/components/SelectComponent";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { LocationType } from "@/types/LocationType";
import type { ProductType } from "@/types/ProductType";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function CreateInventoryDialog() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [locations, setLocations] = useState<LocationType[]>([]);
  const [quantity, setQuantity] = useState<number>(0);
  const [minStock, setMinStock] = useState<number>(0);

  useEffect(() => {
    api
      .get(`/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setProducts(res.data.content);
      });

    api
      .get(`/locations`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setLocations(res.data.content);
        setIsLoading(false);
      });
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="fixed right-5 bottom-5 flex items-center justify-center bg-[var(--primary-color)] rounded-full">
          <Button className="w-[4rem] h-[4rem] bg-var(--primary-color) rounded-full cursor-pointer">
            <Plus color="white" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="w-auto">
        <DialogHeader>
          <DialogTitle>Cadastro de Estoque</DialogTitle>
          <DialogDescription>
            Aqui você pode cadastrar um novo estoque para um produto existente.
            Certifique-se de que o produto já esteja cadastrado antes de criar o
            estoque.
          </DialogDescription>
        </DialogHeader>
        {!isLoading && (
          <>
            <div className="flex justify-between">
              <div>
                <CustomText>
                  Produto <Required />
                </CustomText>
                <SelectComponent
                  data={products}
                  placeholder="Selecione um produto..."
                  label="Produto"
                />
              </div>
              <div>
                <CustomText>
                  Almoxarifado <Required />
                </CustomText>
                <SelectComponent
                  data={locations}
                  placeholder="Selecione um almoxarifado..."
                  label="Almoxarifado"
                />
              </div>
            </div>
            <div>
              <CustomText>
                Quantidade <Required />
              </CustomText>
              <Input
                type="number"
                placeholder="Ex.: 10"
                className="font-poppins placeholder:font-poppins"
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <DialogDescription>
                Coloque a quantidade de itens que tem no estoque.
              </DialogDescription>
            </div>
            <div>
              <CustomText>
                Quantidade Mínima <Required />
              </CustomText>
              <Input
                type="number"
                placeholder="Ex.: 10"
                className="font-poppins placeholder:font-poppins"
                onChange={(e) => setMinStock(Number(e.target.value))}
              />
              <DialogDescription>
                Coloque a quantidade mínima de itens que deve ter no estoque.
              </DialogDescription>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
