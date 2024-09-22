
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const employeModle = new mongoose.Schema(
    {
        firstname: {
            type:String,
            required: [true, "FirstName is required"],
            minLength:[4, "FirstName Should be a 4 charcters"]
           
        },
        lastname: {
            type:String,
            required: [true, "LastName is required"],
            minLength:[4, "LastName Should be a 4 charcters"]
        },
        organizationlogo : {
            type: Object,
            default:{
                fileId:"",
                url:"https://unsplash.com/photos/a-woman-wearing-a-hat-and-sunglasses-standing-in-the-snow-0kZkAkR10TE"
            },
        },
        contact: {
            type: Number,
            requires:[true, "Contact is requires"],
            minLength:[10, "Contact should be altest 10 digits"],
            maxLength:[10, "Contact should be altest 10 digits"]
        },
        
        email:{
            type:String,
            required: [true, "Email is required"],
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
        },
        password:{
            type:String,
            select :false,
            maxLength:[
                15, " Password should not exceed more than 15 charcters"
            ],
            minLength:[
                6, "password should more than 6 charcters"
            ]
        },
        resetPasswordToken: {
             type:String,
             default:"0",
        },

        organizationname: {
            type:String,
            required: [true, "Organization Name is required"],
            minLength:[4, "organizationName Should be a 4 charcters"]
           
        },
        interships:[
            {type:mongoose.Schema.Types.ObjectId, ref:'intership'}
        ],
        jobs:[
            {type:mongoose.Schema.Types.ObjectId, ref:'job'}
        ],
    },
    { timestamps :true}
)

employeModle.pre("save", function(){

if(!this.isModified("password")){
    return;
}

let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt)


})

employeModle.methods.comparepassword= function(password){
    return bcrypt.compareSync(password, this.password)
}

employeModle.methods.getjwttoken = function(){
    return  jwt.sign({ id: this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    })
}

const Employe =mongoose.model("employe", employeModle)

module.exports = Employe;