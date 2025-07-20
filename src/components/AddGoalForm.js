import React, { useState } from "react";

function AddGoalForm({ goals }) {
  // track form fields
  const [form, setForm] = useState({
    name: "",
    targetAmount: "",
    category: "",
    deadline: "",
  });

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // basic validation
    if (!form.name || !form.targetAmount || !form.deadline || !form.category) {
      alert("Please fill in all fields.");
      return;
    }

    // create a new goal
    const newGoal = {
      ...form,
      id: String(goals.length + 1), // generate id (better to let backend handle in real apps)
      targetAmount: Number(form.targetAmount),
      savedAmount: 0, // start with zero saved
      createdAt: new Date().toISOString().split("T")[0], // today’s date
    };

    // send POST to server
    fetch("http://localhost:3001/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGoal),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Added goal:", data);
        window.location.reload(); // refresh the page to show new goal
      })
      .catch((err) => console.error("Error adding goal:", err));
  };

  return (
    <div style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc" }}>
      <h2>Add New Goal</h2>

      {/* form to create a goal */}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Goal Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="targetAmount"
          placeholder="Target Amount"
          type="number"
          value={form.targetAmount}
          onChange={handleChange}
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />
        <input
          name="deadline"
          placeholder="Deadline"
          type="date"
          value={form.deadline}
          onChange={handleChange}
        />
        <button type="submit">Add Goal</button>
      </form>
    </div>
  );
}

export default AddGoalForm;
