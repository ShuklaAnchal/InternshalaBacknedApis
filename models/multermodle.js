const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ImageModle = new mongoose.Schema(
    {
      
        avatar: {
            type: String,
            
        },
       
    },
    { timestamps :true}
)



const Images = mongoose.model("image", ImageModle)

module.exports = Images;