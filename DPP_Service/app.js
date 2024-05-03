const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();



const userRoutes = require('./api/routes/users');
const dppRoutes = require('./api/routes/dpp');


app.use(morgan('dev'));
//Extract url and json data to make more readable
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//To prevent CORS Errors
app.use((req,res, next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE, GET');
        return res.status(200).json({});
    }
    next();
}); 

app.use('/users',userRoutes);
app.use('/dpp',dppRoutes);

//if a request reach this line there is an incorrect route

app.use((req,res, next) => {
	const error = new Error('Path not found');
	error.status = 404;
	next(error); //this forward the error request
})

app.use((error,req,res,next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports= app;
