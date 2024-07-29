import { forwardRef, useState } from "react";
import DeadIcon from "../assets/icons/DeadIcon";
import EditIcon from "../assets/icons/EditIcon";
import InitIcon from "../assets/icons/InitIcon";
import ShieldIcon from "../assets/icons/ShieldIcon";
import classes from "./CharItem.module.css";
import DeleteConfirm from "./DeleteConfirm";
import EditChar from "./EditChar";

const CharItem = forwardRef((props, ref) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onEditCharHandler = (charId, data) => {
    props.onEditChar(charId, data);
    setShowEdit(false);
  };

  const showEditHandler = () => {
    setShowEdit(true);
  };
  const closeEditHandler = () => {
    setShowEdit(false);
  };

  const showConfirmHandler = () => {
    setShowConfirm(true);
  };

  const closeConfirmHandler = () => {
    setShowConfirm(false);
  };

  return (
    <li ref={ref} className={`${classes.char} ${props.className}`}>
      <p className={classes.name}>{props.name}</p>
      <div className={classes["initiative-container"]}>
        <InitIcon className={classes["initiative-icon"]} />
        <p className={classes.initiative}>{props.init}</p>
      </div>
      <div className={classes["shield-container"]}>
        <ShieldIcon className={classes["shield-icon"]} />
        <p>{props.ac}</p>
      </div>
      <button
        className={classes["edit-button"]}
        type="button"
        onClick={showEditHandler}
      >
        <EditIcon className={classes["edit-icon"]} />
      </button>
      <button className={classes["dead-button"]} onClick={showConfirmHandler}>
        <DeadIcon className={classes["dead-icon"]} />
      </button>

      {showEdit && (
        <EditChar
          onClose={closeEditHandler}
          onEditChar={onEditCharHandler}
          name={props.name}
          ac={props.ac}
          dex={props.dex}
          init={props.init}
          id={props.id}
        />
      )}
      {showConfirm && (
        <DeleteConfirm
          name={props.name}
          onCloseConfirm={closeConfirmHandler}
          onRemove={props.onRemove}
        />
      )}
    </li>
  );
});

export default CharItem;
