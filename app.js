require("dotenv").config({path: "./.env"});

const express = require("express");
const app = express();



app.use(require('cors')())



//DB connection

require("./models/database").connectDatabase();

//logger

const logger = require("morgan");
app.use(logger("tiny"));

//bodyparser
app.use(express.json());
app.use(express.urlencoded({extended: false}))

//session and cookie

const session = require("express-session");
const cookieparser = require ("cookie-parser")
app.use(session({
   resave: true,
   saveUninitialized: true,
   secret: process.env.EXPRESS_SESSION_SECRET
}))

app.use(cookieparser());

//express file-upload
const fileupload = require("express-fileupload")
app.use(fileupload());



//routes

app.use("/", require("./routes/indexRoutes"))
app.use("/resume", require("./routes/resumeRoutes"))
app.use("/employe", require("./routes/employeRoutes"))

//error handling
const ErorrHandler = require("./utils/ErrorHandler");
const { genetatedErrors } = require("./middleswares/error");

app.all("*", (req, res, next)=>{
   next(new ErorrHandler(`requesnted URL not Found ${req.url}`), 404);
});
app.use(genetatedErrors);



app.listen(
   process.env.PORT,
   console.log(`server running on port ${process.env.PORT}`)
);


// app.listen(PORT, function () {
//    console.log(`CORS-enabled web server listening on port ${PORT}`);
//  });