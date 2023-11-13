import PropTypes from "prop-types";
import { useState } from "react";

function NewTaskForm({ onAddItem }) {
  const [newTask, setNewTask] = useState({
    label: "",
    minutes: "",
    seconds: "",
  });

  const { label, minutes, seconds } = newTask;

  const onHandleChange = (e) => {
    if (e.target.name === 'minutes' || e.target.name === 'seconds') {
      const value = Number(e.target.value);
      if (Number.isNaN(value)) {
        alert('Enter a number');
        return;
      }
    }

    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onAddItem(label, minutes, seconds);
    setNewTask({
      label: "",
      minutes: "",
      seconds: "",
    });
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        name="label"
        className="new-todo"
        placeholder="What needs to be done?"
        value={label}
        onChange={onHandleChange}
      />
      <input
        name="minutes"
        className="new-todo-form__timer"
        placeholder="Min"
        value={minutes}
        onChange={onHandleChange}
      />
      <input
        name="seconds"
        className="new-todo-form__timer"
        placeholder="Sec"
        value={seconds}
        onChange={onHandleChange}
      />
      <input type="submit" style={{ display: "none" }}></input>
    </form>
  );
}

NewTaskForm.propTypes = {
  onAddItem: PropTypes.func.isRequired,
};

export default NewTaskForm;
