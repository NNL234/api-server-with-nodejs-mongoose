const joi = require("joi")
const mongoose = require("mongoose")
const { SchedulePointAddress} = require("./schedulePointAddress")
const tourSchema = mongoose.Schema({
    name: {
        type : String,
        required:true,
    },
    schedule :{
        type: [{
            idSchedulePointAddressRef :{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"SchedulePointAddress"
            },
            index:{
                type:Number,
                required:true,
            },
            
            estimateTimeOfArrival:{
                type:Date,
                required :true
            },
            estimateTimeOfStay:{
                type:Number,
                required :true
            },
            idServiceRefs :{
                type: [mongoose.SchemaTypes.ObjectId],
                ref:"Service",
                require: true,
            },
           
        }],
        required: true,
        default : undefined,
    },
    describeTour :{
        type:String,
    },
    cost :{
        type:Number,
        required : true,
    }
})
tourSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret._id;
    },
});

const Tour = mongoose.model("Tour",tourSchema)
const validatePoint = (schedulePoint)=>{
    const schema = joi.object({
        index : joi.number().required(),
        idSchedulePointAddressRef: joi.ObjectId().required(),
        estimateTimeOfArrival :joi.date().required(),
        estimateTimeOfStay:joi.date().required(),
        cost: joi.number().required(),
        services :idServices.forEach(id=>joi.ObjectId().required())
        
    })
    return schema.validate(schedulePoint)
}

exports.validate = function(tour) {
    const schema = joi.object({
        name: joi.string().required(),
        schedule : (schedulePoints).forEach(schedulePoint=> validatePoint(schedulePoint)),
            describeTour : joi.string().required() 
        })
        return schema.validate(tour)
}
exports.Tour = Tour
