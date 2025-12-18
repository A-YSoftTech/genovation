

import express from 'express';
import register from '../controller/register.js';
import login from '../controller/login.js';
import verifyToken from '../middleware/middleware.js';
import fetch from '../controller/fetch.js';
import prompt from '../controller/prompt.js';
import history from '../controller/history.js';


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/prompt",verifyToken, prompt);
router.get("/fetch", verifyToken, fetch);
router.get("/history", verifyToken, history);



export default router;