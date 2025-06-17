import LoginHeader from "../../components/Login/LoginHeader";
import LoginBody from "../../components/Login/LoginBody";

export default function LoginSection() {
  return (
    <div className="bg-[var(--background-color)] min-h-screen">
      <LoginHeader />
      <LoginBody />
    </div>
  );
}
