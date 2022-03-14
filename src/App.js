import React from 'react';
import {BrowserRouter, Route, Routes, useLocation,Navigate, Outlet} from 'react-router-dom'
import './App.css';
import Home from './Home';
import Login from './login';
import User from './register';
import Forgotpassword from './forgotpassword';
import Resetpassword from './resetpassword';
import Userprofile from './userprofile';
import Dashboard from './dashboard';
import Productpage from './productpage';
import Menutable from './menutable';
import Reviews from './reviews';

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default function App() {

  
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                <Route path="/" element={<User/>}/>
            
            <Route path="/login" element={<Login/>}/>
            <Route path="/us" element={<Us/>}/>
            <Route path="/forgotpassword" element={<Forgotpassword/>}/>
            <Route path="/resetpassword" element={<Resetpassword/>}/>
            <Route path="/userprofile" element={<Userprofile/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/productpage" element={<Productpage/>}/>
            <Route path="/menutable" element={<Menutable/>}/>
            <Route path="/reviews" element={<Reviews/>}/>


            <Route element={<RequireAuth/>}>
              
                <Route path="/Home" element={<Home isLoggedIn={true} />}/>
            </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}


 function Us() {
  return (
      <div>
          us
      </div>
  )
}

function RequireAuth() {
    let location = useLocation();
    const loggedIn = localStorage.getItem("isloogedin")

    if (!loggedIn) {
        return <Navigate to={"/login"} state={{from: location}}/>;
    }

    return <Outlet/>;
}




