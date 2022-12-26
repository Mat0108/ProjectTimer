const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    groups: [{
        type: Schema.Types.ObjectId, 
        ref: 'User',
    }],
    admin: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
    timer: {
        type: Array,
        required: true,
        default: [],
    }   
});

module.exports = mongoose.model("Project", projectSchema);