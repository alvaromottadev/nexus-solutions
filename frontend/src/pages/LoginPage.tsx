import LoginHeader from "../components/Login/LoginHeader";
import LoginBody from "../components/Login/LoginBody";
import LoginForm from "@/components/Login/LoginForm";

export default function LoginPage() {
  return (
    <div className="bg-[var(--background-color)]">
      <LoginHeader />
      <LoginBody />
      <LoginForm />
    </div>
  );
}
