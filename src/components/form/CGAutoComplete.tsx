import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Autocomplete, TextField, AutocompleteProps } from '@mui/material';

// Define the type for an option in the autocomplete component
interface OptionType {
  label: string;
  value: unknown;
}

// Use the OptionType for the T parameter and set other parameters as needed
interface CGAutocompleteProps extends Omit<AutocompleteProps<OptionType, false, false, false>, 'renderInput' | 'name' | 'defaultValue'> {
  name: string;
  label?: string;
  helperText?: React.ReactNode;
}

const CGAutocomplete: React.FC<CGAutocompleteProps> = ({ name, label, helperText, ...other }) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          onChange={(_, newValue) => setValue(name, newValue, { shouldValidate: true })}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!error}
              helperText={error ? error.message : helperText}
            />
          )}
          {...other}
        />
      )}
    />
  );
}

export default CGAutocomplete;
