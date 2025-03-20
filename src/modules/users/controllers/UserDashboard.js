const { default: mongoose } = require("mongoose");




const userDashboardController = async (req, res) => {

    // console.log(req.user, "from dashboard");

    const userModel = mongoose.model('users');

    // const getUser = await userModel.findOne({
    //     _id: req.user._id,
    // }).select("full_name balance email");

    const getUser = await userModel.findOne({
        _id: req.user._id,
    }).select("-password");

    res.status(200).json({
        status : "success",
        message : "User dashboard active",
        data : getUser
    })
}

module.exports = {
    userDashboardController,
}