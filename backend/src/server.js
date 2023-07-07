const express = require("express");
const cors = require("cors");
const  { DBConnect, saveTask, showAllTasks, deleteTask, editTask, saveTaskCategory } = require("./db");
const Task = require("../Schemas/task")


const PORT = 4000;
const app = express();

app.use(
  cors({
    // Use CORS middleware
    origin: "http://localhost:8080", // Allow only this origin
  })
);
app.use(express.json());

let tasks = [{"title":"My first task", "description":"My first description","taskCategory":"Open", "color":"#DBEAFEFF", "id":"12345"}]; // Serves as the database for this project

function generateUniqueId() {
  // Typically created at the database level
  const timestamp = Date.now().toString(36); // Convert current timestamp to base-36 string
  const random = Math.random().toString(36).substring(2, 7); // Generate a random string of 5 characters
  return timestamp + random; // Combine timestamp and random string
}

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await showAllTasks();
    const open = tasks.filter(task => task.taskCategory === "Open");
    const inProgress = tasks.filter(task => task.taskCategory === "InProgress");
    const closed = tasks.filter(task => task.taskCategory === "Closed");
    res.json({ open, inProgress, closed });
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get("/tasks/:id", (req, res) => {
  res.status(200).json(task);
});

app.post("/tasks", async (req, res) => {
  try {
    const task = req.body;
    if (task.title == null || task.title === "") {
      return res.status(400).json({ message: "Task title is required" });
    }
    task.taskId = generateUniqueId();
    await saveTask(task.taskId, task.title, task.desc, task.taskCategory, task.color);
    res.status(201).json(task);
  } catch (error) {
    console.error("Error saving task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.put("/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findOne({ taskId: id });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    for (let key in req.body) {
      if (task.hasOwnProperty(key)) {
        task[key] = req.body[key];
      }
    }

    await editTask(id, req.body.title, req.body.desc, req.body.taskCategory, req.body.color);
    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.patch("/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findOne({ taskId: id });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await saveTaskCategory(id, req.body.taskCategory);
    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;

  tasks = tasks.filter((task) => task.taskId !== id);
  deleteTask(id).then((_value) => res.status(200).json({ message: "Task deleted" }));
});

app.listen(PORT, () => console.log("Server running on port " + PORT));

(async () => {
  await DBConnect();
})();
