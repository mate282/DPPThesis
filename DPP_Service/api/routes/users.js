const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


router.post('/login',(req,res,next)=> {
    const email = req.body.email;
    const psw = req.body.psw;
    
    //Check user identity
    if(email != 'test' || psw != 'test' ){
        console.log('Wrong Email');
        return res.status(401).json({message: 'Auth Failed'});
    }
    else{
        //creare JWT
        const token = jwt.sign({
            email: email,
        },
        process.env.SECRET_KEY, 
        {
            expiresIn: "1h"
        });

        console.log('Login successfull');
        //return JWT
        return res.status(200).json({
            message : 'Login successful',
            token: token
        });
    }
    
});

module.exports= router;