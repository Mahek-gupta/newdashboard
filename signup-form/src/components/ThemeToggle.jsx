import { useContext } from "react";
import { IconButton, useTheme, Box } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { ColorModeContext } from "../store/ThemeContext";
// import { ColorModeContext } from "../store/ThemeContext";

const ThemeToggle = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.paper",
        color: "text.primary",
        borderRadius: "50%",
        p: 0.5,
        boxShadow: theme.palette.mode === "dark" ? "0 0 15px rgba(255,255,255,0.1)" : "0 4px 12px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "rotate(15deg) scale(1.1)",
        }
      }}
    >
      <IconButton onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === "dark" ? (
          <Brightness7 sx={{ color: "#ffb700" }} /> // Sun Icon
        ) : (
          <Brightness4 sx={{ color: "#5c6bc0" }} /> // Moon Icon
        )}
      </IconButton>
    </Box>
  );
};

export default ThemeToggle;
