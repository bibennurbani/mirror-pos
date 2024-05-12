import { useFormContext, Controller } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

interface CGTextFieldProps extends Omit<TextFieldProps, 'name' | 'defaultValue'> {
  name: string;
  helperText?: string;
}

const CGTextField: React.FC<CGTextFieldProps> = ({ name, helperText, ...other }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <TextField
          {...field}
          inputRef={ref}
          fullWidth
          value={field.value ?? ''}
          error={Boolean(error)}
          helperText={error?.message || helperText}
          {...other}
        />
      )}
    />
  );
}

export default CGTextField;
