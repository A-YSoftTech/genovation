import { useState, useEffect } from 'react'
import axios from 'axios'
import './Prompt.css'

function Prompt() {
    const [username, setUsername] = useState("");
    const [task, setTask] = useState("");
    const [aiData, setAiData] = useState([
        {
            user : "User Question",
            ai : "Ai Response"
        },
    ]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8999/fetch", { withCredentials: true });
                setUsername(response.data.details.username);
            } catch (error) {
                alert(error.response.data.message);
                if (!error.response.data.success) {
                    window.location.href = "/";
                }
            }
        }
        fetchData();
    }, []);

    const handleTask = (e) => {
        e.preventDefault();
        setTask(e.target.value);
    }
    const aiResponse = (response)=>{
        const arrange = {
            user : response.user,
            ai : response.ai
        }
        setAiData(prev =>[...prev,arrange]);
    }
    const sendTask = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8999/prompt", { task }, {withCredentials : true});
            aiResponse(response.data.store);
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    return (
        <>
            <div className='container-box'>
                <div className='header'>
                    <h1>Welcome! {username}</h1>
                    <button onClick={()=>window.location.href = "/history"}>History</button>
                </div>
                <div className='inputBox'>
                    
                    <div className='communication'>
                        {aiData.map((u,i)=>(
                        <p key={i}>
                            <span className='user'>{u.user} -:User</span>
                            <span className='ai'>Ai:- {u.ai}</span>
                        </p>
                    ))}
                    </div>
                    <form className='task' onSubmit={sendTask}>
                        <input type="text" placeholder='Ask anything' onChange={handleTask} />
                        <input type="submit" value=">>" />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Prompt;
