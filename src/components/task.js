import PropTypes from "prop-types";

function Task({ label, date, completed, onDelete, onToggleDone }) {
  let classNames = "";
  let isChecked = "";

  if (completed) {
    classNames += " completed";
    isChecked = "checked";
  }

  return (
    <li className={classNames}>
      <div className="view">
        <input
          id="done-cbx"
          className="toggle"
          type="checkbox"
          checked={isChecked}
          onChange={onToggleDone}
        />
        <label htmlFor="done-cbx">
          <span className="description">{label}</span>
          <span className="created">created {date} ago</span>
        </label>
        <button
          type="button"
          aria-label="Edit"
          className="icon icon-edit"
        >
        </button>
        <button
          type="button"
          aria-label="Delete"
          className="icon icon-destroy"
          onClick={onDelete}
        >
        </button>
        <input type="text" className="edit" defaultValue="Editing task" />
      </div>
    </li>
  );
}

Task.propTypes = {
  label: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
};

export default Task;
