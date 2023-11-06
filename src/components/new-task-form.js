import { Component } from "react";
import PropTypes from "prop-types";

export default class NewTaskForm extends Component {
  state = {
    label: "",
    minutes: "",
    seconds: "",
  };

  onHandleChange = (e) => {
    if (e.target.name === 'minutes' || e.target.name === 'seconds') {
      const value = Number(e.target.value);
      if (Number.isNaN(value)) {
        alert('Enter a number');
        return;
      }
    }
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { label, minutes, seconds } = this.state;
    this.props.onAddItem(label, minutes, seconds);
    this.setState({ label: "", minutes: "", seconds: "" });
  };

  render() {
    const { label, minutes, seconds } = this.state;
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          name="label"
          className="new-todo"
          placeholder="What needs to be done?"
          value={label}
          onChange={this.onHandleChange}
        />
        <input
          name="minutes"
          className="new-todo-form__timer"
          placeholder="Min"
          value={minutes}
          onChange={this.onHandleChange}
        />
        <input
          name="seconds"
          className="new-todo-form__timer"
          placeholder="Sec"
          value={seconds}
          onChange={this.onHandleChange}
        />
        <input type="submit" style={{ display: "none" }}></input>
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  onAddItem: PropTypes.func.isRequired,
};
