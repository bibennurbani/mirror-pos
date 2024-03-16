// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import {
  Switch,
  FormControlLabel,
  FormHelperText,
  FormControlLabelProps,
} from "@mui/material";

// ----------------------------------------------------------------------

interface CGSwitchProps extends Omit<FormControlLabelProps, 'control'> {
  name: string;
  helperText?: string;
}

export default function CGSwitch({
  name,
  helperText,
  ...other
}: CGSwitchProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <FormControlLabel
            control={<Switch {...field} checked={field.value} />}
            {...other}
          />

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}
