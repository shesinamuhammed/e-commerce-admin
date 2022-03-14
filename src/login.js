import React, {useState} from 'react';
import {useNavigate , Link} from 'react-router-dom';
import Axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import GoogleLogin from 'react-google-login';
import {Typography,Stack} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FacebookLogin from 'react-facebook-login';

export default function Login() {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const navigate = useNavigate()
    const [registerStatus, setRegisterStatus] = useState('');
    
    const login = () => {
        Axios.post('http://localhost:4000/post/login', {
            username: username,
            password: password
        }).then((response) => {
            if (response.data.message) {
                // setLoginStatus(response.data.message)
                toast.success(response.data.message)
            } else{
                if(response.data.result[0].usertype == "admin") {
                    // setLoginStatus(response.data[0].Name);
                    // toast.success(response.data[0].Name)
                    console.log(response)
                    const isloogedin = response.data.isloogedin;
                    localStorage.setItem('isloogedin', 'true');
                    localStorage.setItem('userid',response.data.result[0].ID)
                    navigate('/home')
                    }
                    else{
                        toast.success("wrong username/password combination!")
                    }
            }
          
        });
    };

    const handleLogin = async googleData => {
        const res = await fetch("http://localhost:4000/post/googleauth", {
            method: "POST",
            body: JSON.stringify({
                token: googleData.tokenId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        console.log(data)
        localStorage.setItem('isloogedin', 'true');
        navigate('/home')
   
    }

    const responseFacebook = (response) => {
      
        console.log(response)
        Axios({
            method: "POST",
            url:"http://localhost:4000/post/facebookauth",
            data:{accessToken: response.accessToken, userID: response.userID}
        }).then(response => {
            console.log("Facebook login success",response)
            localStorage.setItem('isloogedin', 'true');
            navigate('/home')
        })
  
    }
    var card1style = {
        width: '300px', height: '500px',
    }
    
    
    var lableStyle = {position: 'absolute', top: '140px', left: '260px'}


    return (
    
       <Stack alignItems="center" justifyContent="center" height="100vh">
            <Card style={card1style} sx={{p: 3}}>
              
                    <Typography align = "left" variant={'h5'}>
                        Login
                    </Typography>
                    <Typography align = "left" gutterBottom variant={'body2'}>
                        Doesn't have an account yet?
                        <Typography component={'span'}>
                            <Link to={'/'}>
                                Register
                            </Link>
                        </Typography>
                    </Typography>
                    <Stack spacing={2} sx={{pt: 3}} direction={'column'}>
                        <TextField
                            label="Username"
                            type="email"
                            variant="outlined"
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}/>
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}/>

                        <Button
                            variant="contained"
                            onClick={login}
                            size="large">
                            Login
                        </Button>
                        <Link to={'/forgotpassword'}>
                            Forgot password?
                        </Link>
                    </Stack>

                    {/* <Typography>{loginStatus}</Typography> */}
                    <ToastContainer />
                    <Stack direction="row" spacing={4} sx={{mt:2}} justifyContent="center">
               
                        <GoogleLogin
                            clientId="142827027325-km29pbnk5learb8sh3cqc5q04eb2c99d.apps.googleusercontent.com"
                            buttonText="Google"
                            onSuccess={handleLogin}
                            onFailure={handleLogin}
                            cookiePolicy={'single_host_origin'}
                        />
                   
                        <FacebookLogin
                            appId="906348676688291"
                            textButton="            Facebook"
                          
                            autoLoad={false}
                            cssClass="my-facebook-button-class"
                            icon="fa-facebook"
                            callback={responseFacebook} />
                   
                </Stack>
            </Card>
            </Stack>
     
    )
}