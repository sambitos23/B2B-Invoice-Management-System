import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Grid,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const queryString = require("query-string");

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
          borderRadius: "6px",
          borderTopLeftRadius: "0px",
          borderBottomLeftRadius: "0px",
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
    },
    MuiFilledInput: {
      styleOverrides: {
        input: {
          backgroundColor: "white",
          borderRadius: "5px",
          "&:after":{
            borderBottom: "2px solid white",
            backgroundColor: "white",
            color:"white"
          }
        }  
      }
    }  
  }
});

export default function AdvanceSearch(props) {
  const { setSearchedData, setSnackopen, setStatus } = props;
  const [open, setOpen] = useState(false);
  const [newData, setNewData] = useState({
    doc_id: "",
    cust_number: "",
    invoice_id: "",
    buisness_year: "",
  });

  let name, value;

  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setNewData({ ...newData, [name]: value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewData({
      ...newData,
      doc_id: "",
      cust_number: "",
      invoice_id: "",
      buisness_year: "",
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const { doc_id, cust_number, invoice_id, buisness_year } = newData;
    await axios
      .post(
        "http://localhost:8080/JDBC/advanceSearch",
        queryString.stringify({
          doc_id,
          cust_number,
          invoice_id,
          buisness_year,
        })
      )
      .then((res) => {
        res.data.length > 0
          ? setStatus("Data Fetched Successfully")
          : setStatus("No data Found");
        setSearchedData(res.data);
        setOpen(false);
        setSnackopen(true);
        setNewData({
          ...newData,
          doc_id: "",
          cust_number: "",
          invoice_id: "",
          buisness_year: "",
        });
      })
      .catch((err) => {
        setSnackopen(true);
        setStatus(err);
        setOpen(false);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        fullWidth
      >
        ADVANCE SEARCH
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm">
        <DialogTitle style={{backgroundColor:"#2A3E4C", color:"white" }}>Advance Search</DialogTitle>
        <DialogContent style={{ paddingTop: 10, backgroundColor:"#2A3E4C" }}>
          <DialogContentText component={'div'}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={{ xs: 2, md: 5 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12} md={6}>
                <TextField
                  label="Document Id"
                  variant="filled"
                  fullWidth
                  name="doc_id"
                  value={newData.doc_id}
                  onChange={handleChange}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Customer Number"
                  variant="filled"
                  fullWidth
                  name="cust_number"
                  value={newData.cust_number}
                  onChange={handleChange}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Invoice Id"
                  variant="filled"
                  fullWidth
                  name="invoice_id"
                  value={newData.invoice_id}
                  onChange={handleChange}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Business Year"
                  variant="filled"
                  fullWidth
                  name="buisness_year"
                  value={newData.buisness_year}
                  onChange={handleChange}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions  style={{backgroundColor:"#2A3E4C"}}>
          <Tooltip title="You have to filled all the Information">
            <span style={{width:"100%"}}>
              <Button
                onClick={handleSearch}
                fullWidth
                variant="outline"
                style={{border:"1px solid white", borderRadius:5}}
                disabled={
                  newData.doc_id === "" ||
                  newData.cust_number === "" ||
                  newData.invoice_id === "" ||
                  newData.buisness_year === ""
                    ? true
                    : false
                }
              >
                SEARCH
              </Button>
            </span>
          </Tooltip>
          <Button onClick={handleClose} autoFocus fullWidth variant="outline" style={{border:"1px solid white", marginLeft:10, borderRadius:5}}>
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
