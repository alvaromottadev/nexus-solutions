import CustomText from "@/components/CustomText";
import TypewriterBlock from "@/components/TypewriterBlock";
import { Typewriter } from "react-simple-typewriter";

interface OracleTextProps {
  header: string;
  content: string;
}

export default function OracleText({ header, content }: OracleTextProps) {
  return (
    <>
      <div className="flex flex-col text-white font-poppins">
        <TypewriterBlock header={header} content={content} />
      </div>
    </>
  );
}
