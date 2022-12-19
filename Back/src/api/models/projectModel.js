const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ProjectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    listgroup:{
        type: Array,
        required: true,
    },
    listusers:{
        type: Array,
        required: true,
    },
    mailadmin: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Project", ProjectSchema);