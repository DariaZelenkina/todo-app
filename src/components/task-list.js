import PropTypes from "prop-types";
import Task from "./task";

function TaskList({ tasks, onDelete, onToggleDone, onEdit, editItem }) {
  const elements = tasks.map((item) => (
    <Task
      key={item.id}
      {...item}
      onDelete={() => onDelete(item.id)}
      onToggleDone={() => onToggleDone(item.id)}
      onEdit={() => onEdit(item.id)}
      editItem={editItem}
    />
  ));
  return <ul className="todo-list">{elements}</ul>;
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    edit: PropTypes.bool.isRequired,
    createdDate: PropTypes.number.isRequired,
  })).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
};

export default TaskList;
