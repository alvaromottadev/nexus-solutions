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
import { Plus } from "lucide-react";
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

interface CreateProductForm {
  products: ProductType[];
  setProducts: (products: ProductType[]) => void;
}

export default function CreateProductDialog({
  products,
  setProducts,
}: CreateProductForm) {
  const form = useForm({});
  const [image, setImage] = useState<File | null | undefined>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  async function handleCreate() {
    const formData = new FormData();

    if (!form.getValues("name")) {
      toast.error("O nome do produto é obrigatório.", {
        description: "Por favor, preencha o campo nome.",
        duration: 5000,
      });
      form.setError("name", {
        type: "minLength",
        message: "O nome do produto é obrigatório.",
      });
      return;
    }

    if (image) {
      formData.append("file", image);
    }

    formData.append("name", form.getValues("name"));
    formData.append("description", form.getValues("description") || "");
    formData.append("code", form.getValues("code") || "");

    api
      .post(`/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success("Produto cadastrado com sucesso!", {
          description: "O produto foi adicionado à lista.",
          duration: 5000,
        });
        setProducts([res.data, ...products]);
      });
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastro de Produto</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para cadastrar um novo produto. Ainda é
            necessário adicionar o produto ao estoque.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-2">
          <Form {...form}>
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
                    <Input type="file" onChange={(e) => handleFileChange(e)} />
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
              <DialogClose asChild>
                <Button className="bg-transparent text-red-500 border-red-500 border-[1px] shadow-none hover:bg-red-500 hover:text-white cursor-pointer">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] cursor-pointer"
                onClick={handleCreate}
              >
                Cadastrar
              </Button>
            </DialogFooter>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
