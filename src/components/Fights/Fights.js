import FightItem from "./FightItem";
import Card from "../UI/Card";
import { useContext, useState } from "react";
import CharItem from "./CharItem";
import FightsContext from "../../store/fights-context";
import classes from "./Fights.module.css";
import AddChar from "./AddChar";
import AddFight from "./AddFight";
import BackIcon from "../assets/icons/BackIcon";
import ForwardIcon from "../assets/icons/ForwardIcon";
import Header from "../Header/Header";

const Fights = (props) => {
  const fightsCtx = useContext(FightsContext);
  const [selectedFightId, setSelectedFightId] = useState(null);
  const [queue, setQueue] = useState(0);
  const [turnCounter, setTurnCounter] = useState(1);
  const [showAddChar, setShowAddChar] = useState(false);
  const [showAddFight, setShowAddFight] = useState(false);

  const selectFightHandler = (id) => {
    setSelectedFightId(id);
  };

  const removeFightHandler = (id) => {
    fightsCtx.removeFight(id);
  };

  const removeCharHandler = (fightId, charId) => {
    if (queue >= selectedFightChars.findIndex((char) => char.id === charId)) {
      setQueue((prevState) => {
        return --prevState;
      });
    }
    if (
      queue === 0 &&
      selectedFightChars.findIndex((char) => char.id === charId) === 0
    ) {
      setQueue(0);
    }
    fightsCtx.removeChar(fightId, charId);
  };

  const backHandler = () => {
    setSelectedFightId(null);
    setQueue(0);
  };

  const addCharacterShowHandler = () => {
    setShowAddChar(true);
  };
  const addCharacterCloseHandler = () => {
    setShowAddChar(false);
  };

  const nextHandler = () => {
    setQueue((prevState) => {
      if (prevState === selectedFightChars.length - 1) {
        setTurnCounter((prevState) => ++prevState);
        return 0;
      }
      return ++prevState;
    });
  };

  const prevHandler = () => {
    setQueue((prevState) => {
      if (prevState === 0 && turnCounter === 1) {
        return prevState;
      }
      if (prevState === 0) {
        setTurnCounter((prevCount) => {
          if (prevCount === 1) {
            prevCount = 1;
            return prevCount;
          }
          return --prevCount;
        });
        return selectedFightChars.length - 1;
      }
      return --prevState;
    });
  };

  const sortHandler = () => {
    fightsCtx.sortFight(selectedFightId);
  };

  let selectedFightChars = fightsCtx.fights
    .filter((fight) => fight.id === selectedFightId)
    .map((fight) => fight.chars);

  if (selectedFightChars.length > 0) {
    selectedFightChars = selectedFightChars[0];
  }

  let selectedFight = fightsCtx.fights.filter(
    (fight) => fight.id === selectedFightId
  );

  const editCharHandler = (charId, data) => {
    fightsCtx.editChar(selectedFightId, charId, data);
  };

  const fightsRender = fightsCtx.fights.map((fight) => (
    <FightItem
      key={fight.id}
      id={fight.id}
      name={fight.name}
      count={fight.chars.length}
      chars={fight.chars}
      onSelect={selectFightHandler}
      onRemove={removeFightHandler.bind(null, fight.id)}
    />
  ));

  const charsRender = selectedFightChars.map((char) => (
    <CharItem
      className={
        queue === selectedFightChars.indexOf(char) ? classes.queue : ""
      }
      key={char.id}
      id={char.id}
      name={char.name}
      ac={char.ac}
      dex={char.dex}
      init={char.init}
      fightId={selectedFightId}
      onRemove={removeCharHandler.bind(null, selectedFightId, char.id)}
      onEditChar={editCharHandler}
    />
  ));

  const addCharHandler = (data) => {
    fightsCtx.addChar(selectedFightId, data);
    setShowAddChar(false);
  };

  const showAddFightHandler = () => {
    setShowAddFight(true);
  };

  const closeAddFightHandler = () => {
    setShowAddFight(false);
  };
  const addFightHandler = (data) => {
    fightsCtx.addFight(data);
    setShowAddFight(false);
  };

  return (
    <>
      <Header />
      <Card>
        {!selectedFightId && (
          <div className={classes["fights-container"]}>
            <ul className={classes.fights}>{fightsRender}</ul>
            <button
              className={`${classes["add-fight-button"]} ${
                fightsCtx.fights.length === 0 ? classes.blink : ""
              }`}
              type="button"
              onClick={showAddFightHandler}
            >
              Add Fight
            </button>
            {showAddFight && (
              <AddFight
                onAddFight={addFightHandler}
                onCloseAddFight={closeAddFightHandler}
              />
            )}
          </div>
        )}
        {!selectedFightId || (
          <>
            <div className={classes["button-container"]}>
              <button type="button" onClick={backHandler}>
                <BackIcon className={classes["back-icon"]} />
              </button>
              <button type="button" onClick={sortHandler}>
                Sort
              </button>
              <button
                className={selectedFightChars.length === 0 ? classes.blink : ""}
                type="button"
                onClick={addCharacterShowHandler}
              >
                + Character
              </button>
            </div>
            <h2 className={classes["fight-title"]}>{selectedFight[0].name}</h2>
            {selectedFightChars.length !== 0 && (
              <h3 className={classes.turn}>{`Turn ${turnCounter}`}</h3>
            )}
            {selectedFightChars.length === 0 ? (
              <h5>
                It looks like everyone is dead! <br /> Start by adding a new
                character to the fight.
              </h5>
            ) : (
              <ul className={classes["characters-list"]}>{charsRender}</ul>
            )}
            {showAddChar && (
              <AddChar
                onAddChar={addCharHandler}
                onCloseAddCharacter={addCharacterCloseHandler}
              />
            )}

            {selectedFightChars.length > 0 && (
              <div className={classes.counters}>
                <button
                  className={
                    queue === 0 && turnCounter === 1 ? classes.disabled : ""
                  }
                  disabled={queue === 0 && turnCounter === 1 ? true : false}
                  onClick={prevHandler}
                >
                  <ForwardIcon className={classes.backward} />
                </button>
                <button onClick={nextHandler}>
                  <ForwardIcon className={classes.forward} />
                </button>
              </div>
            )}
          </>
        )}
      </Card>
    </>
  );
};

export default Fights;
