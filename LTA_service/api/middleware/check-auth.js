


module.exports = (req,res,next) => {
    try{

        const receivedkey = req.headers['x-api-key'];
        const storedKey = process.env.API_KEY;
        if(receivedkey===storedKey){
            next();
        }else{
            res.status(401).json({
                messsage: "Auth Failed"
            });
        }
        
    }catch(error){
        res.status(500).json({
            messsage: "Request error"
        });
    }
    


    
};