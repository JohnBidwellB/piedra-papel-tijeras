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
import { useSnackbar } from "notistack";

const roundWinnerMessage = (result, players) => {
  const player = players.find(player => player.id === result.winner);
  switch (result.winner) {
    case 1:
    case 2:
      return `${player.name} ha ganado la ronda`;
    case 0:
      return "Ha ocurrido un empate";
    default:
      return "No se ha podido calcular el ganador de la ronda";
  }
};

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
  labelProps: {},
  labelFocused: {
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
  const players = useSelector(state => state.game.players);
  const player = useSelector(state =>
    state.game.players.filter(player => player.id === round.player)
  )[0];
  const { enqueueSnackbar } = useSnackbar();

  moves.map(move => {
    move.value = move.move;
    move.label = move.move;
    return move;
  });
  const [move, setMove] = useState("");

  const handleChange = event => {
    setMove(event.target.value);
  };

  const setRoundWinner = () => {
    let currentRound = round.results.find(
      result => result.round === round.round
    );
    let move_1 = moves.find(move => move.move === currentRound.player_1);
    let move_2 = moves.find(move => move.move === currentRound.player_2);

    if (move_1.kills === move_2.move) {
      return 1;
    } else if (move_2.kills === move_1.move) {
      return 2;
    }
    return 0;
  };

  const setRounds = () => {
    let newRounds = round.results;
    newRounds.slice(-1)[0][round.player === 1 ? "player_1" : "player_2"] = move;
    if (round.player === 2 && move !== "") {
      newRounds.slice(-1)[0]["winner"] = setRoundWinner();
    }
    return newRounds;
  };

  const nextRound = {
    round: round.player === 2 ? round.round + 1 : round.round,
    player: round.player === 1 ? 2 : 1,
    results: setRounds()
  };

  const handleNextTurn = () => {
    dispatch({
      type: gameConstants.NEXT_PLAYER,
      nextRound: nextRound
    });
    if (round.player === 2 && move !== "") {
      enqueueSnackbar(
        roundWinnerMessage(nextRound.results.slice(-1)[0], players),
        {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right"
          },
          autoHideDuration: 3000
        }
      );
      dispatch({ type: gameConstants.ADD_ROUND });
    }
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
                // outlined: classes.input,
                notchedOutline: classes.notchedOutline
              }
            }}
            InputLabelProps={{
              classes: {
                root: classes.labelRoot,
                // outlined: classes.labelProps,
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
            onClick={() => handleNextTurn()}
            // onClick={() =>
            //   dispatch({
            //     type: gameConstants.NEXT_PLAYER,
            //     nextRound: nextRound
            //   })
            // }
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
