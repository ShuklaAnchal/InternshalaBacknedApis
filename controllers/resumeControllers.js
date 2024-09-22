
const { catchAsyncErrors } = require("../middleswares/catchAsyncError");
const Student = require("../models/studentModle");
const { v4: uuidv4 } = require('uuid');
const ErorrHandler = require("../utils/ErrorHandler");


exports.resume = catchAsyncErrors(
    async (req, res, next)=>{
        const {resume} = await Student.findById(req.id).exec(); 
     res.json({message:" Secure resume page!!", resume})
});

exports.addeducation = catchAsyncErrors(
    async (req, res, next)=>{
        const student = await Student.findById(req.id).exec(); 
        student.resume.education.push({...req.body, id:uuidv4()});
        await student.save();
     res.json({message:"Education added"})
});

exports.editeducation = catchAsyncErrors(
    async (req, res, next)=>{
        const student = await Student.findById(req.id).exec(); 
        const eduIndex = student.resume.education.findIndex(
            (i) => i.id === req.params.eduid
        );
     student.resume.education[eduIndex]={
        ...student.resume.education[eduIndex], ...req.body
     }

        await student.save();
     res.json({message:"Education updated"})
});

exports.deleteeducation = catchAsyncErrors(
    async (req, res, next)=>{
        const student = await Student.findById(req.id).exec(); 
        const filtrededu = student.resume.education.filter(
            (i) => i.id !== req.params.eduid
        );
     student.resume.education = filtrededu;

        await student.save();
     res.json({message:"Education deleted"})
});

exports.addjobs = catchAsyncErrors(
    async (req, res, next)=>{
        const student = await Student.findById(req.id).exec(); 
        student.resume.jobs.push({...req.body, id:uuidv4()});
        await student.save();
     res.json({message:"job added"})
});

exports.editjobs = catchAsyncErrors(
    async (req, res, next)=>{
        const student = await Student.findById(req.id).exec(); 
        const jobsIndex = student.resume.jobs.findIndex(
            (i) => i.id === req.params.jobsid
        );
     student.resume.jobs[jobsIndex]={
        ...student.resume.jobs[jobsIndex], ...req.body
     }
        await student.save();
     res.json({message:"jobupdated"})
});

exports.deletejobs = catchAsyncErrors(
    async (req, res, next)=>{
        const student = await Student.findById(req.id).exec(); 
        const filtredjobs = student.resume.jobs.filter(
            (i) => i.id !== req.params.jobsid
        );
     student.resume.jobs = filtredjobs;

        await student.save();
     res.json({message:"jobs deleted"})
});


exports.addinter = catchAsyncErrors(
    async (req, res, next)=>{
        const student = await Student.findById(req.id).exec(); 
        student.resume.interships.push({...req.body, id:uuidv4()});
        await student.save();
     res.json({message:"intership added"})
});

exports.editinter = catchAsyncErrors(
    async (req, res, next)=>{
        const student = await Student.findById(req.id).exec(); 
        const interIndex = student.resume.interships.findIndex(
            (i) => i.id === req.params.interid
        );
     student.resume.interships[interIndex]={
        ...student.resume.interships[interIndex], ...req.body
     }
        await student.save();
     res.json({message:"interships updated"})
});

exports.deleteinter = catchAsyncErrors(
    async (req, res, next)=>{
        const student = await Student.findById(req.id).exec(); 
        const filtrededu = student.resume.interships.filter(
            (i) => i.id !== req.params.interid
        );
     student.resume.interships = filtrededu;

        await student.save();
     res.json({message:"intershipdeleted"})
});

exports.addresp = catchAsyncErrors(
    async(req, res, next)=>{
        const student= await Student.findById(req.id).exec();
        student.resume.responsbilities.push({ ...req.body, id:uuidv4()});
        await student.save();
        res.json({ message:"responsbilities added"})
    
})

exports.editresp = catchAsyncErrors(
    async(req, res, next)=>{
        const student= await Student.findById(req.id).exec();
        const respIndex = student.resume.responsbilities.findIndex(
            (i) => i.id === req.params.respid
        );
        student.resume.responsbilities[respIndex]={
            ...student.resume.responsbilities[respIndex], ...req.body
        }
        await student.save();
        res.json({message:"Responsbilities edited"})
    }
)

exports.deleteresp = catchAsyncErrors(
    async(req, res, next)=>{
        const student = await Student. findById(req.id).exec();
        const filtrededu = student.resume.responsbilities.filter(
            (i) => i.id !== req.params.respid
        );
     student.resume.responsbilities = filtrededu;

        await student.save();
     res.json({message:"Responsbilities Deleted"})
    }
)

exports.addcourse = catchAsyncErrors(
    async(req, res, next)=>{
        const student= await Student.findById(req.id).exec();
        student.resume.courses.push({ ...req.body, id:uuidv4()});
        await student.save();
        res.json({ message:"Courses added"})
    
})

exports.editcourse = catchAsyncErrors(
    async(req, res, next)=>{
        const student= await Student.findById(req.id).exec();
        const respIndex = student.resume.courses.findIndex(
            (i) => i.id === req.params.courid
        );
        student.resume.courses[respIndex]={
            ...student.resume.courses[respIndex], ...req.body
        }
        await student.save();
        res.json({message:"courses edited"})
    }
)

exports.deletecourse = catchAsyncErrors(
    async(req, res, next)=>{
        const student = await Student. findById(req.id).exec();
        const filtrededu = student.resume.courses.filter(
            (i) => i.id !== req.params.courid
        );
     student.resume.courses = filtrededu;

        await student.save();
     res.json({message:"course Deleted"})
    }
)


exports.addproject = catchAsyncErrors(
    async(req, res, next)=>{
        const student= await Student.findById(req.id).exec();
        student.resume.projects.push({ ...req.body, id:uuidv4()});
        await student.save();
        res.json({ message:"projects added"})
    
})

exports.editproject = catchAsyncErrors(
    async(req, res, next)=>{
        const student= await Student.findById(req.id).exec();
        const respIndex = student.resume.projects.findIndex(
            (i) => i.id === req.params.proid
        );
        student.resume.projects[respIndex]={
            ...student.resume.projects[respIndex], ...req.body
        }
        await student.save();
        res.json({message:"projects edited"})
    }
)

exports.deleteproject = catchAsyncErrors(
    async(req, res, next)=>{
        const student = await Student. findById(req.id).exec();
        const filtrededu = student.resume.courses.filter(
            (i) => i.id !== req.params.proid
        );
     student.resume.projects = filtrededu;

        await student.save();
     res.json({message:"projects Deleted"})
    }
)


exports.addskills = catchAsyncErrors(
    async(req, res, next)=>{
        const student= await Student.findById(req.id).exec();
        student.resume.skills.push({ ...req.body, id:uuidv4()});
        await student.save();
        res.json({ message:"skills added"})
    
})

exports.editskills = catchAsyncErrors(
    async(req, res, next)=>{
        const student= await Student.findById(req.id).exec();
        const respIndex = student.resume.skills.findIndex(
            (i) => i.id === req.params.skiid
        );
        student.resume.skills[respIndex]={
            ...student.resume.skills[respIndex], ...req.body
        }
        await student.save();
        res.json({message:"Skills edited"})
    }
)

exports.deleteskills = catchAsyncErrors(
    async(req, res, next)=>{
        const student = await Student. findById(req.id).exec();
        const filtrededu = student.resume.skills.filter(
            (i) => i.id !== req.params.skiid
        );
     student.resume.skills = filtrededu;

        await student.save();
     res.json({message:"skills Deleted"})
    }
)

exports.addaccomplishments = catchAsyncErrors(
    async(req, res, next)=>{
        const student= await Student.findById(req.id).exec();
        student.resume.accomplishments.push({ ...req.body, id:uuidv4()});
        await student.save();
        res.json({ message:"Accomplishments added"})
    
})

exports.editaccomplishments = catchAsyncErrors(
    async(req, res, next)=>{
        const student= await Student.findById(req.id).exec();
        const respIndex = student.resume.accomplishments.findIndex(
            (i) => i.id === req.params.accid
        );
        student.resume.accomplishments[respIndex]={
            ...student.resume.accomplishments[respIndex], ...req.body
        }
        await student.save();
        res.json({message:"accomplishmentsedited"})
    }
)

exports.deleteaccomplishments = catchAsyncErrors(
    async(req, res, next)=>{
        const student = await Student. findById(req.id).exec();
        const filtrededu = student.resume.accomplishments.filter(
            (i) => i.id !== req.params.accid
        );
     student.resume.accomplishments = filtrededu;

        await student.save();
     res.json({message:"accomplishments Deleted"})
    }
)