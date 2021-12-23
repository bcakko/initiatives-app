import Modal from "../UI/Modal";
import classes from "./DeleteConfirm.module.css";

const DeleteConfirm = (props) => {
  return (
    <Modal onClose={props.onCloseConfirm}>
      <p>{props.name.length > 0 ? `Removing ${props.name}?` : 'Are you sure?'}</p>
      <div className={classes.buttons}>
        <button type="button" onClick={props.onCloseConfirm}>
          Cancel
        </button>
        <button onClick={props.onRemove} type="button">Remove</button>
      </div>
    </Modal>
  );
};

export default DeleteConfirm;
