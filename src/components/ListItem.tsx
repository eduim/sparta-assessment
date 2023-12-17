import { useState } from "react";
type ListItemProps = {
  item: {
    id: number;
    title: string;
    completed: boolean;
  };
  handleSubmitEditTask: (editTodoInput: string, index: number) => void;
  handleChangeCheckTask: (index: number) => void;
  handleClickDeleteTask: (index: number) => void;
};

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
    <li>
      {!editMode && <span>{item.title}</span>}
      {editMode && (
        <input
          type="text"
          onChange={(e) => setEditTodoInput(e.target.value)}
        ></input>
      )}
      <button type="submit" onClick={handleClickEditMode}>
        Edit
      </button>
      <button type="submit" onClick={() => handleClickDeleteTask(item.id)}>
        Delete
      </button>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => handleChangeCheckTask(item.id)}
      />
    </li>
  );
}