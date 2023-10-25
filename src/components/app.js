import { Component } from "react";
import { formatDistanceToNow } from "date-fns";
import AppHeader from "./app-header";
import TaskList from "./task-list";
import Footer from "./footer";

export default class App extends Component {
  static filterItems(data, filter) {
    if (filter === "active") {
      return data.filter((el) => !el.completed);
    }
    if (filter === "completed") {
      return data.filter((el) => el.completed);
    }
    return data;
  }

  maxId = 100;

  state = {
    todoData: [
      {
        id: 1,
        label: "Completed task",
        get date() {
          return formatDistanceToNow(this.createdDate, {
            includeSeconds: true,
          });
        },
        completed: false,
        edit: false,
        createdDate: Date.now() - 17000,
      },
      {
        id: 2,
        label: "Editing task",
        get date() {
          return formatDistanceToNow(this.createdDate, {
            includeSeconds: true,
          });
        },
        completed: false,
        edit: false,
        createdDate: Date.now() - 300000,
      },
      {
        id: 3,
        label: "Active task",
        get date() {
          return formatDistanceToNow(this.createdDate, {
            includeSeconds: true,
          });
        },
        completed: false,
        edit: false,
        createdDate: Date.now() - 300000,
      },
    ],
    filter: "all",
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const value = !oldItem.completed;
      const newItem = { ...todoData[idx], completed: value };

      return {
        todoData: [
          ...todoData.slice(0, idx),
          newItem,
          ...todoData.slice(idx + 1),
        ],
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newArr,
      };
    });
  };

  addItem = (label) => {
    this.setState((state) => {
      const item = this.createItem(label);
      return { todoData: [...state.todoData, item] };
    });
  };

  editItem = (id, text) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, label: text, edit: false };
      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return {
        todoData: newArr,
      };
    });
  };

  onEdit = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, edit: !oldItem.edit };
      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return {
        todoData: newArr,
      };
    });
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const items = todoData.filter((el) => !el.completed);
      return {
        todoData: items,
      };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  createItem(label) {
    return {
      id: ++this.maxId,
      label,
      get date() {
        return formatDistanceToNow(this.createdDate, {
          includeSeconds: true,
        });
      },
      completed: false,
      createdDate: Date.now(),
    };
  }

  render() {
    const { todoData, filter } = this.state;
    const todoCount = todoData.filter((el) => !el.completed).length;
    const filteredItems = App.filterItems(todoData, filter);
    return (
      <section className="main">
        <AppHeader onAddItem={this.addItem} />
        <TaskList
          tasks={filteredItems}
          onDelete={this.deleteItem}
          onToggleDone={this.onToggleDone}
          onEdit={this.onEdit}
          editItem={this.editItem}
        />
        <Footer
          todo={todoCount}
          filter={filter}
          onClearCompleted={this.clearCompleted}
          onFilterChange={this.onFilterChange}
        />
      </section>
    );
  }
}
