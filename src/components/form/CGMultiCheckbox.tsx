import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, FormHelperText } from '@mui/material';
import { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

interface CGMultiCheckboxProps {
  row?: boolean;
  name: string;
  label?: string;
  options: { label: string; value: string }[]; // Assuming options structure
  spacing?: number;
  helperText?: React.ReactNode;
}

const CGMultiCheckbox: FC<CGMultiCheckboxProps> = ({ row, name, label, options, spacing, helperText, ...other }) => {
  const { control } = useFormContext();

  const getSelected = (selectedItems: string[], item: string): string[] =>
    selectedItems.includes(item) ? selectedItems.filter((value) => value !== item) : [...selectedItems, item];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component='fieldset'>
          {label && (
            <FormLabel component='legend' sx={{ typography: 'body2' }}>
              {label}
            </FormLabel>
          )}
          <FormGroup
            sx={{
              ...(row && {
                flexDirection: 'row',
              }),
              '& .MuiFormControlLabel-root': {
                '&:not(:last-of-type)': {
                  mb: spacing || 0,
                },
                ...(row && {
                  mr: 0,
                  '&:not(:last-of-type)': {
                    mr: spacing || 2,
                  },
                }),
              },
            }}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    checked={field.value.includes(option.value)}
                    onChange={() => field.onChange(getSelected(field.value || [], option.value))}
                  />
                }
                label={option.label}
                {...other}
              />
            ))}
          </FormGroup>
          {(!!error || helperText) && (
            <FormHelperText error={!!error} sx={{ mx: 0 }}>
              {error ? error.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default CGMultiCheckbox;
