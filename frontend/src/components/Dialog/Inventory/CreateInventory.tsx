import api from "@/client/api-client";
import CustomText from "@/components/CustomText";
import FormFieldComponent from "@/components/Form/FormFieldComponent";
import SelectComponent from "@/components/SelectComponent";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import formInventorySchema from "@/schemas/formInventorySchema";
import type InventoryType from "@/types/InventoryType";
import type { LocationType } from "@/types/LocationType";
import type { ProductType } from "@/types/ProductType";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

interface CreateInventoryDialogProps {
  setInventories: (inventories: InventoryType[]) => void;
  inventories: InventoryType[];
}

export default function CreateInventoryDialog({
  setInventories,
  inventories,
}: CreateInventoryDialogProps) {
  type FormInventorySchemaType = z.infer<typeof formInventorySchema>;
  const form = useForm<FormInventorySchemaType>({
    resolver: zodResolver(formInventorySchema) as any,
    defaultValues: {
      quantity: 0,
      minStock: 1,
    },
  });

  const [products, setProducts] = useState<ProductType[]>([]);
  const [locations, setLocations] = useState<LocationType[]>([]);
  const [productId, setProductId] = useState<string>("");
  const [locationId, setLocationId] = useState<string>("");

  const [locationError, setLocationError] = useState<boolean>(false);
  const [productError, setProductError] = useState<boolean>(false);

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
      });
  }, []);

  async function handleCreate(data: z.infer<typeof formInventorySchema>) {
    if (!productId) {
      setProductError(true);
      return;
    }
    if (!locationId) {
      setLocationError(true);
      return;
    }
    const json = {
      productId: productId,
      locationId: locationId,
      quantity: data.quantity,
      minStock: data.minStock,
    };

    api
      .post(`/inventories`, JSON.stringify(json), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const inventory = res.data;
        setInventories([...inventories, inventory]);
        resetForm();
        toast.success("Estoque cadastrado com sucesso!");
      });
  }

  function resetForm() {
    setProductId("");
    setLocationId("");
    setProductError(false);
    setLocationError(false);
    form.reset();
  }

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
        <div className="flex justify-between">
          <div>
            <CustomText className={productError ? "text-red-500" : ""}>
              Produto
            </CustomText>
            <SelectComponent
              data={products}
              placeholder="Selecione um produto..."
              label="Produto"
              onChange={setProductId}
              isError={productError}
              setError={setProductError}
            />
          </div>
          <div>
            <CustomText className={locationError ? "text-red-500" : ""}>
              Almoxarifado
            </CustomText>
            <SelectComponent
              data={locations}
              placeholder="Selecione um almoxarifado..."
              label="Almoxarifado"
              onChange={setLocationId}
              isError={locationError}
              setError={setLocationError}
            />
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)}>
            <div className="flex flex-col gap-y-2">
              <FormFieldComponent
                control={form.control}
                label="Quantidade"
                description="Coloque a quantidade de itens que tem no estoque."
                name="quantity"
                isRequired
                placeholder="Ex.: 10"
                type="number"
              />
              <FormFieldComponent
                control={form.control}
                label="Estoque Mínimo"
                description="Coloque a quantidade mínima de itens que deve ter no estoque."
                name="minStock"
                isRequired
                placeholder="Ex.: 2"
                type="number"
              />
            </div>
            <DialogFooter className="mt-5">
              <DialogClose asChild>
                <Button className="bg-transparent text-red-500 border-red-500 border-[1px] shadow-none hover:bg-red-500 hover:text-white cursor-pointer">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] cursor-pointer"
              >
                Cadastrar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
