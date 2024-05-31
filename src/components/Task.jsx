import React, { useState } from "react";
import { update, remove, child } from "firebase/database";
import { tasksRef } from "../utils/firebaseConfig.js";
import Error from "./Error.jsx";

const Task = ({ task }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  function assignTask() {
    if (!name.trim()) {
      setError("Name field cannot be empty.");
      return;
    }

    if (typeof name !== "string" || !isNaN(name)) {
      setError("Name field must be a valid string.");
      return;
    }

    setError(null);

    const taskUpdates = {
      [`${task.id}/status`]: "in progress",
      [`${task.id}/assigned`]: name,
    };

    update(tasksRef, taskUpdates)
      .then(function () {
        console.log("Task assigned successfully");
      })
      .catch(function (error) {
        setError("Failed to assign task: " + error.message);
      });
  }

  function markAsDone() {
    const taskUpdate = {
      [`${task.id}/status`]: "done",
    };

    update(tasksRef, taskUpdate)
      .then(function () {
        console.log("Task marked as done successfully");
      })
      .catch(function (error) {
        setError("Failed to mark task as done: " + error.message);
      });
  }

  function deleteTask() {
    remove(child(tasksRef, task.id)) // Use child(tasksRef, task.id) to reference the specific task
      .then(function () {
        console.log("Task removed successfully");
      })
      .catch(function (error) {
        setError("Failed to remove task: " + error.message);
      });
  }

  return (
    <div className={`task ${task.category.toLowerCase().replace(" ", "-")}`}>
      {error && <Error message={error} />}
      <p>{task.assignment}</p>
      <p>Category: {task.category}</p>
      <p>Assigned to: {task.assigned}</p>
      {task.status === "to do" && (
        <>
          <input
            type="text"
            value={name}
            onChange={function (event) {
              setName(event.target.value);
            }}
            placeholder="Enter name"
          />
          <button onClick={assignTask}>Assign &gt;&gt;</button>
        </>
      )}
      {task.status === "in progress" && (
        <button onClick={markAsDone}>Done &gt;&gt;</button>
      )}
      {task.status === "done" && <button onClick={deleteTask}>Remove X</button>}
    </div>
  );
};

export default Task;
