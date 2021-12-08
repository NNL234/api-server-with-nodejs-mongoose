const mongoose = require("mongoose")
const joi = require("joi")
const serviceSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
    }
})

const Service = mongoose.model("Service",serviceSchema)
exports.validate = function(service) {
    const schema = joi.object({
        name : joi.string().required()
    })
    return schema.validate(service)
}
exports.Service = Service