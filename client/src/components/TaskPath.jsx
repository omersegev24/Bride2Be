import React from "react";
import Header from "./Header";

const TaskPath = ({ onTaskClick, user }) => {
    const tasks = [
        { name: "Guest List", completed: false },
        { name: "Venue Booking", completed: false },
        { name: "Hair & Makeup", completed: false },
        { name: "Photographer & DJ", completed: false },
        { name: "Dress Selection", completed: false },
        { name: "Preparation Location", completed: false },
        { name: "Magnet Photographer", completed: false },
        { name: "Invitations", completed: false },
        { name: "Accessories", completed: false },
      ];
      

  return (
    <div>
        <Header user={user} />
         <div className="task-path-container">
        <div className="task-path">
          {tasks.map((task, index) => (
            <div
              key={index}
              className={`task-node ${task.completed ? "completed" : ""}`}
              onClick={() => onTaskClick(index)}
            >
              <div className="task-circle">{index + 1}</div>
              <div className="task-label">{task.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskPath;
