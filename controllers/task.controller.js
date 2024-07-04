const Task = require("../models/task.model");
const User = require("../models/user.model");

async function getTasksCount(req, res) {
  try {
    const count = await Task.countDocuments(req.body);
    res.status(200).json(count);
  } catch (error) {
    console.log(error);
    console.log(
      "task.controller, getTasksCount. Error while getting tasks count"
    );
    res.status(500).json({ mesagge: error.mesagge });
  }
}

async function getTasks(req, res) {
  try {
    const tasks = await Task.find(req.body);
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    console.log(
      "task.controller, getTasksCount. Error while getting tasks count"
    );
    res.status(500).json({ mesagge: error.mesagge });
  }
}

async function getTaskById(req, res) {
  const { taskId } = req.params;
  try {
    const task = await Task.findById(taskId);
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    if (error.name === "CastError") {
      console.log(
        `product.controller, getProductById. Product not found with id: ${id}`
      );
      return res.status(404).json({ message: "Product not found" });
    }
    console.log(
      `product.controller, getProductById. Error while getting product with id: ${id}`,
      error.name
    );
    res.status(500).json({ message: error.mesagge });
  }
}

async function deleteTask(req, res) {
  const { taskId } = req.params;

  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: taskId,
      user: req.userId,
    });

    if (!deletedTask) {
      console.log(
        `tasks-controller, deleteTask. Task not found with id: ${taskId}`
      );
      return res.status(404).json({ message: "Task not found" });
    }
    // Update the user's task array
    await User.findByIdAndUpdate(req.userId, {
      $pull: { tasks: taskId }, // Remove the task id from the user's products array
    });
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    console.log(err);
    console.log(
      `tasks-controller, deleteTask. Error while deleting task with id: ${id}`
    );
    res.status(500).json({ message: err.message });
  }
}

async function createTask(req, res) {}

async function editTask(req, res) {}

module.exports = {
  getTasksCount,
  getTasks,
  getTaskById,
  deleteTask,
  createTask,
  editTask,
};
