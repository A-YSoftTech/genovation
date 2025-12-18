import React from 'react'
import './History.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
const History = () => {
    const [aiData, setAiData] = useState([]);
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get("http://localhost:8999/history", { withCredentials: true });
                
                setAiData(response.data.history);
                alert(response.data.message);
            } catch (error) {
                alert( error.response.data.message);
                if (!error.response.data.success) {
                    window.location.href = "/";
                }
            }
        }
        fetchHistory();
    }, [])
    return (
        <div className='container_box'>
            <div className='talk-box'>
                <div className='header-box'>
                    <h1>History</h1>
                    <button onClick={()=>window.location.href = "/prompt"}>Chat</button>
                </div>
                <div className='communication-box'>
                    {aiData.map((u, i) => (
                        <p key={i}>
                            <span className='user'>{u.user} -:User</span>
                            <span className='ai'>Ai:- {u.ai}</span>
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default History
