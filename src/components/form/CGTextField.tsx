import { useFormContext, Controller } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

interface CGTextFieldProps extends Omit<TextFieldProps, 'name' | 'defaultValue'> {
  name: string;
  helperText?: string;
}

export default function CGTextField({ name, helperText, ...other }: CGTextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          // Ensure the value is never null by providing an empty string as a fallback
          value={field.value === null || field.value === undefined ? '' : field.value}
          error={!!error}
          helperText={error ? error.message : helperText}
          {...other}
        />
      )}
    />
  );
}
