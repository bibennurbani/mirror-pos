import { useFormContext, Controller } from "react-hook-form";
import {
  Switch,
  FormControlLabel,
  FormHelperText,
  FormControlLabelProps,
} from "@mui/material";

interface CGSwitchProps extends Omit<FormControlLabelProps, 'control'> {
  name: string;
  helperText?: string;
}

const CGSwitch: React.FC<CGSwitchProps> = ({ name, helperText, ...other }) => {
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

export default CGSwitch;
