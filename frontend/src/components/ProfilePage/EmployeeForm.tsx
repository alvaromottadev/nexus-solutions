import { uploadEmployeeSchema } from "@/schemas/uploadEmployeeSchema";
import type EmployeeType from "@/types/EmployeeType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import api from "@/client/api-client";
import { toast } from "sonner";
import type { AuthMeType } from "@/types/AuthMeType";
import { useNavigate } from "react-router";
import defaultAvatar from "@/assets/default-avatar.jpg";

interface EmployeeFormProps {
  employee: EmployeeType;
  auth: AuthMeType;
}

export default function EmployeeForm({ employee, auth }: EmployeeFormProps) {
  const form = useForm<z.infer<typeof uploadEmployeeSchema>>({
    resolver: zodResolver(uploadEmployeeSchema),
    defaultValues: {
      name: employee.name || "",
      email: employee.user.email || "",
      password: "",
    },
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const navigation = useNavigate();

  console.log("employee: " + employee);

  function handleUpdate(data: z.infer<typeof uploadEmployeeSchema>) {
    api
      .put(
        `/employees`,
        JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
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
        if (data.email !== employee.user.email) {
          toast.info("Você precisará fazer login novamente com o novo email.");
          localStorage.removeItem("token");
          navigation("/login");
        }
        form.setValue("password", "");
        setIsDisabled(true);
      });
  }

  return (
    <>
      <img
        src={employee.avatar || defaultAvatar}
        className="w-[10rem] h-[10rem] self-center rounded-full mb-10"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpdate)}>
          <div className="flex flex-col gap-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isDisabled} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isDisabled} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Empresa</FormLabel>
              <FormControl>
                <Input value={auth.company.name} disabled />
              </FormControl>
            </FormItem>
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
