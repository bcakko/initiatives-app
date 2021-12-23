import Modal from "../UI/Modal";
import { useState } from "react";
import classes from "./EditChar.module.css";

const EditChar = (props) => {
  const [enteredName, setEnteredName] = useState(props.name);
  const [enteredDex, setEnteredDex] = useState(props.dex);
  const [enteredInitiative, setEnteredInitiative] = useState(props.init);
  const [enteredAc, setEnteredAc] = useState(props.ac);

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const dexChangeHandler = (event) => {
    setEnteredDex(event.target.value);
  };
  const acChangeHandler = (event) => {
    setEnteredAc(event.target.value);
  };
  const initiativeChangeHandler = (event) => {
    setEnteredInitiative(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const editCharData = {
      id: props.id,
      name:
        enteredName.length === 0
          ? enteredName
          : enteredName[0].toUpperCase() + enteredName.slice(1),
      ac: +enteredAc,
      dex: +enteredDex,
      init: +enteredInitiative,
    };

    props.onEditChar(props.id, editCharData);
  };

  return (
    <Modal onClose={props.onClose}>
      <form onSubmit={submitHandler} className={classes.form}>
        <label>Name:</label>
        <input
          type="text"
          value={enteredName}
          placeholder="Enter a name"
          onChange={nameChangeHandler}
        />
        <label>Initiative:</label>
        <input
          type="number"
          min="-4"
          max="35"
          value={enteredInitiative}
          onChange={initiativeChangeHandler}
        />
        <label>Dex:</label>
        <input
          type="number"
          min="0"
          max="35"
          value={enteredDex}
          placeholder="Enter character's dex"
          onChange={dexChangeHandler}
        />
        <label>AC:</label>
        <input
          type="number"
          min="-4"
          max="35"
          value={enteredAc}
          onChange={acChangeHandler}
        />
        <div className={classes["edit-char-buttons"]}>
          <button type="button" onClick={props.onClose}>
            Cancel
          </button>
          <button type="submit">Edit</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditChar;
