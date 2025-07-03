import { Typewriter } from "react-simple-typewriter";
import CustomText from "./CustomText";
import { useEffect, useState } from "react";

interface TypewriterBlockProps {
  header: string;
  content: string;
}

export default function TypewriterBlock({
  header,
  content,
}: TypewriterBlockProps) {
  const typeSpeed = 20;

  const [isHeaderCompleted, setIsHeaderCompleted] = useState<boolean>(false);

  useEffect(() => {
    const totalTime = typeSpeed * header.length + 200;
    setTimeout(() => {
      setIsHeaderCompleted(true);
    }, totalTime);
  }, []);
  return (
    <>
      <CustomText>
        <Typewriter
          words={[header]}
          loop={0}
          typeSpeed={typeSpeed}
          deleteSpeed={0}
          delaySpeed={999999}
        />
      </CustomText>
      <CustomText>
        {isHeaderCompleted && (
          <Typewriter
            words={[content]}
            loop={0}
            typeSpeed={typeSpeed}
            deleteSpeed={0}
            delaySpeed={999999}
          />
        )}
      </CustomText>
    </>
  );
}
