import React from "react";
import Task from "./Task.jsx";

function Column(props) {
  const tasks = [];
  for (let i = 0; i < props.tasks.length; i++) {
    tasks.push(<Task key={props.tasks[i].id} task={props.tasks[i]} />);
  }

  return (
    <div className="column">
      <h2>{props.title}</h2>
      {tasks}
    </div>
  );
}

export default Column;
