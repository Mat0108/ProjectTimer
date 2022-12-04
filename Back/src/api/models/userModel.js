const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    connected: {
        type: Boolean,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model("User", userSchema);