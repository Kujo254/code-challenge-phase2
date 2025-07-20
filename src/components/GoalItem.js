import React from "react";

function GoalItem({ goal }) {
  const remaining = goal.targetAmount - goal.savedAmount;
  const percent = Math.min(100, Math.round((goal.savedAmount / goal.targetAmount) * 100));

  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      <h3>{goal.name}</h3>
      <p>Category: {goal.category}</p>
      <p>Saved: {goal.savedAmount} / {goal.targetAmount}</p>
      <p>Remaining: {remaining <= 0 ? 0 : remaining}</p>
      <p>Deadline: {goal.deadline}</p>

      <div style={{ background: "#eee", height: "20px", width: "100%", marginTop: "10px" }}>
        <div
          style={{
            background: percent === 100 ? "green" : "blue",
            width: `${percent}%`,
            height: "100%",
            color: "white",
            textAlign: "center",
            fontSize: "12px",
          }}
        >
          {percent}%
        </div>
      </div>

      {percent === 100 && <p style={{ color: "green" }}>🎉 Goal Complete!</p>}
    </div>
  );
}

export default GoalItem;
