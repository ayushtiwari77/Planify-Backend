import todoModel from "../models/todo.model.js";

export const createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    if (!title) {
      return res.status(400).json({ message: "pls fill title " });
    }

    const todo = await todoModel.create({
      title,
      description,
      creator: req.user._id,
    });

    return res.status(201).json({ message: "task created successfully" });
  } catch (error) {
    console.log("error is in create todo auth controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const bringAll = async (req, res) => {
  try {
    const tasks = await todoModel.find({
      creator: req.user._id,
    });

    console.log(tasks);

    return res.status(200).json(tasks);
  } catch (error) {
    console.log("error is in read all todo controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTask = async (req, res) => {
  const { id: taskId } = req.params;

  await todoModel.findByIdAndDelete(taskId);

  return res.status(200).json({ message: "task deleted successfully" });

  try {
  } catch (error) {
    console.log("error is in read delete task todo controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const isCompleted = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const todo = await todoModel.findById(taskId);

    if (!todo) {
      return res.status(400).json({ message: "task does not exist" });
    }

    todo.isComplete = !todo.isComplete;

    await todo.save();

    return res.status(200).json({ message: "status upadated successfully" });
  } catch (error) {
    console.log("error is in isCompleted todo controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
