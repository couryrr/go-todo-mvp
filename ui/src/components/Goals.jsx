import "./Goals.css";
import React from "react";

const GoalListItem = (props) => {
  const goals = props.goals;
  if (!goals) return <li key="-1">Loading...</li>;
  return goals.map((goal) => <div key={goal.ID}>{goal.Name}</div>);
};

const GoalCard = (props) => {
  return (
    <>
      <h3>Goals</h3>
      <div className="todo-goal-card">
        <ul>
          <GoalListItem goals={props.goals} />
        </ul>
      </div>
    </>
  );
};

export default GoalCard;
