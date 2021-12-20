import { AvForm, AvField } from "availity-reactstrap-validation";
import { Button } from "reactstrap";

const Modal = ({ validSubmitHandler, closeModal, editItem }) => {
  const model = editItem ? { title: editItem.title, desc: editItem.desc } : {};
  return (
    <>
      <div className="backdrop" onClick={closeModal}></div>
      <div className="modal">
        <h3>{editItem ? "Edit" : "Add New Task"}</h3>
        <AvForm
          onValidSubmit={
            editItem
              ? (e, values) =>
                  editItem.handler(values, editItem.colId, editItem.id)
              : validSubmitHandler
          }
          model={model}
        >
          <AvField
            name="title"
            label="Title*"
            type="text"
            validate={{
              required: { value: true, errorMessage: "Please enter a title" },
              maxLength: {
                value: 25,
              },
            }}
          />
          <AvField
            name="desc"
            label="Description*"
            type="textarea"
            validate={{
              required: {
                value: true,
                errorMessage: "Please enter a short description of the task",
              },
              maxLength: {
                value: 70,
              },
            }}
          />
          <Button color="primary">{editItem ? "EDIT" : "ADD"}</Button>
        </AvForm>
      </div>
    </>
  );
};

export default Modal;
