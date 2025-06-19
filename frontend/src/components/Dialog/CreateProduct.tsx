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

export default function CreateProductDialog() {
  const form = useForm();
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
            <DialogFooter>
              <DialogClose asChild>
                <Button className="bg-transparent text-red-500 border-red-500 border-[1px] shadow-none hover:bg-red-500 hover:text-white cursor-pointer">
                  Cancelar
                </Button>
              </DialogClose>
              <Button className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] cursor-pointer">
                Cadastrar
              </Button>
            </DialogFooter>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
