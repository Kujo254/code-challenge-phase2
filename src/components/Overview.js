import React from "react";

function Overview({ goals }) {
  const now = new Date();

  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const completedGoals = goals.filter(g => g.savedAmount >= g.targetAmount).length;

  const warnings = goals.filter(g => {
    const deadline = new Date(g.deadline);
    const daysLeft = (deadline - now) / (1000 * 60 * 60 * 24);
    return daysLeft > 0 && daysLeft <= 30 && g.savedAmount < g.targetAmount;
  });

  const overdue = goals.filter(g => {
    const deadline = new Date(g.deadline);
    const daysLeft = (deadline - now) / (1000 * 60 * 60 * 24);
    return daysLeft < 0 && g.savedAmount < g.targetAmount;
  });

  return (
    <div style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc" }}>
      <h2>Overview</h2>
      <p><strong>Total Goals:</strong> {totalGoals}</p>
      <p><strong>Total Saved:</strong> {totalSaved}</p>
      <p><strong>Completed Goals:</strong> {completedGoals}</p>

      {warnings.length > 0 && (
        <div style={{ color: "orange" }}>
          <h4>Goals close to deadline:</h4>
          <ul>
            {warnings.map(g => (
              <li key={g.id}>{g.name} — deadline: {g.deadline}</li>
            ))}
          </ul>
        </div>
      )}

      {overdue.length > 0 && (
        <div style={{ color: "red" }}>
          <h4>Overdue Goals:</h4>
          <ul>
            {overdue.map(g => (
              <li key={g.id}>{g.name} — deadline: {g.deadline}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Overview;
