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
import client from "@/client/http-client";
import { toast } from "sonner";

export default function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigation = useNavigate();

  function handleRegister() {
    navigation("/register");
  }

  async function handleSubmit(data: z.infer<typeof loginSchema>) {
    try {
      const response = await client.post(
        `/auth/login`,
        {},
        JSON.stringify(data)
      );
      const responseData = await response.json();
      if (!response.ok && response.status !== 201) {
        toast.error(responseData.error, {
          description: "Verifique os dados e tente novamente.",
          duration: 5000,
        });
        return;
      }
      toast.success("Login realizado com sucesso!", {
        description: "Redirecionando para a página inicial.",
        duration: 5000,
      });
      localStorage.setItem("token", responseData.token);
      setTimeout(() => {
        navigation("/home");
      }, 2000);
    } catch (error) {
      console.error("Erro na requisição:", error);
      toast.error("Erro de conexão.", {
        description: "Não foi possível conectar ao servidor.",
        duration: 5000,
      });
    }
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
                      className="bg-[var(--color-gray)] text-white placeholder:text-[1rem] placeholder:text-[rgba(255,255,255,0.5)] font-poppins h-[4rem]"
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
                      className="bg-[var(--color-gray)] text-white placeholder:text-[1rem] placeholder:text-[rgba(255,255,255,0.5)] font-poppins h-[4rem]"
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
                <label className="text-[var(--primary-color)]">
                  <label className="cursor-pointer">Clique aqui!</label>
                </label>
              </label>
            </div>
            <Button
              type="submit"
              className="cursor-pointer w-full h-[4rem] mt-[0.25rem] bg-[var(--primary-color)]"
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
              className="text-[var(--primary-color)] cursor-pointer"
            >
              Cadastre-se!
            </label>
          </label>
        </div>
      </div>
    </div>
  );
}
