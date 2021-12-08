const mongoose = require("mongoose");
const joi =require('joi')
const Schema =  mongoose.Schema;
const userSchema = new Schema({
    username : {
        type : String,
        required :true,
    },
    password: {
        type : String,
        required : true,
    }
    
})

const User = mongoose.model("User",userSchema)

function validate(user){
    const schema = joi.object({
        username: joi.string().min(5).required().label("Username"),
        password:joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
        .required()
        .label("Password"),
        idRoleRef:joi.objectId().required(),
    })
    return schema.validate(user)
}
exports.User =User;
exports.validateUser = validate;