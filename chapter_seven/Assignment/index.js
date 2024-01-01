const mongoose = require("mongoose");
const express = require("express");
const port = 5000;
const server = express();
const router = express.Router();
//Importing mongoose product model.
const model = require("./taskSchema");
const Task = model.Task;
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/todolist");
  console.log("Todo DB Created");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

server.use(express.json());
server.post("/task", async (req, res) => {
  const task = new Task(req.body);
  // task.title='Go To'
  // task.status=true
  // task.date=Date.now()
  try {
    await task.save();
    res.status(200).json(task);
  } catch (err) {
    if (err) {
      res.status(400).json(err);
    }
  }
});
server.get("/task", async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
});
server.get("/task/:id", async (req, res) => {
  const id = req.params.id;
  const requiredTask = await Task.findById(id);
  res.status(200).json(requiredTask);
});
server.put("/task/:id", async (req, res) => {
  const id = req.params.id;

  const replaceTask = await Task.findOneAndReplace({ _id: id }, req.body, {
    new: true,
  });
  res.status(200).json(replaceTask);
});
server.patch("/task/:id", async (req, res) => {
  const id = req.params.id;

  const updateTask = await Task.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  res.status(200).json(updateTask);
});
server.delete("/task/:id", async (req, res) => {
  const id = req.params.id;
  const deleteTask = await Task.findOneAndDelete({ _id: id }, { new: false });
  res.status(200).json(deleteTask);
});

server.listen(port, () => {
  console.log("server started on port", port);
});
