import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { ReactNode } from "react";

interface CGThemeProviderProps {
  children: ReactNode;
}

export default function CGThemeProvider({ children }: CGThemeProviderProps) {


  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      {children}
    </StyledEngineProvider>
  );
}
