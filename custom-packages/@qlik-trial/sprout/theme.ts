// mock/sprout/theme.ts
import { createTheme } from "@mui/material/styles";

export const COLORS = {
  primary: '#1976d2',
  secondary: '#dc004e',
  background: '#f5f5f5',
  text: '#333',
  black: '#000000',
  GREYSCALE_100: '#000000',
  white: '#ffffff'
};
// console.log("Theme create...");

import { ThemeOptions } from "@mui/material/styles";

export function createV5ThemeOptions(): ThemeOptions {
  return {
    palette: {
      action: {
        hover: "rgba(0, 0, 0, 0.04)", // ✅ это MUI default
      },
      primary: {
        main: "#009845",
        contrastText: "#ffffff",
        dark: "#007233",
        light: "#4CB36B"
      },
      secondary: {
        main: "#1d1d1d",
        contrastText: "#ffffff",
        dark: "#000000",
        light: "#444444"
      },
      background: {
        default: "#ffffff",
        paper: "#f5f5f5"
      },
      text: {
        primary: "#1d1d1d",
        secondary: "#666666",
        disabled: "#aaaaaa"
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: 14
    },
    components: {
      MuiTable: {
        styleOverrides: {
          root: {}, // 🔧 даже если не нужен — он ожидается кодом
        }
      }
    }
  };
}
