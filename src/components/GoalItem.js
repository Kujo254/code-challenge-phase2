import React, { useState } from "react";

function GoalItem({ goal, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: goal.name,
    targetAmount: goal.targetAmount,
    deadline: goal.deadline,
    category: goal.category,
  });

  const remaining = goal.targetAmount - goal.savedAmount;
  const percent = Math.min(100, Math.round((goal.savedAmount / goal.targetAmount) * 100));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3001/goals/${goal.id}`, {
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
      .then((res) => res.json())
      .then((data) => {
        onUpdate(); // ask App.js to re-fetch goals
        setIsEditing(false);
      })
      .catch((err) => console.error("Error updating goal:", err));
  };

  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
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

          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </div>
  );
}

export default GoalItem;
