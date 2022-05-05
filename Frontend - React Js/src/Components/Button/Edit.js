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

export default function Edit(props) {
  const { select, setSnackopen, setStatus, setRefresh, refresh, setSelect } = props;
  const [open, setOpen] = useState(false);
  const [newData, setNewData] = useState({
    invoice_currency: "",
    cust_payment_terms: "",
  });

  let name, value;

  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setNewData({ ...newData, [name]: value });
  };

  const handleClickOpen = async(e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8080/JDBC/updateView",
      queryString.stringify({
        sl_no: select.toString(),
      })  
    ).then(res => {
      setNewData({
        invoice_currency: res.data[0].InvoiceCurrency,
        cust_payment_terms: res.data[0].CustPaymentTerms,
      })
      setOpen(true);
    });
  };

  const handleClose = () => {
    setOpen(false);
    setNewData({
      ...newData,
      invoice_currency: "",
      cust_payment_terms: "",
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const { invoice_currency, cust_payment_terms } = newData;
    await axios
      .post(
        "http://localhost:8080/JDBC/edit",
        queryString.stringify({
          invoice_currency,
          cust_payment_terms,
          sl_no: select.toString(),
        })
      )
      .then((res) => {
        setStatus(res.data);
        setOpen(false);
        setSnackopen(true);
        setNewData({
          ...newData,
          invoice_currency: "",
          cust_payment_terms: "",
        });
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
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        fullWidth
        disabled={select.length === 1 ? false : true}
      >
        EDIT
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
        <DialogTitle style={{backgroundColor:"#2A3E4C", color:"white" }}>Edit</DialogTitle>
        <DialogContent style={{ paddingTop: 10, backgroundColor:"#2A3E4C" }}>
          <DialogContentText component={'div'}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12} md={6}>
                <TextField
                  label="Invoice Currency"
                  variant="filled"
                  fullWidth
                  name="invoice_currency"
                  value={newData.invoice_currency}
                  onChange={handleChange}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Cust Payment Terms"
                  variant="filled"
                  fullWidth
                  name="cust_payment_terms"
                  value={newData.cust_payment_terms}
                  onChange={handleChange}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{backgroundColor:"#2A3E4C"}}>
          <Tooltip title="You have to filled all the Information">
            <span style={{width:"100%", marginRight:10}}>
              <Button
                onClick={handleEdit}
                fullWidth
                variant="outline"
                style={{border:"1px solid white"}}
                disabled={
                  newData.invoice_currency === "" ||
                  newData.cust_payment_terms === ""
                    ? true
                    : false
                }
              >
                EDIT
              </Button>
            </span>
          </Tooltip>
          <Button onClick={handleClose} autoFocus fullWidth variant="outline" style={{border:"1px solid white"}}>
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
