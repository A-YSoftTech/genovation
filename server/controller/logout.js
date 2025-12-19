import 'dotenv/config';

const logout = async(req, res)=>{
    try {
        res.clearCookie("token", {httpOnly : true, secure : true, sameSite : "none"});
        res.status(200).json({ success : true, message : "logout successfully"});
    } catch (error) {
        return res.status(500).json({message : error.message});
    }
}

export default logout;