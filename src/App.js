import React, { useState, useEffect } from "react";
import GoalList from "./components/GoalList";
import AddGoalForm from "./components/AddGoalForm";
import Overview from "./components/Overview";

function App() {
  // keep track of goals here
  const [goals, setGoals] = useState([]);

  // fetch goals from the JSON server when the app first loads
  useEffect(() => {
    fetch("http://localhost:3001/goals")
      .then((res) => res.json())
      .then((data) => {
        setGoals(data); // set fetched goals in state
      })
      .catch((err) => {
        console.error("Failed to fetch goals:", err);
      });
  }, []); // empty dependency array = runs only once when mounted

  return (
    <div style={{ padding: "20px" }}>
      <h1>Smart Goal Planner</h1>

      {/* pass goals as props to Overview */}
      <Overview goals={goals} />

      {/* AddGoalForm will later use setGoals */}
      <AddGoalForm setGoals={setGoals} />

      {/* pass goals and setGoals to GoalList */}
      <GoalList goals={goals} setGoals={setGoals} />
    </div>
  );
}

export default App;
