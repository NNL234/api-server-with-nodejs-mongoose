const mongoose = require('mongoose');
const { User } = require('../models/user');
const ObjectId = mongoose.Types.ObjectId
const router = require('express').Router()
const auth = require('../middleware/auth')
//change password
router.put("/change-pwd",[auth], async function(req,res,next) {
    const user =await User.findOne({_id : req.decodedToken._id}).select("password")
    if(!user) res.send(400).send("invalid id")
    const newUser = await User.findByIdAndUpdate(req.decodedToken._id,{password:req.body.newPassword},{new:true})
    if(!newUser)
    return res.status(500).send("Error");
    res.send("Done")
    
})

module.exports = router