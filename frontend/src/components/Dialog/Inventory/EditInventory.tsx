import api from "@/client/api-client";
import DeleteProductAlert from "@/components/AlertDialog/DeleteProduct";
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
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

interface EditInventoryDialogProps {
  inventory: InventoryType;
  setInventories: (inventories: InventoryType[]) => void;
  inventories: InventoryType[];
}

export default function EditInventoryDialog({
  inventory,
  setInventories,
  inventories,
}: EditInventoryDialogProps) {
  type FormInventorySchemaType = z.infer<typeof formInventorySchema>;
  const form = useForm<FormInventorySchemaType>({
    resolver: zodResolver(formInventorySchema) as any,
    defaultValues: {
      quantity: inventory.quantity,
      minStock: inventory.minStock,
    },
  });

  const [open, setOpen] = useState<boolean>(false);

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

  async function handleUpdate(data: z.infer<typeof formInventorySchema>) {
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
      .put(`/inventories/${inventory.id}`, JSON.stringify(json), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const resInventory = res.data;
        const inventoriesUpdated = inventories.map((inv) =>
          inv.id === resInventory.id ? resInventory : inv
        );
        resetForm();
        toast.success("Estoque atualizado com sucesso!", {
          description: "As informações do estoque foram atualizadas.",
          duration: 3000,
        });
        setOpen(false);
        setInventories(inventoriesUpdated);
      });
  }

  async function handleDelete() {}

  function resetForm() {
    setProductId("");
    setLocationId("");
    setProductError(false);
    setLocationError(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className="focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4
          hover:bg-gray-100"
        >
          <Edit />
          Editar Estoque
        </div>
      </DialogTrigger>
      <DialogContent className="w-auto">
        <DialogHeader>
          <DialogTitle>Editar Estoque</DialogTitle>
          <DialogDescription>
            Aqui você pode editar as informações do estoque selecionado.
            Certifique-se de que os dados estão corretos antes de salvar.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between">
          <div>
            <CustomText className={productError ? "text-red-500" : ""}>
              Produto
            </CustomText>
            <SelectComponent
              defaultValue={inventory.product.id}
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
              defaultValue={inventory.location.id}
              data={locations}
              placeholder="Selecione um produto..."
              label="Produto"
              onChange={setLocationId}
              isError={locationError}
              setError={setLocationError}
            />
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)}>
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
              <DeleteProductAlert onDelete={handleDelete} />
              <DialogClose asChild>
                <Button className="bg-transparent text-red-500 border-red-500 border-[1px] shadow-none hover:bg-red-500 hover:text-white cursor-pointer">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] cursor-pointer"
              >
                Atualizar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
