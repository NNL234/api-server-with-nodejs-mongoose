const mongoose= require('mongoose')
const joi = require('joi');

const schedulePointAddressSchema = new mongoose.Schema({
    name :{
        type :String,
        required:true,
    },
})
const schedulePointAddress = mongoose.model("SchedulePointAddress",schedulePointAddressSchema)
exports.schedulePointAddress = schedulePointAddress;
exports.validate= function(schedulePointAddress){
    const schema= joi.object({
        name: joi.string().required(),
       
    })
    return schema.validate(schedulePointAddress)
}