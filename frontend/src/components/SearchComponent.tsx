
import { Search } from "lucide-react";
import CustomText from "./CustomText";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

interface SearchComponentProps {
  label: string;
  placeholder: string;
  handleSearch: () => void;
  setName: (name: string) => void;
  inputDisabled?: boolean;
  value?: string;
}

export default function SearchComponent({
  label,
  placeholder,
  handleSearch,
  setName,
  inputDisabled = false,
  value = ""
}: SearchComponentProps) {

  const [defaultValue, setDefaultValue] = useState<string>(value);

  return (
    <>
      <CustomText className="text-[var(--primary-color)] text-[2rem] md:text-[2.5rem] font-bold">
        {label}
      </CustomText>
      <div className="w-[90%] flex gap-x-3 items-center justify-center">
        <Input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          onChange={(e) => {
            setDefaultValue(e);
            setName(defaultValue);
          }}
          placeholder={placeholder}
          className="h-[2.5rem] w-[80%] text-black font-poppins placeholder:font-poppins"
          disabled={inputDisabled}
          value={value}
        />
        <Button
          className="h-[2.5rem] w-[2.5rem] bg-transparent shadow-none hover:bg-transparent cursor-pointer"
          onClick={handleSearch}
        >
          <Search color="purple" size={32} />
        </Button>
      </div>
    </>
  );
}
