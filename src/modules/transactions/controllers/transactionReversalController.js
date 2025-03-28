const { default: mongoose } = require("mongoose");
const validator = require("validator")


const transactionReversalController = async (req, res) => {

    const transactionModel = mongoose.model('transactions');
    const userModel = mongoose.model('users');
    

    const  {transactionId : transactionIdFromParams}  = req.params; 

    // Validate the ObjectId
    if (!validator.isMongoId(transactionIdFromParams)) throw "Invalid Transaction ID format.";


    const getTransactionbyId = await transactionModel.findOne({
        _id: transactionIdFromParams
    })

    if (!getTransactionbyId) throw "Transaction not found";

    console.log(getTransactionbyId);

    if(getTransactionbyId.transaction_type === "income"){

       await userModel.updateOne({
            _id : getTransactionbyId.user_id
        },{
            $inc : {
                balance : getTransactionbyId.amount * -1
            }
        },{
            runValidators :true
        }
    )

    }else {
        
    await userModel.updateOne({
            _id : getTransactionbyId.user_id
        },{
            $inc : {
                balance : getTransactionbyId.amount
            }
        },{
            runValidators :true
        }
    )

    }

    await transactionModel.deleteOne({
        _id : transactionIdFromParams
    })


    res.status(200).json({
        status: "success",
        message: "Transaction deleted successfuly"
    })

}





/*
REFACTORED  CODE WITH db TRANSACTION operation
*/


// const transactionReversalController = async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   const { transactionId: transactionIdFromParams } = req.params;
//   const transactionModel = mongoose.model('transactions');
//   const userModel = mongoose.model('users');

//   // Validate ID format
//   if (!validator.isMongoId(transactionIdFromParams)) {
//     throw new Error("Invalid Transaction ID format.");
//   }

//   // Find transaction (verify ownership)
//   const transaction = await transactionModel.findOne({
//     _id: transactionIdFromParams,
//     user_id: req.user._id // Security check
//   }).session(session);

//   if (!transaction) throw new Error("Transaction not found");

//   // Reverse balance effect
//   const balanceUpdate = transaction.transaction_type === "income" 
//     ? transaction.amount * -1 
//     : transaction.amount;

//   await userModel.updateOne(
//     { _id: transaction.user_id },
//     { $inc: { balance: balanceUpdate } },
//     { runValidators: true, session }
//   );

//   // Delete transaction
//   await transactionModel.deleteOne(
//     { _id: transactionIdFromParams },
//     { session }
//   );

//   await session.commitTransaction();
//   session.endSession();

//   res.status(200).json({
//     status: "success",
//     message: "Transaction deleted successfully"
//   });
// };


module.exports = {
    transactionReversalController
}