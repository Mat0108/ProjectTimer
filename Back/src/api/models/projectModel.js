const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ProjectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    listgroup:{
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
    },
    timer: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Project", ProjectSchema);