import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
} from "@mui/material";
import Chart from "./Chart";
import PieChart from "./PieChart";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          color: "white",
          boxShadow: "none",
          fontSize: "0.8rem",
          border: "2px solid #1F76A4",
          backgroundColor: "#14AFF1",
          "&:hover": {
            backgroundColor: "#14AFF1",
            border: "2px solid #7FCEF1",
          },
        },
      },
    },
  },
});

export default function DialogChart(props) {
  const {open, setOpen, chart} = props;
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth={true}
        onClose={handleClose}
        maxWidth="lg"
      >
        <DialogContent>
          <Chart chart={chart}/>
          <PieChart chart={chart}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} fullWidth>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
