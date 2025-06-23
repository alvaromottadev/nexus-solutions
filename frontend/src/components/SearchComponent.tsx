import { Search } from "lucide-react";
import CustomText from "./CustomText";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface SearchComponentProps {
  label: string;
  placeholder: string;
  handleSearch: () => void;
  setName: (name: string) => void;
}

export default function SearchComponent({
  label,
  placeholder,
  handleSearch,
  setName,
}: SearchComponentProps) {
  return (
    <>
      <CustomText className="text-[var(--primary-color)] text-[2.5rem] font-bold">
        {label}
      </CustomText>
      <div className="w-[90%] flex gap-x-3 items-center justify-center">
        <Input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          onChange={(e) => setName(e.target.value)}
          placeholder={placeholder}
          className="h-[2.5rem] w-[80%] text-black font-poppins placeholder:font-poppins"
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
