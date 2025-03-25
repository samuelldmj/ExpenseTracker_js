const { default: mongoose } = require("mongoose");
const validator = require("validator");



const addExpensesController = async (req, res) => {

    const { amount, remarks } = req.body;
    let amountValidator = validator.isNumeric(amount.toString());
    if (!amount) throw "Amount is required";
    if (!amountValidator || amount <= 0) throw "Invalid Amount";
    if (!remarks) throw "remarks is required";

    if (remarks.length < 5) throw " Remarks must be at least 5 character long";

    const userModel = mongoose.model('users');
    const transactionModel = mongoose.model('transactions');

    const createTransaction = await transactionModel.create({
        user_id: req.user._id,
        amount: amount,
        remarks: remarks,
        transaction_type: "expense"
    })

    const reduceUserBalance = await userModel.updateOne({
        _id: req.user._id,
    },
        {
            $inc: {
                balance: amount * -1,
            }
        }, {
        runValidators: true,
    })



    res.status(201).json({
        status: "success",
        message: "Expenses added successfully",
        // data : createTransaction
    })
}

module.exports = {
    addExpensesController
}