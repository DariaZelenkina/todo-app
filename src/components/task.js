import PropTypes from "prop-types";
import { Component } from "react";

export default class Task extends Component {
  state = {
    label: this.props.label,
    minutes: this.props.minutes,
    seconds: this.props.seconds,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.minutes !== prevState.minutes || this.state.seconds !== prevState.seconds) {
      if (this.state.seconds === 0 && this.state.minutes === 0) {
        clearInterval(this.interval);
        alert("Time is up!");
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  timer = () => {
    this.interval = setInterval(() => {
      this.setState(({ seconds }) => ({
        seconds: seconds - 1,
      }));
      if (this.state.seconds === 0) {
        this.setState(({ minutes }) => ({
          minutes: minutes - 1,
          seconds: 59,
        }));
      }
    }, 1000);
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

  onStart = () => {
    if (this.state.seconds === 0 && this.state.minutes === 0) {
      alert('Time is up!');
      return;
    }
    this.timer();
  };

  onPause = () => {
    clearInterval(this.interval);
  };

  render() {
    const { completed, edit, onToggleDone, date, onDelete, onEdit } = this.props;
    const { label, minutes, seconds } = this.state;
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
            <span className="title">{label}</span>
            <span className="description">
              <button className="icon icon-play" type="button" aria-label="Play" onClick={this.onStart}></button>
              <button className="icon icon-pause" type="button" aria-label="Pause" onClick={this.onPause}></button>
              {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
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
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
};
