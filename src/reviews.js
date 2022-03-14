import { React, useState, useRef, useEffect } from "react";
import { Button, List, Stack, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import UpdateComment from './updatecomment';


export default function Reviews() {
 
  const [rows, setRows] = useState([]);
  const [originalrows, setoriginalrows] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
 
  
  const avatarFile = useRef(null);
  const navigate = useNavigate();
  const axiosFileupload = require("axios-fileupload");
  const [viewstatus, Viewuserstatus] = useState([]);
  const [select, setSelection] = useState([]);
  const [finalClickInfo, setFinalClickInfo] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  
  const togglePopup = () => {
    console.log("yes");
    setIsOpen(!isOpen);
    // setIsOpen(false)
  };

  const columns = [
    { field: "id", headerName: "id", width: 80 },
    { field: "productid", headerName: "Product Id", width: 150 },
    { field: "customerid", headerName: "Customer Id", width: 150 },
    { field: "comment", headerName: "Comment", width: 150 },
    { field: "ratingvalue", headerName: "Rating Value", width: 150 },
    

    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      width: 130,

        renderCell: (params) => {
          return <UpdateComment data={params.value} />;
        },
    },

    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      width: 130,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        console.log(params.id);

        return (
          <div>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              // onClick={deleteProduct(params.id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];


  useEffect(() => {
    Axios.get(`http://localhost:4000/post/gettablecomment`).then((response) => {
      console.log(response);

    Viewuserstatus(response.data);
      var product_list = response.data.map((item, index) => ({
        id: item.ID,
        edit: item,
        delete: item,
        ...item,
      }));
     console.log(product_list);
      setoriginalrows(product_list);
      console.log(product_list);
      console.log(originalrows);
    setRows(product_list);
    });
  }, []);


  const handleOnCellClick = (params) => {
    console.log(params);
    if (params.field == "delete") {
      Axios.delete(`http://localhost:4000/post/deletecomment/${params.id}`).then(
        (response) => {
          console.log(response);
        }
      );
    }
    setFinalClickInfo(params);
  };

  
  return (
    <div>
      <Typography variant="h5"> Review Table</Typography>
      <div style={{ height: "60vh", width: "100%", marginTop: "50px" }}>
        <Paper style={{ height: "100%", zIndex: -1 }}>
          <DataGrid
            // rows={viewstatus.map((item, index) => ({id: item.ID,...item}))}
            style={{ height: "calc(100% - 50px)" }}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            // checkboxSelection
            onCellClick={handleOnCellClick}
          />
        </Paper>
      </div>
      
    </div>
  );
}
