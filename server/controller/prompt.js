import { GoogleGenAI } from "@google/genai";
import promptModel from "../models/promptModel.js";
import 'dotenv/config';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
const gemeni = async (task) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: task,
        });
        return response.text;
    } catch (error) {
        throw error;
    }
}


const prompt = async (req, res) => {
    try {
        const { task } = req.body;
        const id = req.userId;
        
        if (!task || task.trim().length < 3) {
            return res.status(400).json({ message: "Your task is too short!" });
        }
        if (!id) {
            return res.status(400).json({ message: "Token unavailable" });
        }
        const data = await gemeni(task);
        if (data) {
            const store = new promptModel({ user: task, ai: data, userId: id });
            const result = await store.save();
            res.status(200).json({ message: "all working", store });
        }
    } catch (error) {
        if (error.message === "QUOTA_EXCEEDED") {
            return res.status(429).json({
                message: "AI quota exceeded. Try later."
            });
        }
        return res.status(500).json({ message: error.message });
    }
}
export default prompt;
