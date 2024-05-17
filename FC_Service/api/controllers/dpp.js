const Dpp = require('../models/dpp');
const mongoose = require('mongoose');



exports.get_doc_links = async (req,res, next) => {
	const id = req.params.dppId;
    Dpp.findById(id)
    .exec()
    .then(dpp => {
		if(dpp){
			console.log(dpp);
			res.status(200).json(dpp);
		}
		else {
			res.status(404).json({message:"No valid entry found"});
		}
       
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}


exports.register_doc = (req,res,next) => {
    const doc = req.body.dpp;

	const dpp = new Dpp({
        _id: doc.id,
        public_link: doc.public_link,
        private_link: doc.private_link
    });
    dpp
        .save()
        .then(result=> {
            console.log(result);
            res.status(201).json({
                message: "Document successfully registered"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
}







