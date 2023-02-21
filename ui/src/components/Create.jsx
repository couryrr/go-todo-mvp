import React, { useContext } from "react";
import "./Create.css";
import { CreateContext } from "../App";

export const FormHandler = (props) => {
  const { state, setCreateForm } = useContext(CreateContext);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const obj = {};

    obj[name] = value;

    setCreateForm({ createForm: { goal: { Name: value } } });
  };

  /*
  const handleSubmit = (e) => {
    e.preventDefault();

    const obj = {
      name: props.goals.goalName,
      milestones: [
        {
          name: props.goals.milestoneName,
          tasks: [
            {
              name: props.goals.taskName,
              duration: parseInt(props.goal.taskDuration),
              effort: parseInt(props.goal.taskEffort),
            },
          ],
        },
      ],
    };

    const url = "http://localhost:9999/goal/";
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(obj),
    };
    fetch(url, requestOptions)
      .then((response) => console.log("Submitted successfully"))
      .catch((error) => console.log("Form submit error", error));
  };
  */

  const updateChildrenWithProps = (children, createForm) =>
    React.Children.map(children, (child, _) => {
      return React.cloneElement(child, {
        createForm,
        handleChange,
      });
    });

  return (
    <form>
      {updateChildrenWithProps(props.children, state.createForm)}
      <button type="submit">Add</button>
    </form>
  );
};

export const CreateGoalForm = (props) => {
  const handleChange = (e) => {
    props.handleChange(e);
  };

  return (
    <div className="form-container">
      <span className="form-label">Goal Name: </span>
      <input
        onChange={handleChange}
        value={props.createForm.goal.Name}
        name="goalName"
      />
    </div>
  );
};

const MilestoneCreateForm = (props) => {
  const handleChange = (e) => {
    props.handleChange(e);
  };
  return (
    <div className="form-container">
      <span className="form-label">Milestone Name: </span>
      <input
        onChange={handleChange}
        value={props.goals.milestoneName}
        name="milestoneName"
      />
    </div>
  );
};

export const CreateTaskForm = (props) => {
  const handleChange = (e) => {
    props.handleChange(e);
  };

  return (
    <div className="form-container">
      <div>
        <span>Task Name: </span>
        <input
          onChange={handleChange}
          value={props.goals.taskName}
          name="taskName"
        />
      </div>
      <div>
        <span>Duration:</span>
        <input
          onChange={handleChange}
          value={props.goals.taskDuration}
          name="taskDuration"
        />
      </div>
      <div>
        <span>Effort:</span>
        <input
          onChange={handleChange}
          value={props.goals.taskEffort}
          name="taskEffort"
        />
      </div>
    </div>
  );
};

export default MilestoneCreateForm;
