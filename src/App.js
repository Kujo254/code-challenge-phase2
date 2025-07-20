import React, { useState, useEffect } from "react";
import GoalList from "./components/GoalList";
import AddGoalForm from "./components/AddGoalForm";
import Overview from "./components/Overview";

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((err) => console.error("Error fetching goals:", err));
  }, []);

  return (
    <div>
      <h1>Smart Goal Planner</h1>
      <Overview />
      <AddGoalForm />
      <GoalList goals={goals} />
    </div>
  );
}

export default App;
