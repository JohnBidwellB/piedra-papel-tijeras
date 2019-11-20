import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  TextField,
  MenuItem,
  Grid
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { gameConstants } from "../../actions/types";

const useStyles = makeStyles(theme => ({
  root: {},
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  menu: {
    width: 200
  }
}));

const Round = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const round = useSelector(state => state.game.round);
  const moves = useSelector(state => state.game.moves);
  moves.map(move => {
    move.value = move.move;
    move.label = move.move;
    return move
  });
  const [move, setMove] = useState('');

  const handleChange = event => {
    setMove(event.target.value);
  };

  const setRounds = () => {
    let newRounds = round.results;
    newRounds[round.round - 1][
      round.player === 1 ? "player_1" : "player_2"
    ] = move;
    return newRounds;
  };

  const nextRound = {
    round: round.player === 2 ? round.round + 1 : round.round,
    player: round.player === 1 ? 2 : 1,
    results: setRounds()
  };

  return (
    <div className={classes.root}>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Typography>Ronda {round.round}</Typography>
        </Grid>
        <Grid item>
          <Typography>Jugador {round.player}</Typography>
        </Grid>
        <Grid item>
          <TextField
            id={`select-move-player-${round.player}`}
            key={`select-move-player-${round.player}`}
            select
            label="Seleccionar movimiento"
            className={classes.textField}
            value={move}
            onChange={handleChange}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            margin="normal"
            fullWidth
          >
            {moves.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() =>
              dispatch({
                type: gameConstants.NEXT_PLAYER,
                nextRound: nextRound
              })
            }
            fullWidth
            color="primary"
            disabled={!move}
          >
            Siguiente jugador
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Round;
