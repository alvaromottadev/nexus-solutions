import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Plus, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import FormFieldComponent from "../Form/FormFieldComponent";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { useState } from "react";
import api from "@/client/api-client";
import { toast } from "sonner";
import type { ProductType } from "@/types/ProductType";
import type { z } from "zod";
import editProductSchema from "@/schemas/editProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import DeleteProductAlert from "../AlertDialog/DeleteProduct";

interface CreateProductForm {
  products: ProductType[];
  setProducts: (products: ProductType[]) => void;
  product: ProductType;
  setOpen?: (open: boolean) => void;
  isOpen?: boolean;
}

export default function EditProductDialog({
  product,
  products,
  setProducts,
}: CreateProductForm) {
  const form = useForm<z.infer<typeof editProductSchema>>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      name: product.name || "a",
      description: product.description || "",
      code: product.code || "",
      image: product.image || null,
    },
  });

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null | undefined>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    product.image || null
  );

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setImage(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    } else {
      setImagePreview(null);
    }
  }

  async function handleUpdate() {
    const formData = new FormData();

    if (image) {
      formData.append("file", image);
    }

    formData.append("name", form.getValues("name"));
    formData.append("description", form.getValues("description") || "");
    formData.append("code", form.getValues("code") || "");

    api
      .put(`/products/${product.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success("Produto atualizado com sucesso!", {
          description: "As informações do produto foram atualizadas.",
          duration: 5000,
        });
        const updatedProducts = products.map((p) =>
          p.id === product.id ? res.data : p
        );
        setProducts(updatedProducts);
      });
  }

  async function handleDelete() {
    await api
      .delete(`/products/${product.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success(res.data.success, {
          description: "O produto foi removido da lista.",
          duration: 5000,
        });
      });
    const updatedProducts = products.filter((p) => p.id !== product.id);
    setProducts(updatedProducts);
    setOpen(false);
  }

  return (
    <Dialog open={open}>
      <DialogTrigger onClick={() => setOpen(true)} asChild>
        <Edit color="white" size={48} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edição de Produto</DialogTitle>
          <DialogDescription>
            Edite as informações do produto abaixo.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdate)}>
              <FormFieldComponent
                control={form.control}
                name="name"
                label="Nome"
                placeholder="Ex.: Disjuntor 10A"
                isRequired
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        className="font-poppins placeholder:font-poppins"
                        placeholder="Ex.: Ideal para proteção de circuitos elétricos residenciais e comerciais."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormFieldComponent
                control={form.control}
                name="code"
                label="Código"
                placeholder="Ex.: 123456789"
                description="Utilize o código de barras do produto."
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagem</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => handleFileChange(e)}
                      />
                    </FormControl>
                    <FormDescription>
                      Selecione uma imagem do produto.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {imagePreview && (
                <img src={imagePreview} className="h-[20rem] object-contain" />
              )}
              <DialogFooter>
                <DeleteProductAlert onDelete={handleDelete} />
                <DialogClose asChild onClick={() => setOpen(false)}>
                  <Button className="bg-transparent text-red-500 border-red-500 border-[1px] shadow-none hover:bg-red-500 hover:text-white cursor-pointer">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  onClick={() => setOpen(false)}
                  type="submit"
                  className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] cursor-pointer"
                >
                  Editar
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
