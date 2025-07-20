import React, { useState, useEffect } from "react";
import GoalList from "./components/GoalList";
import AddGoalForm from "./components/AddGoalForm";
import Overview from "./components/Overview";

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = () => {
    fetch("http://localhost:3001/goals")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched goals:", data);
        setGoals(data);
      })
      .catch((err) => console.error("Error fetching goals:", err));
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Smart Goal Planner</h1>
      <Overview goals={goals} />
      <AddGoalForm goals={goals} />
      <GoalList goals={goals} />
    </div>
  );
}

export default App;
