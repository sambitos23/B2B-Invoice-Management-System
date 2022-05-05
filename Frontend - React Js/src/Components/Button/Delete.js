import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const queryString = require('query-string');

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
          "&.Mui-disabled": {
            color: "white",
            opacity: 0.7,
            border: "none"
          },
          "&:hover": {
            backgroundColor:"#14AFF1",
            border: "2px solid #7FCEF1",
          }
        }
      }
    } 
  }
});

export default function Delete(props) {
  const { select, setSnackopen, setStatus, setRefresh, refresh, setSelect } = props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:8080/JDBC/deleteMany",
      queryString.stringify({
        sl_no : select.toString(),
      }),
    )    
    .then((res) => {
      setStatus(res.data);
      setOpen(false);
      setSnackopen(true);
      setRefresh(refresh+1);
      setSelect([]);
    })
    .catch((err) => {
      setSnackopen(true);
      setStatus(err);
      setOpen(false);
      setRefresh(refresh+1);
      setSelect([]);
    });
  };


  return (
    <ThemeProvider theme={theme}>
      <Button variant="outlined" onClick={handleClickOpen} fullWidth disabled={select.length !== 0 ? false : true}>
       DELETE
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle style={{backgroundColor:"#2A3E4C", color:"white" }}> Delete </DialogTitle>
        <DialogContent  style={{ paddingTop: 10, backgroundColor:"#2A3E4C" }}>
          <DialogContentText component={'div'} style={{color:"white"}}>
            Are you sure you want to delete this record[s]?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{backgroundColor:"#2A3E4C"}}>
          <Button onClick={handleClose} autoFocus fullWidth variant="outline" style={{border:"1px solid white"}}>
            CANCEL
          </Button>
          <Button onClick={handleDelete} fullWidth variant="outline" style={{border:"1px solid white", marginRight:10}}>
           DELETE
          </Button>          
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
