const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let groupSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    users: [{
        type: Schema.Types.ObjectId, 
        ref: 'User',
    }],
    admin: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
    projects: {
        type: Array,
        default: null,
    }
});

module.exports = mongoose.model("Group", groupSchema);