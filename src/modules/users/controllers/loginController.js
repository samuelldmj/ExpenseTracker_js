const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');


const loginController = async (req, res) => {

const {email, password} = req.body;
const userModel = mongoose.model('users');

getUserByEmail = await userModel.findOne({email : email});
const comparePassword = await bcrypt.compare(password, getUserByEmail.password);
console.log(getUserByEmail);


if(!getUserByEmail || !comparePassword){
   return  res.status(400).json({
        status : "failed",
        message : "Invalid email or password"
    });
}


res.status(200).json({
    status : "success",
    message : "user logged in successfully"
});



}

module.exports = {
    loginController
}