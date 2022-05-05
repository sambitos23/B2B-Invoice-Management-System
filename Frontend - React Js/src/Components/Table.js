import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Card, CircularProgress, Box } from "@mui/material";

const columns = [
  { field: "SlNo", headerName: "Sl No", width: 68 },
  {
    field: "BusinessCode",
    headerName: "Business Code",
    width: 90,
  },
  { field: "CustNumber", headerName: "Customer Number", width: 100 },
  { field: "ClearDate", headerName: "Clear Date", width: 95 },
  { field: "BuisnessYear", headerName: "Buisness Year", width: 80 },
  { field: "DocId", headerName: "Document Id", width: 110 },
  {
    field: "PostingDate",
    headerName: "Posting Date",
    width: 110,
  },
  {
    field: "DocumentCreateDate",
    headerName: "Document Create Date",
    width: 100,
  },
  { field: "DueInDate", headerName: "Due In Date", width: 105 },
  {
    field: "InvoiceCurrency",
    headerName: "Invoice Currency",
    width: 90,
  },
  {
    field: "DocumentType",
    headerName: "Document Type",
    width: 90,
  },
  { field: "PostingId", headerName: "Posting Id", width: 60, type: "number" },
  {
    field: "TotalOpenAmount",
    headerName: "Total Open Amount",
    width: 100,
  },
  {
    field: "BaselineCreateDate",
    headerName: "Baseline Create Date",
    width: 110,
  },
  {
    field: "CustPaymentTerms",
    headerName: "Cust Payment Terms",
    width: 100,
  },
  { field: "InvoiceId", headerName: "Invoice Id", width: 105 },
  { field: "AgingBucket", headerName: "Aging Bucket", width: 80 },
];

export default function DataTable(props) {
  const { search, setSelect, searchedData, refresh } = props;

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const res = await axios.get(
        "http://localhost:8080/JDBC/view"
      );
      setData(res.data);
      setLoading(false);
    };

    getData();
  }, [refresh]);

  return (
    <>
      {/* Table UI */}
      <Card
        style={{
          height: 461,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#2D4250",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <DataGrid
            style={{ width: "100%", border: "none" }}
            sx={{
              "& .MuiTablePagination-root": {
                color: "white",
                width: "100%",
              },
              "& .MuiDataGrid-cell": {
                color: "white",
                borderBottom: "1.5px solid #B3B7BA",
                justifyContent: "flex-end",
              },
              "& .MuiButtonBase-root.MuiIconButton-root": {
                color: "white",
              },
              "& .MuiButtonBase-root.MuiIconButton-root.Mui-disabled": {
                color: "#808080",
              },
              ".MuiDataGrid-row.Mui-selected": {
                backgroundColor: "#1D2B34",
                color: "white",
              },
              ".MuiDataGrid-row.Mui-selected:hover": {
                backgroundColor: "#1D2B34",
                color: "white",
              },
              "& .MuiCheckbox-root": {
                color: "white",
              },
              "& .MuiCheckbox-root.Mui-checked": {
                color: "white",
              },
              "& .MuiDataGrid-row:hover": {
                color: "white",
                backgroundColor: "#1D2B34",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#283C48",
                color: "white",
                borderBottom: "2px solid #B3B7BA",
              },
              "& .MuiDataGrid-columnSeparator": {
                color: "transparent",
              },
              "& .MuiDataGrid-selectedRowCount": {
                color: "white",
                width:"20%",
                position: "absolute",
              },
              "& .MuiDataGrid-columnHeadersInner": {
                marginLeft: {lg:"4px"},
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#283C48",
              },
              "& .MuiSvgIcon-root.MuiSelect-icon": {
                color: "white",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                textOverflow: "clip",
                whiteSpace: "break-spaces",
                lineHeight: 1.8,
              },
              "& .MuiTablePagination-actions": {
                position: {lg: "absolute"},
                left: "50%",
                transform: {lg: "translateX(-50%)"},
                width: {lg:"12%"},
                marginLeft: {xs:2, lg:0},
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              },
              "& .MuiTablePagination-displayedRows": {
                marginRight:{lg:2}
              },  
            }}
            rows={
              searchedData.length > 0
                ? searchedData
                : search === ""
                ? data
                : data.filter(
                    (row) =>
                      row.CustNumber.toString()
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      row.BuisnessYear.toString()
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      row.InvoiceId.toString()
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      row.DocId.toLowerCase().includes(search.toLowerCase())
                  )
            }
            columns={columns}
            getRowId={(data) => data.SlNo}
            rowHeight={31}
            rowsPerPageOptions={[10, 25, 35]}
            loading={loading}
            checkboxSelection
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onSelectionModelChange={(itm) => setSelect(itm)}
            headerHeight={80}
            disableColumnMenu={true}
            onPageChange={(page) => setPage(page + 1)}
          />
        )}
      </Card>
      {loading === true || searchedData.length > 0 ? null : (
        <Box
          sx={{
            color: "white",
            position: "absolute",
            left: "49%",
            bottom:"9%",
            zIndex: 10,
            visibility: { xs: "hidden", lg: "visible" },
          }}
        >
          {page} of {(data.length / pageSize).toFixed(0)}
        </Box>
      )}
    </>
  );
}
