const {signupSchema,signinSchema} = require('../types');
const { User } = require('../db');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config');

async function signupValidation(req,res,next)
{
    const parseResult = signupSchema.safeParse(req.body);
    if(parseResult.success)
    {
        User.findOne({username:req.body.username}).then((user)=>{
            if(!user)
            {
                next();
            }
            else
            {
                res.status(411).json({
                    message: "Email already taken / Incorrect inputs"
                });
            }
        })
    }
    else
    {
        res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }

}

function signinValidation(req,res,next)
{
    const parseResult = signinSchema.safeParse(req.body);
    if(parseResult.success)
    {
        User.findOne({username:req.body.username, password: req.body.password}).then((user)=>{
            if(user)
            {
                req.userId = user._id;
                next();
            }
            else
            {
                res.status(411).json({
                    message: "Error while logging in"
                });
            }
        })
    }
    else
    {
        res.status(411).json({
            message: "Error while logging in"
        });
    }
}

function auth(req,res,next)
{

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

        req.userId = decoded.userId;

        next();
    } 
    catch (err) 
    {
        return res.status(403).json({
            message : "Invalid credentials"
        });
    }
}




module.exports = {
  signupValidation,
  signinValidation,
  auth
};
