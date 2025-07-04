import CustomText from "@/components/CustomText";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { toast } from "sonner";

export default function ProfilePage() {
  const auth = useAuth();

  const name = auth?.user?.name;
  const email = auth?.user?.email || "Email não disponível";
  const type = auth?.user?.type;

  const isCompany = auth?.user && auth.user.type === "COMPANY";
  const [isDisabled, setIsDisabled] = useState(true);

  function toggleEdit() {
    if (isDisabled) {
      setIsDisabled(false);
      return;
    }
    toast.success("Dados atualizados com sucesso!");
    setIsDisabled(true);
  }

  function handleLogout() {
    auth?.logout();
    toast.success("Logout realizado com sucesso!");
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-[#f9f9f9] h-[40rem] w-[30rem] rounded-[1rem] flex flex-col items-center justify-center">
            <CustomText className="font-bold text-[var(--primary-color)] text-md md:text-lg lg:text-xl ">
              {isCompany ? "Perfil da Empresa" : "Perfil do Funcionário"}
            </CustomText>
            <div className="flex flex-col gap-y-2 mt-10">
              <div className="flex items-center gap-x-2 justify-between">
                <CustomText>Nome: </CustomText>
                <Input disabled={isDisabled} value={name} />
              </div>
              <div className="flex items-center gap-x-2 justify-between">
                <CustomText>Email: </CustomText>
                <Input disabled value={email} />
              </div>
              <div className="flex items-center gap-x-2 justify-between">
                <CustomText>Senha: </CustomText>
                <Input
                  disabled={isDisabled}
                  type="password"
                  placeholder="*********"
                />
              </div>
              <Button className="mt-4">Ver dados do endereço</Button>
              <Button
                className={`${
                  isDisabled
                    ? "bg-[var(--primary-color)] hover:bg-[#f9f9f9] hover:text-[var(--primary-color)] hover:border-[1px] hover:border-[var(--primary-color)]"
                    : "bg-[#f9f9f9] border-[1px] border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white"
                } cursor-pointer mt-5`}
                onClick={toggleEdit}
              >
                {isDisabled ? "Editar Perfil" : "Salvar Alterações"}
              </Button>
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="cursor-pointer"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
