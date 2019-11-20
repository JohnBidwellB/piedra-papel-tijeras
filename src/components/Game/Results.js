import React, { Fragment } from "react";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

const Results = props => {
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
      {/* <Button onClick={() => dispatch({ type: gameConstants.NEW_GAME })}>
        Nuevo juego
      </Button> */}
    </Fragment>
  );
};

export default Results;
