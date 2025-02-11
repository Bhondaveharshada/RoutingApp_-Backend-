const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        
        const decoded = jwt.verify(token,process.env.JWT_key)
        req.userData = decoded;
        next();
    }catch(error){
        return res.status(401).json({
            message:"Auth Failed.ensure you are logged in",
            Error:error
        });
    }
}

