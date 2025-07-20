import React from "react";

function GoalItem({ goal }) {
  return (
    <div>
      <h3>{goal.name}</h3>
      <p>Category: {goal.category}</p>
      <p>Saved: {goal.savedAmount} / {goal.targetAmount}</p>
      <p>Deadline: {goal.deadline}</p>
    </div>
  );
}

export default GoalItem;
