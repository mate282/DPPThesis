

//GET: download document with name specified in the request params
exports.get_doc = (req,res, next) => {
    const id = req.params.fileId;

    res.download(process.env.DOC_PATH + id + ".json", (err) => {
		if (err) {
		  console.error('Error sending file:', err);
		  res.status(err.status).end();
		} else {
		  console.log('File sent successfully');
		}
	  });
}


//POST: upload document
exports.create_doc = (req,res,next) =>{

	console.log(req.body);
	
    res.status(201).json({
        message: "File uploaded"
    });    

	
}







