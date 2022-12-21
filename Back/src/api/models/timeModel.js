const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let timeSchema = new Schema({
    times: {
        type: Array,
        required: false,
    },
});

module.exports = mongoose.model("time", timeSchema);