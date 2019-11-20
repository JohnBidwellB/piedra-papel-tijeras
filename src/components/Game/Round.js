import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, TextField, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { gameConstants } from "../../actions/types";

const useStyles = makeStyles(theme => ({
  root: {},
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  menu: {
    width: 200
  }
}));

const getMoves = moves => {
  return moves.map(move => {
    move.value = move.move;
    move.label = move.move;
  });
};

const Round = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const round = useSelector(state => state.game.round);
  const moves = useSelector(state => state.game.moves);
  moves.map(move => {
    move.value = move.move;
    move.label = move.move;
  });
  const [move, setMove] = useState("");

  const handleChange = event => {
    setMove(event.target.value);
  };

  const setRounds = () => {
    let newRounds = round.results;
    // const player = round.player === 1 ? "player_1" : "player_2";
    newRounds[round.round - 1][round.player === 1 ? "player_1" : "player_2"] = move;
    return newRounds;
  };

  const nextRound = {
    round: round.player === 2 ? round.round + 1 : round.round,
    player: round.player === 1 ? 2 : 1,
    results: setRounds()
  };
  console.log("NExt round: ", nextRound);

  return (
    <div classNname={classes.root}>
      <Typography>Ronda {round.round}</Typography>
      <Typography>Jugador {round.player}</Typography>
      <TextField
        id={`select-move-player-${round.player}`}
        key={`select-move-player-${round.player}`}
        select
        label="Select"
        className={classes.textField}
        value={move}
        onChange={handleChange}
        SelectProps={{
          MenuProps: {
            className: classes.menu
          }
        }}
        helperText="Escoje un movimiento"
        margin="normal"
      >
        {moves.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Button
        variant="contained"
        onClick={() =>
          dispatch({ type: gameConstants.NEXT_PLAYER, nextRound: nextRound })
        }
      >
        Siguiente jugador
      </Button>
    </div>
  );
};

export default Round;
