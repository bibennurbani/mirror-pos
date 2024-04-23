import { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Checkbox, FormHelperText, FormControlLabel, FormControlLabelProps } from '@mui/material';

interface CGCheckboxProps extends Omit<FormControlLabelProps, 'control'> {
  name: string;
  helperText?: React.ReactNode; // Use React.ReactNode for nodes
}

const RHFCheckbox: FC<CGCheckboxProps> = ({ name, helperText, ...other }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <FormControlLabel control={<Checkbox {...field} checked={field.value} />} {...other} />
          {(!!error || helperText) && <FormHelperText error={!!error}>{error ? error.message : helperText}</FormHelperText>}
        </div>
      )}
    />
  );
};

export default RHFCheckbox;
