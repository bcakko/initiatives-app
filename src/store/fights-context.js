import React from "react";

const FightsContext = React.createContext({
  fights: [],
  addFight: (fight) => {},
  removeFight: (id) => {},
  addChar: (char) => {},
  removeChar: (id) => {},
  sortFight: (id) => {},
  editChar: (id) => {},
});

export default FightsContext;
