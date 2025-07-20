import React from "react";

// GoalList shows a list of all goals
function GoalList({ goals }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Goals</h2>

      {goals.length === 0 ? (
        <p>No goals found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {goals.map((goal) => (
            <li
              key={goal.id}
              style={{
                marginBottom: "15px",
                padding: "10px",
                border: "1px solid #ddd",
              }}
            >
              <h4>{goal.name}</h4>
              <p>
                <strong>Category:</strong> {goal.category}
              </p>
              <p>
                <strong>Saved:</strong> {goal.savedAmount} / {goal.targetAmount}
              </p>

              {/* Simple progress bar */}
              <div style={{ background: "#eee", height: "10px", width: "100%" }}>
                <div
                  style={{
                    height: "10px",
                    width: `${Math.min(
                      (goal.savedAmount / goal.targetAmount) * 100,
                      100
                    )}%`,
                    background: "#4caf50",
                  }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GoalList;
