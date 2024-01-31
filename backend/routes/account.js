const express = require('express');
const { auth } = require('./middlewares');
const {Account} = require('../db');
const { default: mongoose } = require('mongoose');

accountRouter = express.Router();

accountRouter.use(auth);

accountRouter.get("/balance",async (req,res)=>{

    await Account.findOne({userId : req.userId}).then(account=>{
        res.json({
            balance : account.balance
        });
    });
   
});


accountRouter.post("/transfer",async (req,res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();
    
    const {amount,to} = req.body;

    const account = await Account.findOne({userId : req.userId}).session(session);

    if(!account || account.balance < amount)
    {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({userId : to}).session(session);

    if(!toAccount)
    {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await Account.updateOne({userId : req.userId},{
        $inc : {
            balance : -amount
        }
    }).session(session);

    await Account.updateOne({userId : to},{
        $inc : {
            balance : amount
        }
    }).session(session);

    await session.commitTransaction();

    res.json({
        message: "Transaction successful"
    });


});

module.exports = accountRouter;