


const mongoose = require("mongoose")

const walletSchema = new mongoose.Schema({

    userId: {type: mongoose.Schema.Types.ObjectId},
    balance: {type: Number, default: 0}

}, { timestamps: true})


const Wallet = mongoose.model("Wallet", walletSchema)


const walletTransactionSchema = new mongoose.Schema({

    userId: {type: mongoose.Schema.Types.ObjectId},
    walletId: {type: mongoose.Schema.Types.ObjectId},
    currency: { type: String, default: "NGN "},
    amount: { type: Number},
    transactionType: { type: String},
    date: {type: Date, default:  Date.now()}

}, { timestamps: true})


const WalletTransaction = mongoose.model("WalletTransaction", walletTransactionSchema)


module.exports = {
    Wallet,
    WalletTransaction
}