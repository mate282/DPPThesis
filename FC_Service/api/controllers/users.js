const jwt = require('jsonwebtoken');
const User = require('../models/user');
const mongoose = require('mongoose');

exports.login_user = (req,res,next)=>{
	const name = req.body.name;
    const psw = req.body.psw;

    User.findById(name)
    .exec()
    .then(user => {
		if(user){
             //Check user identity
            if(psw != user.psw ){
                console.log('Wrong Psw');
                return res.status(401).json({message: 'Auth Failed'});
            }
            else{
                //creare JWT
                const token = jwt.sign({
                    name: name,
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
		}
		else {
			res.status(401).json({message:"Auth Failed"});
		}


       
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });


   
}

exports.register_user = (req,res,next)=>{
	const name = req.body.name;
    const psw = req.body.psw;

    const user = new User({
        _id: name,
        psw: psw
    });

    user.save()
        .then(result =>{
            console.log(result);
            const token = jwt.sign({
                name: name,
            },
            process.env.SECRET_KEY, 
            {
                expiresIn: "1h"
            });
            res.status(201).json({
                message:'User registered',
                token: token
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });

}










