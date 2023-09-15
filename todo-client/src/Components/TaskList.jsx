import React, { useEffect, useState } from "react";
import Section from "./Section";

const TaskList = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [doing, setDoing] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    // Function to fetch tasks from the API
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "https://real-gray-greyhound-wrap.cyclic.cloud/api/v1/get-todo"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();

        // Update the tasks state with the fetched data
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks(); // Call the fetchTasks function when the component mounts

    const filterTodos = tasks?.filter((task) => task.status === "Todo");
    const filterDoing = tasks?.filter((task) => task.status === "Doing");
    const filterDone = tasks?.filter((task) => task.status === "Done");

    setTodos(filterTodos);
    setDoing(filterDoing);
    setDone(filterDone);
  }, [tasks, setTasks]);

  const statuses = ["Todo", "Doing", "Done"];

  return (
    <div className="flex gap-16">
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          doing={doing}
          done={done}
        />
      ))}
    </div>
  );
};

export default TaskList;
