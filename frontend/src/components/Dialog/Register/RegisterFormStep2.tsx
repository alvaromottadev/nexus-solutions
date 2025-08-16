import api from "@/client/api-client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../ui/form";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { z } from "zod";
import addressFormSchema from "@/schemas/addressFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type registerSchema from "@/schemas/registerSchema";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

interface RegisterFormStepTwoProps {
  dataFormOne: z.infer<typeof registerSchema>;
  dataFormTwo: z.infer<typeof addressFormSchema> | null;
  setStep: (value: number) => void;
  setDataFormTwo: (value: z.infer<typeof addressFormSchema>) => void;
}

export default function RegisterFormStepTwo({
  dataFormOne,
  setStep,
  dataFormTwo,
  setDataFormTwo,
}: RegisterFormStepTwoProps) {
  const form = useForm<z.infer<typeof addressFormSchema>>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      street: dataFormTwo?.street || "",
      number: dataFormTwo?.number || "",
      complement: dataFormTwo?.complement || "",
      district: dataFormTwo?.district || "",
      city: dataFormTwo?.city || "",
      state: dataFormTwo?.state || "",
      postalCode: dataFormTwo?.postalCode || "",
      country: dataFormTwo?.country || "",
    },
  });

  const navigation = useNavigate();

  function handleLogin() {
    navigation("/login");
  }

  function handleSubmit(data: z.infer<typeof addressFormSchema>) {
    if (!dataFormOne) {
      toast.error("Preencha todos os campos", {
        description: "Por favor, verifique os campos do formulário.",
      });
      return;
    }
    api
      .post(`/auth/register`, {
        user: {
          email: dataFormOne.email,
          password: dataFormOne.password,
          type: "COMPANY",
        },
        company: {
          name: dataFormOne.name,
          cnpj: dataFormOne.cnpj,
          address: {
            street: data.street,
            number: data.number,
            complement: data.complement,
            district: data.district,
            city: data.city,
            state: data.state,
            postalCode: data.postalCode,
            country: data.country,
          },
        },
      })
      .then(() => {
        toast.success("Cadastro realizado com sucesso!", {
          description: "Você já pode fazer login na sua conta.",
          duration: 2000,
        });
        handleLogin();
      });
  }

  function handleBack() {
    setDataFormTwo(form.getValues());
    setStep(1);
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel className="text-base font-semibold text-gray-900">Rua</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-11 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 font-medium rounded-xl focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-200"
                      placeholder="Ex.: Rua das Flores"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-gray-900">Número</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-11 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 font-medium rounded-xl focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-200"
                      placeholder="Ex.: 123"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="complement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-gray-900">Complemento</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-11 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 font-medium rounded-xl focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-200"
                      placeholder="Ex.: Sala 101"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-gray-900">Bairro</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-11 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 font-medium rounded-xl focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-200"
                      placeholder="Ex.: Centro"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-gray-900">Cidade</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-11 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 font-medium rounded-xl focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-200"
                      placeholder="Ex.: São Paulo"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-gray-900">Estado</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-11 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 font-medium rounded-xl focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-200"
                      placeholder="Ex.: SP"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-gray-900">CEP</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-11 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 font-medium rounded-xl focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-200"
                      placeholder="Ex.: 01234-567"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-gray-900">País</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-11 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500 font-medium rounded-xl focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all duration-200"
                      placeholder="Ex.: Brasil"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4 mt-6">
            <Button
              type="button"
              onClick={handleBack}
              variant="outline"
              className="flex-1 h-11 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-xl transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            
            <Button
              type="submit"
              className="flex-1 h-11 bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Finalizar Cadastro
            </Button>
          </div>
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
