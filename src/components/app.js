import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import AppHeader from "./app-header";
import TaskList from "./task-list";
import Footer from "./footer";

function App() {
  const data = [
    {
      id: 1,
      label: "Completed task",
      get date() {
        return formatDistanceToNow(Date.now() - 17000, {
          includeSeconds: true,
        });
      },
      completed: false,
      edit: false,
      minutes: 12,
      seconds: 25,
    },
    {
      id: 2,
      label: "Editing task",
      get date() {
        return formatDistanceToNow(Date.now() - 300000, {
          includeSeconds: true,
        });
      },
      completed: false,
      edit: false,
      minutes: 12,
      seconds: 25,
    },
    {
      id: 3,
      label: "Active task",
      get date() {
        return formatDistanceToNow(Date.now() - 300000, {
          includeSeconds: true,
        });
      },
      completed: false,
      edit: false,
      minutes: 12,
      seconds: 25,
    },
  ];

  const [filter, setFilter] = useState("all");
  const [todoData, setTodoData] = useState(data);
  const [filteredItems, setFilteredItems] = useState(todoData);

  let maxId = 100;

  useEffect(() => {
    if (filter === "all") {
      setFilteredItems(todoData);
    } else if (filter === "active") {
      setFilteredItems(todoData.filter((el) => !el.completed));
    } else if (filter === "completed") {
      setFilteredItems(todoData.filter((el) => el.completed));
    }
  }, [filter, todoData]);

  const onToggleDone = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const value = !oldItem.completed;
    const newItem = { ...todoData[idx], completed: value };
    const newArr = [
      ...todoData.slice(0, idx),
      newItem,
      ...todoData.slice(idx + 1),
    ];
    setTodoData(newArr);
  };

  const deleteItem = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
    setTodoData(newArr);
  };

  function createItem(label, minutes, seconds) {
    const obj = {
      id: ++maxId,
      label,
      get date() {
        return formatDistanceToNow(Date.now(), {
          includeSeconds: true,
        });
      },
      completed: false,
      edit: false,
      minutes: +minutes,
      seconds: +seconds,
    };
    return obj;
  }

  const addItem = (label, minutes, seconds) => {
    const item = createItem(label, minutes, seconds);
    setTodoData((existingData) => [...existingData, item]);
  };

  const editItem = (id, text) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, label: text, edit: false };
    const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
    setTodoData(newArr);
  };

  const onEdit = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, edit: !oldItem.edit };
    const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
    setTodoData(newArr);
  };

  const clearCompleted = () => {
    const items = todoData.filter((el) => !el.completed);
    setTodoData(items);
  };

  const onFilterChange = (filterName) => {
    setFilter(filterName);
  };

  const todoCount = todoData.filter((el) => !el.completed).length;
  return (
    <section className="todoapp">
      <AppHeader onAddItem={addItem} />
      <section className="main">
        <TaskList
          tasks={filteredItems}
          onDelete={deleteItem}
          onToggleDone={onToggleDone}
          onEdit={onEdit}
          editItem={editItem}
        />
        <Footer
          todo={todoCount}
          filter={filter}
          onClearCompleted={clearCompleted}
          onFilterChange={onFilterChange}
        />
      </section>
    </section>
  );
}

export default App;
