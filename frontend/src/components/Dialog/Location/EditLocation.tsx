import { Edit } from "lucide-react";

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
import FormFieldComponent from "@/components/Form/FormFieldComponent";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import formLocationSchema from "@/schemas/formLocationSchema";
import type { z } from "zod";
import { Form } from "@/components/ui/form";
import type { LocationType } from "@/types/LocationType";
import api from "@/client/api-client";
import { toast } from "sonner";
import DeleteProductAlert from "@/components/AlertDialog/DeleteProduct";

interface EditLocationDialogProps {
  location: LocationType;
  setLocations: (locations: LocationType[]) => void;
  locations: LocationType[];
  setOpen: (open: boolean) => void;
  isOpen: boolean;
}

export default function EditLocationDialog({
  location,
  setLocations,
  locations,
  setOpen,
  isOpen,
}: EditLocationDialogProps) {
  const form = useForm<z.infer<typeof formLocationSchema>>({
    resolver: zodResolver(formLocationSchema),
    defaultValues: {
      name: location.name,
      street: location.address.street,
      number: location.address.number,
      complement: location.address.complement,
      district: location.address.district,
      city: location.address.city,
      state: location.address.state,
      postalCode: location.address.postalCode,
      country: location.address.country,
    },
  });

  async function handleDelete() {
    api
      .delete(`/locations/${location.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success("Almoxarifado excluído com sucesso!", {
          description: "O almoxarifado foi removido da lista.",
          duration: 3000,
        });
        const updatedLocations = locations.filter((l) => l.id !== location.id);
        setLocations(updatedLocations);
        setOpen(false);
      });
  }

  async function handleUpdate(data: z.infer<typeof formLocationSchema>) {
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
      .put(`/locations/${location.id}`, jsonBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success("Almoxarifado atualizado com sucesso!", {
          description: "As informações do almoxarifado foram atualizadas.",
          duration: 3000,
        });
        const updatedLocations = locations.map((l) =>
          l.id === location.id ? res.data : l
        );
        setLocations(updatedLocations);
      });
  }

  return (
    <>
      <Dialog open={isOpen}>
        <DialogTrigger
          onClick={() => setOpen(true)}
          className="cursor-pointer"
          asChild
        >
          <Edit size={48} color="black" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Almoxarifado</DialogTitle>
            <DialogDescription>
              Aqui você pode editar as informações do almoxarifado.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdate)}>
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
                <DeleteProductAlert onDelete={handleDelete} />
                <DialogClose onClick={() => setOpen(false)} asChild>
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
        </DialogContent>
      </Dialog>
    </>
  );
}
