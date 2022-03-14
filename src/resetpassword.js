import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Typography,Stack} from '@mui/material';

export default function Resetpassword() {

    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [confirmReg, setConfirmReg] = useState('');
    const [registerStatus, setRegisterStatus] = useState('');
    const navigate = useNavigate()

    const resetpassword = () => {
        if(passwordReg===confirmReg){
             
            console.log("same")
        Axios.post('http://localhost:4000/post/resetpassword', {
            username: usernameReg,
            password: passwordReg,
            
        }).then((response) => {
            console.log(response);

            // if(response.data === "success"){
               
            //   navigate('/us')
            // }
            if (response.data) {
              setRegisterStatus(response.data.message)
              
              navigate('/login')
            }
           

        });
    }else{
      
        toast.success("Confirm Password is not same as the new password"); 
        console.log("Confirm Password is not same as the new password");
    }
    };
  
    var cardStyle = {
        display: 'block',
        alignItems:"center",
        width: '30vw',
        justify:"center",
        transitionDuration: '0.3s',
        height: '30vw',
        'margin-left': '30%',
        width: "40%",
        'margin-top': '5%',
    }
    var card1style = {
        width: '300px', height: '500px',
    }
    return (
        <React.Fragment>
            <Stack alignItems="center" justifyContent="center" height="100vh">
            <Card style={card1style} sx={{p: 3}}>
                <CardContent>
                <Typography align = "left" variant={'h5'}>
                    Reset Password
                    </Typography>
                        
               
                    <Stack spacing={3} sx={{pt: 4}} direction={'column'}>
                    <TextField
                            label="Username"
                            type="email"
                            variant="outlined"
                            onChange={(e) => {
                                setUsernameReg(e.target.value); 
                            }}/>
                         <TextField
                            label="New Password"
                            type="password"
                            variant="outlined"
                            name="newpassword"
                            onChange={(e) => {
                                setPasswordReg(e.target.value);
                            }}/>
                            <TextField
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            name="confirmpassword"
                            onChange={(e) => {
                                setConfirmReg(e.target.value);
                            }}/>
                         
                         <Button
                            variant="contained"
                            onClick={resetpassword}
                            size="large">
                            Submit
                        </Button>
</Stack>
                  
                        <div>
                        <h1>{registerStatus}</h1>
                        </div>
                        
                        <ToastContainer />
                  
                    
                 
                </CardContent>
            </Card>
          </Stack>
        </React.Fragment>
        
    )
}

