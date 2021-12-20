import { Draggable } from "react-beautiful-dnd";

const TodoItem = ({ todo, index, colId, onDelete, onEdit }) => {
  const { title, desc, id } = todo;
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className="todo-item"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="todo-item-info">
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
          <div className="todo-item-controls">
            <span
              onClick={() => onDelete(colId, id)}
              className="delete-btn"
            ></span>
            <span onClick={() => onEdit(colId, id)} className="edit-btn"></span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TodoItem;
