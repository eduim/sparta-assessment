import { useState } from "react";
import { ListItemProps } from "../types";
import Input from "../ui/Input";
import Button from "../ui/Button";
import "./styles/listitem.scss";
export default function ListItem({
  item,
  handleChangeCheckTask,
  handleSubmitEditTask,
  handleClickDeleteTask,
}: ListItemProps) {
  const [editMode, setEditMode] = useState(false);
  const [editTodoInput, setEditTodoInput] = useState<string>("");

  const handleClickEditMode = () => {
    setEditMode(!editMode);
    if (editMode) {
      handleSubmitEditTask(editTodoInput, item.id);
    }
  };

  return (
    <li className="todo-item">
      <Input
        type="checkbox"
        checked={item.completed}
        changeHandler={() => handleChangeCheckTask(item.id)}
      />
      <div className="placeholder">
        {!editMode && <span>{item.title}</span>}
        {editMode && (
          <Input
            type="text"
            name="editTask"
            changeHandler={(e) => setEditTodoInput(e.target.value)}
          />
        )}
      </div>
      <Button type="submit" clickHandler={handleClickEditMode}>
        Edit
      </Button>
      <Button type="submit" clickHandler={() => handleClickDeleteTask(item.id)}>
        Delete
      </Button>
    </li>
  );
}
