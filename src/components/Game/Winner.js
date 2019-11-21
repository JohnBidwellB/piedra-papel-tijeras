import React from "react";
import { Typography, Button, Grid } from "@material-ui/core";
import { gameConstants } from "../../actions/types";
import { useDispatch, useSelector } from "react-redux";

const Winner = props => {
  const dispatch = useDispatch();
  const winner = useSelector(state => state.game.players.find(player => player.id === state.game.round.player))
  return (
    <div>
      <Grid
        container
        direction="column"
        justify="space-around"
        alignItems="center"
        spacing={4}
      >
        <Grid item>
          <center>
            <Typography variant="h2">{winner.name} ha ganado la partida</Typography>
          </center>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch({ type: gameConstants.NEW_GAME })}
          >
            Nuevo juego
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Winner;
