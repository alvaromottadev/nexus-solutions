import api from "@/client/api-client";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import forgotPasswordSchema from "@/schemas/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

interface ForgotPasswordDialogProps {
  children: React.ReactNode;
}

export default function ForgotPasswordDialog({
  children,
}: ForgotPasswordDialogProps) {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function handleSubmit(data: z.infer<typeof forgotPasswordSchema>) {
    const isValid = validateForm(data);
    if (!isValid) return;
    api
      .post(`/auth/forgot-password`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast.success(response.data.success);
        setOpen(false);
      });
  }

  function validateForm(data: z.infer<typeof forgotPasswordSchema>) {
    if (data.email === "" || !data.email.includes("@")) {
      form.setError("email", {
        type: "manual",
        message: "Por favor, insira um email válido.",
      });
      return false;
    }
    return true;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Esqueci minha senha</DialogTitle>
          <DialogDescription>
            Se você esqueceu sua senha, insira seu e-mail abaixo. Você receberá
            um link para redefinir sua senha.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      form.clearErrors("email");
                    }}
                    placeholder="Ex.: nexus@gmail.com"
                    type="email"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button className="bg-transparent text-red-500 border-red-500 border-[1px] shadow-none hover:bg-red-500 hover:text-white cursor-pointer">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              onClick={() => handleSubmit(form.getValues())}
              className="cursor-pointer bg-[var(--primary-color)]"
            >
              Enviar
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
