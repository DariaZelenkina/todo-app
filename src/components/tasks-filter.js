import PropTypes from "prop-types";

const filters = [
  { name: "all", label: "All" },
  { name: "active", label: "Active" },
  { name: "completed", label: "Completed" },
];

function TasksFilter({ filter, onFilterChange }) {
  const buttons = filters.map(({ name, label }) => {
    const className = filter === name ? "selected" : "";

    return (
      <li key={name}>
        <button
          type="button"
          className={className}
          onClick={() => {
            onFilterChange(name);
          }}
        >
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{buttons}</ul>;
}

TasksFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default TasksFilter;
