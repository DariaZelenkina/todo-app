import PropTypes from "prop-types";
import { Component } from "react";

export default class Task extends Component {
  state = {
    label: this.props.label,
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.editItem(this.props.id, this.state.label);
  };

  render() {
    const { label, completed, edit, onToggleDone, date, onDelete, onEdit } = this.props;
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
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className="edit"
            onChange={this.onLabelChange}
            value={this.state.label}
          />
        </form>
      </li>
    );
  }
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  edit: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
};
