import Task from "../models/taskModel.js";

export const getTasks = async (req, res) => {
  const userId = req.user;
  try {
    const tasks = await Task.find({ userId });
    return res.status(201).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  const userId = req.user;
  try {
    const task = await Task.create({
      title,
      description,
      status,
      dueDate,
      userId,
    });
    return res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateTask = async (req, res) => {
  const userId = req.user;

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      {
        new: true,
      }
    );
    res.json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  const userId = req.user;

  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
