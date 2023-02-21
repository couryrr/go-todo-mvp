import "./App.css";
import React, { useEffect, useState } from "react";
import GoalCard from "./components/Goals";
import Calendar from "./components/Calendar";
import Navigation from "./components/Navigation";
import MilestoneCreateForm, {
  FormHandler,
  CreateGoalForm,
  CreateTaskForm,
} from "./components/Create";
import Modal from "./components/Modal";

export const GoalsContext = React.createContext();
export const CreateContext = React.createContext();

const App = () => {
  const url = "http://localhost:9999/goal";
  const mock = "/mock/data.json";

  const [state, setState] = useState({
    createModalOpen: false,
    goals: [],
    createForm: { goal: { Name: "" } },
  });

  const setCreateForm = (current) => {
    setState((prevState) => {
      return { ...prevState.createForm, ...current };
    });
  };

  useEffect(() => {
    // fetch data
    var location = mock;
    if (process.env.REACT_APP_CALL_SERVICE) {
      location = url;
    }
    const fetchGoals = async (location) => {
      const data = await (await fetch(location)).json();

      // set state when the data received
      setState((prevState) => {
        return { ...prevState, goals: data.goals };
      });
    };

    fetchGoals(location);
  }, []);

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
          <GoalCard goals={state.goals} />
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
          <FormHandler
            renderer={() => {
              return (
                <>
                  <CreateGoalForm />
                  <MilestoneCreateForm />
                  <CreateTaskForm />
                </>
              );
            }}
          ></FormHandler>
        </div>
      </Modal>
    </div>
  );
};
/*
<MilestoneCreateForm />
<CreateTaskForm />
*/

export default App;
