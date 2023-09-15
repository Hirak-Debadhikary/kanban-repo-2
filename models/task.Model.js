import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Todo",
    },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("Task", taskSchema);
export default TaskModel;
