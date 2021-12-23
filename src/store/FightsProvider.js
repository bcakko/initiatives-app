import { useEffect, useReducer } from "react";
import FightsContext from "./fights-context";

const savedDataJSON = localStorage.getItem("fights");
const savedData = savedDataJSON ? JSON.parse(savedDataJSON) : [];

const defaultFightsState = {
  fights: savedData
};

const fightsReducer = (state, action) => {
  if (action.type === "ADD_FIGHT") {
    let updatedFights = state.fights.concat(action.data);
    return {
      fights: updatedFights,
    };
  }
  if (action.type === "REMOVE_FIGHT") {
    const updatedFights = state.fights.filter(
      (fight) => fight.id !== action.id
    );

    return {
      fights: updatedFights,
    };
  }

  if (action.type === "ADD_CHAR") {
    const existingFightIndex = state.fights.findIndex(
      (fight) => fight.id === action.fightId
    );
    const existingFight = state.fights[existingFightIndex];
    const updatedChars = existingFight.chars.concat(action.data);

    state.fights[existingFightIndex].chars = updatedChars;

    return {
      fights: state.fights,
    };
  }
  if (action.type === "REMOVE_CHAR") {
    const existingFightIndex = state.fights.findIndex(
      (fight) => fight.id === action.fightId
    );
    const existingFight = state.fights[existingFightIndex];
    const updatedChars = existingFight.chars.filter(
      (char) => char.id !== action.charId
    );

    state.fights[existingFightIndex].chars = updatedChars;

    return {
      fights: state.fights,
    };
  }

  if (action.type === "SORT_FIGHT") {
    const existingFightIndex = state.fights.findIndex(
      (fight) => fight.id === action.id
    );
    const existingFight = state.fights[existingFightIndex];
    const updatedChars = existingFight.chars.sort((a, b) => {
      if (b.init === a.init) {
        if (b.dex < a.dex) {
          return -1;
        }
      }
      if (b.init - a.init < 0) {
        return -1;
      }
      return 1;
    });

    state.fights[existingFightIndex].chars = updatedChars;

    return {
      fights: state.fights,
    };
  }

  if (action.type === "EDIT_CHAR") {
    const existingFightIndex = state.fights.findIndex(
      (fight) => fight.id === action.fightId
    );
    const existingFightChars = state.fights[existingFightIndex].chars;

    const existingCharIndex = existingFightChars.findIndex(
      (char) => char.id === action.charId
    );

    state.fights[existingFightIndex].chars[existingCharIndex] = action.data;

    return {
      fights: state.fights,
    };
  }

  return defaultFightsState;
};

const FightsProvider = (props) => {
  let [fightsState, dispatchFightsAction] = useReducer(
    fightsReducer,
    defaultFightsState
  );

  useEffect(() => {
    localStorage.setItem("fights", JSON.stringify(fightsState.fights));
    
  }, [fightsState]);

  const addFightToFightsHandler = (data) => {
    dispatchFightsAction({ type: "ADD_FIGHT", data: data });
  };

  const removeFightFromFightsHandler = (id) => {
    dispatchFightsAction({ type: "REMOVE_FIGHT", id: id });
  };

  const addCharHandler = (fightId, data) => {
    dispatchFightsAction({ type: "ADD_CHAR", fightId: fightId, data: data });
  };

  const removeCharHandler = (fightId, charId) => {
    dispatchFightsAction({
      type: "REMOVE_CHAR",
      fightId: fightId,
      charId: charId,
    });
  };

  const sortFightHandler = (id) => {
    dispatchFightsAction({ type: "SORT_FIGHT", id: id });
  };

  const editCharHandler = (fightId, charId, data) => {
    dispatchFightsAction({
      type: "EDIT_CHAR",
      fightId: fightId,
      charId: charId,
      data: data,
    });
  };

  const fightsContext = {
    fights: fightsState.fights,
    addFight: addFightToFightsHandler,
    removeFight: removeFightFromFightsHandler,
    addChar: addCharHandler,
    removeChar: removeCharHandler,
    sortFight: sortFightHandler,
    editChar: editCharHandler,
  };

  return (
    <FightsContext.Provider value={fightsContext}>
      {props.children}
    </FightsContext.Provider>
  );
};

export default FightsProvider;
