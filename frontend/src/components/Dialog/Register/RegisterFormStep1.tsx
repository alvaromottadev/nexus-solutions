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
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-gray-900">
                    Nome da Empresa
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-11 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 font-medium rounded-xl focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-200"
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
                  <FormLabel className="text-base font-semibold text-gray-900">
                    CNPJ
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-11 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 font-medium rounded-xl focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-200"
                      placeholder="Ex.: 12345678901234"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold text-gray-900">
                  Confirme a senha
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="h-11 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 font-medium rounded-xl focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-200"
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
            className="w-full h-11 bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 mt-6"
          >
            Próxima Etapa
          </Button>
        </form>
      </Form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Já possui uma conta?{" "}
          <button
            onClick={handleLogin}
            className="text-[var(--primary-color)] hover:text-[var(--primary-color)]/80 font-medium transition-colors duration-200"
          >
            Faça login!
          </button>
        </p>
      </div>
    </div>
  );
}
