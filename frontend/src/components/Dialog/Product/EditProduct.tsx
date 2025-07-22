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
import { Edit, ImageIcon } from "lucide-react";
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
import editProductSchema from "@/schemas/editProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import DeleteProductAlert from "../../AlertDialog/DeleteProduct";
import useButtonPressed from "@/hooks/useButtonPressed";

interface CreateProductForm {
  products: ProductType[];
  setProducts: (products: ProductType[]) => void;
  product: ProductType;
  setOpen: (open: boolean) => void;
  isOpen: boolean;
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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { buttonPressed, setButtonPressed } = useButtonPressed();

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null | undefined>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    product.image || null
  );

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

  async function handleUpdate() {
    setButtonPressed(true);
    const json = {
      name: form.getValues("name"),
      description: form.getValues("description") || "",
      code: form.getValues("code") || "",
    };
    api
      .put(`/products/${product.id}`, JSON.stringify(json), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(async (res) => {
        toast.success("Produto atualizado com sucesso!", {
          description: "As informações do produto foram atualizadas.",
          duration: 5000,
        });
        let imageUrl = null;
        if (image) {
          imageUrl = await handleUpdateImage(product.id);
          res.data.image = imageUrl;
        }
        const updatedProducts = products.map((p) =>
          p.id === product.id ? { ...res.data } : p
        );
        setProducts(updatedProducts);
        setButtonPressed(false);
      })
      .catch(() => {
        setButtonPressed(false);
      });
  }

  async function handleDelete() {
    setButtonPressed(true);
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
      })
      .catch(() => {
        setButtonPressed(false);
      });
    const updatedProducts = products.filter((p) => p.id !== product.id);
    setProducts(updatedProducts);
    setOpen(false);
    setButtonPressed(false);
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
          console.log(res.data.avatar);
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
      <DialogTrigger
        className="cursor-pointer"
        onClick={() => setOpen(true)}
        asChild
      >
        <Edit color="#322866" size={48} />
      </DialogTrigger>
      <DialogContent className="flex">
        <DialogHeader>
          <DialogTitle>Edição de Produto</DialogTitle>
          <DialogDescription>
            Edite as informações do produto abaixo.
          </DialogDescription>
          <img
            src={product.qrCode}
            className="w-[7rem] md:w-[10rem] h-[7rem] md:h-[10rem] self-center object-cover"
          />
          <DialogDescription>QR Code do Produto</DialogDescription>
        </DialogHeader>
        <div className="flex">
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
                  className="h-[20rem] object-contain cursor-pointer"
                />
              ) : (
                <ImageIcon
                  className="cursor-pointer"
                  color="#322866"
                  size={280}
                  onClick={handleImageClick}
                />
              )}
              <DialogFooter className="mt-[1rem]">
                <DeleteProductAlert onDelete={handleDelete} />
                <DialogClose asChild onClick={() => setOpen(false)}>
                  <Button
                    disabled={buttonPressed}
                    className="bg-transparent text-red-500 border-red-500 border-[1px] shadow-none hover:bg-red-500 hover:text-white cursor-pointer"
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  disabled={buttonPressed}
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
