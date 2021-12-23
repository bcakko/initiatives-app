import { useState } from "react";
import CancelIcon from "../assets/icons/CancelIcon";
import DeleteConfirm from "./DeleteConfirm";
import classes from "./FightItem.module.css";

const FightItem = (props) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const onSelectedFightHandler = () => {
    props.onSelect(props.id);
  };

  const showConfirmHandler = () => {
    setShowConfirm(true);
  };

  const closeConfirmHandler = () => {
    setShowConfirm(false);
  };

  return (
    <li className={classes.item}>
      <button
        className={classes["item-button"]}
        type="button"
        onClick={onSelectedFightHandler}
      >
        <h3>{props.name}</h3>
        <h3>{props.count}</h3>
      </button>
      <button className={classes["remove-button"]} onClick={showConfirmHandler}>
        <CancelIcon className={classes.remove}/>
      </button>
      {showConfirm && (
        <DeleteConfirm
          name={props.name}
          onCloseConfirm={closeConfirmHandler}
          onRemove={props.onRemove}
        />
      )}
    </li>
  );
};

export default FightItem;
