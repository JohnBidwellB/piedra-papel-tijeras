import React, { Fragment } from "react";
import { Typography, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { gameConstants } from "../../actions/types";

const Results = props => {
  const dispatch = useDispatch();
  const round = useSelector(state => state.game.round);
  const results =
    round &&
    round.results.filter(
      result =>
        result.player_1.length > 0 &&
        result.player_2 &&
        result.player_2.length > 0
    );
  console.log("Round: ", round);
  return (
    <Fragment>
      <Typography>Resultados</Typography>
      <Typography>Ronda Ganador</Typography>
      {results.map((result, index) => (
        <Typography>{index + 1} winner</Typography>
      ))}
      <Button onClick={() => dispatch({ type: gameConstants.NEW_GAME })}>
        Nuevo juego
      </Button>
    </Fragment>
  );
};

export default Results;
