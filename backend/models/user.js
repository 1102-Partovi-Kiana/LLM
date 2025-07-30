const mongoose = require('mongoose');

// this is from the signup page
const UserSchema = new mongoose.Schema({
    fullName: String,
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: String
});


module.exports = mongoose.model('User', UserSchema);
