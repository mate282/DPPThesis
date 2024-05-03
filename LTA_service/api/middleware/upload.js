const multer = require('multer');

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,process.env.DOC_PATH);
    },
    filename :(req,file,cb)=>{
        cb(null,file.originalname)
    }
});

const fileFilter = (req,file, cb) => {
    console.log("Filtering...");

    //Accept only json files
    if(file.mimetype != 'application/json')
        cb(new Error("File not accepted"),false); //ignore the file
    else{
        cb(null,true); //pass the file
    }
    
}

const upload = multer({
    storage:storage,
    //Limit to 1GB
    limits: { fileSize: 1024*1024*1024 },
    fileFilter: fileFilter
});

module.exports = upload;