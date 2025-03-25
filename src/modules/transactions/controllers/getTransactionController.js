const { default: mongoose } = require("mongoose")


const getTransactionController = async (req, res) => {

    const transactionsModel = mongoose.model("transactions");

    console.log(req.query);

    const transactions = await transactionsModel.find({
        user_id: req.user._id,
        ...req.query,
    });

    res.status(200).json({
        status: "Fetching Transactions",
        count: transactions.length,
        data: transactions
    })
}

module.exports = {
    getTransactionController
}