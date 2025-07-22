import { useState } from "react";

export default function useButtonPressed() {
  const [buttonPressed, setButtonPressed] = useState<boolean>(false);

  return { buttonPressed, setButtonPressed };
}
