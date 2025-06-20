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
import Required from "../Required";

interface FormFieldComponentProps {
  control: Control<FieldValues, any, FieldValues>;
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  isRequired?: boolean;
}

export default function FormFieldComponent({
  control,
  name,
  label,
  placeholder = "",
  description = "",
  isRequired = false,
}: FormFieldComponentProps) {
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {label}
              {isRequired && <Required />}
            </FormLabel>
            <FormControl>
              <Input
                autoComplete="off"
                className="font-poppins placeholder:font-poppins"
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
            <FormDescription>{description}</FormDescription>
          </FormItem>
        )}
      />
    </>
  );
}
