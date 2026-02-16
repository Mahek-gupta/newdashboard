import { createContext, useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const ThemeContextProvider = ({ children }) => {
  // LocalStorage se purani preference uthayein
  const [mode, setMode] = useState(localStorage.getItem("themeMode") || "light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("themeMode", newMode);
          return newMode;
        });
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#3f4956" },
          background: {
            default: mode === "light" ? "#f9fafb" : "#111827",
            paper: mode === "light" ? "#ffffff" : "#1f2937",
          },
        },
        typography: {
          fontFamily: "Inter, Arial, sans-serif",
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: { borderRadius: 8 },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Ye background color ko automatically handle karta hai */}
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
