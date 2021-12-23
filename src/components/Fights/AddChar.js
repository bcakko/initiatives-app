import { useState } from "react";
import Modal from "../UI/Modal";
import classes from "./AddChar.module.css";

const AddChar = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredDex, setEnteredDex] = useState("");
  const [enteredInitiative, setEnteredInitiative] = useState("");
  const [enteredAc, setEnteredAc] = useState("");

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

    const newCharData = {
      name:
        enteredName.length === 0
          ? ""
          : enteredName[0].toUpperCase() + enteredName.slice(1),
      dex: +enteredDex,
      init: +enteredInitiative,
      ac: +enteredAc,
      id: Math.random(),
    };

    props.onAddChar(newCharData);
  };

  return (
    <Modal
      onShow={props.onShowAddCharacter}
      onClose={props.onCloseAddCharacter}
    >
      <form onSubmit={submitHandler} className={classes.form}>
        <label>Name:</label>
        <input
          type="text"
          value={enteredName}
          placeholder="Character's name"
          onChange={nameChangeHandler}
        />
        <label>Initiative:</label>
        <input
          type="number"
          min="-4"
          max="35"
          value={enteredInitiative}
          placeholder="Initiative score"
          onChange={initiativeChangeHandler}
        />
        <label>Dex:</label>
        <input
          type="number"
          min="0"
          max="35"
          value={enteredDex}
          placeholder="Dexterity score"
          onChange={dexChangeHandler}
        />

        <label>AC:</label>
        <input
          type="number"
          min="-4"
          max="35"
          value={enteredAc}
          placeholder="Armor class (optional)"
          onChange={acChangeHandler}
        />

        <div className={classes["add-char-buttons"]}>
          <button type="button" onClick={props.onCloseAddCharacter}>
            Cancel
          </button>
          <button type="submit">+ Add</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddChar;
