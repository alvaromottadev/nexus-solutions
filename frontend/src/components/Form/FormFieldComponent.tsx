import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import Required from "../Required";

interface FormFieldComponentProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  isRequired?: boolean;
  type?: string;
}

export default function FormFieldComponent({
  control,
  name,
  label,
  placeholder = "",
  description = "",
  isRequired = false,
  type = "text",
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
                type={type}
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
