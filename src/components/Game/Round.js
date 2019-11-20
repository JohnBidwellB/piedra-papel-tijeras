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
    width: "100%"
  },
  menuItem: {
    marginTop: 5
  },

  inputRoot: {
    fontSize: "1.5em",
    borderRadius: 60,
    textAlign: "center"
  },
  input: {
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
  },
  labelRoot: {},
  labelProps: {
    // left: "50%",
    // top: "50%",
    // transform: "translate(-50%, -50%)",
  },
  labelFocused: {
    // Se activa cuando hago click en un input
    left: "0%",
    top: "0%",
    transform: "translate(0%, 0%)"
  },
  notchedOutline: {}
}));

const Round = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const round = useSelector(state => state.game.round);
  const moves = useSelector(state => state.game.moves);
  const player = useSelector(state =>
    state.game.players.filter(player => player.id === round.player)
  )[0];
  console.log("Player: ", player)
  moves.map(move => {
    move.value = move.move;
    move.label = move.move;
    return move;
  });
  const [move, setMove] = useState("");

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
          <center>
            <Typography variant="h2">Ronda {round.round}</Typography>
          </center>
        </Grid>
        <Grid item>
          <center>
            <Typography variant="h5">{player.name}</Typography>
          </center>
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
            variant="outlined"
            inputProps={{
              style: { textAlign: "center" }
            }}
            InputProps={{
              classes: {
                root: classes.inputRoot,
                outlined: classes.input,
                notchedOutline: classes.notchedOutline
              }
            }}
            InputLabelProps={{
              classes: {
                root: classes.labelRoot,
                outlined: classes.labelProps,
                focused: classes.labelFocused
              }
            }}
          >
            {moves.map(option => (
              <MenuItem
                key={option.value}
                value={option.value}
                className={classes.menuItem}
              >
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
