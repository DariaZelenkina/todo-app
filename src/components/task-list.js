import PropTypes from "prop-types";
import Task from "./task";

function TaskList({ tasks, onDelete, onToggleDone }) {
  const elements = tasks.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <Task
        key={id}
        {...itemProps}
        onDelete={() => onDelete(id)}
        onToggleDone={() => onToggleDone(id)}
      />
    );
  });
  return <ul className="todo-list">{elements}</ul>;
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
};

export default TaskList;
