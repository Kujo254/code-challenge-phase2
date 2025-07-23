import React, { useState } from "react";

function GoalItem({ goal, onUpdate }) {
  // track whether we’re editing this goal
  const [isEditing, setIsEditing] = useState(false);

  // local form state when editing
  const [form, setForm] = useState({
    name: goal.name,
    targetAmount: goal.targetAmount,
    deadline: goal.deadline,
    category: goal.category,
  });

  // calculate progress
  const remaining = goal.targetAmount - goal.savedAmount;
  const percent = Math.min(100, Math.round((goal.savedAmount / goal.targetAmount) * 100));

  // handle changes in the edit form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // save edited goal
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://my-json-server.typicode.com/Kujo254/code-challenge-phase2/goals/${goal.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        targetAmount: Number(form.targetAmount),
        deadline: form.deadline,
        category: form.category,
      }),
    })
      .then(() => {
        onUpdate(); // refresh goals
        setIsEditing(false); // exit edit mode
      })
      .catch((err) => console.error("Error updating goal:", err));
  };

  // delete goal
  const handleDelete = () => {
    if (!window.confirm(`Are you sure you want to delete "${goal.name}"?`)) return;

    fetch(`https://my-json-server.typicode.com/Kujo254/code-challenge-phase2/goals/${goal.id}`, {
      method: "DELETE",
    })
      .then(() => {
        onUpdate(); // refresh goals
      })
      .catch((err) => console.error("Error deleting goal:", err));
  };

  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          {/* Edit form inputs */}
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            name="targetAmount"
            type="number"
            value={form.targetAmount}
            onChange={handleChange}
            placeholder="Target"
          />
          <input
            name="deadline"
            type="date"
            value={form.deadline}
            onChange={handleChange}
          />
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          {/* Goal details */}
          <h3>{goal.name}</h3>
          <p>Category: {goal.category}</p>
          <p>Saved: {goal.savedAmount} / {goal.targetAmount}</p>
          <p>Remaining: {remaining <= 0 ? 0 : remaining}</p>
          <p>Deadline: {goal.deadline}</p>

          {/* Progress bar */}
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

          {/* Show completed message if done */}
          {percent === 100 && <p style={{ color: "green" }}>🎉 Goal Complete!</p>}

          {/* Edit and delete buttons */}
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete} style={{ marginLeft: "10px", color: "red" }}>
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default GoalItem;
