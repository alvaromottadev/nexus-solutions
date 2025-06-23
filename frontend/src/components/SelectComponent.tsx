import { useState } from "react";
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
  label: string;
}

export default function SelectComponent({
  data,
  placeholder,
  label,
}: SelectComponentProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  return (
    <>
      <div className="max-w-sm">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="min-w-[12.5rem] justify-between "
            >
              {value
                ? data.find((data) => data.name + data.id === value)?.name
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
                      value={data.name + data.id}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      {data.name}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === data.name + data.id
                            ? "opacity-100"
                            : "opacity-0"
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
