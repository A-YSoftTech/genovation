import 'dotenv/config';

const logout = async(req, res)=>{
    try {
        res.clearCookie("token", {httpOnly : true, secure : process.env.NODE_ENV === "production", sameSite : "lax"});
        res.status(200).json({ success : true, message : "logout successfully"});
    } catch (error) {
        return res.status(500).json({message : error.message});
    }
}

export default logout;