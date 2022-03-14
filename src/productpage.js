import { React, useState, useRef, useEffect } from "react";
import { Button, List, Stack, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import SearchBar from "material-ui-search-bar";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import UpdateTable from "./updatetable";




import "./popup.css";

export default function Productpage() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [searched, setSearched] = useState("");
  const [rows, setRows] = useState([]);
  const [originalrows, setoriginalrows] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setproductPrice] = useState("");
  const [productType, setproductType] = useState("");
  const [productModel, setproductModel] = useState("");
  const [productdescription, setproductDescription] = useState("");
  const [avatar, setAvatar] = useState();
  const avatarFile = useRef(null);
  const navigate = useNavigate();
  const axiosFileupload = require("axios-fileupload");
  const [viewstatus, Viewuserstatus] = useState([]);
  const [select, setSelection] = useState([]);
  const [finalClickInfo, setFinalClickInfo] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const onButtonClick = () => {
    avatarFile.current.click();
  };
  const togglePopup = () => {
    console.log("yes");
    setIsOpen(!isOpen);
    // setIsOpen(false)
  };

  const requestSearch = (searchedVal) => {
    const filteredRows = rows.filter((row) => {
      console.log(row);
      return row.productname.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };
  const columns = [
    { field: "id", headerName: "id", width: 80 },
    { field: "productname", headerName: "Product Name", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    {
      field: "type",
      headerName: "Type",

      width: 150,
    },
    {
      field: "model",
      headerName: "Model",
      // description: 'This column has a value getter and is not sortable.',
      // sortable: false,
      width: 150,
    },
    {
      field: "image",
      headerName: "Image",
      // description: 'This column has a value getter and is not sortable.',
      // sortable: false,
      width: 150,

      renderCell: (params) => (
        <img
          style={{ height: "40px", width: "40px" }}
          src={"http://localhost:4000" + params.value}
        />
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      width: 130,
      
      renderCell:(params) =>{
        // console.log("$$$")
        // console.log(params.value)
        // console.log(params)
        // console.log("$$$")
        return(<UpdateTable data={params.value}/>)
       
        
      }
      

      
       
    
    },
   
     
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      width: 130,
      disableClickEventBubbling: true,
     
  
      renderCell: (params) => {
        console.log(params.id)
      
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
      }
    }
  ];

  // console.log(viewstatus)
  const uploadFile = async (e) => {
    var formData = new FormData();
    axiosFileupload(
      `http://localhost:4000/post/upload/${localStorage.getItem("userid")}`,
      e.target.files[0]
    ).then((response) => {
      console.log(response);
      setAvatar(response.data);
    });
  };

  const submit = (e) => {
    let formData = new FormData();
    console.log(file);
    console.log(formData);
    // formData.append("file",file,file.name);
    if (file != undefined && file != null){
      formData.append("image", file, file.name);

    }
    formData.append("productname", productName);
    formData.append("price", productPrice);
    formData.append("type", productType);
    formData.append("model", productModel);
    formData.append("description",productdescription);

    // formData.append("fileName", fileName);
    const config = { headers: { "content-type": "multipart/form-data" } };

    console.log(file);
    console.log(formData);
    Axios.post("http://localhost:4000/post/product", formData, config).then(
      (response) => {
        console.log(response);

        if (response.data.success === "success") {
          var item = {
            id: response.data.data.ID,
    
              ...response.data.data,
          }
          inserttoTable({
            edit: item,
          delete: item,
        ...item,
        ...formData,
          });
          togglePopup();
        }
        if (response.data.message) {
          //   setRegisterStatus(response.data.message)
          toast.success(response.data.message);
        }
      }
    );
  };
  useEffect(() => {
    Axios.get(`http://localhost:4000/post/get`).then((response) => {
      console.log(response);
      //  console.log(response.data[0].phone)
      // Viewuserstatus(response.data)
      var product_list = response.data.map((item, index) => ({
        id: item.ID,
        edit: item,
        delete:item,
        ...item,
      }));
      setoriginalrows(product_list);
      console.log(product_list);
      console.log(originalrows);
      setRows(product_list);
    });
  }, []);
  const upload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    // formData.append("fileName", fileName);
    try {
      const res = await axios.post(
        "http://localhost:4000/post/upload",
        formData
      );
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const inserttoTable = (productobject) => {
    setoriginalrows([...originalrows, productobject]);
    setRows([...rows, productobject]);
  };
 
  const handleOnCellClick = (params) => {
console.log(params)
if (params.field == 'delete') {
  Axios.delete(`http://localhost:4000/post/delete/${params.id}`).then((response) => {
  console.log(response);

})
}
    setFinalClickInfo(params);
   
 
  };

  const deleteProduct = (id) => {
    console.log(id)


}
const getCellActions = (column, row) => {
console.log("success")
  if(column.key === 'delete'){
    console.log("succ")
      return [
          {
              icon: 'fa fa-edit',
              callback: () => this.getRoleData(row.id)
          }
      ];

  }
}
  return (
    <div>
     <Typography variant="h5"> Product Table</Typography>
      <div style={{ height: '60vh', width: "100%", marginTop: "50px" }}>
        <Paper style={{height: '100%', zIndex: -1}}>
          {/* <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          /> */}

          <DataGrid
            // rows={viewstatus.map((item, index) => ({id: item.ID,...item}))}
            style={{height:'calc(100% - 50px)'}}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onCellClick={handleOnCellClick}
            // getCellActions= {(column, row) => getCellActions(column, row)}
        
      

         
          />
            {/* {finalClickInfo &&
        `Final clicked id = ${finalClickInfo.id}, 
        Final clicked field = ${finalClickInfo.field}, 
        Final clicked value = ${finalClickInfo.value}`} */}
        {/* {finalClickInfo.map((e) => <UpdateTable id = {e.id}/>)} */}
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
                  label="Productname"
                  type="text"
                  variant="outlined"
                  onChange={(e) => {
                    setProductName(e.target.value);
                  }}
                />
                <TextField
                  label="Price"
                  type="text"
                  variant="outlined"
                  onChange={(e) => {
                    setproductPrice(e.target.value);
                  }}
                />
                <TextField
                  label="Product Type"
                  type="text"
                  variant="outlined"
                  onChange={(e) => {
                    setproductType(e.target.value);
                  }}
                />
                <TextField
                  label="Product Model"
                  type="text"
                  variant="outlined"
                  onChange={(e) => {
                    setproductModel(e.target.value);
                  }}
                />
                   <TextField
                  label="Product Description"
                  type="text"
                  variant="outlined"
                  onChange={(e) => {
                    setproductDescription(e.target.value);
                  }}
                />

                <div>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      console.log(e.target.files[0]);
                      // console.log(setFile(e.target.files[0]))
                    }}
                  />
                </div>
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
