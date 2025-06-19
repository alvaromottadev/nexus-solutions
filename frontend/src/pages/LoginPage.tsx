import CustomText from "@/components/CustomText";
import LoginForm from "@/components/Login/LoginForm";

export default function LoginPage() {
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-[var(--primary-color)]">
        <div className="flex flex-col items-center justify-center w-[25rem] lg:w-[30rem] h-[40rem] bg-[var(--background-color)] rounded-[1rem] shadow">
          <CustomText className="text-[1.5rem] font-bold text-[var(--primary-color)]">
            Nexus Solutions
          </CustomText>
          <CustomText>Bem-vindo de volta! 👋</CustomText>
          <LoginForm />
        </div>
      </div>
    </>
  );
}
