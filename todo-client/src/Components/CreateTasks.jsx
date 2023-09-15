import React, { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import axios from "axios"; // Import Axios

const CreateTasks = ({ setTasks }) => {
  const [task, setTask] = useState({
    id: "",
    title: "",
    status: "todo",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (task.title.length < 3) {
      return toast.error("A task must have more than 3 characters");
    }

    if (task.title.length > 100) {
      return toast.error("A task must not exceed 100 characters");
    }

    try {
      const response = await axios.post(
        "https://real-gray-greyhound-wrap.cyclic.cloud/api/v1/add-todo",
        task,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 201) {
        throw new Error(
          `Failed to add the task. Server response: ${response.statusText}`
        );
      }

      const newTask = response.data;

      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, newTask];
        return updatedTasks;
      });

      toast.success("Task created");
      setTask({
        id: "",
        title: "",
        status: "todo",
      });
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to create the task.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Add Task..."
          type="text"
          className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-2"
          value={task.title}
          onChange={(e) =>
            setTask({ ...task, id: uuidv4(), title: e.target.value })
          }
        />
        <button className="bg-cyan-500 rounded-md px-4 h-12 text-white hover:transition duration-300 hover:shadow-lg">
          Create Task
        </button>
      </form>
    </>
  );
};

export default CreateTasks;
