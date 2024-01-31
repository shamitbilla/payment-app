const express = require('express');
const userRouter = require('./user');
const accountRouter = require('./account');


const router = express.Router();

router.use("/account",accountRouter);
router.use('/user',userRouter);

router.get("/",(req,res)=>{
    res.send("hi there");
});





module.exports = { router };
