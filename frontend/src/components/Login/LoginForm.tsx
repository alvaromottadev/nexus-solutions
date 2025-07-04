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

export default function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const auth = useAuth();

  const navigation = useNavigate();

  function handleRegister() {
    navigation("/register");
  }

  function handleSubmit(data: z.infer<typeof loginSchema>) {
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
      });
  }

  return (
    <div className="mt-[5rem] lg:mt-[5rem] flex justify-center">
      <div className="w-[20rem] lg:w-[25rem]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[1rem] font-poppins">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#3d3a50] text-white placeholder:text-[1rem] placeholder:text-[rgba(255,255,255,0.5)] font-poppins h-[4rem]"
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
                  <FormLabel className="text-[1rem] font-poppins">
                    Senha
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="bg-[#3d3a50] text-white placeholder:text-[1rem] placeholder:text-[rgba(255,255,255,0.5)] font-poppins h-[4rem]"
                      placeholder="Ex.: nexus123"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex justify-end font-poppins">
              <label>
                Esqueceu a senha?{" "}
                <label className="cursor-pointer text-[#f472b6]">
                  Clique aqui!
                </label>
              </label>
            </div>
            <Button
              type="submit"
              className="cursor-pointer w-full h-[4rem] mt-[0.25rem] bg-white text-[var(--primary-color)] font-poppins font-bold hover:bg-[var(--primary-color)] hover:text-white transition-colors duration-300"
            >
              Login
            </Button>
          </form>
        </Form>
        <div className="w-full flex justify-center mt-[0.25rem] font-poppins">
          <label>
            Não possui uma conta?{" "}
            <label
              onClick={handleRegister}
              className="text-[#f472b6] cursor-pointer"
            >
              Cadastre-se!
            </label>
          </label>
        </div>
      </div>
    </div>
  );
}
