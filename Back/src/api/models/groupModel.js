const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let groupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    users: {
        type: Array,
        required: true,
    },
    admin: {
        type: String,
        required: true,
    },
    projects: {
        type: Array,
        default: null,
    }
});

module.exports = mongoose.model("group", groupSchema);