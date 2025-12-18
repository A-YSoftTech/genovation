import { useState } from 'react'
import axios from 'axios'
import './Dashboard.css'

function Dashboard() {
    const [mode, setMode] = useState("register");
    const [regData, setRegData] = useState({
        username : "",
        phone : "",
        email : "",
        password : ""
    });
    const [loginData, setLoginData] = useState({
        email : "",
        password : ""
    });

    const handleReg = (e)=>{
        setRegData({...regData, [e.target.name] : e.target.value});
    }
    const handleLogin = (e)=>{
        setLoginData({...loginData, [e.target.name] : e.target.value});
    }
    const submitRegister = async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8999/register", regData);
            
            alert(response.data.message);
            setMode("login");
        } catch (error) {
            alert(error.response.data.message);
        }
    }
    const submitLogin = async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8999/login", loginData, {withCredentials : true});
            
            alert(response.data.message);
            if(response.status == 200){
                window.location.href = "/prompt";
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    }

  return (
    <>
      <div className='container'>
        {mode === "register"?
        <form onSubmit={submitRegister}>
            <h1>Register</h1>
            <input type="text" name='username' placeholder='Enter your name' onChange={handleReg} />
            <input type="text" name='phone' placeholder='Enter your phone' onChange={handleReg} />
            <input type="email" name='email' placeholder='Enter your email' onChange={handleReg} />
            <input type="text" name='password' placeholder='Enter your password' onChange={handleReg} />
            <input type="submit" value="Register"/>
            <hr />
            <p>Already have an account? <strong onClick={()=>setMode("login")}>Login</strong></p>
        </form> : "" }
        {mode === "login"?
        <form onSubmit={submitLogin}>
            <h1>Login</h1>
            <input type="email" name='email' placeholder='Enter your email' onChange={handleLogin} />
            <input type="text" name='password' placeholder='Enter your password' onChange={handleLogin} />
            <input type="submit" value="Login"/>
            <hr />
            <p>Don't have an account? <strong onClick={()=>setMode("register")}>Register</strong></p>
        </form> : "" }
      </div>
    </>
  )
}

export default Dashboard;
