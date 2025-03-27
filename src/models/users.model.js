const { default: mongoose, model } = require("mongoose");

const usersSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: [true, "full name is required."]
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    balance: {
        type: Number,
        required: [true, "Balance is required"],
        default: 0
    },
    reset_code : {
        type : Number
    }
},
    {
        timestamps: true
    }

)


const usersModel = mongoose.model('users', usersSchema);
module.exports = {
    usersModel
};