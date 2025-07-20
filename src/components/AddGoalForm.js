import React, { useState } from "react";

function AddGoalForm() {
  const [amount, setAmount] = useState("");
  const [goalId, setGoalId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!goalId || !amount) return;

    fetch(`http://localhost:3001/goals/${goalId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ savedAmount: Number(amount) }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Updated goal:", data);
        alert("Deposit successful! Reload to see changes.");
      })
      .catch((err) => console.error("Error updating goal:", err));

    setAmount("");
    setGoalId("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Make a Deposit</h2>
      <input
        type="text"
        placeholder="Goal ID"
        value={goalId}
        onChange={(e) => setGoalId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Deposit</button>
    </form>
  );
}

export default AddGoalForm;
