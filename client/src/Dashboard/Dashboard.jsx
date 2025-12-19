import { useState } from 'react'
import axios from 'axios'
import './Dashboard.css'
import { toast } from 'react-toastify';

function Dashboard() {
    const [password, setPassword] = useState("password");
    const [mode, setMode] = useState("register");
    const [regData, setRegData] = useState({
        username: "",
        phone: "",
        email: "",
        password: ""
    });
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleReg = (e) => {
        setRegData({ ...regData, [e.target.name]: e.target.value });
    }
    const handleLogin = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    }
    const submitRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8999/register", regData);
            toast.success(response.data.message);
            setMode("login");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    const submitLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8999/login", loginData, { withCredentials: true });

            toast.success(response.data.message);
            if (response.status == 200) {
                setTimeout(() => {
                    window.location.href = "/prompt";
                }, 1500);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
            <div className='container'>
                {mode === "register" ?
                    <form onSubmit={submitRegister}>
                        <h1>Register</h1>
                        <input type="text" name='username' placeholder='Enter your name' onChange={handleReg} />
                        <input type="text" name='phone' placeholder='Enter your phone' onChange={handleReg} />
                        <input type="email" name='email' placeholder='Enter your email' onChange={handleReg} />
                        <input type={password} name='password' placeholder='Enter your password' onChange={handleReg} 
                        onDoubleClick={()=> password === "password" ? setPassword("text") : setPassword("password")} title='Double click for show/hide password'/>
                        <input type="submit" value="Register" />
                        <hr />
                        <p>Already have an account? <strong onClick={() => setMode("login")}>Login</strong></p>
                    </form> : ""}
                {mode === "login" ?
                    <form onSubmit={submitLogin}>
                        <h1>Login</h1>
                        <input type="email" name='email' placeholder='Enter your email' onChange={handleLogin} />
                        <input type={password} name='password' placeholder='Enter your password' onChange={handleLogin} 
                        onDoubleClick={()=> password === "password" ? setPassword("text") : setPassword("password")} title='Double click for show/hide password'/>
                        <input type="submit" value="Login" />
                        <hr />
                        <p>Don't have an account? <strong onClick={() => setMode("register")}>Register</strong></p>
                    </form> : ""}
            </div>
        </>
    )
}

export default Dashboard;
