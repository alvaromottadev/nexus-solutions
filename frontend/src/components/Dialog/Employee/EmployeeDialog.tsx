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
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { employeeFormSchema } from "@/schemas/employeeFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import defaultAvatar from "@/assets/default-avatar.jpg";
import type EmployeeType from "@/types/EmployeeType";
import { DialogClose } from "@radix-ui/react-dialog";
import DeleteProductAlert from "@/components/AlertDialog/DeleteProduct";
import { useAuth } from "@/hooks/useAuth";
import { editEmployeeFormSchema } from "@/schemas/editEmployeeSchema";

interface EmployeeDialogProps {
  employee?: EmployeeType;
  children: React.ReactNode;
}

export default function EmployeeDialog({
  children,
  employee,
}: EmployeeDialogProps) {
  const typeForm = employee ? editEmployeeFormSchema : employeeFormSchema;

  const form = useForm<z.infer<typeof typeForm>>({
    resolver: zodResolver(typeForm),
    defaultValues: {
      email: employee ? employee.user.email : "",
      password: "",
      name: employee ? employee.name : "",
      role: employee ? employee.role : "OPERATOR",
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

  const auth = useAuth();

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null | undefined>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    employee?.avatar || defaultAvatar
  );

  const hasPermission =
    (auth?.user && auth.user!.type === "COMPANY") ||
    (auth?.user?.role && auth.user.role === "MANAGER");

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

  async function handleCreate(data: z.infer<typeof typeForm>) {
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
        if (image) handleUploadAvatar(res.data.id);
        setOpen(false);
      });
  }

  async function handleUploadAvatar(id: string) {
    const formData = new FormData();
    formData.append("avatar", image as File);
    api.put(`/employees/${id}/avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  async function handleDelete() {
    if (!employee) return;
    api
      .delete(`/employees/${employee.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        toast.success("Funcionário excluído com sucesso!");
        setOpen(false);
      });
  }

  async function handleUpdate(data: z.infer<typeof typeForm>) {
    if (!employee) return;

    const body = {
      name: data.name,
      role: data.role,
      user: {
        email: data.email,
        password: data.password,
      },
    };

    api
      .put(`/employees/${employee.id}`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        toast.success("Funcionário atualizado com sucesso!");
        if (image) handleUploadAvatar(employee.id);
        setOpen(false);
      });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {employee ? "Editar Funcionário" : "Cadastro de Funcionário"}
          </DialogTitle>
          <DialogDescription>
            {employee
              ? "Atualize os dados do funcionário."
              : "Preencha os campos abaixo para cadastrar um novo funcionário."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(employee ? handleUpdate : handleCreate)}
          >
            <div className="flex items-center justify-center">
              <img
                src={imagePreview ? imagePreview : defaultAvatar}
                className="h-[10rem] w-[10rem] rounded-full"
              />
            </div>
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Imagem</FormLabel>
                  <FormControl>
                    <Input
                      className="mb-2"
                      type="file"
                      onChange={(e) => handleFileChange(e)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

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
              {...(employee
                ? { description: "Deixe em branco para não alterar a senha" }
                : {})}
            />
            <FormFieldComponent
              control={form.control}
              label="Nome"
              name="name"
              placeholder="Ex.: Mariana"
              isRequired
            />
            {hasPermission && (
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
            )}
          </form>
        </Form>
        <DialogFooter>
          {employee && hasPermission && (
            <DeleteProductAlert onDelete={handleDelete} />
          )}
          <DialogClose asChild>
            <Button className="bg-transparent text-red-500 border-red-500 border-[1px] shadow-none hover:bg-red-500 hover:text-white cursor-pointer">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="bg-[var(--primary-color)]"
            onClick={form.handleSubmit(employee ? handleUpdate : handleCreate)}
          >
            {employee ? "Atualizar Funcionário" : "Cadastrar Funcionário"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
