import React, { useEffect, useState } from "react";
import { tasksRef } from "../utils/firebaseConfig.js";
import { onValue } from "firebase/database";
import AddTaskForm from "./AddTaskForm.jsx";
import Column from "./Column.jsx";
import Error from "./Error.jsx";

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(function () {
    onValue(
      tasksRef,
      function (snapshot) {
        const data = snapshot.val();
        if (data) {
          const parsedTasks = [];
          for (let key in data) {
            parsedTasks.push({
              id: key,
              ...data[key],
            });
          }
          setTasks(parsedTasks);
          setError(null);
        } else {
          setTasks([]);
          setError(null);
        }
      },
      function (error) {
        setError(error.message);
      }
    );
  }, []);

  function addTask(task) {
    setTasks(function (prevTasks) {
      return [...prevTasks, task];
    });
  }

  return (
    <div className="app">
      <h1>Scrum Board</h1>
      {error && <Error message={error} />}
      <AddTaskForm addTask={addTask} />
      <div className="columns">
        <Column title="To Do" tasks={filterTasks(tasks, "to do")} />
        <Column title="In Progress" tasks={filterTasks(tasks, "in progress")} />
        <Column title="Done" tasks={filterTasks(tasks, "done")} />
      </div>
    </div>
  );
}

function filterTasks(tasks, status) {
  const filteredTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].status === status) {
      filteredTasks.push(tasks[i]);
    }
  }
  return filteredTasks;
}

export default App;
