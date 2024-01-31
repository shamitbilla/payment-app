const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://shamitbilla:CqX8HCEKAkVJuwGT@mycluster.9uzpwwa.mongodb.net/Paytm");

const userSchema  = new mongoose.Schema({
    username : String,
    firstName : String,
    lastName : String,
    password : String
});

const User = mongoose.model('User',userSchema);

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
    },
    balance : Number
}); 

const Account = mongoose.model('Account',accountSchema);

module.exports = {
    User,
    Account
};