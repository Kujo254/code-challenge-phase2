import React, { useState } from "react";

// Form for adding a new goal
function AddGoalForm({ setGoals }) {
  // form state
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newGoal = {
      name,
      targetAmount: Number(targetAmount),
      savedAmount: 0,
      category,
      deadline,
      createdAt: new Date().toISOString().split("T")[0]
    };

    // POST to server
    fetch("https://my-json-server.typicode.com/Kujo254/code-challenge-phase2/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGoal)
    })
      .then((res) => res.json())
      .then((data) => {
        // update state by adding new goal
        setGoals((prev) => [...prev, data]);

        // reset form
        setName("");
        setTargetAmount("");
        setCategory("");
        setDeadline("");
      })
      .catch((err) => console.error("Error adding goal:", err));
  };

  return (
    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
      <h2>Add New Goal</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Goal Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Target Amount"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
        <button type="submit">Add Goal</button>
      </form>
    </div>
  );
}

export default AddGoalForm;
