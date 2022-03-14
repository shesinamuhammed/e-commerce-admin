import React,{useState} from 'react';
import './App.css';
import Axios from "axios";

function App() {


  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginStatus, setLoginStatus] = useState('');
  const register = () =>{
    Axios.post('http://localhost:4000/post/register',{username:usernameReg,
  password:passwordReg,}).then((response) => {
    console.log(response);
  });
  };
  const login = () =>{
    Axios.post('http://localhost:4000/post/login',{username:username,
  password:password,}).then((response) => {
    if (response.data.message) {
      setLoginStatus(response.data.message)
      // setTimeout(() => this.setState({ redirect: true }), 2000)
    }else{
      setLoginStatus(response.data[0].Name)

    }
   
  });
  };
  
  return (
    <div className="App">
    <div className="registration">
      <h1>Registration</h1>
      <label>Username</label> 
      <input type="text" onChange={(e) =>{
        setUsernameReg(e.target.value);
      }}/>
      <label>Password</label>
      <input type="text" onChange={(e) =>{
        setPasswordReg(e.target.value);
      }}/>
      <button onClick={register}>Register</button>
    </div>
    <div className="login">
      <h1>Login</h1>
      <label>Username</label>
      <input type="text" placeholder="username..." onChange={(e) =>{
       setUsername(e.target.value);
      }} />
      <input type="password" placeholder="password..." onChange={(e) =>{
        setPassword(e.target.value);
      }} />
      
      <button onClick={login} >Login</button>
    </div>
    <h1>{loginStatus}</h1>
</div>
  );
}

export default App;
