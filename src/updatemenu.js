import { React, useState,   } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import "./popup.css";

export default function UpdateMenu( props ) {
    // console.log("#####")
    // console.log(props)
    const data =props.data
 console.log(props.data);
   const { id } = props.data.ID;

  // console.log(id)
 
  const [menuName, setMenuName] = useState(data.menuname);
  const [menuType, setMenuType] = useState(data.menutype);
 
 
  const update = () => {
    console.log(data);
    Axios.put("http://localhost:4000/post/updatemenu", {
      id: data.ID,
      menuname: menuName,
      menutype: menuType,
    
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
          position="right"
        >
          <div>
            <form>
              <Stack spacing={2} sx={{ pt: 3 }} direction={"column"}>
                <TextField
                  label="Menuname"
                  type="text"
                  variant="outlined"
                  value={menuName}
                  onChange={(e) => {
                    setMenuName(e.target.value);
                  }}
                />
                <TextField
                  label="Menutype"
                  type="text"
                  variant="outlined"
                  value={menuType}
                  onChange={(e) => {
                    setMenuType(e.target.value);
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
