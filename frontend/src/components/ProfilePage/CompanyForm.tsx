import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateCompanySchema } from "@/schemas/updateCompanySchema";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "../ui/button";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/client/api-client";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import defaultAvatar from "@/assets/default-avatar.jpg";
import type { CompanyType } from "@/types/CompanyType";
import EditAddressDialog from "../Dialog/Address/EditAddress";
import type AddressType from "@/types/AddressType";
import type addressFormSchema from "@/schemas/addressFormSchema";

interface FormFieldComponentProps {
  company: CompanyType;
}

export default function CompanyForm({ company }: FormFieldComponentProps) {
  const form = useForm<z.infer<typeof updateCompanySchema>>({
    resolver: zodResolver(updateCompanySchema),
    defaultValues: {
      name: company.name || "Nome não disponível",
      email: company.user.email || "Email não disponível",
      password: "",
    },
  });

  const [address, setAddress] = useState<AddressType>(company.address);
  const [isDisabled, setIsDisabled] = useState(true);
  const navigation = useNavigate();

  function handleAddressUpdate(data: z.infer<typeof addressFormSchema>) {
    setAddress({
      id: company.address.id,
      street: data.street,
      number: data.number,
      complement: data.complement || "",
      district: data.district,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      country: data.country,
    });
  }

  function handleUpdate(data: z.infer<typeof updateCompanySchema>) {
    api
      .put(
        `/companies`,
        JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          address: address,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        toast.success("Dados do perfil atualizados com sucesso!");
        if (data.email !== company.user.email) {
          toast.info("Você precisará fazer login novamente com o novo email.");
          localStorage.removeItem("token");
          navigation("/login");
        }
        setIsDisabled(true);
      });
  }

  return (
    <>
      <img
        src={company.avatar || defaultAvatar}
        className="w-[10rem] h-[10rem] self-center rounded-full mb-10"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpdate)}>
          <div className="flex flex-col gap-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormControl>
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input disabled={isDisabled} {...field} />
                    </FormControl>
                  </FormItem>
                </FormControl>
              )}
            />
            <FormItem>
              <FormLabel>CNPJ</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  disabled
                  value={company.cnpj || "CNPJ não disponível"}
                  className="font-poppins placeholder:font-poppins"
                />
              </FormControl>
            </FormItem>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormControl>
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        disabled={isDisabled}
                        autoComplete="off"
                        className="font-poppins placeholder:font-poppins"
                        placeholder="Digite seu email"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                </FormControl>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormControl>
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        disabled={isDisabled}
                        autoComplete="off"
                        className="font-poppins placeholder:font-poppins"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Coloque sua senha atual para atualizar os dados do perfil.
                    </FormDescription>
                  </FormItem>
                </FormControl>
              )}
            />
          </div>
          <EditAddressDialog
            onSave={handleAddressUpdate}
            address={company.address}
            isDisabled={isDisabled}
          >
            <Button className="mt-4 w-full">Ver dados do endereço</Button>
          </EditAddressDialog>
          {isDisabled ? (
            <Button
              type="button"
              onClick={() => setIsDisabled(false)}
              className="cursor-pointer mt-5 w-full bg-[var(--primary-color)] hover:bg-[#f9f9f9] hover:text-[var(--primary-color)] hover:border-[1px] hover:border-[var(--primary-color)]"
            >
              Editar Perfil
            </Button>
          ) : (
            <Button
              type="submit"
              className="cursor-pointer mt-5 w-full bg-[#f9f9f9] border-[1px] border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white"
            >
              Salvar Alterações
            </Button>
          )}
        </form>
      </Form>
    </>
  );
}
