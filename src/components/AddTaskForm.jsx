import React, { useState } from "react";
import { push } from "firebase/database";
import { tasksRef } from "../utils/firebaseConfig.js";
import Error from "./Error.jsx";

const AddTaskForm = () => {
  const [assignment, setAssignment] = useState("");
  const [category, setCategory] = useState("ux");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!assignment.trim()) {
      setError("Assignment field cannot be empty.");
      return;
    }

    if (typeof assignment !== "string" || !isNaN(assignment)) {
      setError("Assignment must be a valid string.");
      return;
    }

    const newTask = { assignment, category, status: "to do", assigned: "none" };

    try {
      await push(tasksRef, newTask);
      setAssignment("");
      setCategory("ux");
      setError(null);
    } catch (error) {
      setError("Failed to add task: " + error.message);
    }
  };

  return (
    <div className="add-task-form">
      {error && <Error message={error} />}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Task"
          value={assignment}
          onChange={(event) => setAssignment(event.target.value)}
        />
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="select-category"
        >
          <option value="ux">ux</option>
          <option value="dev frontend">dev frontend</option>
          <option value="dev backend">dev backend</option>
        </select>
        <button type="submit" className="button">
          Add
        </button>
      </form>
      <div className="category-indicators">
        <div className="category-indicator ux">
          <span>ux</span>
        </div>
        <div className="category-indicator dev-frontend">
          <span>dev frontend</span>
        </div>
        <div className="category-indicator dev-backend">
          <span>dev backend</span>
        </div>
      </div>
    </div>
  );
};

export default AddTaskForm;
