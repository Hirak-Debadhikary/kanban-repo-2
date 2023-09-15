import React, { useEffect } from "react";
import { useState } from "react";
import CreateTasks from "./Components/CreateTasks";
import TaskList from "./Components/TaskList";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  const [tasks, setTasks] = useState([]);
  // console.log("tasks", tasks);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      {" "}
      <Toaster />
      <div className="bg-slate-200 w-screen h-screen flex flex-col items-center p-3 pt-32 gap-16">
        <CreateTasks tasks={tasks} setTasks={setTasks} />
        <TaskList tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
};

export default App;
