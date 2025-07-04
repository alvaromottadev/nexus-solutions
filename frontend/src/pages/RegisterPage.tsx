import CustomText from "@/components/CustomText";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const form = useForm();

  return (
    <>
      <div className="p-5 flex items-center justify-center min-h-screen bg-[var(--primary-color)]">
        <div className="p-5 flex flex-col items-center lg:items-center justify-center w-[25rem] lg:w-[50rem] min-h-[40rem] bg-[var(--background-color)] rounded-[1rem] shadow">
          <div className="flex flex-col">
            <CustomText className="text-[1.5rem] font-bold text-[var(--primary-color)]">
              Nexus Solutions
            </CustomText>
            <CustomText>Seja bem-vindo a Nexus!</CustomText>
          </div>
          <div className="mt-[2rem] w-full flex flex-col lg:grid lg:grid-cols-2 justify-center">
            <Form {...form}>
              <div className="flex flex-col items-center">
                <CustomText className="">Informações Pessoais</CustomText>
                <FormField
                  control={form.control}
                  name="Email"
                  render={(field) => (
                    <FormItem>
                      <FormLabel className="text-[1rem] font-poppins">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          className="w-[20rem] bg-[var(--color-gray)] text-white placeholder:text-[1rem] placeholder:text-[rgba(255,255,255,0.5)] font-poppins h-[4rem]"
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
                  render={(field) => (
                    <FormItem>
                      <FormLabel className="text-[1rem] font-poppins">
                        Senha
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="w-[20rem] bg-[var(--color-gray)] text-white placeholder:text-[1rem] placeholder:text-[rgba(255,255,255,0.5)] font-poppins h-[4rem]"
                          placeholder="Ex.: nexus123"
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
                  name="name"
                  render={(field) => (
                    <FormItem>
                      <FormLabel className="text-[1rem] font-poppins">
                        Nome
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="w-[20rem] bg-[var(--color-gray)] text-white placeholder:text-[1rem] placeholder:text-[rgba(255,255,255,0.5)] font-poppins h-[4rem]"
                          placeholder="Ex.: nexus123"
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
                  name="cnpj"
                  render={(field) => (
                    <FormItem>
                      <FormLabel className="text-[1rem] font-poppins">
                        CNPJ
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-[20rem] bg-[var(--color-gray)] text-white placeholder:text-[1rem] placeholder:text-[rgba(255,255,255,0.5)] font-poppins h-[4rem]"
                          placeholder="Ex.: nexus123"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col items-center">
                <CustomText>Informações sobre Endereço</CustomText>
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={(field) => (
                    <FormItem>
                      <FormLabel className="text-[1rem] font-poppins">
                        CEP
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-[20rem] bg-[var(--color-gray)] text-white placeholder:text-[1rem] placeholder:text-[rgba(255,255,255,0.5)] font-poppins h-[4rem]"
                          placeholder="Ex.: 12345-678"
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
                  name="street"
                  render={(field) => (
                    <FormItem>
                      <FormLabel className="text-[1rem] font-poppins">
                        Rua
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-[20rem] bg-[var(--color-gray)] text-white placeholder:text-[1rem] placeholder:text-[rgba(255,255,255,0.5)] font-poppins h-[4rem]"
                          placeholder="Ex.: Rua Nexus"
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
                  name="number"
                  render={(field) => (
                    <FormItem>
                      <FormLabel className="text-[1rem] font-poppins">
                        Número
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-[20rem] bg-[var(--color-gray)] text-white placeholder:text-[1rem] placeholder:text-[rgba(255,255,255,0.5)] font-poppins h-[4rem]"
                          placeholder="Ex.: 123"
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
                  name="complement"
                  render={(field) => (
                    <FormItem>
                      <FormLabel className="text-[1rem] font-poppins">
                        Complemento
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-[20rem] bg-[var(--color-gray)] text-white placeholder:text-[1rem] placeholder:text-[rgba(255,255,255,0.5)] font-poppins h-[4rem]"
                          placeholder="Ex.: nexus123"
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
                  name="district"
                  render={(field) => (
                    <FormItem>
                      <FormLabel className="text-[1rem] font-poppins">
                        Bairro
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-[20rem] bg-[var(--color-gray)] text-white placeholder:text-[1rem] placeholder:text-[rgba(255,255,255,0.5)] font-poppins h-[4rem]"
                          placeholder="Ex.: Nexus"
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
                  name="city"
                  render={(field) => (
                    <FormItem>
                      <FormLabel className="text-[1rem] font-poppins">
                        Cidade
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-[20rem] bg-[var(--color-gray)] text-white placeholder:text-[1rem] placeholder:text-[rgba(255,255,255,0.5)] font-poppins h-[4rem]"
                          placeholder="Ex.: Nexus City"
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
                  name="state"
                  render={(field) => (
                    <FormItem>
                      <FormLabel className="text-[1rem] font-poppins">
                        Estado
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-[20rem] bg-[var(--color-gray)] text-white placeholder:text-[1rem] placeholder:text-[rgba(255,255,255,0.5)] font-poppins h-[4rem]"
                          placeholder="Ex.: São Paulo"
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
                  name="country"
                  render={(field) => (
                    <FormItem>
                      <FormLabel className="text-[1rem] font-poppins">
                        Pais
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-[20rem] bg-[var(--color-gray)] text-white placeholder:text-[1rem] placeholder:text-[rgba(255,255,255,0.5)] font-poppins h-[4rem]"
                          placeholder="Ex.: Brasil"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Form>
          </div>
          <Button className="w-full h-[3rem] bg-[var(--primary-color)] mt-[2rem] font-poppins cursor-pointer">
            Cadastrar
          </Button>
        </div>
      </div>
    </>
  );
}
