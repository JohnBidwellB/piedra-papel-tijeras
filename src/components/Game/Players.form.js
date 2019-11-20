import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { TextField, Button, Grid } from "@material-ui/core";
import { gameConstants } from "../../actions/types";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {},
  textField: {}
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
      id: 1,
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
      <Grid container spacing={4} direction="column">
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
          />
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            disabled={!valid}
            onClick={() =>
              dispatch({ type: gameConstants.ENTER_PLAYERS_FINISHED, players })
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
