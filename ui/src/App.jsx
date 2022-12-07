import "./App.css";
import React, { useState } from "react";
import GoalCard from "./components/Goals";
import Calendar from "./components/Calendar";
import Navigation from "./components/Navigation";
import MilestoneCreateForm, {
  FormHandler,
  CreateGoalForm,
  CreateTaskForm,
} from "./components/Create";
import Modal from "./components/Modal";

const App = () => {
  const [state, setState] = useState({
    createModalOpen: false,
    goals: [],
  });

  const toggleCreateModalOpen = () => {
    setState((prevState) => {
      return {
        ...prevState,
        ...{ createModalOpen: !prevState.createModalOpen },
      };
    });
  };

  return (
    <div className="app-container">
      <Navigation toggleCreateModalOpen={toggleCreateModalOpen} />
      <div className="todo-grid-container">
        <aside className="todo-goal-container">
          <GoalCard />
        </aside>
        <main className="todo-calendar-container">
          <Calendar />
        </main>
      </div>
      <Modal
        closeModalFn={toggleCreateModalOpen}
        isOpen={state.createModalOpen}
      >
        <div
          className="test"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <FormHandler>
            <MilestoneCreateForm />
            <CreateGoalForm />
            <CreateTaskForm />
          </FormHandler>
        </div>
      </Modal>
    </div>
  );
};

export default App;
