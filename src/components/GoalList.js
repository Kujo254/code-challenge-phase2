import React, { useState } from "react";

// GoalList shows a list of goals and allows deposits & deletes
function GoalList({ goals, setGoals }) {
  const [deposit, setDeposit] = useState({}); // store deposit amounts per goal

  // handle deposit submission
  const handleDeposit = (goal) => {
    const amount = Number(deposit[goal.id] || 0);
    if (!amount || amount <= 0) return;

    const updated = {
      ...goal,
      savedAmount: goal.savedAmount + amount,
    };

    fetch(`http://localhost:3001/goals/${goal.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ savedAmount: updated.savedAmount }),
    })
      .then((res) => res.json())
      .then((data) => {
        // update state with updated goal
        setGoals((prev) =>
          prev.map((g) => (g.id === data.id ? data : g))
        );
        setDeposit((prev) => ({ ...prev, [goal.id]: "" }));
      })
      .catch((err) => console.error("Error depositing:", err));
  };

  // handle delete
  const handleDelete = (id) => {
    fetch(`http://localhost:3001/goals/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        // remove from state
        setGoals((prev) => prev.filter((g) => g.id !== id));
      })
      .catch((err) => console.error("Error deleting goal:", err));
  };

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

              {/* Progress bar */}
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

              {/* Deposit */}
              <div style={{ marginTop: "10px" }}>
                <input
                  type="number"
                  placeholder="Deposit amount"
                  value={deposit[goal.id] || ""}
                  onChange={(e) =>
                    setDeposit({ ...deposit, [goal.id]: e.target.value })
                  }
                />
                <button onClick={() => handleDeposit(goal)}>Deposit</button>
              </div>

              {/* Delete */}
              <button
                onClick={() => handleDelete(goal.id)}
                style={{ marginTop: "10px", color: "red" }}
              >
                Delete Goal
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GoalList;
