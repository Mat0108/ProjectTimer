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
        ref: 'Group',
    }],
    admin: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
    timer: [{
        type: Schema.Types.ObjectId, 
        ref: 'Time',
    }]
});

module.exports = mongoose.model("Project", projectSchema);