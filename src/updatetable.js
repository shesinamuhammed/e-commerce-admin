import { React, useState, useRef, useEffect } from "react";
import { Button, List, Stack, TextField, Typography } from "@mui/material";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import "./popup.css";

export default function UpdateTable( props ) {
    // console.log("#####")
    // console.log(props)
    const data =props.data
    console.log(data)
// console.log(props.data);
  const { id } = props.data.ID;

  // console.log(id)
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [rows, setRows] = useState([]);
  const [originalrows, setoriginalrows] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [productName, setProductName] = useState(data.productname);
  const [productPrice, setproductPrice] = useState(data.price);
  const [productType, setproductType] = useState(data.type);
  const [productModel, setproductModel] = useState(data.model);
  const [productdescription, setproductDescription] = useState(data.description);
  const avatarFile = useRef(null);
  const navigate = useNavigate();
  const axiosFileupload = require("axios-fileupload");
  

  


  const update = () => {
    console.log(data);
    Axios.put("http://localhost:4000/post/updateproduct", {
      id: data.ID,
      productname: productName,
      price: productPrice,
      type: productType,
      model: productModel,
      description: productdescription,
    }).then((response) => {
      console.log(response);
    });
  };

 return (
    <div>
      <div>
        <Popup
          trigger={
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              //   onClick={cellValues}
            >
              Edit
            </Button>
          }
          position="left"
        >
          <div>
            <form>
              <Stack spacing={2} sx={{ pt: 3 }} direction={"column"}>
                <TextField
                  label="Productname"
                  type="text"
                  variant="outlined"
                  value={productName}
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

                <Button variant="contained" size="large" onClick={update}>
                  Update
                </Button>
              </Stack>
            </form>
          </div>
        </Popup>
      </div>
    </div>
  );
}
