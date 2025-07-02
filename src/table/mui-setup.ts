import { createTheme, Direction } from "@mui/material/styles";

export default function muiSetup(direction: Direction | undefined) {
  return createTheme({  direction });
}
