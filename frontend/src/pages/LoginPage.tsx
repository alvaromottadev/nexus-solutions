import design from "@/assets/design.svg";
import CustomText from "@/components/CustomText";
import LoginForm from "@/components/Login/LoginForm";

export default function LoginPage() {
  return (
    <>
      <div className="h-screen flex items-center w-full justify-center lg:">
        <div className="hidden lg:block w-full h-full">
          <div className="w-full h-full flex items-center justify-center">
            <img src={design} className="hidden lg:block h-[55rem]" />
          </div>
        </div>
        <div className="h-full flex items-center justify-center lg:justify-end">
          <div className="text-white flex flex-col items-center justify-center rounded-[1rem] lg:rounded-none h-[45rem] w-[23rem] md:w-[30rem] bg-[var(--primary-color)] lg:h-full 2xl:w-[40rem]">
            <CustomText className="text-[1.5rem]">Nexus Solutions</CustomText>
            <CustomText>Seja bem-vindo de volta! 👋</CustomText>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}
