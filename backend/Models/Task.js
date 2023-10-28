const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    status:{
        type:String,
        default:"To Do",
    },
    userId:{
        type:String,
        ref:'User'
    }
});
module.exports = new mongoose.model("Task", schema);
