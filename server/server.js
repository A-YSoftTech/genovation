
import 'dotenv/config';
import express from 'express';
import connectDatabase from './database/connect.js';
import router from './routes/userRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({origin : process.env.CLIENT_URL, credentials : true}));
app.use(express.json());
app.use(cookieParser());
app.use("/", router);

connectDatabase();
app.listen(process.env.PORT, ()=>{
    console.log("server is online");
});