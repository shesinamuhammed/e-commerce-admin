import * as React from 'react';
import {useState,useEffect,useRef} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import {useNavigate , Link} from 'react-router-dom';
import Axios from "axios";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import './topbar.css'; 
import './dasboard.css';
import SettingsIcon from '@mui/icons-material/Settings';
import {NotificationsNone}  from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Sidebar from './sidebar';
import DashboardIcon from '@mui/icons-material/Dashboard';
export default function Home() {
    const [viewstatus, Viewuserstatus] = useState([])
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [avatar, setAvatar] = useState();
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const[newphone,setNewphone] = useState("")
    const avatarFile = useRef(null) 
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
                    // localStorage.removeItem(isloogedin);
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
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const userpro = () => {
      navigate('/userprofile')
    }
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
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" position="sticky" z-index="999" >
        <Toolbar >
          <DashboardIcon
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          />
           
         
          <Typography variant="h6" align = "left" component="div" sx={{ flexGrow: 1 }}>
           Home
          </Typography>
          <div className='topbaricon'>
            < NotificationsNone />
            <span className='topicon'>2</span>
            </div>
            <div className='topbaricon'>
            < SettingsIcon />
       
            </div>
          <Button color="inherit"  onClick={logout}>Logout</Button>
          <div>
             
                  {viewstatus.map ((val) => {
          
                    console.log(val.image)
                        return(
                          <Avatar  component={"span"} sx={{ bgcolor: deepOrange[500] }} onClick={onButtonClick}   src={"http://localhost:4000" + avatar} >   {avatar ? '' : val.Name[0].toUpperCase()}</Avatar>
                        )})}
            
           
             
            </div>
            
        </Toolbar>
      </AppBar>
    <div className='container'>
        <Sidebar />
        <div className='others'>other pages</div>
  
    </div>

    </Box>
  );
//   }else{
//     navigate('/login')
//   }
}








