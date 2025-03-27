// Import mongoose library for MongoDB interaction
const { default: mongoose } = require("mongoose");

// Controller function to handle GET requests for transactions
const getTransactionController = async (req, res) => {
    // Get the Mongoose model for the 'transactions' collection
    // This represents our transactions table in MongoDB
    const transactionsModel = mongoose.model("transactions");

    // Log the query parameters from the request URL
    // Helpful for debugging (e.g., /transactions?type=income&date=2023-01-01)
    console.log(req.query);

    // Query the database for transactions with two conditions:
    // 1. Must belong to the authenticated user (from JWT token)
    // 2. Any additional filters from query parameters
    const transactions = await transactionsModel.find({
        user_id: req.user._id,  // Filter by logged-in user's ID
        ...req.query,           // Spread any additional query parameters
                                // (e.g., type=income, amount[gt]=100)
    });

    // Send successful response with:
    // - Status 200 (OK)
    // - JSON body containing:
    //   * Status message
    //   * Count of transactions found
    //   * Array of transaction documents
    res.status(200).json({
        status: "Fetching Transactions",  // Operation status
        count: transactions.length,      // Number of transactions returned
        data: transactions               // The actual transaction records
    });
}

// Export the controller function to be used in routes
module.exports = {
    getTransactionController
}