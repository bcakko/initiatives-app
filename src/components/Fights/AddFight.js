import Modal from "../UI/Modal";
import classes from "./AddFight.module.css";
import { useState } from "react";

const AddFight = (props) => {
  const [enteredName, setEnteredName] = useState("");

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const newFightData = {
      name:
        enteredName.length === 0
          ? ""
          : enteredName[0].toUpperCase() + enteredName.slice(1),
      id: Math.random(),
      chars: [],
    };

    props.onAddFight(newFightData);
  };

  return (
    <Modal onClose={props.onCloseAddFight}>
      <form onSubmit={submitHandler} className={classes.form}>
        <label>Name:</label>
        <input
          type="text"
          value={enteredName}
          placeholder="Enter a name"
          onChange={nameChangeHandler}
        />
        <div className={classes["add-char-buttons"]}>
          <button type="button" onClick={props.onCloseAddFight}>
            Cancel
          </button>
          <button type="submit">+ Add</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddFight;
