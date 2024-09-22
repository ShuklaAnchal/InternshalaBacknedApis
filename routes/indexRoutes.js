const express = require ("express")
const router = express.Router();
const{homepage, studentsignup,currentUser, 
    studentsignin, studentsignout,  
    studentsendmail, studentforgetlink, 
    studentrestpassword, studentupdate, 
    studentavatar, applyintership, applyjob} = require("../controllers/indexControllers");

const { isAuthenticated } = require("../middleswares/auth");


// Get / route
router.get("/", homepage )

// post /curretuser/ student
router.post("/student", isAuthenticated, currentUser)


//post student signup
router.post("/student/signup", studentsignup)

//post student signin
router.post("/student/signin", studentsignin)

//post student signout
router.get("/student/signout", isAuthenticated,studentsignout)

//post forget  send-mail
router.post("/student/send-mail", studentsendmail)


//get forget-link||Reset password/student:id send-mail
router.get("/student/forget-link/:id", studentforgetlink)


//post student/rest-password/:studentid send-mail
router.post("/student/rest-password/:id", isAuthenticated ,studentrestpassword)

//post student/update/:studentid 
router.post("/student/update/:id", isAuthenticated ,studentupdate)

//post student/avatar/:studentid send-mail
router.post("/student/avatar/:id", isAuthenticated ,studentavatar)

//---------------------apply interships---------

//post student/apply/:intershipid
router.post("/student/apply/intership/:intershipid", isAuthenticated ,applyintership)

//---------------------apply jobs---------

//post student/apply/:jobid
router.post("/student/apply/job/:jobid", isAuthenticated ,applyjob)


const {useravatar} = require("../controllers/multerController")

router.post("/upload", useravatar)

module.exports = router;