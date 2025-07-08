import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import registerSchema from "@/schemas/registerSchema";

interface RegisterFormStepOneProps {
  setStep: (value: number) => void;
  setDataFormOne: (value: z.infer<typeof registerSchema>) => void;
  dataForm: z.infer<typeof registerSchema> | null;
}

export default function RegisterFormStepOne({
  setStep,
  setDataFormOne,
  dataForm,
}: RegisterFormStepOneProps) {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: dataForm?.name || "",
      email: dataForm?.email || "",
      cnpj: dataForm?.cnpj || "",
      password: dataForm?.password || "",
      confirmPassword: dataForm?.confirmPassword || "",
    },
  });

  const navigation = useNavigate();

  function handleLogin() {
    navigation("/login");
  }

  function handleSubmit(data: z.infer<typeof registerSchema>) {
    if (data.password !== data.confirmPassword) {
      toast.error("As senhas não coincidem", {
        description: "Por favor, verifique os campos de senha.",
      });
      return;
    }
    setDataFormOne(data);
    setStep(2);
  }

  return (
    <div className="mt-[1rem] p-[0.5rem] lg:mt-[5rem] flex justify-center">
      <div className="w-[20rem] lg:w-[25rem]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex flex-col gap-y-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[1rem] font-poppins">
                      Nome
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-[#3d3a50] text-white placeholder:text-[1rem] placeholder:text-[rgba(255,255,255,0.5)] font-poppins h-[4rem]"
                        placeholder="Ex.: Nexus Enterprise"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[1rem] font-poppins">
                      CNPJ
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-[#3d3a50] text-white placeholder:text-[1rem] placeholder:text-[rgba(255,255,255,0.5)] font-poppins h-[4rem]"
                        placeholder="Ex.: 12345678901234"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[1rem] font-poppins">
                      Confirme a senha
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="bg-[#3d3a50] text-white placeholder:text-[1rem] placeholder:text-[rgba(255,255,255,0.5)] font-poppins h-[4rem]"
                        placeholder="Ex.: nexus123"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="cursor-pointer w-full h-[4rem] mt-[0.25rem] bg-white text-[var(--primary-color)] font-poppins font-bold hover:bg-[var(--primary-color)] hover:text-white transition-colors duration-300"
              >
                Próxima Etapa
              </Button>
            </div>
          </form>
        </Form>
        <div className="w-full flex justify-center mt-[0.25rem] font-poppins">
          <label>
            Já possui uma conta?{" "}
            <label
              onClick={handleLogin}
              className="text-[#f472b6] cursor-pointer"
            >
              Faça login!
            </label>
          </label>
        </div>
      </div>
    </div>
  );
}
