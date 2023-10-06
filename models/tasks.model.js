const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    status: {
      type: "string",
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
    email: { type: "string", required: true },
  },
  {
    timestamps: true,
  }
);

const TaskModel = mongoose.model("TaskModel", taskSchema);

module.exports = TaskModel;
