import CustomText from "@/components/CustomText";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useNavigate, useParams } from "react-router";
import logo from "@/assets/logo_nexus.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import resetPasswordSchema from "@/schemas/resetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import api from "@/client/api-client";
import { useEffect } from "react";

export default function ResetPasswordPage() {
  const { code } = useParams();
  const navigation = useNavigate();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    form.setValue("resetCode", code || "");
  });

  function handleSubmit(data: z.infer<typeof resetPasswordSchema>) {
    const isValid = validatePasswords(data);
    if (!isValid) return;
    api
      .post(`/auth/reset-password`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast.success(response.data.success, {
          description: "Você será redirecionado para a página de login.",
          duration: 3000,
        });
        navigation("/login");
      });
  }

  function validatePasswords(data: z.infer<typeof resetPasswordSchema>) {
    if (data.password !== data.confirmPassword) {
      toast.error("As senhas não coincidem.");
      return false;
    }
    return true;
  }

  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <div className="p-2 space-y-2 flex flex-col border-[var(--primary-color)] border-[1px] items-center justify-center shadow-2xl rounded-[1rem] h-[30rem] w-[25rem]">
          <img src={logo} className="w-[8rem]" />
          <CustomText>Redefinir Senha</CustomText>
          <CustomText className="text-[1rem] text-center">
            Insira o código de redefinição enviado para seu e-mail
          </CustomText>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="resetCode"
                  render={({ field }) => (
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot
                          className="border-[var(--primary-color)] text-[var(--primary-color)]"
                          index={0}
                        />
                        <InputOTPSlot
                          className="border-[var(--primary-color)] text-[var(--primary-color)]"
                          index={1}
                        />
                        <InputOTPSlot
                          className="border-[var(--primary-color)] text-[var(--primary-color)]"
                          index={2}
                        />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot
                          className="border-[var(--primary-color)] text-[var(--primary-color)]"
                          index={3}
                        />
                        <InputOTPSlot
                          className="border-[var(--primary-color)] text-[var(--primary-color)]"
                          index={4}
                        />
                        <InputOTPSlot
                          className="border-[var(--primary-color)] text-[var(--primary-color)]"
                          index={5}
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl className="w-[16rem]">
                        <Input
                          {...field}
                          placeholder="Ex.: nexus123"
                          type="password"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar Senha</FormLabel>
                      <FormControl className="w-[16rem]">
                        <Input
                          {...field}
                          placeholder="Ex.: nexus123"
                          type="password"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Button className="cursor-pointer mt-5 bg-[var(--primary-color)] w-full">
                Salvar
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
