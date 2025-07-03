import { Typewriter } from "react-simple-typewriter";
import CustomText from "./CustomText";

interface TypewriterProps {
  content: string;
}

export default function TypewriterComponent({ content }: TypewriterProps) {
  return (
    <>
      <CustomText>
        <Typewriter
          words={[content]}
          loop={0}
          typeSpeed={20}
          deleteSpeed={0}
          delaySpeed={999999}
        />
      </CustomText>
    </>
  );
}
