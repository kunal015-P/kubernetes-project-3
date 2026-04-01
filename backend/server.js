const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// ENV variables (important for K8s later)
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/test";

mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const TaskSchema = new mongoose.Schema({
    name: String
});

const Task = mongoose.model("Task", TaskSchema);

app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post("/tasks", async (req, res) => {
    const task = new Task({ name: req.body.name });
    await task.save();
    res.json(task);
});

app.listen(3000, () => console.log("Server running on port 3000"));