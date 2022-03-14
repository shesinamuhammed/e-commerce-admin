import * as React from 'react';
import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import {useNavigate , Link} from 'react-router-dom';
import Axios from "axios";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
export default function Home() {

  const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate()
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
            Home
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
                <MenuItem onClick={userpro}>My account</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
//   }else{
//     navigate('/login')
//   }
}








