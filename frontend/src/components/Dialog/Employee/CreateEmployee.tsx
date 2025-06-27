import api from "@/client/api-client";
import FormFieldComponent from "@/components/Form/FormFieldComponent";
import SelectComponentTwo from "@/components/SelectComponentTwo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { employeeFormSchema } from "@/schemas/employeeFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export default function CreateEmployeeDialog() {
  const form = useForm<z.infer<typeof employeeFormSchema>>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      role: "OPERATOR",
    },
  });

  const roles = [
    {
      value: "MANAGER",
      label: "Gerente",
    },
    {
      value: "OPERATOR",
      label: "Operador",
    },
    {
      value: "VIEWER",
      label: "Visualizador",
    },
  ];

  const [open, setOpen] = useState(false);

  async function handleCreate(data: z.infer<typeof employeeFormSchema>) {
    const body = {
      user: {
        email: data.email,
        password: data.password,
        type: "EMPLOYEE",
      },
      employee: {
        name: data.name,
        role: data.role,
      },
    };

    api
      .post(`/employees`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success("Funcionário cadastrado com sucesso!");
        setOpen(false);
      });
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
          <DialogTitle>Cadastro de Funcionário</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para cadastrar um novo funcionário.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)}>
            <FormFieldComponent
              control={form.control}
              label="Email"
              name="email"
              placeholder="Ex.: mariana@gmail.com"
              isRequired
            />
            <FormFieldComponent
              control={form.control}
              label="Senha"
              name="password"
              placeholder="Ex.: 123123"
              isRequired
              type="password"
            />
            <FormFieldComponent
              control={form.control}
              label="Nome"
              name="name"
              placeholder="Ex.: Mariana"
              isRequired
            />
            <FormField
              name="role"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cargo</FormLabel>
                  <FormControl>
                    <SelectComponentTwo
                      data={roles}
                      label="cargo"
                      onChange={(value: string) => {
                        field.onChange(value);
                      }}
                      defaultValue={field.value}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Button
          type="submit"
          className="w-full bg-[var(--primary-color)]"
          onClick={form.handleSubmit(handleCreate)}
        >
          Cadastrar
        </Button>
      </DialogContent>
    </Dialog>
  );
}
