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

export default function LoginForm() {
  const form = useForm();

  return (
    <div className="mt-[5rem] lg:mt-[5rem] flex justify-center">
      <div className="w-[20rem] lg:w-[25rem]">
        <Form {...form}>
          <FormField
            control={form.control}
            name="email"
            render={(field) => (
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
            render={(field) => (
              <FormItem>
                <FormLabel className="text-[1rem] font-poppins">
                  Password
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
          <Button className="cursor-pointer w-full h-[4rem] mt-[0.25rem] bg-[var(--primary-color)]">
            Login
          </Button>
        </Form>
        <div className="w-full flex justify-center mt-[0.25rem] font-poppins">
          <label>
            Não possui uma conta?{" "}
            <label className="text-[var(--primary-color)] cursor-pointer">
              Cadastre-se!
            </label>
          </label>
        </div>
      </div>
    </div>
  );
}
