const { json } = require("express");
const { catchAsyncErrors } = require("../middleswares/catchAsyncError");
const Employe = require("../models/employeModle");
const ErorrHandler = require("../utils/ErrorHandler");
const {sendtoken}= require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
const path = require("path");
const Intership = require("../models/intershipModle");
const Job = require("../models/jobModle");

const imagekit = require("../utils/imagekit").initImageKit()

exports.homepage = catchAsyncErrors(
    async (req, res, next)=>{
     res.json({message:" Secure Employe homepage!!"})
});


exports.currentemploye = catchAsyncErrors(
    async (req, res, next)=>{
     const employe = await Employe.findById(req.id).exec();
        res.json({employe})
});

exports.employesignup = catchAsyncErrors(
    async (req, res, next)=>{
 const employe = await new Employe(req.body).save();
//  res.status(201).json(employe);
sendtoken(employe, 201, res)   
});

exports.employesignin = catchAsyncErrors(
    async (req, res, next)=>{
       const employe = await Employe.findOne({email:req.body.email}).select("+password").exec();
       
   if(!employe) return next(new ErorrHandler("user not found", 404))

   const isMatch = employe.comparepassword(req.body.password)
   if (!isMatch) return next (new ErorrHandler("wrong credientials", 500))


   sendtoken(employe, 201, res) 
 });

exports.employesignout = catchAsyncErrors(
    async (req, res, next)=>{
        res.clearCookie("token");
        res.json({message:"Successfully signout!!"})
 });


 exports.employesendmail = catchAsyncErrors(
    async (req, res, next)=>{
        const employe = await Employe.findOne({email: req.body.email}).exec();
        if(!employe) return next(new ErorrHandler("user not found", 404))

        const url = `${req.protocol}://${req.get("host")}/employe/forget-link/${
           employe._id
        }`
     
        sendmail(req, res, next, url);
       employe.resetPasswordToken = "1";
        await employe.save()
        res.json({employe, url})
}); 


//employeforgetlink

exports.employeforgetlink = catchAsyncErrors(
    async (req, res, next)=>{
        const employe = await Employe.findById(req.params.id).exec();

        if(!employe) return next(new ErorrHandler("user not found", 404))

        if(employe.resetPasswordToken == "1"){
            employe.resetPasswordToken = "0"
            employe.password = req.body.password;
            await employe.save()

        }  else{
            return next(
               new ErorrHandler("Invalid Reset Password Link! Please try again", 500))
        }
 

      res.status(200).json({
        message: "Password has been sucessfully changed"
      })
     
      
}); 


//rest-password

exports.employerestpassword = catchAsyncErrors(
    async (req, res, next)=>{
        const employe = await Employe.findById(req.id).exec();
          
            employe.password = req.body.password;
            await employe.save()
      
            sendtoken(employe, 201, res) 
     
      
}); 

exports.employeupdate = catchAsyncErrors( async ( req, res, next)=>{
    const employe = await Employe.findByIdAndUpdate(req.params.id, req.body).exec();
    res.status(200).json({
        success: true,
        message:"employe detiles updated!!"
    })
})

exports.employeorganizationlogo = catchAsyncErrors( async ( req, res, next)=>{
   const employe = await Employe.findById(req.params.id).exec();
   const file = req.files.organizationlogo;
   const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(
    file.name
   )}`;

if(employe.organizationlogo.fileId !== ""){
      await imagekit.deleteFile(employe.organizationlogo.fileId)
}

  const {fileId, url} = await imagekit.upload({
    file:file.data,
    fileName: modifiedFileName
  })

  employe.organizationlogo= { fileId, url}
  await employe.save()
    res.status(200).json({
    success: true,
    message:"employe Profile image updated!!"
})
})

//-----------------------intership

exports.createinterships = catchAsyncErrors(
    async (req, res, next)=>{
 const employe = await Employe.findById(req.id).exec();
 const intership = await new Intership(req.body);
 intership.employe= employe._id;
 employe.interships.push(intership._id);
 await  intership.save();
 await  employe.save();
 res.status(201).json({success: true, intership});
 
});


exports.readinterships = catchAsyncErrors(
    async (req, res, next)=>{
        const {interships} = await Employe.findById(req.id).populate("interships").exec();
        res.status(200).json({success: true, interships});
 
});

exports.readsingleinterships = catchAsyncErrors(
    async (req, res, next)=>{
 const intership = await Intership.findById(req.params.id).exec();
 res.status(200).json({success: true, intership});
 
});


//-----------------------Jobs

exports.createjobs = catchAsyncErrors(
    async (req, res, next)=>{
 const employe = await Employe.findById(req.id).exec();
 const job = await new Job(req.body);
 job.employe= employe._id;
 employe.jobs.push(job._id);
 await  job.save();
 await  employe.save();
 res.status(201).json({success: true, job});
 
});


exports.readjobs = catchAsyncErrors(
    async (req, res, next)=>{
        const {jobs} = await Employe.findById(req.id).populate("jobs").exec();
        res.status(200).json({success: true, jobs});
 
});

exports.readsinglejobs = catchAsyncErrors(
    async (req, res, next)=>{
 const job = await Job.findById(req.params.id).exec();
 res.status(200).json({success: true, job});
 
});