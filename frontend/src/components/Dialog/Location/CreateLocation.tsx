import api from "@/client/api-client";
import FormFieldComponent from "@/components/Form/FormFieldComponent";
import { Button } from "@/components/ui/button";
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
import { Form } from "@/components/ui/form";
import createLocationSchema from "@/schemas/createLocationSchema";
import type { LocationType } from "@/types/LocationType";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

interface CreateLocationDialogProps {
  setLocations: (locations: LocationType[]) => void;
  locations: LocationType[];
}

export default function CreateLocationDialog({
  setLocations,
  locations,
}: CreateLocationDialogProps) {
  const form = useForm<z.infer<typeof createLocationSchema>>({
    resolver: zodResolver(createLocationSchema),
    defaultValues: {
      name: "",
      street: "",
      number: "",
      complement: "",
      district: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });

  async function handleCreate(data: z.infer<typeof createLocationSchema>) {
    const jsonBody = {
      name: data.name,
      address: {
        street: data.street,
        number: data.number,
        complement: data.complement,
        district: data.district,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country,
      },
    };

    api
      .post(`/locations`, JSON.stringify(jsonBody), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const location: LocationType = res.data;
        setLocations([location, ...locations]);
        console.log(res.data);
      });
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="fixed right-5 bottom-5 w-[4rem] h-[4rem] rounded-full bg-[var(--primary-color)] font-poppins cursor-pointer">
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cadastro de Almoxarifado</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para cadastrar um novo almoxarifado.
              Após o cadastro, você poderá adicionar produtos a este
              almoxarifado.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreate)}>
              <FormFieldComponent
                control={form.control}
                name="name"
                label="Nome"
                placeholder="Ex.: Almoxarifado Central"
                isRequired
              />
              <FormFieldComponent
                control={form.control}
                name="street"
                label="Rua"
                placeholder="Ex.: Rua Nexus"
                isRequired
              />
              <FormFieldComponent
                control={form.control}
                name="number"
                label="Número"
                placeholder="Ex.: 123"
                isRequired
              />
              <FormFieldComponent
                control={form.control}
                name="complement"
                label="Complemento"
                placeholder="Ex.: Apto 101"
              />
              <FormFieldComponent
                control={form.control}
                name="district"
                label="Bairro"
                placeholder="Ex.: Centro"
                isRequired
              />
              <FormFieldComponent
                control={form.control}
                name="city"
                label="Cidade"
                placeholder="Ex.: Campinas"
                isRequired
              />
              <FormFieldComponent
                control={form.control}
                name="state"
                label="Estado"
                placeholder="Ex.: São Paulo"
                isRequired
              />
              <FormFieldComponent
                control={form.control}
                name="postalCode"
                label="CEP"
                placeholder="Ex.: 12345-678"
                isRequired
              />
              <FormFieldComponent
                control={form.control}
                name="country"
                label="País"
                placeholder="Ex.: Brasil"
                isRequired
              />
              <DialogFooter>
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
    </>
  );
}
