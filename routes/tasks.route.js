const express = require("express");
const TaskModel = require("../models/tasks.model");
const { apiLimiter } = require("../middleware/rate-limit");
const authentication = require("../middleware/authentication");
const createHttpError = require("http-errors");
const taskRouter = express.Router();

// Route to get all tasks
taskRouter.get("/tasks", apiLimiter, async (req, res) => {
  console.log(req.body);
  try {
    const tasks = await TaskModel.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to create a new task
taskRouter.post(
  "/tasks",
  authentication,
  apiLimiter,
  async (req, res, next) => {
    const { title, description } = req.body;
    try {
      const newTask = await new TaskModel({
        title,
        description,
        email: req.body.email,
      }).save();
      res.status(201).json(newTask);
    } catch (error) {
      next(error);
    }
  }
);

// Route to get a specific task by ID
taskRouter.get(
  "/tasks/:taskId",
  authentication,
  apiLimiter,
  async (req, res, next) => {
    const taskId = req.params.taskId;
    const taskEmail = await TaskModel.findOne({ _id: taskId });
    try {
      if (taskEmail.email === req.body.email) {
        const task = await TaskModel.findById(taskId);
        if (!task) {
          res.status(404).json({ error: "Task not found" });
        } else {
          res.status(200).json(task);
        }
      } else {
        next(createHttpError.Conflict("Email does not match the task's email"));
      }
    } catch (error) {
      next(error);
    }
  }
);

// Route to delete a task by ID
taskRouter.delete(
  "/tasks/:taskId",
  authentication,
  apiLimiter,
  async (req, res, next) => {
    const taskId = req.params.taskId;
    const taskEmail = await TaskModel.findOne({ _id: taskId });
    // res.send(taskEmail.email);
    try {
      if (taskEmail.email === req.body.email) {
        const result = await TaskModel.deleteOne({ _id: taskId });
        if (result.deletedCount === 0) {
          res.status(404).json({ error: "Task not found" });
        } else {
          res.status(200).json({ message: "Task Deleted" });
        }
      } else {
        next(createHttpError.Conflict("Email does not match the task's email"));
      }
    } catch (error) {
      next(error);
    }
  }
);

// Route to update a task by ID
taskRouter.put(
  "/tasks/:taskId",
  authentication,
  apiLimiter,
  async (req, res, next) => {
    const taskId = req.params.taskId;
    const payload = req.body;
    const taskEmail = await TaskModel.findOne({ _id: taskId });
    try {
      if (taskEmail.email === req.body.email) {
        const updatedTask = await TaskModel.findOneAndUpdate(
          { _id: taskId },
          {
            title: payload.title,
            description: payload.description,
            status: payload.status,
          },
          { new: true }
        );
        if (!updatedTask) {
          res.status(404).json({ error: "Task not found" });
        } else {
          res.status(200).json({ message: "Task Updated" });
        }
      } else {
        next(createHttpError.Conflict("Email does not match the task's email"));
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = taskRouter;
