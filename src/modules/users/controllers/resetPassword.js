const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const { emailManger } = require("../../../manager/emailManger");

const resetPasswordController = async (req, res) => {

    const userModel = mongoose.model('users');

    const { email, resetCode, newPassword } = req.body;

    if (!email) throw "Email is required";
    if (!newPassword) throw "new password required";
    if (newPassword.length < 5) throw "new password must be at least 5 character long";
    if (!resetCode) throw "reset code is required"


    const getUserWithResetCode = await userModel.findOne({
        email: email,
        reset_code: resetCode,
    })

    if (!getUserWithResetCode) throw "Incorrect verification Code or email address";
    // if(email !== getUserWithResetCode.email) throw "Invalid email";

    const hashPassword = await bcrypt.hash(newPassword, 12);

    await userModel.updateOne({
        email: email,
    },
        {
            password: hashPassword,
            reset_code: ""
        },
        {
            runValidators: true
        }
    )

    let host = "http://localhost:8000/api/users/reset-password";

    await emailManger(email, "Your password has been successfully changed, if you did not trigger this action, please reset your password quickly using " + `${host}`, "Password reset");

    res.status(200).json({
        status: "success",
        message: "Password reset successfully"
    })

}

module.exports = {
    resetPasswordController
}