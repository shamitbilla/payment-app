const express = require('express');
const jwt = require('jsonwebtoken');
const {User, Account} = require('../db');
const {JWT_SECRET} = require('../config');
const {signupValidation,signinValidation,auth} = require('./middlewares');
const {updateSchema} = require('../types');

const userRouter = express.Router();


userRouter.get("/whoami",(req,res)=>{

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message : "Invalid token"
        });
    }

    const token = authHeader.split(' ')[1];

    try 
    {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        User.findOne({_id : userId}).then(user=>{
            res.json({
                firstName : user.firstName,
                lastName : user.lastName,
                userId : user._id
            });
        });
        

        
    } 
    catch (err) 
    {
        return res.status(403).json({
            message : err
        });
    }

});

userRouter.post("/signup",signupValidation,async (req,res)=>{

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });

    await Account.create({
        userId : user._id,
        balance : Math.floor(Math.random() * 10000) + 1
    });

    const payload = {
        userId : user._id
    };

    const token = jwt.sign(payload,JWT_SECRET);
    res.json({
        message: "User created successfully",
	    token: token
    });
});

userRouter.post("/signin",signinValidation,(req,res)=>{
    
    const payload = {
        userId : req.userId
    };

    const token = jwt.sign(payload,JWT_SECRET);
    res.json({
	    token: token
    });

});

userRouter.put("/",auth,async (req,res)=>
{
    const success = updateSchema.safeParse(req.body);

    if(!success)
    {
        res.json({
            message: "Error while updating information"
        });
    }

    const query = { _id: req.userId };

    await User.updateOne(query, {
        $set : req.body

    });

    res.json({
        message: "Updated successfully"
    })
});

userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = userRouter;
