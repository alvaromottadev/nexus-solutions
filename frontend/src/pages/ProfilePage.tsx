import CustomText from "@/components/CustomText";
import ProfileForm from "@/components/ProfilePage/ProfileForm";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export default function ProfilePage() {
  const auth = useAuth();

  const isCompany = auth?.user && auth.user.type === "COMPANY";

  function handleLogout() {
    auth?.logout();
    toast.success("Logout realizado com sucesso!");
  }

  return (
    <>
      {auth?.user && (
        <div className="min-h-screen flex flex-col">
          <TopBar />
          <div className="flex-1 flex items-center justify-center">
            <div className="bg-[#f9f9f9] h-[50rem] w-[90%] md:w-[30rem] p-2 rounded-[1rem] flex flex-col items-center justify-center">
              <CustomText className="font-bold text-[var(--primary-color)] text-md md:text-lg lg:text-xl ">
                {isCompany ? "Perfil da Empresa" : "Perfil do Funcionário"}
              </CustomText>
              <div className="flex flex-col gap-y-2 mt-10">
                <ProfileForm user={auth?.user!} />
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
      )}
    </>
  );
}
