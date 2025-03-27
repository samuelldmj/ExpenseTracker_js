const { default: mongoose } = require("mongoose")
const { emailManger } = require("../../../manager/emailManger");


const forgotPasswordController = async (req, res) => {

    const userModel = mongoose.model("users");
    const { email } = req.body;

    if (!email) throw "Email is required";

    const getUserByEmail = await userModel.findOne(
        {
            email: email
        }
    );

    if (!getUserByEmail) throw "This email does not exist";

    const resetCode = Math.floor(10000 + Math.random() * 90000);

    const updatedEmail = await userModel.updateOne({
        email
    },
        {
            reset_code: resetCode
        },
        {
            runValidators: true
        }
    );


    await emailManger(getUserByEmail.email, "welcome to expense tracker PRO, your new password is " + resetCode, "Reset Your Password");


    res.status(200).json({
        status: "success",
        message: "Reset code sent to email successfully"
    })


}

module.exports = {
    forgotPasswordController
}