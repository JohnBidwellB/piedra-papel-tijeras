import React from "react";
import { Typography, Button, Grid } from "@material-ui/core";
import { gameConstants } from "../../actions/types";
import { useDispatch } from "react-redux";

const Winner = props => {
  const dispatch = useDispatch();
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
            <Typography variant="h2">Tenemos un ganador!</Typography>
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
