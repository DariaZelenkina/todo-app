import PropTypes from "prop-types";
import NewTaskForm from "./new-task-form";

function AppHeader({ onAddItem }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onAddItem={onAddItem} />
    </header>
  );
}

AppHeader.propTypes = {
  onAddItem: PropTypes.func.isRequired,
};

export default AppHeader;
