import PropTypes from "prop-types";
import TasksFilter from "./tasks-filter";

function Footer({ todo, filter, onClearCompleted, onFilterChange }) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {todo}
        items left
      </span>
      <TasksFilter filter={filter} onFilterChange={onFilterChange} />
      <button
        type="button"
        className="clear-completed"
        onClick={onClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  todo: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default Footer;
