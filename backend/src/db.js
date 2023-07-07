const { mongoose } = require("mongoose");

// Connecting to the MongoDB
async function DBConnect() {
    try {
        await mongoose.connect("mongodb+srv://praktikuma38:nedina3041!@cluster0.cvlmkyh.mongodb.net/?retryWrites=true&w=majority");
        console.log("Connected to MongoDB!");

        // Call the function to show all tasks
        await showAllTasks();
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}


const Task = require('../Schemas/task'); // Import the Task model

async function saveTask(TaskId, Title, Description, TaskCategory, Color) {
    let task = new Task({
        _id: new mongoose.Types.ObjectId(),
        title: Title,
        desc: Description,
        taskCategory: TaskCategory,
        color: Color,
        taskId: TaskId,
    });

    task.save().catch(console.error);
}

async function editTask(TaskId, Title, Description, TaskCategory, Color) {
    try {
        await Task.findOneAndUpdate(
            { taskId: TaskId },
            { title: Title, desc: Description, taskCategory: TaskCategory, color: Color },
            { new: true }
        );
    } catch (error) {
        console.error('Error updating task:', error);
    }
}

async function saveTaskCategory(TaskId, TaskCategory) {
    try {
        await Task.findOneAndUpdate(
            { taskId: TaskId },
            { taskCategory: TaskCategory },
            { new: true }
        );
    } catch (error) {
        console.error('Error updating task:', error);
    }
}

async function deleteTask(TaskId) {
    try {
        return await Task.findOneAndRemove({taskId: TaskId});
    } catch (error) {
        console.error('Error while deleting task:', error);
    }
}

async function showAllTasks() {
    try {
        return await Task.find();
    } catch (error) {
        console.error("Error retrieving tasks:", error);
    }
}



module.exports =  { DBConnect, saveTask, showAllTasks, deleteTask, editTask, saveTaskCategory };