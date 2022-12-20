const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let timerSchema = new Schema({
    startedAt: {
        type: String,
        required: false,
    },
    pausedAt:{
        type: Array,
        required: false,
    },
    resumedAt: {
        type: Array,
        required: false,
    },
    stoppedAt: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model("timer", timerSchema);