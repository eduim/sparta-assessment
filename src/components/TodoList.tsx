import { useState } from "react";
import ListItem from "./ListItem";
import { TodoType } from "../types";
import Input from "../ui/Input";
import Button from "../ui/Button";
import "./styles/todolist.scss";

export default function Todolist() {
  const [todo, setTodo] = useState<TodoType[]>([]);
  const [newTodoInput, setNewTodoInput] = useState<string>("");

  function handleSubmitAddTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newTodo = {
      id: todo.length,
      title: newTodoInput,
      completed: false,
    };
    if (newTodoInput) {
      setTodo([...todo, newTodo]);
    }
    setNewTodoInput("");
  }

  function handleChangeAddTask(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTodoInput(e.target.value);
  }

  function handleSubmitEditTask(editTodoInput: string, index: number) {
    const editTodo = {
      id: index,
      title: editTodoInput,
      completed: false,
    };

    if (editTodoInput) {
      setTodo(
        todo.map((item) => {
          if (item.id === editTodo.id) {
            return editTodo;
          }
          return item;
        })
      );
    }
  }
  function handleChangeCheckTask(index: number) {
    setTodo(
      todo.map((item) => {
        if (item.id === index) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  }

  function handleClickDeleteTask(index: number) {
    setTodo(todo.filter((item) => item.id !== index));
  }

  const itemProps = {
    handleSubmitEditTask,
    handleChangeCheckTask,
    handleClickDeleteTask,
  };

  return (
    <div className="todo-wrapper">
      <form className="todo-form" onSubmit={handleSubmitAddTask}>
        <h1>To Do List</h1>
        <label>Add new task</label>
        <div>
          <Input
            type="text"
            name="new-task"
            placeholder="new task"
            value={newTodoInput}
            changeHandler={handleChangeAddTask}
          />

          <Button>Add</Button>
        </div>
      </form>
      {
        <ul className="todo-list" data-test-id="todo-list">
          {todo.map((item) => (
            <ListItem key={item.id} {...itemProps} item={item} />
          ))}
        </ul>
      }
    </div>
  );
}
