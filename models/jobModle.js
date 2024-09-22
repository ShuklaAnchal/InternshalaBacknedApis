
const mongoose = require('mongoose');


const jobModle = new mongoose.Schema(
    {        
        employe:[{type:mongoose.Schema.Types.ObjectId, ref:'employe'}],
        students:{type:mongoose.Schema.Types.ObjectId, ref:'student'},
        title:String,
        skills:String,
        jobtype:{type: String, enum:["In Office", "Remote"]},
        opening:Number,
        descripition:String,
        salary:Number,
        perks:String,
        preferences:String,
        assesment:String,
    },

    { timestamps:true}
)



const Job =mongoose.model("job", jobModle)

module.exports = Job;