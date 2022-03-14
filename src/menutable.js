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
import UpdateMenu from "./updatemenu";

import "./popup.css";

export default function Menutable() {
 
  const [rows, setRows] = useState([]);
  const [originalrows, setoriginalrows] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [menuType, setmenutype] = useState("");
  
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
    { field: "menuname", headerName: "Menu Name", width: 150 },

    {
      field: "menutype",
      headerName: "Menu Type",
      width: 150,
    },

    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      width: 130,

        renderCell: (params) => {
          return <UpdateMenu data={params.value} />;
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

  const submit = (e) => {
    Axios.post("http://localhost:4000/post/menu", {
      menuname: menuName,
      menutype: menuType,
    }).then((response) => {
      console.log(response);

      if (response.data.success === "success") {
      var item = {
        id: response.data.data.ID,

          ...response.data.data,
      }
        console.log(response.data.data.ID)
        inserttoTable({
          edit: item,
          delete: item,
        ...item
        });
        togglePopup();
      }
      if (response.data.message) {
        //   setRegisterStatus(response.data.message)
        toast.success(response.data.message);
      }
    });
  };
  useEffect(() => {
    Axios.get(`http://localhost:4000/post/getmenu`).then((response) => {
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

  const inserttoTable = (productobject) => {
    setoriginalrows([...originalrows, productobject]);
    setRows([...rows, productobject]);
  };

  const handleOnCellClick = (params) => {
    console.log(params);
    if (params.field == "delete") {
      Axios.delete(`http://localhost:4000/post/deletemenu/${params.id}`).then(
        (response) => {
          console.log(response);
        }
      );
    }
    setFinalClickInfo(params);
  };

  
  return (
    <div>
      <Typography variant="h5"> Menu Table</Typography>
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
      <div>
        <Popup
          trigger={<Button variant="contained"> Add Product</Button>}
          position="top center"
          open={isOpen}
        >
          <div>
            <form>
              <Stack spacing={2} sx={{ pt: 3 }} direction={"column"}>
                <TextField
                  label="menuname"
                  type="text"
                  variant="outlined"
                  onChange={(e) => {
                    setMenuName(e.target.value);
                  }}
                />
                <TextField
                  label="menutype"
                  type="text"
                  variant="outlined"
                  onChange={(e) => {
                    setmenutype(e.target.value);
                  }}
                />

                <Button variant="contained" onClick={submit} size="large">
                  Submit
                </Button>
              </Stack>
            </form>
          </div>
        </Popup>
      </div>
    </div>
  );
}
