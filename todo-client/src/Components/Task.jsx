import React, { useState } from "react";
import { useDrag } from "react-dnd";
import toast from "react-hot-toast";
import axios from "axios"; // Import Axios library
import EditTask from "./EditTask";

const Task = ({ task, tasks, setTasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleRemove = (id) => {
    console.log("Task id:", id);

    axios
      .delete(`https://real-gray-greyhound-wrap.cyclic.cloud/api/v1/delete-todo/${id}`)
      .then(() => {
        // Task deleted successfully
        toast("Task Removed!", { icon: "🤡" });

        // Update the tasks state by removing the deleted task
        setTasks(tasks.filter((item) => item._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        toast.error("Error deleting task", { icon: "❌" });
      });
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = (id, newTitle) => {
    axios
      .put(`https://real-gray-greyhound-wrap.cyclic.cloud/api/v1/update-todo/${id}`, {
        title: newTitle,
      })
      .then(() => {
        toast("Task Updated!", { icon: "🚀" });
        // You can update the local tasks state if needed
      })
      .catch((error) => {
        console.error("Error updating task:", error);
        toast.error("Error updating task", { icon: "❌" });
      });
  };
  return (
    <div
      ref={drag}
      className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab ${
        isDragging ? "opacity-25" : "opacity-100"
      }`}
    >
      <div className="flex justify-between items-center">
        <p className="text-md font-semibold">{task.title}</p>
        <div className="space-x-2">
          <button
            className="text-red-500 hover:text-red-700 transition duration-300 text-sm"
            onClick={() => handleRemove(task._id)}
          >
            Delete
          </button>
          <button
            className="text-blue-500 hover:text-blue-700 transition duration-300 text-sm"
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
      </div>
      <EditTask
        task={task}
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        onUpdateTask={handleUpdateTask}
      />
    </div>
  );
};

export default Task;
