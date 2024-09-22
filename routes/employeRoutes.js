const express = require ("express")
const router = express.Router();
const{homepage, 
    employesignup, 
    employesignin, employesignout, currentemploye, 
    employesendmail, employeforgetlink, 
    employerestpassword, employeupdate, 
    employeorganizationlogo,
    createinterships, readinterships, readsingleinterships,
    createjobs, readjobs, readsinglejobs
} = require ("../controllers/employeControllers");

const { isAuthenticated } = require("../middleswares/auth");


// Get / route
router.get("/", isAuthenticated , homepage )

// post /curretuser/ employe
router.post("/employe", isAuthenticated , currentemploye)

//post employe signup
router.post("/signup", employesignup)

//post employe signin
router.post("/signin", employesignin)

//post employe signout
router.get("/signout", isAuthenticated   ,employesignout)

//post forget  send-mail
router.post("/send-mail", employesendmail)



//get forget-link||Reset password/employe:id send-mail
router.get("/forget-link/:id", employeforgetlink)


//post employe/rest-password/:employeid send-mail
router.post("/rest-password/:id", isAuthenticated ,employerestpassword)

//post employe/update/:employeid 
router.post("/update/:id", isAuthenticated ,employeupdate)

//post employe/organizationlogo/:employeid 
router.post("/organizationlogo/:id", isAuthenticated ,employeorganizationlogo)


//-----------------------------------------Interships---

//post employe/intership/create
router.post("/intership/create", isAuthenticated ,createinterships)

//post employe/intership/read
router.post("/intership/read", isAuthenticated ,readinterships)

//post employe/intership/read?/id
router.post("/intership/read/:id", isAuthenticated ,readsingleinterships)

//-----------------------------------------jobs---

//post employe/jobs/create
router.post("/jobs/create", isAuthenticated ,createjobs)

//post employe/jobs/read
router.post("/jobs/read", isAuthenticated ,readjobs)

//post employe/jobs/read?/id
router.post("/jobs/read/:id", isAuthenticated ,readsinglejobs)

module.exports = router;