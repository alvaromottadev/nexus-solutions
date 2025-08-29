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
import { ImageIcon, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import FormFieldComponent from "../../Form/FormFieldComponent";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { Input } from "../../ui/input";
import { useRef, useState } from "react";
import api from "@/client/api-client";
import { toast } from "sonner";
import type { ProductType } from "@/types/ProductType";
import type { z } from "zod";
import { createProductSchema } from "@/schemas/createProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useButtonPressed from "@/hooks/useButtonPressed";

interface CreateProductForm {
  products: ProductType[];
  setProducts: (products: ProductType[]) => void;
}

export default function CreateProductDialog({
  products,
  setProducts,
}: CreateProductForm) {
  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
    },
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [image, setImage] = useState<File | null | undefined>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { buttonPressed, setButtonPressed } = useButtonPressed();

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (
      file?.type !== "image/jpeg" &&
      file?.type !== "image/png" &&
      file?.type !== "image/jpg"
    ) {
      toast.error("Apenas arquivos JPEG ou PNG são permitidos.");
      return;
    }
    setImage(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    } else {
      setImagePreview(null);
    }
  }

  async function handleCreate(data: z.infer<typeof createProductSchema>) {
    setButtonPressed(true);
    const json = {
      name: data.name,
      description: data.description || "",
    };

    api
      .post(`/products`, JSON.stringify(json), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(async (res) => {
        let imageUrl = null;
        if (image) {
          imageUrl = await handleUpdateImage(res.data.id);
          console.log(imageUrl);
        }
        toast.success("Produto cadastrado com sucesso!", {
          description: "O produto foi adicionado à lista.",
          duration: 5000,
        });
        res.data.image = imageUrl;
        setProducts([res.data, ...products]);
        setOpen(false);
        setButtonPressed(false);
      })
      .catch(() => {
        setButtonPressed(false);
      });
  }

  async function handleUpdateImage(productId: string) {
    const formData = new FormData();
    formData.append("image", image as File);
    try {
      return await api
        .put(`/products/${productId}/image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          return res.data.avatar;
        });
    } catch (error) {
      toast.error("Erro ao atualizar a imagem do produto.");
      return null;
    }
  }

  function handleImageClick() {
    fileInputRef.current?.click();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <form onSubmit={form.handleSubmit(handleCreate)}>
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

              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel>Imagem</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        ref={fileInputRef}
                        accept="image/jpeg, image/png, image/jpg"
                        className="hidden"
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
              {imagePreview ? (
                <img
                  onClick={handleImageClick}
                  src={imagePreview}
                  className="max-h-[15rem] object-contain cursor-pointer"
                />
              ) : (
                <ImageIcon
                  className="cursor-pointer"
                  color="#322866"
                  size={280}
                  onClick={handleImageClick}
                />
              )}

              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    disabled={buttonPressed}
                    className="bg-transparent text-red-500 border-red-500 border-[1px] shadow-none hover:bg-red-500 hover:text-white cursor-pointer"
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  disabled={buttonPressed}
                  type="submit"
                  className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] cursor-pointer"
                >
                  Cadastrar
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
