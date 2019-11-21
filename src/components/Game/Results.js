import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const getWinner = (result, players) => {
  const player = players.find(player => player.id === result.winner);
  switch (result.winner) {
    case 1:
    case 2:
      return player.name;
    case 0:
      return "Empate";
    default:
      return "No se ha podido calcular el ganador";
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    
  },
  list: {
    maxHeight: `${window.innerHeight * 0.4}px`,
    width: "100%",
    overflow: "auto",
    position: "relative"
  }
}));

const Results = props => {
  const classes = useStyles();
  const round = useSelector(state => state.game.round);
  const players = useSelector(state => state.game.players);
  const results =
    round &&
    round.results.filter(
      result =>
        result.player_1 &&
        result.player_1.length > 0 &&
        result.player_2 &&
        result.player_2.length > 0
    );
  return (
    <div className={classes.root}>
      <Typography variant="h5">Resultados</Typography>
      <List dense className={classes.list}>
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
                  {result.round}
                </ListItemText>
              </Grid>
              <Grid item xs={9}>
                <ListItemText>{getWinner(result, players)}</ListItemText>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Results;
