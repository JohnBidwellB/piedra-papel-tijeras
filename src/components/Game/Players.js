import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { gameConstants } from "../../actions/types";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {},
  textField: {},
  inputRoot: {
    fontSize: "1.5em",
    borderRadius: 60,
    textAlign: "center",
  },
  input: {
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
  },
  labelRoot: {
  },
  labelProps: {
  },
  labelFocused: {
    left: "0%",
    top: "0%",
    transform: "translate(0%, 0%)"
  },
  notchedOutline: {}
}));

const PlayersForm = props => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [players, setPlayers] = useState({
    player1: {
      id: 1,
      name: ""
    },
    player2: {
      id: 2,
      name: ""
    }
  });

  const updateForm = event => {
    setPlayers({
      ...players,
      [event.target.name]: {
        ...players[event.target.name],
        name: event.target.value
      }
    });
  };

  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (players.player1.name.length > 0 && players.player2.name.length > 0) {
      setValid(true);
    }
  }, [players]);

  return (
    <div className={classes.root}>
      <Grid container spacing={4} direction="column" justify="center">
        <Grid item>
          <center>
            <Typography variant="h2">Ingreso de jugadores</Typography>
          </center>
        </Grid>

        <Grid item>
          <TextField
            id="player-1-set-name"
            name="player1"
            required
            label="Jugador 1"
            placeholder="Jugador 1"
            margin="normal"
            className={classes.textField}
            fullWidth
            onChange={updateForm}
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
          />
        </Grid>
        <Grid item>
          <TextField
            id="player-2-set-name"
            name="player2"
            required
            label="Jugador 2"
            placeholder="Jugador 2"
            margin="normal"
            className={classes.textField}
            fullWidth
            onChange={updateForm}
            variant="outlined"
            inputProps={{
              style: { textAlign: "center" }
            }}
            InputProps={{
              classes: {
                root: classes.inputRoot,
                notchedOutline: classes.notchedOutline
              }
            }}
            InputLabelProps={{
              classes: {
                root: classes.labelRoot,
                focused: classes.labelFocused
              }
            }}
          />
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            disabled={!valid}
            onClick={() =>
              dispatch({ type: gameConstants.ENTER_PLAYERS_FINISHED, players: [players.player1, players.player2] })
            }
          >
            Comenzar el juego
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default PlayersForm;
