import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { gameConstants } from "../../actions/types";
import { useDispatch } from "react-redux";



const useStyles = makeStyles(theme => ({
  root: {},
  textField: {},
  inputRoot: {
    fontSize: "1.5em",
    borderRadius: 60
  },
  labelProps: {
    // width: "100%",
    left: "50%",
    top: "50%",
    // right: "50%",
    // textAlign: "center",
    transform: "translate(-50%, -50%)"
  },
  focused: {
    left: "50%",
    top: "0%",
    transform: "translate(-50%, 0%)",
    "& label.Mui-focused": {
      color: "green"
    }
    // borderColor: "green"
  }
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
      <Grid container spacing={4} direction="column" justifyContent="center">
        <Grid item>
          <center>
            <Typography variant="h1">Ingreso de jugadores</Typography>
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
            // inputProps={{
            //   style: { textAlign: "center" }
            // }}
            // InputLabelProps={{style: classes.labelProps}}
            InputProps={{classes: {root: classes.inputRoot}}}
            InputLabelProps={{
              classes: {
                outlined: classes.label,
                focused: classes.focused
              }
              // style: { transform: 'translate(50%, 0)' }
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
            inputProps={{ style: { textAlign: "center" } }}
            // inputLabelProps={{ style: { textAlign: "center" } }}
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
