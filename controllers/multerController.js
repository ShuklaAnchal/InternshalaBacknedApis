const multer = require("multer");
const { catchAsyncErrors } = require("../middleswares/catchAsyncError");
// const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const bcrypt = require("bcrypt");
const { token } = require("morgan");
const path = require("path");
const Images = require("../models/multermodle");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/images/';
        if (!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage }).single('avatar');
  
  exports.useravatar = catchAsyncErrors(async (req, res, next) =>{
  
      try {
        upload(req, res, (err) => {
          res.status(200).send({
            message: "File uploaded!",
            // file: `uploads/images/${req.files.avatar.name}`,
          });
          console.log(req.file);
          
      })
      } catch (error) {
        console.log(error);
      }
    
  })