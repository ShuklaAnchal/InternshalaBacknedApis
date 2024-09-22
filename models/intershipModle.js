
const mongoose = require('mongoose');


const intershipModle = new mongoose.Schema(
    {
        employe:{type:mongoose.Schema.Types.ObjectId, ref:'employe'},
        students:[{type:mongoose.Schema.Types.ObjectId, ref:'student'}],
        profile:String,
        skills:String,
        intershiptype:{type: String, enum:["In Office", "Remote"]},
        opening:Number,
        from:String,
        to:String,
        duration:String,
        responsbility:String,
        stipend:{ 
            status:{
                type:String,
               enum:["Fixed", "Negotiable", "Performance Bases", "Unpaid"]
        },
        amount:Number,
    },
    perks:String,
    assements:String
    },
    { timestamps:true}
)



const Intership =mongoose.model("intership", intershipModle)

module.exports = Intership;