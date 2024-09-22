const express = require ("express")
const router = express.Router();
const { isAuthenticated } = require("../middleswares/auth");
const {resume, addeducation, editeducation, deleteeducation,
addjobs, editjobs, deletejobs,
addinter, editinter, deleteinter,
addresp, editresp, deleteresp,
addcourse, editcourse, deletecourse,
addproject, editproject, deleteproject,
addskills, editskills, deleteskills,
addaccomplishments, editaccomplishments, deleteaccomplishments
  }= require("../controllers/resumeControllers")


// Get / route
router.get("/", isAuthenticated, resume)

router.post("/add-edu", isAuthenticated, addeducation)

router.post("/edit-edu/:eduid", isAuthenticated, editeducation)

router.post("/delete-edu/:eduid", isAuthenticated, deleteeducation)

//----------------Jobs------------

router.post("/add-jobs", isAuthenticated, addjobs)

router.post("/edit-jobs/:jobsid", isAuthenticated, editjobs)

router.post("/delete-jobs/:jobsid", isAuthenticated, deletejobs)

//----------------intership------------

router.post("/add-inter", isAuthenticated, addinter)

router.post("/edit-inter/:interid", isAuthenticated, editinter)

router.post("/delete-inter/:interid", isAuthenticated, deleteinter)

//----------------Responsbilities--


router.post("/add-resp", isAuthenticated, addresp)

router.post("/edit-resp/:respid", isAuthenticated, editresp)

router.post("/delete-resp/:respid", isAuthenticated, deleteresp)

//----------------Courses--


router.post ("/add-course", isAuthenticated, addcourse)

router.post ("/edit-course/:courid", isAuthenticated, editcourse)

router.post ("/delete-course/:courid", isAuthenticated, deletecourse)

//----------------Projects--


router.post ("/add-project", isAuthenticated, addproject)

router.post ("/edit-project/:proid", isAuthenticated, editproject)

router.post ("/delete-project/:proid", isAuthenticated, deleteproject)

//----------------Skills--

router.post ("/add-skills", isAuthenticated, addskills)

router.post ("/edit-skills/:skiid", isAuthenticated, editskills)

router.post ("/delete-skills/:skiid", isAuthenticated, deleteskills)

//----------------accomplishments--

router.post ("/add-accomplishments", isAuthenticated, addaccomplishments)

router.post ("/edit-accomplishments/:accid", isAuthenticated, editaccomplishments)

router.post ("/delete-accomplishments/:accid", isAuthenticated, deleteaccomplishments)





module.exports = router;