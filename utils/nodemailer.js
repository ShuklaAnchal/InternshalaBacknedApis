const nodemailer = require("nodemailer")
const ErorrHandler = require("./ErrorHandler")

exports.sendmail = (req, res, next, url)=>{
    const transport = nodemailer.createTransport({
        service:"gmail",
        host:"smtp.gmail.com",
        post: 465,
        auth:{
            user:process.env.MAIL_EMAIL_ADDRESS,
            pass:process.env.MAIL_PASSWORD,
        }
    })

  const mailOptions ={
    from:"Anchal prv limited ",
    to: req.body.email,
    subject:"password Reset Link",
    html:`<h1>Click Below link to reset your password
    </h1>  <a  href="${url}">Passwotrd Reser</a>`
};

transport.sendMail(mailOptions, (err, info)=>{
    if(err) return next (new ErorrHandler(err, 500))
    console.log(info);
return res.status(200).json({
    message:"mail send successfully",
    url
})
})

}