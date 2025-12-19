import React from 'react'
import './History.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
const History = () => {
    const [aiData, setAiData] = useState([]);
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get("http://localhost:8999/history", { withCredentials: true });
                toast.success(response.data.message);
                setAiData(response.data.history);
            } catch (error) {
                toast.error(error.response.data.message);
                if (!error.response.data.success) {
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 1500);
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
                    <button onClick={() => window.location.href = "/prompt"}>Chat</button>
                </div>
                <div className='communication-box'>
                    {aiData.map((u, i) => (
                        <p key={i}>
                            <span className='user'>{u.user} -: <b>You</b></span>
                            <span className='ai'><b>AI</b> :- {u.ai}</span>
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default History
