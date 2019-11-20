import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { gameConstants } from "../../actions/types";

const useStyles = makeStyles(theme => ({
  root: {}
}));

const getRoundTitle = round => {
  switch (round) {
    case "round_1":
      return "Ronda 1";
    default:
      return "Nueva ronda";
  }
};

const getNextRound = round => {
  switch (round) {
    case "round_1":
      return "round_1_player_1";
    case "round_2":
      return "round_2_player_1";
    case "round_3":
      return "round_3_player_1";
    default:
      return "Nueva ronda";
  }
};

const RoundTitle = props => {
  const classes = useStyles();
  const round = useSelector(state => state.game.round);
  const dispatch = useDispatch();
  const nextRound = getNextRound(round);

  return (
    <div className={classes.root}>
      <Typography variant="h1">{getRoundTitle(round)}</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          dispatch({ type: gameConstants.CHANGE_ROUND, nextRound: nextRound })
        }
      >
        Comenzar {getRoundTitle(round)}
      </Button>
    </div>
  );
};

export default RoundTitle;
