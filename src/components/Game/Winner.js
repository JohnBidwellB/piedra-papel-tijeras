import React from "react";
import { Typography, Button } from "@material-ui/core";
import { gameConstants } from "../../actions/types";
import { useDispatch } from "react-redux";

const Winner = props => {
  const dispatch = useDispatch();
  return (
    <div>
      <Typography>Tenemos un ganador!</Typography>
      <Button onClick={() => dispatch({ type: gameConstants.NEW_GAME })}>
        Nuevo juego
      </Button>
    </div>
  );
};

export default Winner;
