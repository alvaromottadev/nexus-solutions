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
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import defaultAvatar from "@/assets/default-avatar.jpg";
import type EmployeeType from "@/types/EmployeeType";
import { DialogClose } from "@radix-ui/react-dialog";
import DeleteProductAlert from "@/components/AlertDialog/DeleteProduct";
import { useAuth } from "@/hooks/useAuth";
import { editEmployeeFormSchema } from "@/schemas/editEmployeeSchema";
import useButtonPressed from "@/hooks/useButtonPressed";
import CustomText from "@/components/CustomText";

interface EmployeeDialogProps {
  employees: EmployeeType[];
  setEmployees: (employees: EmployeeType[]) => void;
  employee?: EmployeeType;
  children: React.ReactNode;
}

export default function EmployeeDialog({
  employees,
  setEmployees,
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
  ];

  const auth = useAuth();
  const { buttonPressed, setButtonPressed } = useButtonPressed();

  const [open, setOpen] = useState<boolean>(false);
  const [image, setImage] = useState<File | null | undefined>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    employee?.avatar || defaultAvatar
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasPermission =
    (auth?.user && auth.user!.type === "COMPANY") ||
    (auth?.user?.role && auth.user.role === "MANAGER");

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

    setButtonPressed(true);

    api
      .post(`/employees`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(async (res) => {
        toast.success("Funcionário cadastrado com sucesso!", {
          duration: 2000,
        });
        let avatar = null;
        if (image) {
          avatar = await handleUploadAvatar(res.data.id);
        }
        setEmployees([{ ...res.data, avatar }, ...employees]);
        setOpen(false);
        setButtonPressed(false);
      })
      .catch(() => {
        setButtonPressed(false);
      });
  }

  async function handleUploadAvatar(id: string) {
    const formData = new FormData();
    formData.append("avatar", image as File);
    try {
      const res = await api.put(`/employees/${id}/avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data.avatar;
    } catch (error) {
      toast.error("Erro ao atualizar avatar!");
      return null;
    }
  }

  function handleDelete() {
    if (!employee) return;
    setButtonPressed(true);
    api
      .delete(`/employees/${employee.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        toast.success("Funcionário excluído com sucesso!");
        setEmployees(employees.filter((emp) => emp.id !== employee.id));
        setOpen(false);
        setButtonPressed(false);
      })
      .catch(() => {
        setButtonPressed(false);
      });
  }

  async function handleUpdate(data: z.infer<typeof typeForm>) {
    if (!employee) return;

    setButtonPressed(true);

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
      .then(async (res) => {
        toast.success("Funcionário atualizado com sucesso!", {
          duration: 2000,
        });
        let avatar = employee.avatar;
        if (image) {
          avatar = await handleUploadAvatar(employee.id);
        }
        setEmployees(
          employees.map((emp) =>
            emp.id === employee.id ? { ...res.data, avatar } : emp
          )
        );
        setOpen(false);
        setButtonPressed(false);
      })
      .catch(() => {
        setButtonPressed(false);
      });
  }

  function handleImageClick() {
    fileInputRef.current?.click();
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
                onClick={handleImageClick}
                src={imagePreview ? imagePreview : defaultAvatar}
                className="h-[10rem] w-[10rem] rounded-full object-cover"
              />
            </div>
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="hidden"
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => handleFileChange(e)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormFieldComponent
              control={form.control}
              label="Nome"
              name="name"
              placeholder="Ex.: Mariana"
              isRequired
            />
            <FormFieldComponent
              control={form.control}
              label="Email"
              name="email"
              placeholder="Ex.: mariana@gmail.com"
              isRequired
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormFieldComponent
                control={form.control}
                label="Senha"
                name="password"
                placeholder="Ex.: 123123"
                isRequired
                type="password"
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
            </div>
            {employee && (
              <CustomText className="text-sm text-gray-500">
                Deixe em branco para não alterar a senha
              </CustomText>
            )}
          </form>
        </Form>
        <DialogFooter>
          {employee && hasPermission && (
            <DeleteProductAlert onDelete={handleDelete} />
          )}
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
            className="cursor-pointer bg-[var(--primary-color)]"
            onClick={form.handleSubmit(employee ? handleUpdate : handleCreate)}
          >
            {employee ? "Atualizar Funcionário" : "Cadastrar Funcionário"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
