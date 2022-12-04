const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let GroupsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    listuser: {
        type: String,
        required: true,
    },
    mailadmin: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Groups", GroupsSchema);