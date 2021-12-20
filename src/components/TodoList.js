import SearchBar from "./SearchBar";
import { DragDropContext } from "react-beautiful-dnd";

import { v4 as uuidv4 } from "uuid";
import TodoColumn from "./TodoColumn";

import data from "../data/data.json";
import { useState } from "react";
import Modal from "./Modal";

const TodoList = () => {
  const { DUMMY_DATA } = data;

  const [todoData, setTodoData] = useState(DUMMY_DATA);
  const [term, setTerm] = useState("");
  const [modalState, setModalState] = useState(false);
  const [editItem, seteditItem] = useState(null);

  const COLUMNS = [
    { id: "backlog", title: "backlog" },
    { id: "in_progress", title: "in progress" },
    { id: "done", title: "done" },
  ];

  const search = (e) => {
    setTerm(e.target.value);
  };

  const addTodo = (event, values) => {
    console.log("AddTodo");
    const newData = JSON.parse(JSON.stringify(todoData));
    const newItem = { ...values, id: uuidv4() };
    newData.backlog.push(newItem);
    setTodoData(newData);
    setModalState(false);
  };

  const handleDelete = (col, id) => {
    const newData = JSON.parse(JSON.stringify(todoData));
    newData[col] = newData[col].filter((item) => item.id !== id);
    setTodoData(newData);
  };

  const editItemSubmitHandler = (values, colId, id) => {
    console.log("editItemSubmitHandler");
    const newData = JSON.parse(JSON.stringify(todoData));
    newData[colId].find((item) => item.id === id).title = values.title;
    newData[colId].find((item) => item.id === id).desc = values.desc;

    setTodoData(newData);
    seteditItem(null);
    setModalState(false);
  };

  const handleEdit = (colId, id) => {
    const newData = JSON.parse(JSON.stringify(todoData));
    setModalState(true);
    const editItemProps = {
      ...newData[colId].find((item) => item.id === id),
      handler: editItemSubmitHandler,
      colId,
      id,
    };
    seteditItem(editItemProps);
  };

  const handleDragEnd = (result) => {
    const newData = JSON.parse(JSON.stringify(todoData));
    if (result.destination) {
      const [dragEl] = newData[result.source.droppableId].splice(
        result.source.index,
        1
      );
      newData[result.destination.droppableId].splice(
        result.destination.index,
        0,
        dragEl
      );
    }

    setTodoData(newData);
  };

  const searchFilter = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    const newData = JSON.parse(JSON.stringify(items));

    Object.keys(newData).forEach((key) => {
      const newList = newData[key].filter((item) => {
        return item.title.toUpperCase().indexOf(term.toUpperCase()) > -1;
      });
      newData[key] = [...newList];
    });
    return newData;
  };

  const visibleItems = searchFilter(todoData, term);

  return (
    <>
      {modalState && (
        <Modal
          validSubmitHandler={addTodo}
          editItem={editItem}
          closeModal={() => {
            setModalState(false);
            seteditItem(null);
          }}
        />
      )}
      <div className="content-wrapper">
        <div className="control-bar">
          <SearchBar onChange={search} />
          <span className="btn" onClick={() => setModalState(true)}>
            Add New Task
          </span>
        </div>
        <div className="todo">
          <DragDropContext onDragEnd={handleDragEnd}>
            {COLUMNS.map((col) => (
              <TodoColumn
                key={col.id}
                onDelete={handleDelete}
                onEdit={handleEdit}
                title={col.title}
                id={col.id}
                data={visibleItems[col.id]}
              />
            ))}
          </DragDropContext>
        </div>
      </div>
    </>
  );
};

export default TodoList;
