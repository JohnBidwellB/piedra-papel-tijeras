import React, { Fragment } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid
} from "@material-ui/core";
import { useSelector } from "react-redux";

const Results = props => {
  const round = useSelector(state => state.game.round);
  const results =
    round &&
    round.results.filter(
      result =>
        result.player_1.length > 0 &&
        result.player_2 &&
        result.player_2.length > 0
    );
  console.log("Round: ", round);
  return (
    <Fragment>
      <Typography variant="h5">Resultados</Typography>
      <List>
        <ListItem>
          <Grid container spacing={4}>
            <Grid item xs={3}>
              <ListItemText style={{ textAlign: "center" }}>Ronda</ListItemText>
            </Grid>
            <Grid item xs={9}>
              <ListItemText>Ganador</ListItemText>
            </Grid>
          </Grid>
        </ListItem>
        {results.map((result, index) => (
          <ListItem>
            <Grid container spacing={4}>
              <Grid item xs={3}>
                <ListItemText style={{ textAlign: "center" }}>
                  {index + 1}
                </ListItemText>
              </Grid>
              <Grid item xs={9}>
                <ListItemText>Ganador</ListItemText>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </Fragment>
  );
};

export default Results;
