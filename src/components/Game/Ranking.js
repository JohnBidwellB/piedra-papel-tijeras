import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {},
  list: {
    width: "100%"
  },
  listItem: {
    textAlign: "center"
  }
}));

const Ranking = props => {
  const classes = useStyles();
  const winsState = useSelector(state => state.game.wins);
  const wins = winsState ? Object.entries(winsState) : [];
  wins.sort(function(a, b) {
    if (a[1] < b[1]) return 1;
    else if (a[1] > b[1]) return -1;
    return 0;
  });

  return (
    <div className={classes.root}>
      <Grid container direction="column" spacing={4}>
        <Grid item xs={12}>
          <center>
            <Typography variant="h2">Ranking de jugadores</Typography>
          </center>
        </Grid>
        {wins.length === 0 && (
          <Grid item xs={12}>
            <center>
              <Typography variant="h5">No hay partidas registradas</Typography>
            </center>
          </Grid>
        )}
        {wins.length > 0 && (
          <Grid item container xs={12}>
            <List className={classes.list}>
              <ListItem className={classes.listItem}>
                <Grid
                  item
                  container
                  direction="row"
                  spacing={4}
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={6} md={6}>
                    <ListItemText>
                      <b>Victorias</b>
                    </ListItemText>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <ListItemText>
                      <b>Jugador</b>
                    </ListItemText>
                  </Grid>
                </Grid>
              </ListItem>

              {wins.map(win => (
                <ListItem className={classes.listItem}>
                  <Grid
                    item
                    container
                    direction="row"
                    spacing={4}
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={6} md={6}>
                      <ListItemText>{win[1]}</ListItemText>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <ListItemText>{win[0]}</ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Ranking;
