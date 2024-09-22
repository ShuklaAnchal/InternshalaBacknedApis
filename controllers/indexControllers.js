const { catchAsyncErrors } = require("../middleswares/catchAsyncError");
const Student = require("../models/studentModle");
const ErorrHandler = require("../utils/ErrorHandler");
const {sendtoken}= require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
const path = require("path");
const Intership = require("../models/intershipModle");
const Job = require("../models/jobModle");
const imagekit = require("../utils/imagekit").initImageKit()


exports.homepage = catchAsyncErrors(
    async (req, res, next)=>{
     res.json({message:"Secure homepage!!"})
});


exports.currentUser = catchAsyncErrors(
    async (req, res, next)=>{
     const student = await Student.findById(req.id).exec();
        res.json({student})
});

exports.studentsignup = catchAsyncErrors(
    async (req, res, next)=>{
 const student = await new Student(req.body).save();
//  res.status(201).json(student);
sendtoken(student, 201, res)   
});

exports.studentsignin = catchAsyncErrors(
    async (req, res, next)=>{
       const student = await Student.findOne({email:req.body.email}).select("+password").exec();
       
   if(!student) return next(new ErorrHandler("user not found", 404))

   const isMatch = student.comparepassword(req.body.password)
   if (!isMatch) return next (new ErorrHandler("wrong credientials", 500))
   sendtoken(student, 201, res) 
 });

exports.studentsignout = catchAsyncErrors(
    async (req, res, next)=>{
        res.clearCookie("token");
        res.json({message:"Successfully signout!!"})
 });


exports.studentsendmail = catchAsyncErrors(
    async (req, res, next)=>{
        const student = await Student.findOne({email: req.body.email}).exec();
        if(!student) return next(new ErorrHandler("user not found", 404))

        const url = `${req.protocol}://${req.get("host")}/student/forget-link/${
            student._id
        }`
     
        sendmail(req, res, next, url);
        student.resetPasswordToken = "1";
        await student.save()
        res.json({student, url})
}); 


//studentforgetlink

exports.studentforgetlink = catchAsyncErrors(
    async (req, res, next)=>{
        const student = await Student.findById(req.params.id).exec();

        if(!student) return next(new ErorrHandler("user not found", 404))

        if(student.resetPasswordToken == "1"){
            student.resetPasswordToken = "0"
            student.password = req.body.password;
            await student.save()

        }  else{
            return next(
               new ErorrHandler("Invalid Reset Password Link! Please try again", 500))
        }
 

      res.status(200).json({
        message: "Password has been sucessfully changed"
      })
     
      
}); 


//rest-password

exports.studentrestpassword = catchAsyncErrors(
    async (req, res, next)=>{
        const student = await Student.findById(req.id).exec();
          
            student.password = req.body.password;
            await student.save()
      
            sendtoken(student, 201, res) 
     
      
}); 

exports.studentupdate = catchAsyncErrors( async ( req, res, next)=>{
    const student = await Student.findByIdAndUpdate(req.params.id, req.body).exec();
    res.status(200).json({
        success: true,
        message:"student detiles updated!!"
    })
})

exports.studentavatar = catchAsyncErrors( async ( req, res, next)=>{
   const student = await Student.findById(req.params.id).exec();
   const file = req.files.avatar;
   const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(
    file.name
   )}`;

if(student.avatar.fileId !== ""){
      await imagekit.deleteFile(stud.avatar.fileId)
}

  const {fileId, url} = await imagekit.upload({
    file:file.data,
    fileName: modifiedFileName
  })

  student.avatar= { fileId, url}
  await student.save()
    res.status(200).json({
    success: true,
    message:"student Profile image updated!!"
})
})


//------------apply intership

exports.applyintership = catchAsyncErrors(
    async (req, res, next)=>{
     const student = await Student.findById(req.id).exec();
     const intership = await Intership.findById(req.params.intershipid).exec();

     student.interships.push(intership._id);
     intership.students.push(student._id);
     await student.save();
     await intership.save();
        res.json({student})
});

//------------apply job

exports.applyjob = catchAsyncErrors(
    async (req, res, next)=>{
     const student = await Student.findById(req.id).exec();
     const job = await Job.findById(req.params.jobid).exec();

     student.jobs.push(job._id);
     job.students.push(student._id);
     
     await student.save();
     await job.save();
        res.json({student, job})
});

