import type { Control, FieldValues, Path } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface IFormTextFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: "input" | "textarea" | "date";
    rows?: number;
}

const FormTextField = <T extends FieldValues,>({
    control,
    name,
    label,
    placeholder,
    type = "input",
    rows = 3,
}: IFormTextFieldProps<T>) => (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    {type === "textarea" ? (
                        <textarea
                            rows={rows}
                            placeholder={placeholder}
                            className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                            {...field}
                        />
                    ) : (
                        <Input
                            type={type}
                            placeholder={placeholder}
                            className="rounded-xl"
                            {...field}
                        />
                    )}
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
);

export default FormTextField;
