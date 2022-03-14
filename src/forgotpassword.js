import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Typography,Stack} from '@mui/material';
export default function Forgotpassword() {

    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
   
    const [registerStatus, setRegisterStatus] = useState('');
    const navigate = useNavigate()

    const register = () => {
        Axios.post('http://localhost:4000/post/forgotpassword', {
            username: usernameReg,
            password: passwordReg,
        }).then((response) => {
            console.log(response);

            if(response.data === "success"){
              navigate('/us')
            }
            if (response.data.message) {
            //  setRegisterStatus(response.data.message)
            toast.success(response.data.message)
            }
           

        });
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
                Forgot Password
                    </Typography>
                        
                    <Stack spacing={3} sx={{pt: 4}} direction={'column'}>
                    <TextField
                            label="Username"
                            type="email"
                            variant="outlined"
                            onChange={(e) => {
                                setUsernameReg(e.target.value); 
                            }}/>

                       
                       <Button
                            variant="contained"
                            onClick={register}
                            size="large">
                            Submit
                        </Button>
                        
                       
                
                        </Stack>
                    
                    <h1>{registerStatus}</h1>
                    <ToastContainer />
                </CardContent>
            </Card>
            </Stack>
        </React.Fragment>
        
    )
}