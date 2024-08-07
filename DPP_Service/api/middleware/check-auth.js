const jwt = require('jsonwebtoken');


module.exports = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        req.userData = decoded;
        next();
    }catch(error){
        return res.status(401)
        .set('WWW-Authenticate','WWW-Authenticate : Bearer')
        .json({
            message:'Auth failed'
        });
    }
    


    
};