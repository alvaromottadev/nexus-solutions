import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import loginSchema from "@/schemas/loginSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { toast } from "sonner";
import api from "@/client/api-client";
import { useAuth } from "@/hooks/useAuth";
import ForgotPasswordDialog from "../Dialog/ForgotPassword/ForgotPassword";
import CustomText from "../CustomText";
import { useState } from "react";

export default function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [buttonPressed, setButtonPressed] = useState<boolean>(false);

  const auth = useAuth();

  const navigation = useNavigate();

  function handleSubmit(data: z.infer<typeof loginSchema>) {
    setButtonPressed(true);
    api
      .post(`/auth/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.success("Login realizado com sucesso!", {
          description: "Redirecionando para a página inicial.",
          duration: 2000,
        });
        auth?.login(res.data.token);
        setTimeout(() => {
          navigation("/home");
        }, 2000);
      })
      .catch(() => {
        setButtonPressed(false);
      });
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-gray-900">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-11 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 font-medium rounded-xl focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-200"
                    placeholder="Ex.: nexus@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-gray-900">
                  Senha
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="h-11 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 font-medium rounded-xl focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-200"
                    placeholder="Ex.: nexus123"
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex justify-end">
            <CustomText className="text-sm text-gray-600">
              Esqueceu a senha?{" "}
              <ForgotPasswordDialog>
                <label className="cursor-pointer text-[var(--primary-color)] hover:text-[var(--primary-color)]/80 font-medium transition-colors duration-200">
                  Clique aqui!
                </label>
              </ForgotPasswordDialog>
            </CustomText>
          </div>

          <Button
            disabled={buttonPressed}
            type="submit"
            className="w-full h-11 bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {buttonPressed ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
