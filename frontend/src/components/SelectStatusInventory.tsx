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
import { useState, type ChangeEventHandler } from "react";

interface SelectdataInventoryProps {
  onChange: (value: string) => void;
  label: string;
  data: {
    value: string;
    label: string;
  }[];
}

export default function SelectdataInventory({
  onChange,
  label,
  data,
}: SelectdataInventoryProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  return (
    <div className="max-w-sm">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? data.find((data) => data.value === value)?.label
              : `Selecione um(a) ${label}`}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder={`Procure o(a) ${label}`}
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>Nenhum(a) {label} encontrado(a)</CommandEmpty>
              <CommandGroup>
                {data.map((data) => (
                  <CommandItem
                    key={data.value}
                    value={data.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                      onChange(currentValue === value ? "" : currentValue);
                    }}
                  >
                    {data.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === data.value ? "opacity-100" : "opacity-0"
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
  );
}
