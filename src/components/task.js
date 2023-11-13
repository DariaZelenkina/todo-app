import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import getPadTime from "../helpers/getPadTime";

function Task({
  id, label, minutes, seconds, completed, edit, onToggleDone, date, onDelete, onEdit, editItem,
}) {
  const [taskLabel, setTaskLabel] = useState(label);
  const [timeLeft, setTimeLeft] = useState(minutes * 60 + seconds);
  const [isCounting, setIsCounting] = useState(false);

  const minutesLeft = getPadTime(Math.floor(timeLeft / 60));
  const secondsLeft = getPadTime(timeLeft - minutesLeft * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isCounting) {
        setTimeLeft((time) => (time >= 1 ? time - 1 : 0));
      }
    }, 1000);
    if (timeLeft === 0) setIsCounting(false);
    return () => clearInterval(interval);
  }, [isCounting, timeLeft]);

  const onLabelChange = (e) => {
    setTaskLabel(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editItem(id, taskLabel);
  };

  const onStart = () => {
    if (timeLeft === 0) {
      alert('Time is up!');
      return;
    }
    setIsCounting(true);
  };

  const onPause = () => {
    setIsCounting(false);
  };

  let classNames = "";
  let isChecked = "";

  if (completed) {
    classNames += " completed";
    isChecked = "checked";
  }

  if (edit) {
    classNames += "editing";
  }

  return (
    <li className={classNames}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={isChecked}
          onChange={onToggleDone}
        />
        <label htmlFor="title">
          <span className="title">{taskLabel}</span>
          <span className="description">
            <button className="icon icon-play" type="button" aria-label="Play" onClick={onStart}></button>
            <button className="icon icon-pause" type="button" aria-label="Pause" onClick={onPause}></button>
            {minutesLeft}:{secondsLeft}
          </span>
          <span className="description">created {date} ago</span>
        </label>
        <button
          type="button"
          aria-label="Edit"
          className="icon icon-edit"
          onClick={onEdit}
        >
        </button>
        <button
          type="button"
          aria-label="Delete"
          className="icon icon-destroy"
          onClick={onDelete}
        >
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="edit"
          onChange={onLabelChange}
          value={taskLabel}
        />
      </form>
    </li>
  );
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  edit: PropTypes.bool.isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
};

export default Task;
