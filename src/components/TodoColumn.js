import TodoItem from "./TodoItem";
import { Droppable } from "react-beautiful-dnd";
const TodoColumn = ({ title, data, id, onDelete, onEdit }) => {
  return (
    <div className={`todo-column-wrapper ${id}`}>
      <h2>{title}</h2>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            className="todo-column"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {data.map((todo, idx) => (
              <TodoItem
                onDelete={onDelete}
                onEdit={onEdit}
                key={todo.id}
                index={idx}
                todo={todo}
                colId={id}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoColumn;
