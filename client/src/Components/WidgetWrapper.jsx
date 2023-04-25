import { Box } from "@mui/material";
import { brown } from "@mui/material/colors";
import { styled } from "@mui/system";

const WidgetWrapper = styled(Box)(() => ({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: "brown",
  borderRadius: "0.75rem",
  width: "auto",
}));

export default WidgetWrapper;
