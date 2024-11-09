const express = require('express');
const authMiddleware = require('../middleware');
const { Accounts } = require('../db');
const accountRouter = express.Router();

accountRouter.get('/balance', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const details = await Accounts.findOne({ userId : userId });
        if (!details) {
            return res.status(404).json({
                message: "Account not found"
            });
        }
        return res.status(200).json({
            balance: details.balance
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

accountRouter.post('/transfer', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const to = req.body.to;
        const amount = req.body.amount;

        // Validate sender's balance
        const sender = await Accounts.findOne({ userId: userId });
        

        // Validate receiver's account
        const receiver = await Accounts.findOne({ userId: to });
        if (!receiver) {
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        // Update sender's balance
        await Accounts.updateOne({ userId: userId }, { $inc: { balance: -amount } });

        // Update receiver's balance
        await Accounts.updateOne({ userId: to }, { $inc: { balance: amount } });

        // Return success response
        res.json({
            message: "Transfer successful"
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

module.exports = accountRouter;
