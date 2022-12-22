const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let timeSchema = new Schema({
    times: {
        type: Array,
        required: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model("Time", timeSchema);