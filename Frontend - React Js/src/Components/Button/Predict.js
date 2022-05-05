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
          backgroundColor: "#14AFF1",
          borderRadius: "6px",
          borderTopRightRadius: "0px",
          borderBottomRightRadius: "0px",
          "&.Mui-disabled": {
            color: "white",
            opacity: 0.7,
            border: "none",
          },
          "&:hover": {
            border: "2px solid #7FCEF1",
          },
        },
      },
    },
  },
});

export default function Predict(props) {
  const { select, setSnackopen, setStatus, setRefresh, refresh, setSelect } = props;
  const [open, setOpen] = useState(false);
  const [newData, setNewData] = useState({
    cust_payment_terms: "",
    business_code: "",
    cust_number: null,
    name_customer: "",
    clear_date: "",
    buisness_year: null,
    doc_id: null,
    posting_date: "",
    due_in_date: "",
    baseline_create_date: "",
    converted_usd: null,
  });

  const handleClickOpen = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:8080/JDBC/predictSend",
        queryString.stringify({
          sl_no: select.toString(),
        })
      )
      .then((res) => {
        setNewData({
          cust_payment_terms: res.data[0].CustPaymentTerms,
          business_code: res.data[0].BusinessCode,
          cust_number: res.data[0].CustNumber,
          clear_date: res.data[0].ClearDate,
          buisness_year: res.data[0].BuisnessYear,
          doc_id: res.data[0].DocId,
          posting_date: res.data[0].PostingDate,
          due_in_date: res.data[0].DueInDate,
          baseline_create_date: res.data[0].BaselineCreateDate,
          converted_usd: res.data[0].TotalOpenAmount,
          name_customer: "highradius",
        });
        setOpen(true);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    const {
      cust_payment_terms,
      business_code,
      cust_number,
      name_customer,
      clear_date,
      buisness_year,
      doc_id,
      posting_date,
      due_in_date,
      baseline_create_date,
      converted_usd,
    } = newData;
    if (clear_date === "0000-00-00") {
      setSnackopen(true);
      setStatus("Clear Date is not set");
      setOpen(false);
    } else {
      const res = await axios.post("http://127.0.0.1:5000/", {
        cust_payment_terms,
        business_code,
        cust_number,
        name_customer,
        clear_date,
        buisness_year,
        doc_id,
        posting_date,
        due_in_date,
        baseline_create_date,
        converted_usd,
      });
      await Promise.all(
        res.data.map(async (item) => {
          return axios
            .post(
              "http://localhost:8080/JDBC/predictUpdate",
              queryString.stringify({
                aging_bucket: item.aging_bucket,
                sl_no: select.toString(),
              })
            )
            .then((res) => {
              setStatus(res.data);
              setSnackopen(true);
              setRefresh(refresh+1);
              setSelect([]);
              setNewData({
                ...newData,
                cust_payment_terms: "",
                business_code: "",
                cust_number: "",
                name_customer: "",
                clear_date: "",
                buisness_year: "",
                doc_id: "",
                posting_date: "",
                due_in_date: "",
                baseline_create_date: "",
                converted_usd: "",
              });
              setOpen(false);
            })
            .catch((err) => {
              setSnackopen(true);
              setStatus(err);
              setOpen(false);
              setRefresh(refresh+1);
              setSelect([]);
            });
        })
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        fullWidth
        disabled={select.length === 1 ? false : true}
      >
        PREDICT
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle style={{ backgroundColor: "#2A3E4C", color: "white" }}>
          {" "}
          Predict{" "}
        </DialogTitle>
        <DialogContent style={{ paddingTop: 10, backgroundColor: "#2A3E4C" }}>
          <DialogContentText component={"div"} style={{ color: "white" }}>
            Are you sure you want to predict this record[s]?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ backgroundColor: "#2A3E4C" }}>
          <Button
            onClick={handlePredict}
            fullWidth
            variant="outline"
            style={{
              border: "1px solid white",
              marginRight: 10,
              borderRadius: 5,
            }}
          >
            PREDICT
          </Button>
          <Button
            onClick={handleClose}
            autoFocus
            fullWidth
            variant="outline"
            style={{ border: "1px solid white", borderRadius: 5 }}
          >
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
