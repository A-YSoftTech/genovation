
import 'dotenv/config';
import express from 'express';
import connectDatabase from './database/connect.js';
import router from './routes/userRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({origin : "http://localhost:5173", credentials : true}));
app.use(express.json());
app.use(cookieParser());
app.use("/", router);

connectDatabase();
app.listen("8999", ()=>{
    console.log("server is online");
});