const { Schema, model } = require("mongoose");
const taskSchema = new Schema({
    _id: Schema.Types.ObjectId,

    title: String,
    desc: String,
    taskCategory: String,
    color: String,
    taskId: String,
});

module.exports = model("Tasks", taskSchema, "task");