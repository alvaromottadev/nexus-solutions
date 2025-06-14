import { AlignJustify } from "lucide-react";

export default function LoginHeader() {
  return (
    <>
      <div className="bg-green-500 h-[5rem] flex items-center">
        <div className="ml-3">
          <AlignJustify color="black" size={40} />
        </div>
        <div className="self-center flex justify-center items-center w-full">
          <label className="font-poppins text-[var(--color-gray)]">
            Nexus Solutions
          </label>
        </div>
        <div></div>
      </div>
    </>
  );
}
