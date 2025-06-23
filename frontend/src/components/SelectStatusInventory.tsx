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
import type { T } from "node_modules/react-router/dist/development/route-data-ByAYLHuM.d.mts";

const status = [
  {
    value: "OK",
    label: "OK",
  },
  {
    value: "LOW",
    label: "LOW",
  },
  {
    value: "OUT OF STOCK",
    label: "OUT OF STOCK",
  },
];

interface SelectStatusInventoryProps {
  onChange: (value: string) => void;
}

export default function SelectStatusInventory({
  onChange,
}: SelectStatusInventoryProps) {
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
              ? status.find((status) => status.value === value)?.label
              : "Selecione um status..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Procure o status..." className="h-9" />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {status.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                      onChange(currentValue === value ? "" : currentValue);
                    }}
                  >
                    {status.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === status.value ? "opacity-100" : "opacity-0"
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
