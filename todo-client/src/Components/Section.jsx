import React, { useEffect } from "react";
import { useDrop } from "react-dnd";
import toast from "react-hot-toast";
import Header from "./Header";
import Task from "./Task";
import axios from "axios";

const Section = ({ status, tasks, setTasks, todos, doing, done }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id, status), // Pass the status when dropping
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // ...

  const addItemToSection = (id, newStatus) => {
    axios
      .put(`https://real-gray-greyhound-wrap.cyclic.cloud/api/v1/todo/${id}/status`, {
        status: newStatus,
      }) // Update the task's status
      .then(() => {
        // Task status updated successfully
        toast("Task Status Changed!", { icon: "🙌" });
      })
      .catch((error) => {
        console.error("Error updating task status:", error);
      });
  };
  // Define text and bg based on status
  let text = "Todo";
  let bg = "bg-slate-500";
  let tasksToMap = todos;

  if (status === "Doing") {
    text = "Doing";
    bg = "bg-purple-500";
    tasksToMap = doing;
  }
  if (status === "Done") {
    text = "Done";
    bg = "bg-green-500";
    tasksToMap = done;
  }

  return (
    <div
      ref={drop}
      className={`w-64 rounded-md p-2 ${
        isOver ? "bg-slate-400 transition duration-400" : ""
      }`}
    >
      <Header text={text} bg={bg} count={tasksToMap?.length} />
      {tasksToMap?.length > 0 &&
        tasksToMap.map((task) => (
          <Task key={task._id} tasks={tasks} setTasks={setTasks} task={task} />
        ))}
    </div>
  );
};

export default Section;
