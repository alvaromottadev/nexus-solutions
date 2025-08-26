
import { Input } from "./ui/input";

interface SearchComponentToolProps {
  placeholder: string;
  handleSearch: () => void;
  setValue: (name: string) => void;
  inputDisabled?: boolean;
  value: string;
}

export default function SearchComponentTool({
  placeholder,
  handleSearch,
  setValue,
  inputDisabled = false,
  value
}: SearchComponentToolProps) {
  return (
    <>
      <div className="w-[90%] flex gap-x-3 items-center justify-center">
        <Input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="h-[2.5rem] w-[80%] text-black font-poppins placeholder:font-poppins"
          disabled={inputDisabled}
          value={value}
        />
      </div>
    </>
  );
}
