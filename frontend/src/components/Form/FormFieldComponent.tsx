import type { Control, FieldValues } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface FormFieldComponentProps {
  control: Control<FieldValues, any, FieldValues>;
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
}

export default function FormFieldComponent({
  control,
  name,
  label,
  placeholder = "",
  description = "",
}: FormFieldComponentProps) {
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                className="font-poppins placeholder:font-poppins"
                placeholder={placeholder}
              />
            </FormControl>
            <FormDescription>{description}</FormDescription>
          </FormItem>
        )}
      />
    </>
  );
}
