import { AvForm, AvField } from "availity-reactstrap-validation";
import { Button } from "reactstrap";

const Modal = ({ validSubmitHandler, closeModal }) => {
  return (
    <>
      <div className="backdrop" onClick={closeModal}></div>
      <div className="modal">
        <h3>Add New Task</h3>
        <AvForm onValidSubmit={validSubmitHandler}>
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
          <Button color="primary">ADD</Button>
        </AvForm>
      </div>
    </>
  );
};

export default Modal;
