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
    <div className="mt-[1rem] p-[0.5rem] lg:mt-[5rem] flex justify-center">
      <div className="w-[20rem] lg:w-[25rem]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex flex-col gap-y-1">
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rua</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-[#3d3a50] text-white placeholder:text-[1rem] placeholder:text-[rgba(255,255,255,0.5)] font-poppins h-[3rem]"
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
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-[#3d3a50] text-white placeholder:text-[1rem] placeholder:text-[rgba(255,255,255,0.5)] font-poppins h-[3rem]"
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
                    <FormLabel>Complemento</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-[#3d3a50] text-white placeholder:text-[1rem] placeholder:text-[rgba(255,255,255,0.5)] font-poppins h-[3rem]"
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
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-[#3d3a50] text-white placeholder:text-[1rem] placeholder:text-[rgba(255,255,255,0.5)] font-poppins h-[3rem]"
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
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-[#3d3a50] text-white placeholder:text-[1rem] placeholder:text-[rgba(255,255,255,0.5)] font-poppins h-[3rem]"
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
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-[#3d3a50] text-white placeholder:text-[1rem] placeholder:text-[rgba(255,255,255,0.5)] font-poppins h-[3rem]"
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
                    <FormLabel>CEP</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-[#3d3a50] text-white placeholder:text-[1rem] placeholder:text-[rgba(255,255,255,0.5)] font-poppins h-[3rem]"
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
                    <FormLabel>País</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-[#3d3a50] text-white placeholder:text-[1rem] placeholder:text-[rgba(255,255,255,0.5)] font-poppins h-[3rem]"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button
              onClick={handleBack}
              className="cursor-pointer w-full h-[2.5rem] mt-[0.5rem] bg-white text-[var(--primary-color)] font-poppins font-bold hover:bg-[var(--primary-color)] hover:text-white transition-colors duration-300"
            >
              Voltar
            </Button>
            <Button
              type="submit"
              className="cursor-pointer w-full h-[3.5rem] mt-[0.5rem] bg-white text-[var(--primary-color)] font-poppins font-bold hover:bg-[var(--primary-color)] hover:text-white transition-colors duration-300"
            >
              Registrar
            </Button>
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
