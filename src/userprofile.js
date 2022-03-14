import * as React from 'react';
import {useState,useEffect,setState,useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import {useNavigate , Link} from 'react-router-dom';
import Axios from "axios";
import Toolbar from '@mui/material/Toolbar';
import {Typography,Stack} from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';




export default function Userprofile() {
  const [email, setEmail] = useState("")
  const[newphone,setNewphone] = useState("")
  const [viewstatus, Viewuserstatus] = useState([])
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [avatar, setAvatar] = useState();
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate()
  const avatarFile = useRef(null) 
  const axiosFileupload = require('axios-fileupload');
   
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    avatarFile.current.click();
  };
  const logout = () => {
    Axios.post('http://localhost:4000/post/logout', {
    }).then((response) => {
       console.log(response.data.isloogedin)
       const isloogedin = response.data.isloogedin;
       if (!isloogedin) {
          console.log(isloogedin)
          localStorage.clear();
          console.log(isloogedin)
          navigate('/login')
          }
       else{
          console.log(isloogedin)
                // navigate('/')
            }
      });
    };
    useEffect(() => {
      Axios.get(`http://localhost:4000/post/get/${localStorage.getItem("userid")}`).then
     ((response) => {
       console.log(response)
       console.log(response.data[0].phone)
      Viewuserstatus(response.data)
      setEmail(response.data[0].Email) 
      setNewphone(response.data[0].phone)
      console.log(response.data[0])
      setAvatar(response.data[0].image)
     })
     }, [])
 
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    var card1style = {
      width: '300px', height: '500px',
    }
    var style2 = {
      "margin-right":"13px",
    }
    const update = (name) => {
      Axios.put('http://localhost:4000/post/update',{
        Name : name,
        Email: email,
        phone:newphone,
    });
    
  }
  const saveFile = (e) => {
    // console.log(avatarFile.current.files)
    // setFile(avatarFile.current.files[0]);
    // setFileName(avatarFile.current.files[0].name);
    uploadFile();
  };
  const uploadFile = async (e) => {
    var formData = new FormData();
    // console.log(e.target.files)
    // setFile(e.target.files[0]);
    // setFileName(e.target.files[0].name);
    // formData.append("file", e.target.files[0]);
    // formData.append("fileName", "e.target.files[0].name");
    // console.log(formData);
    // console.log(file);console.log(fileName)
    // console.log(avatarFile.current.files)
    axiosFileupload(`http://localhost:4000/post/upload/${localStorage.getItem("userid")}`,e.target.files[0]).then((response) => {
      console.log(response)
      setAvatar(response.data)})
    // try {
    //   const res = await Axios.post(
    //     "http://localhost:4000/post/upload",
        
    //     formData
    //   );
    //   console.log(res);
    // } catch (ex) {
    //   console.log(ex);
    // }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" align = "left" component="div" sx={{ flexGrow: 1 }}>
                    User profile
                  </Typography>
                  <Button color="inherit"  onClick={logout}>Logout</Button>
                  <div>
                      <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                      >
                        <AccountCircle />
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <Button >My account</Button>
                      </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            {viewstatus.map ((val) => {
          
          console.log(val.image)
              return(
  
                <div className="card">
            
                
                      <Stack spacing={2} sx={{pt: 3}} direction={'row'} justifyContent={"center"} alignItems={"center"}>
               
                        <Avatar  component={"span"} sx={{ bgcolor: deepOrange[500] }} onClick={onButtonClick}   src={"http://localhost:4000" + avatar} >   {avatar ? '' : val.Name[0].toUpperCase()}</Avatar>
                        <input type='file' id='file' ref={avatarFile} style={{display: 'none'}}  onChange={uploadFile} />
                        <Typography variant={'h3'} > {val.Name}</Typography>
                
                      </Stack>
                    
                      <Typography variant={'h5'}>Email:{val.Email} </Typography>
                      <Typography variant={'h5'}> Phone:{val.phone}</Typography>
                      <div style={style2}>
                        <input type="text" value={email} id="updateInput" onChange={(e)=>{
                        setEmail(e.target.value)}}/>
                      </div>
                      <div style={style2}>
                        <input type="text" value={newphone} id="updateInput" onChange={(e)=>{
                        setNewphone(e.target.value)}}/>
                      </div>
                      <div>
                        <Button style={style2}  variant="contained" onClick={() => {update(val.Name)}}>Update</Button>
                      </div>
                  </div>
              );
            })}
    </Box>
  );

}








