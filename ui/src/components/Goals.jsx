import "./Goals.css";
import React, { useEffect, useState } from "react";

const GoalListItem = () => {
  const [goals, setGoals] = useState();
  useEffect(() => {
    // fetch data
    const fetchGoals = async () => {
      const data = await (await fetch("http://localhost:9999/goal")).json();

      // set state when the data received
      setGoals(data.goals);
    };

    fetchGoals();
  }, []);

  if (!goals) return <li key="-1">Loading...</li>;
  return goals.map((goal) => <div key={goal.ID}>{goal.Name}</div>);
};

const GoalCard = () => {
  return (
    <>
      <h3>Goals</h3>
      <div className="todo-goal-card">
        <ul>
          <GoalListItem />
        </ul>
      </div>
    </>
  );
};

export default GoalCard;
