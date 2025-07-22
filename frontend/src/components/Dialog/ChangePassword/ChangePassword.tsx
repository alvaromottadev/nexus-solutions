import api from "@/client/api-client";
import FormFieldComponent from "@/components/Form/FormFieldComponent";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/hooks/useAuth";
import useButtonPressed from "@/hooks/useButtonPressed";
import changePasswordSchema from "@/schemas/changePasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export default function ChangePasswordDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const auth = useAuth();
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { buttonPressed, setButtonPressed } = useButtonPressed();

  function handleSubmit(data: z.infer<typeof changePasswordSchema>) {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("A nova senha e a confirmação não coincidem.");
      return;
    }

    setButtonPressed(true);

    const json = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    };

    api
      .put(`/auth/change-password`, JSON.stringify(json), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        toast.success("Senha alterada com sucesso!", {
          description: "Você será redirecionado para a página de login.",
          duration: 3000,
        });
        auth?.logout();
        setOpen(false);
        setButtonPressed(false);
      })
      .catch(() => {
        setButtonPressed(false);
      });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-[0.8rem] cursor-pointer border-none bg-transparent text-black shadow-none hover:bg-transparent p-0">
          Clique aqui para alterar a senha
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alterar senha</DialogTitle>
          <DialogDescription>
            Para alterar sua senha, digite sua senha atual e a nova senha
            desejada.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormFieldComponent
              control={form.control}
              label="Senha atual"
              isRequired
              name="oldPassword"
              description="Digite sua senha atual"
              placeholder="Ex.: nexus123"
              type="password"
            />
            <FormFieldComponent
              control={form.control}
              label="Nova senha"
              isRequired
              name="newPassword"
              description="Digite sua senha nova"
              placeholder="Ex.: nexus123"
              type="password"
            />
            <FormFieldComponent
              control={form.control}
              label="Confirmar nova senha"
              isRequired
              name="confirmPassword"
              description="Confirme sua nova senha"
              placeholder="Ex.: nexus123"
              type="password"
            />
            <DialogFooter>
              <DialogClose>
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
              >
                Alterar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
