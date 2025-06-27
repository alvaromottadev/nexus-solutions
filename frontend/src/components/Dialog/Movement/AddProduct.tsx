import api from "@/client/api-client";
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

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { ProductType } from "@/types/ProductType";
import type ProductWithQuantityType from "@/types/ProductWithQuantityType";
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface AddProductDialogProps {
  setProductsSelected: (products: ProductWithQuantityType[]) => void;
  productsSelected: ProductWithQuantityType[];
}

export default function AddProductDialog({
  setProductsSelected,
  productsSelected,
}: AddProductDialogProps) {
  const form = useForm();

  const [open, setOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [productError, setProductError] = useState<boolean>(false);
  const [quantityError, setQuantityError] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductType | undefined>(undefined);
  const [quantity, setQuantity] = useState<number>(0);

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
  }, []);

  function handleQuantityChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    if (value <= 0) {
      setQuantityError(true);
    } else {
      setQuantityError(false);
      setQuantity(value);
    }
  }

  function handleAddProduct() {
    if (!product || product === undefined) {
      setProductError(true);
      return;
    }
    if (quantity <= 0) {
      setQuantityError(true);
      return;
    }
    const newProductWithQuantity = {
      product,
      quantity,
    };
    setProductsSelected([...productsSelected, newProductWithQuantity]);
    toast.success("Produto adicionado com sucesso!", {
      description: `Produto: ${product.name}, Quantidade: ${quantity}`,
      duration: 2000,
    });
    setOpen(false);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] cursor-pointer">
            Adicionar Produto
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Produto</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para adicionar um novo produto.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <FormField
              control={form.control}
              name="product"
              render={() => (
                <FormItem>
                  <FormLabel
                    className={`${productError ? "text-red-500" : ""}`}
                  >
                    Produto
                  </FormLabel>
                  <FormControl>
                    <SelectComponent
                      data={products}
                      isError={productError}
                      setError={setProductError}
                      placeholder="Selecione um produto..."
                      label="Produto"
                      onChange={setProduct}
                      valueType="object"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={`${quantityError ? "text-red-500" : ""}`}
                  >
                    Quantidade
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Ex.: 10"
                      type="number"
                      onChange={(e) => handleQuantityChange(e)}
                      className={`${
                        quantityError
                          ? "border-red-500 placeholder:text-red-500"
                          : ""
                      }`}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button className="bg-transparent text-red-500 border-red-500 border-[1px] shadow-none hover:bg-red-500 hover:text-white cursor-pointer">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                onClick={handleAddProduct}
                className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] cursor-pointer"
              >
                Adicionar
              </Button>
            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
