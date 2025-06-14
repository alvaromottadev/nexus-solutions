import { AlignJustify } from "lucide-react";

export default function LoginHeader() {
  return (
    <>
      <div className="h-[5rem] flex items-center">
        <div className="ml-3">
          <AlignJustify color="black" size={40} />
        </div>
        <div className="absolute self-center flex justify-center items-center w-full">
          <label className="font-poppins text-[var(--color-gray)] text-[2.5rem]">
            Nexus Solutions
          </label>
        </div>
        <div></div>
      </div>
    </>
  );
}
