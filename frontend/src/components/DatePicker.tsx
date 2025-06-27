import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface DatePickerProps {
  onChange: (date: Date | undefined) => void;
  date: Date | undefined;
  isError?: boolean;
  setError?: (value: boolean) => void;
}

export default function DatePickerComponent({
  date,
  onChange,
  isError = false,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className={`w-48 justify-between font-normal ${
              isError ? "border-red-500 text-red-500" : ""
            }`}
          >
            {date ? date.toLocaleDateString() : "Selecione uma data"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
