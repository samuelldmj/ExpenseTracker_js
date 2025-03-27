const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');
const { jwtManager } = require("../../../manager/jwtManager");
const { emailManger } = require("../../../manager/emailManger");


const registerUserController = async (req, res, next) => {
    const { fName, email, password, confirmPassword, balance } = req.body;

    const userModel = mongoose.model('users');

    const getDuplicateEmail = await userModel.findOne({ email: email });

    if (!fName) {
        // Throw an error with a message
        return next(new Error("Your full name is required"));
    }

    if (getDuplicateEmail) {
        // Throw an error with a message
        return next(new Error("This Email Already Exists"));
    }

    if (!password) {
        // Throw an error with a message
        return next(new Error("Password is required"));
    }

    if (password !== confirmPassword) {
        // Throw an error with a message
        return next(new Error("Password and ConfirmPassword does not match"));
    }

    if (password.length < 5) {
        // Throw an error with a message
        return next(new Error("Password must be at leat 5 characters"));
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const createUser = await userModel.create({
        full_name: fName,
        email: email,
        password: hashPassword,
        balance: balance,
    });

    await emailManger(createUser.email, "welcome to expense tracker PRO, we hope you can manage your expenses easily on our platform", "welcome to expense Tracker PRO")


    res.status(201).json({
        status: "User Registered Successfully",
        accessToken: jwtManager(createUser)
    });
}

module.exports = {
    registerUserController
}
