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

export default function Add(props) {
  const {setSnackopen, setStatus, setRefresh, refresh, setSelect} = props;
  const [open, setOpen] = useState(false);
  const [newData, setNewData] = useState({
    business_code: "",
    cust_number: "",
    clear_date: "",
    buisness_year: "",
    doc_id: "",
    posting_date: "",
    document_create_date: "",
    due_in_date: "",
    invoice_currency: "",
    document_type: "",
    posting_id: "",
    total_open_amount: "",
    baseline_create_date: "",
    cust_payment_terms: "",
    invoice_id: "",
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
      business_code: "",
      cust_number: "",
      clear_date: "",
      buisness_year: "",
      doc_id: "",
      posting_date: "",
      document_create_date: "",
      due_in_date: "",
      invoice_currency: "",
      document_type: "",
      posting_id: "",
      total_open_amount: "",
      baseline_create_date: "",
      cust_payment_terms: "",
      invoice_id: "",
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const {
      business_code,
      cust_number,
      clear_date,
      buisness_year,
      doc_id,
      posting_date,
      document_create_date,
      due_in_date,
      invoice_currency,
      document_type,
      posting_id,
      total_open_amount,
      baseline_create_date,
      cust_payment_terms,
      invoice_id,
    } = newData;
    await axios
      .post(
        "http://localhost:8080/JDBC/insert",
        queryString.stringify({
          business_code,
          cust_number,
          clear_date,
          buisness_year,
          doc_id,
          posting_date,
          document_create_date,
          due_in_date,
          invoice_currency,
          document_type,
          posting_id,
          total_open_amount,
          baseline_create_date,
          cust_payment_terms,
          invoice_id,
        })
      )
      .then((res) => {
        setStatus(res.data);
        setOpen(false);
        setSnackopen(true);
        setNewData({
          ...newData,
          business_code: "",
          cust_number: "",
          clear_date: "",
          buisness_year: "",
          doc_id: "",
          posting_date: "",
          document_create_date: "",
          due_in_date: "",
          invoice_currency: "",
          document_type: "",
          posting_id: "",
          total_open_amount: "",
          baseline_create_date: "",
          cust_payment_terms: "",
          invoice_id: "",
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
      >
        ADD
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" >
        <DialogTitle style={{backgroundColor:"#2A3E4C", color:"white" }}>Add</DialogTitle>
        <DialogContent style={{ paddingTop: 10, backgroundColor:"#2A3E4C" }}>
          <DialogContentText component={'div'}>
            <Grid
              container
              direction="row"
              alignItems="center"
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={2} sm={4} md={3}>
                <TextField
                  label="Business Code"
                  variant="filled"
                  fullWidth
                  name="business_code"
                  value={newData.business_code}
                  onChange={handleChange}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={3}>
                <TextField
                  label="Cust Number"
                  variant="filled"
                  fullWidth
                  name="cust_number"
                  value={newData.cust_number}
                  onChange={handleChange}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={3}>
                <TextField
                  label="Clear Date"
                  variant="filled"
                  fullWidth
                  name="clear_date"
                  value={newData.clear_date}
                  onChange={handleChange}
                  type="date"
                  InputLabelProps={{ shrink: true, required: true }}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={3}>
                <TextField
                  label="Buisness Year"
                  variant="filled"
                  fullWidth
                  name="buisness_year"
                  value={newData.buisness_year}
                  onChange={handleChange}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={3}>
                <TextField
                  label="Doc Id"
                  variant="filled"
                  fullWidth
                  name="doc_id"
                  value={newData.doc_id}
                  onChange={handleChange}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={3}>
                <TextField
                  label="Posting Date"
                  variant="filled"
                  fullWidth
                  name="posting_date"
                  value={newData.posting_date}
                  onChange={handleChange}
                  type="date"
                  InputLabelProps={{ shrink: true, required: true }}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={3}>
                <TextField
                  label="Document Create Date"
                  variant="filled"
                  fullWidth
                  name="document_create_date"
                  value={newData.document_create_date}
                  onChange={handleChange}
                  type="date"
                  InputLabelProps={{ shrink: true, required: true }}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={3}>
                <TextField
                  label="Due In Date"
                  variant="filled"
                  fullWidth
                  name="due_in_date"
                  value={newData.due_in_date}
                  onChange={handleChange}
                  type="date"
                  InputLabelProps={{ shrink: true, required: true }}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={3}>
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
              <Grid item xs={2} sm={4} md={3}>
                <TextField
                  label="Document Type"
                  variant="filled"
                  fullWidth
                  name="document_type"
                  value={newData.document_type}
                  onChange={handleChange}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={3}>
                <TextField
                  label="Posting Id"
                  variant="filled"
                  fullWidth
                  name="posting_id"
                  value={newData.posting_id}
                  onChange={handleChange}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={3}>
                <TextField
                  label="Total Open Amount"
                  variant="filled"
                  fullWidth
                  name="total_open_amount"
                  value={newData.total_open_amount}
                  onChange={handleChange}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={3}>
                <TextField
                  label="Baseline Create Date"
                  variant="filled"
                  fullWidth
                  name="baseline_create_date"
                  value={newData.baseline_create_date}
                  onChange={handleChange}
                  type="date"
                  InputLabelProps={{ shrink: true, required: true }}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={3}>
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
              <Grid item xs={2} sm={4} md={3}>
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
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{backgroundColor:"#2A3E4C"}}>
        <Tooltip title="You have to filled all the Information">
          <span style={{width:"100%" ,marginRight:10}}>
          <Button
            onClick={handleAdd}
            fullWidth
            variant="outline"
            disabled={
              newData.business_code === "" ||
              newData.invoice_id === "" ||
              newData.cust_payment_terms === "" ||
              newData.baseline_create_date === "" ||
              newData.total_open_amount === "" ||
              newData.posting_id === "" ||
              newData.document_type === "" ||
              newData.invoice_currency === "" ||
              newData.due_in_date === "" ||
              newData.document_create_date === "" ||
              newData.posting_date === "" ||
              newData.doc_id === "" ||
              newData.clear_date === "" ||
              newData.buisness_year === "" ||
              newData.cust_number === ""
                ? true 
                : false
            }
            style={{border:"1px solid white"}}
          >
            ADD
          </Button>
          </span>
          </Tooltip>
          <Button onClick={handleClose} fullWidth variant="outline" style={{border:"1px solid white"}}>
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
