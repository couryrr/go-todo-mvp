import React, { useState } from "react";
import "./Create.css";

export const FormHandler = (props) => {
  const [form, setForm] = useState({
    milestoneName: "",
    goalName: "",
    taskName: "",
    taskDuration: "",
    taskEffort: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const obj = {};

    obj[name] = value;

    setForm((prevState) => {
      return { ...prevState, ...obj };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const obj = {
      name: form.goalName,
      milestones: [
        {
          name: form.milestoneName,
          tasks: [
            {
              name: form.taskName,
              duration: parseInt(form.taskDuration),
              effort: parseInt(form.taskEffort),
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

  const updateChildrenWithProps = (children) =>
    React.Children.map(children, (child, i) => {
      return React.cloneElement(child, {
        form: form,
        handleChange: handleChange,
      });
    });

  return (
    <form onSubmit={handleSubmit}>
      {updateChildrenWithProps(props.children)}
    </form>
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
        value={props.form.milestoneName}
        name="milestoneName"
      />
      <button type="submit">Add</button>
    </div>
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
        value={props.form.goalName}
        name="goalName"
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
          value={props.form.taskName}
          name="taskName"
        />
      </div>
      <div>
        <span>Duration:</span>
        <input
          onChange={handleChange}
          value={props.form.taskDuration}
          name="taskDuration"
        />
      </div>
      <div>
        <span>Effort:</span>
        <input
          onChange={handleChange}
          value={props.form.taskEffort}
          name="taskEffort"
        />
      </div>
    </div>
  );
};

export default MilestoneCreateForm;
