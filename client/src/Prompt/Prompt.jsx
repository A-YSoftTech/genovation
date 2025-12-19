import { useState, useEffect } from 'react'
import axios from 'axios'
import './Prompt.css'
import { toast } from 'react-toastify';

function Prompt() {
    const [username, setUsername] = useState("");
    const [task, setTask] = useState("");
    const [aiData, setAiData] = useState([
        {
            user: "User Question",
            ai: "Ai Response"
        },
    ]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8999/fetch", { withCredentials: true });
                setUsername(response.data.details.username);
            } catch (error) {
                toast.error(error.response.data.message);
                if (!error.response.data.success) {
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 1500);
                }
            }
        }
        fetchData();
    }, []);

    const handleTask = (e) => {
        e.preventDefault();
        setTask(e.target.value);
    }
    const aiResponse = (response) => {
        const arrange = {
            user: response.user,
            ai: response.ai
        }
        setAiData(prev => [...prev, arrange]);
    }
    const sendTask = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8999/prompt", { task }, { withCredentials: true });
            aiResponse(response.data.store);
            toast.success(response.data.message);
            setTask("");
        } catch (error) {
            toast.error("Something went wrong, please wait for a minute...");
        }
    }

    const logout = async () => {
        try {
            const response = await axios.post("http://localhost:8999/logout", {}, { withCredentials: true });
            console.log(response);
            if (response.data.success) {
                setTimeout(() => {
                    window.location.href = "/";
                }, 1500);
            }
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
            <div className='container-box'>
                <div className='header'>
                    <h1>Welcome! {username}</h1>
                    <button onClick={logout}>Logout</button>
                    <button onClick={() => window.location.href = "/history"}>History</button>
                </div>
                <div className='inputBox'>

                    <div className='communication'>
                        {aiData.map((u, i) => (
                            <p key={i}>
                                <span className='user'>{u.user} -: <b>You</b></span>
                                <span className='ai'><b>AI</b> :- {u.ai}</span>
                            </p>
                        ))}
                    </div>
                    <form className='task' onSubmit={sendTask}>
                        <input type="text" placeholder='Ask anything' onChange={handleTask} />
                        <input type="submit" value="✨" />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Prompt;
