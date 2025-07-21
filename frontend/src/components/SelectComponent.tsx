import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SelectComponentProps {
  data: any[];
  placeholder: string;
  label?: string;
  onChange: (value: any) => void;
  isError: boolean;
  setError: (value: boolean) => void;
  defaultValue?: string;
  valueType?: "id" | "name" | "object";
  disabled?: boolean;
}

export default function SelectComponent({
  data,
  placeholder,
  label = "recurso",
  onChange,
  isError = false,
  setError,
  defaultValue = "",
  valueType = "id",
  disabled = false,
}: SelectComponentProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(defaultValue ? defaultValue : "");

  useEffect(() => {
    if (defaultValue) {
      onChange(defaultValue);
    }
  });

  return (
    <>
      <div className="max-w-sm">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              disabled={disabled}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={`w-[100%] justify-between ${
                isError ? "border-red-500 text-red-500" : ""
              }`}
            >
              {value
                ? data.find((data) => data.id === value)?.name
                : placeholder}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder={placeholder} className="h-9 " />
              <CommandList>
                <CommandEmpty>Nenhum(a) {label} encontrado(a)</CommandEmpty>
                <CommandGroup>
                  {data.map((data) => (
                    <CommandItem
                      key={data.id}
                      value={data.id}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                        onChange(
                          valueType === "id"
                            ? currentValue
                            : valueType === "name"
                            ? data.name
                            : data
                        );
                        setError(false);
                      }}
                    >
                      {data.name}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === data.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
